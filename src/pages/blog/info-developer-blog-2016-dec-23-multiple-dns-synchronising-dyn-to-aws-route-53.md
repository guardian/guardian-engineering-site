---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-23-multiple-dns-synchronising-dyn-to-aws-route-53'
headline: 'Multiple DNS: synchronising Dyn to AWS Route 53'
date: '2016-12-23'
authors: [Simon Hildrew, Jenny Sivapalan]
standfirst: 'In a time of frequent DDoS attacks we run through how we increased our DNS resilience by using multiple providers at little extra operational cost.'
image:
  url: 'https://media.guim.co.uk/b63e638dd2d2ea5e13212de792948c88a9d4241c/0_0_7360_4416/7360.jpg'
  alt: 'Cutting a blue network cable with scissors'
  credit: 'Photograph: Alamy'
tags: [Advent developer blog 2016]
---

Imagine the scene, it’s a Friday afternoon and the wind down to the weekend is in full flow. All is well. Until all of a sudden all the monitoring alarms start firing, people around you start saying “hey is the internet down for you or is it just me?”. The Guardian’s DNS provider, Dyn, was [suffering a large and sustained DDoS attack](https://www.theguardian.com/technology/2016/oct/26/ddos-attack-dyn-mirai-botnet).

Dyn has been a reliable DNS provider but with attacks against Internet infrastructure providers becoming more frequent and having greater impact we have been considering what we can do to help mitigate any potential impact to our products or publishing tools. In the wake of the attacks many blogs were written on the subject and [dual DNS providers](https://www.internetsociety.org/blog/tech-matters/2016/10/how-survive-dns-ddos-attack-consider-using-multiple-dns-providers) seemed to be a way some websites were able to minimise the impacts of attacks against Internet infrastructure.

We were keen to increase our DNS diversity and decided to see if we could use AWS Route 53 in addition to Dyn. We chose to try out Route 53 because we had seen Etsy were doing this (the engineering team at Etsy moved to dual DNS within an hour of the attack starting and their website came back up and stayed up). It was also significantly cheaper than contracting with a second DNS provider like Dyn. From the outset, one of the key measurements of success is to ensure an update on one DNS provider is mirrored in the other without manual intervention, to avoid increasing the admin burden when changes are made.

Adding a second DNS provider is traditionally done by using the notification and transfer features built into DNS. Notifications allow Dyn to notify secondary servers of changes and transfer allows a secondary server to ask Dyn for a complete copy of the zone. Unfortunately Route 53 does not provide these features and so we had to roll our own mechanism. After much trial and error we landed with a combination of [nsnotifyd](http://dotat.at/prog/nsnotifyd/), [cli53](https://github.com/barnybug/cli53) and a custom script to glue them together.

The first of these two tools, nsnotifyd, provides a simple interface to the notify and transfer mechanisms of DNS. Like all good \*nix tools it does one thing well: listen for notifications on port 53 and run a script when a notification is received. Likewise, cli53 takes a BIND zone file and synchronises the records into a Route 53 Hosted Zone.

The final piece of the puzzle was a simple script that synchronises a zone when a notification is received. nsnotifyd calls a script with two or three arguments: the name of the zone, the serial number from the notification and optionally the source. The first thing the script does is to download a complete copy of the zone using the _dig AXFR_ command. Finally we use cli53 to import the zone file into a hosted zone of the same name. As you read the script you’ll notice that we extract the serial number and append it as a new TXT record to the zone. The serial number is incremented every time an update is made and can be used to check that Dyn and Route 53 are in sync. Unfortunately the serial number cannot be set in Route 53, so in order to retain the information we add it as a TXT record.

```bash
#!/bin/bash
set -e
# Script to update a zone - designed to be triggerd by nsnotifyd
PATH=/bin:/usr/bin:/usr/local/bin:$PATH

# Constants
DYN_TRANSFER_HOST=xfrout1.dynect.net

# Get command line parameters
ZONE=$1
NOTIFY_SERIAL=$2
SOURCE=$3

# check command line parameters
if [ -z "${ZONE}" -o -z "${NOTIFY_SERIAL}" ]; then
  echo "Usage: $0 <zone> <serial> [<source>]" >&2
  exit 1
fi

ZONEFILE=`mktemp /tmp/${ZONE}.zonefile.XXXXXXXXX`
dig AXFR ${ZONE} @${DYN_TRANSFER_HOST} > ${ZONEFILE} 2>&1

# Sadly dig will return an exit code of zero for many types of failures
# so we supplement this by looking for some error messages in the output.
if ! egrep "Transfer failed|connection timed out|Name or service not known|connection refused|network unreachable|host unreachable|end of file|communications error|couldn't get address" ${ZONEFILE} > /dev/null; then
  #extract serial from ZONEFILE
  SOA_SERIAL=$( cat ${ZONEFILE} | awk '{if ($4 == "SOA") print $7;}' | head -1 )

  if [ "$SOA_SERIAL" -eq "$SOA_SERIAL" ] 2>/dev/null; then
    SERIAL=$SOA_SERIAL
  else
    echo "SOA record not found in transferred zone, couldn't extract serial"
    exit
  fi

  # append a serial number record for troubleshooting
  echo -e "\n_serial._dyn.${ZONE}. IN TXT \"${SERIAL}\"" >> ${ZONEFILE}

  # push into Route53
  cli53 import --file ${ZONEFILE} --replace ${ZONE}
fi
rm ${ZONEFILE}
```

All of these steps are very quick and we found that it usually only took a few seconds for an update in Dyn to be propagated to Route 53. This approach is simple, but not without its limitations. One significant limitation is that it is not currently possible to synchronise anything other than the simple DNS records. Advanced features that Dyn offers (such as Traffic Director) will not work in dual DNS setup and for the most part we don’t use these.

There were a few more steps to make this work robustly in production. Firstly we created debian packages for nsnotifyd and cli53 and installed them into an AMI and created an autoscaling group of a single t2.nano instance. The instance needed to live on a single known IP address in order to correctly set up the [secondary notification and transfer mechanisms with Dyn](https://help.dyn.com/using-external-nameservers/). We allocated the instance an Elastic IP and created a script that ran on boot that associated the EIP with new instances. Finally, all of this was templated with CloudFormation so it can be easily understood and maintained.
