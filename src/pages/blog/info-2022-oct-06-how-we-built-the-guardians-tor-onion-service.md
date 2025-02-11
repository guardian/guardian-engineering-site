---
layout: ../../layouts/blog.astro
slug: 'info-2022-oct-06-how-we-built-the-guardians-tor-onion-service'
headline: 'How we built the Guardian’s Tor Onion service'
date: '2022-10-06'
authors: [Jon Soul, Ioanna Kokkini]
standfirst: 'In May, the Guardian launched a version of www.theguardian.com available entirely within the Tor network. Here the engineers who worked on the project explain their process and the challenges they faced
'
image:
  url: 'https://media.guim.co.uk/86b6606c8d656b5664ed1691fdce30ce5333d154/0_0_3417_2050/3417.jpg'
  alt: 'The Guardian is available on Tor'
  credit: 'Illustration: Guardian Design'
tags: [Tor]
---

A few months ago we wanted to explore making the Guardian’s website available as a Tor Onion service, a service that can only be accessed over the [Tor network](https://en.wikipedia.org/wiki/Tor_\(network\)). Guardian readers have always been able to access [https://www.theguardian.com](https://www.theguardian.com/uk) over Tor using tools such as the [Tor Browser](https://www.torproject.org/download/). The Tor network helps conceal its users’ locations, which makes tracking their internet activity much more difficult. Tor also makes it harder for internet service providers to identify what their users are accessing. This means users can bypass censorship in parts of the world where access to independent news might be difficult or if certain websites and services are banned. Onion services go a step further, ensuring the end-to-end communication is conducted entirely over the Tor network (more on this in the next section.)

As always in Guardian product and engineering, our ambition is to [rapidly deliver](https://en.wikipedia.org/wiki/Pareto_principle) something of value to our readers, learn from any feedback and iterate over time. But with a relatively unfamiliar technology, which doesn’t align perfectly with many of our common tools and patterns, we faced some different challenges. In this article we’ll share these challenges and our approach.

If you’d like to browse the Onion service, you can visit [https://www.guardian2zotagl6tmjucg3lrhxdk4dw3lhbqnkvvkywawy3oqfoprid.onion](https://www.guardian2zotagl6tmjucg3lrhxdk4dw3lhbqnkvvkywawy3oqfoprid.onion) while using the Tor browser.

Onion services
--------------

Accessing a website on the “clearnet” (the regular internet), even using Tor, relies on domain name resolution and IP-address-identified servers where the website is hosted. The final communication between the hosting server and the server attempting to connect (whether it’s your own computer or a Tor exit node) uses regular TCP/IP to route packets. This opens the door to potential man-in-the-middle attacks and also reveals the location of the hosting server to the connecting server via its IP address. For some hosts, who wish to remain anonymous, location-hiding is the primary reason for using an Onion service. For the Guardian, that aspect is inconsequential; we want to provide anonymity for our users, not ourselves.

On the other hand, an Onion service is identified by its public key; IP addresses are not even used in the protocol. For instance, the Guardian Onion service’s address is _www.guardian2zotagl6tmjucg3lrhxdk4dw3lhbqnkvvkywawy3oqfoprid.onion_. Instead of IP routing, in the Onion service protocol a client will introduce itself to a service, and then communicate via a [rendezvous](https://en.wikipedia.org/wiki/Rendezvous_protocol) point over the Tor network. For a more detailed explanation of this process we recommend reading [“How do Onion Services Work?”](https://community.torproject.org/onion-services/overview/) on the Tor project website.

Discoverability and trust of Onion services is a key difference to clearnet websites. How do you know when you visit the long _.onion_ hostname that it is really the Guardian providing that content? How do you find it in the first place?

You could publish an article on your site, such as this one, that advertises the address. Or you could include a reference in your certificate or DNS records for your clearnet domain. None of these options is particularly visible, but happily the Tor browser provides a [feature](https://community.torproject.org/onion-services/advanced/onion-location/) for Onion service owners to advertise them when users visit their clearnet site. Including an Onion-Location HTTP response header will enable a banner to appear in the address bar indicating the availability of an Onion service.


   <figure>
   <img alt="Advertising our Onion service to Tor browser users visiting theguardian.com" src="https://i.guim.co.uk/img/media/1ec5b1efef521edaee23823dbb8c89b386d537fc/0_0_512_84/master/512.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=987d62c122f432fe9696a6309e36efbf" loading="lazy" />
   <figcaption>
     Advertising our Onion service.
    <i>Photograph: Screenshot/The Guardian</i>
    </figcaption>
    </figure>

The Enterprise Onion Toolkit
----------------------------

Often the simplest way to host an Onion service for an existing website will be to host it as a proxy. Your Onion service responds to requests by forwarding them to your existing backend, meaning you don’t need to create a duplicate of your website rendering tier, when it will mostly function the same anyway.

However, this kind of proxy for an Onion service does need to be a little smart. If we simply served the usual _theguardian.com_ pages, many of the links and assets would point to _theguardian.com_, making it difficult for users to navigate around and stay exclusively on the Onion service.

Fortunately we are not the first to address this challenge. In fact, there is an excellent toolkit for setting up exactly this kind of proxy called the Enterprise Onion Toolkit (EOTK). The EOTK is an [open source](https://github.com/alecmuffett/eotk) toolkit for bootstrapping proxy-based Onion services for publicly available websites. It provides scripts for installing the necessary software to host a service, as well as a command-line interface for configuring, and orchestrating the proxy. Under the hood it relies on the popular web-server [Nginx](https://www.nginx.com/) (in particular [OpenResty](https://openresty.org/en/)), as well as Tor. Nginx acts as our proxy and URI-rewriter, while Tor is used to connect this proxy to the Tor network as an Onion service.

Architecture and configuration
------------------------------

The Guardian predominantly uses Amazon Web Services (AWS) as our cloud provider. In recent times we have been leveraging their [cloud development kit](https://aws.amazon.com/cdk/) (CDK) to build our own [Guardian-flavoured library of CDK patterns](https://github.com/guardian/cdk), in Typescript, for infrastructure definition. CDK allows developers to define their AWS resources using familiar programming languages. By reusing our own specific patterns, we are managing to improve consistency, security and operational best practice, while freeing up teams to focus more time on developing their applications, not the infrastructure behind them.

For our Onion service we decided to leverage one of these patterns, which enabled us to spin up a fully fledged [EC2](https://aws.amazon.com/ec2/) based app in very little time. An abridged, annotated version of our configuration can be seen below.

```javascript
new GuEc2App(this, {

  // restrict the access scope of our app to be VPC-internal
  access: {
    scope: AccessScope.INTERNAL,
  },

  // user data is the script run on instance launch
  userData: [
    “#!/bin/bash -ex”,

    // copy keys for our onions from S3
    “cd /usr/local/eotk”,
    `aws s3 sync s3://${bucketName}/theguardian.com/onion/ ./secrets.d/`,
    `aws s3 sync s3://${bucketName}/guim.co.uk/onion/ ./secrets.d/`,

    // define EOTK configuration for our site
    “cat > theguardian.conf <<-EOF",
    "set project theguardian",

    // block all subdomains except www and static
    `set block_host_re ^(?!www\\.|static\\.).+${guardianHostname}\\.onion$`,

    // map our mined Onion addresses to their respective sites
    `hardmap ${guardianHostname} theguardian.com`,
    `hardmap ${guimHostname} guim.co.uk`,
    "EOF",

    // use the EOTK CLI to set up the necessary config
    "./eotk config theguardian.conf",

    // copy our certificates to the required location
    `aws s3 sync s3://${bucketName}/theguardian.com/ssl/ ./projects.d/theguardian.d/ssl.d/`,
    `aws s3 sync s3://${bucketName}/guim.co.uk/ssl/ ./projects.d/theguardian.d/ssl.d/`,

    // start the onion service!
    "./eotk start theguardian",
  ].join(“\n”),
});
```

  
With the above definition, a whole slew of resources are created for us including an autoscaling group (ASG), a load balancer (VPC internal), security groups, IAM policies/roles and monitoring alarms. There are some built-in assumptions, relating to communication protocols, in the [GuEC2App pattern](https://github.com/guardian/cdk/blob/7714ed7f11ae80379093587890130ae075319038/src/patterns/ec2-app/base.ts#L316) we used, which means some of the resources or configurations are redundant for an Onion service. For example, a redundant certificate is created and the load balancer serves no requests except for health checks. We felt this was a worthwhile trade-off for the simplicity and consistency of the implementation.


   <figure>
   <img alt="A simplified representation of the infrastructure behind our Onion service" src="https://i.guim.co.uk/img/media/d194b55ac1bdd946611f46b45616b73f37df2a57/0_0_2381_1596/master/2381.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f4bb210b763810937961bd5810994f68" loading="lazy" />
   <figcaption>
     Simplified Onion service architecture.
    <i>Illustration: Jon Soul/The Guardian</i>
    </figcaption>
    </figure>

You may notice that this configuration does not include any installation of Nginx or Tor. Best practice dictates that such software is installed prior to instance start, so that launches are faster and more predictable. At the Guardian, we do this using [AMIgo](https://github.com/guardian/amigo), our tool for managing custom Amazon Machine Images (AMI). For this project we simply defined a new EOTK ([Ansible](https://www.ansible.com/)) role that runs EOTK’s installation script for our chosen operating system and regularly creates a new AMI from its output. The latest version of this AMI is then passed to our CDK definition via a parameter that gets updated on a schedule, in order to apply security patches.

Another feature worth mentioning is the use of static, mined Onion addresses, which we specified using _hardmap_ in the EOTK configuration file. EOTK is able to generate Onion addresses on the fly, using _softmap_, but to give our readers a consistent and somewhat recognisable URL, we mined addresses until we generated the public/private keys for addresses starting with “guardian”. We launched our service using one of these key pairs.

Limiting functionalities
------------------------

We consciously decided to remove some features from our website for readers accessing it via the Onion service.

**Sign-in and consent**

Tor users will not be asked to sign-in to access our content for two reasons. First, most people using Tor are seeking to make themselves anonymous. This means they will aim to minimise digital breadcrumbs that may identify their web browsing activities, and asking them to sign-in would increase their chance of being identified. For the same reason, we will never use or share their personal data, so we do not ask those users for their consent to do this. Secondly, protecting sign-in and sign-up pages from bots may require us to use technologies that may identify IP addresses from Tor as being suspicious or simply prevent access to them.

**Third-party advertising**

Tor users will not be shown third-party advertising as it requires consent to share data and could have reduced their privacy. More generally we made the decision to disable all client-side scripts whether they are first-party or third-party. We felt that disabling scripts provided an extra layer of protection from any possible tracking that might occur once a browser visits the site, and that the typical visitor to our Onion service would disproportionately value this. Some Tor users already disable scripts for security reasons, so by disabling them ourselves we aimed to ensure everyone has the same experience and level of protection. This is helpful as well to provide a better experience as downloading multiple script files over Tor typically takes longer than on the regular web. By relying on our modern server side rendering tier without client side scripting we mitigate the slower speed load time sometimes experienced when browsing using Tor.

Displaying a message about unavailable features
-----------------------------------------------

To achieve this on our Onion service, we utilised some of the many built-in [configuration options of EOTK](https://github.com/alecmuffett/eotk/blob/e4a4ca429f64035451af563affdf673a940a2147/demo.d/example.tconf). Firstly _block\_host\_re_, which was shown earlier, allows you to block particular hosts matching a regular expression pattern. We also (mis)used _preserve\_csv_ to replace some other specific links and attributes with EOTK directly. This setting is primarily intended for preserving hostnames in your content that would otherwise be automatically replaced by EOTK (think email addresses.)

There’s a good argument that you should instead implement at least some of these changes as part of your underlying site, rather than using the toolkit to alter content on the fly. That is easily achieved by checking a _X-From-Onion_ HTTP header sent by EOTK, but would have implications on the cacheability of the requests.

In our case, we decided to avoid any cache splitting by not altering the response for a request to _theguardian.com_ whether it comes from our Onion service or not. This has the additional benefit of keeping the underlying rendering logic simpler, if only marginally.

Teething issues
---------------

Disabling all Javascript from loading on our Onion service has implications for some parts of our content, particularly complex interactive and video content, which will not work as expected.

To prevent the loading of scripts, we set the [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) so that scripts are disallowed from all sources with _[script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) ‘none’_. To override this HTTP header we have forked EOTK, allowing us to directly set the value using Nginx.

```text
ngx.header[”Content-Security-Policy”] = “%CSP_OVERRIDE_VALUE%”
```

  
Apart from the aforementioned content problems, disabling scripts caused two further unexpected issues. In our first attempts to configure the Onion service, we observed unusually large gaps between stories on the front pages and a complete absence of styling on the footer of some pages. As it turned out, these were attributable to two distinct issues in the way we treated the loading of CSS in the absence of Javascript. Without getting into the unnecessary details, we will share some of the things we learned during this process.


   <figure>
   <img alt="Unusually large gaps on front pages observed in an early prototype" src="https://i.guim.co.uk/img/media/f9b1bd07329f87bc9b8c92cf62c281d707fdebf3/0_0_512_346/master/512.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d2cadd0f4b8d2479962532f193050308" loading="lazy" />
   <figcaption>
     Large gaps on front pages from an early prototype.
    <i>Photograph: Screenshot/The Guardian</i>
    </figcaption>
    </figure>

Firstly, ensure you revisit assumptions about which CSS rules are applied when [feature detection](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection) isn’t available. Browser support for CSS features is always improving, so you need to revisit these decisions in the long run. In our case, in the absence of Javascript, the legacy rendering tier of our website was assuming the browser was not supporting [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) and removing these rules. We fixed it by making the opposite assumption, that Flexbox is supported.

Secondly, using a CSP to disable script loading, does _not_ mean that [noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) elements are inserted into the page, unlike disabling Javascript via your browser settings. In our case, we were using a fallback _noscript_ element as part of a method to [asynchronously load](https://css-tricks.com/the-simplest-way-to-load-css-asynchronously/) non-critical CSS, but with our CSP neither the primary Javascript or fallback were being triggered to load the CSS and we were ending up with an unstyled footer. This was fixed by loading the CSS synchronously in our Onion service.

Certificates
------------

Choosing to add TLS certificates to an Onion service is [not as obvious a decision](https://community.torproject.org/onion-services/advanced/https/) as it would be for a regular site. Tor’s protocol for Onion services means that you already have all the security benefits of HTTPS, without the need for a TLS certificate. On the other hand, many of us are conditioned that seeing _https://_ in our browser’s address bar is a good thing – even the Tor browser itself warns you if an Onion site has an invalid certificate, despite the connection still being secure.

Many other popular Onion services choose to use TLS certificates anyway, and we decided that it was worthwhile too. At the time of writing there are only two certificate authorities (CA) that issue certificates for _.onion_ addresses, [DigiCert](https://www.digicert.com/blog/ordering-a-onion-certificate-from-digicert) (Extended Validation), and [HARICA](https://news.harica.gr/article/onion_announcement/) (Domain Validation.) We ended up using HARICA for our certificates.

The process for validating _.onion_ certificate requests is a little different to usual and worth touching on. Typically, in order to validate that you are the owner of a domain, a CA will ask you to add additional DNS entries, respond to an email to that domain, or serve a specific piece of content from a specific location on that site. However, as we have already mentioned Onion services don’t even use DNS.

The CA you choose for your _.onion_ certificate will explain the available options, but in our case for a wildcard _.onion_ certificate the only option given by HARICA was to provide a certificate signing request (CSR) [signed](https://github.com/HARICA-official/onion-csr) by the key of our Onion service. This was a little bit more involved than the traditional methods, perhaps due to the relatively basic tooling. When you think about it, though, it’s a neat reuse of an existing property of Onion services; proving you own the private key is the basis of an Onion service and we simply prove that again to the CA by signing our CSR.

Monitoring
----------

Ensuring our Onion service is always available to our readers also proved an interesting challenge. Familiar tools for determining the health of a service, such as [application load balancer health checks](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html) or uptime monitoring tools don’t typically support Onion services.

Instead we decided to build our own simple monitor using [crontab](https://linux.die.net/man/5/crontab), [curl](https://linux.die.net/man/1/curl) and [CloudWatch metric alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html). On a separate service, we use curl’s support for a [SOCKS5](https://en.wikipedia.org/wiki/SOCKS) proxy to connect via Tor to our Onion service. Running this on a schedule using crontab and sending any failures to a custom CloudWatch metric, off which an alarm is based, allows us to only trigger alerts if a certain number of failures occur within a given interval. This feature is especially important for an Onion service, because the Tor network can be less reliable, so we want to have more evidence of a problem before alerting.

The pertinent part of the shell script we run to achieve this is when we run the curl command, shown below. This command is part of a script executed by crontab every two minutes.

```bash
curl -s -S --head --socks5-hostname 127.0.0.1:9050 “$HOSTNAME” || \
  /usr/local/bin/aws cloudwatch put-metric-data --namespace $METRIC_NAMESPACE --metric-name $METRIC_NAME --value 1
```

  
We also found this method useful for determining when Tor had finished initialising on instance startup. We run a curl request in a loop until it is successful, but this time point it at a host we can usually rely on being able to access over Tor.

```text
until $(curl -s -o /dev/null --head --fail --socks5-hostname 127.0.0.1:9050 https://check.torproject.org); do
  printf ‘Tor not yet initialised, trying again’
  sleep 3
done
```

Load balancing and redeployments
--------------------------------

As already discussed, the physical load balancer in our deployment is partially redundant; it is an HTTP load balancer for an application that doesn’t use HTTP. So how do we achieve any kind of horizontal scaling or high availability in our setup?

It should first be noted that there is an oft-quoted solution for achieving load balancing of Onion services, [Onionbalance](https://onionbalance.readthedocs.io/en/latest/). The caveat to this section is that we did not explore this solution further because its compatibility with EOTK was unclear.

In our setup, we can simply scale out our ASG, and an extra instance of the Onion service will publish its descriptor to the Tor directory. We have observed that under this scenario, clients will begin to use all of the instances, forming a basic kind of load balancing. Unfortunately the opposite action, removing an instance from the ASG, leaves clients communicating with an instance that no longer exists (for roughly 15 minutes.) Presumably we need a way for the descriptor of that service to be removed from the directory on demand, or a shorter TTL on the descriptor, but we haven’t yet found a way to solve this particular issue.

What’s next?
------------

By design, it is harder for us to understand the details of how visitors are interacting with our Onion service, but we are always looking for feedback to inform what we do next. For a project like this, that perhaps won’t receive as much developer time as some of our other platforms, we’re particularly conscious of putting time and effort into ensuring it has stability and longevity. As such, near-term improvements are more likely to be in the area of observability or automation. We’d love to hear from you if you’ve solved some of the challenges we encountered.

Finally, our thanks to Alec Muffett for all of the work in creating EOTK, and helping us with our particular deployment of it. It is what made this project possible. Thanks also to the assistance of other teams and individuals at the Guardian for their domain expertise with Tor and our website rendering.

_**Development of digital products is central to the Guardian. You could be building the products that showcase our progressive and independent journalism, crafting the tools that journalists use to write their stories, developing the services that allow those stories to be distributed across the globe, or safeguarding our financial future.**_

_**If you’re interested in joining our product and engineering team, please visit the [Guardian News & Media careers page](https://workforus.theguardian.com/).**_
