---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-sep-12-moving-mountains-systems-hardware-refresh'
headline: 'Moving mountains: managing a systems hardware refresh'
date: '2013-09-12'
authors: [Stephen Gran]
standfirst: 'How the Guardian migrated its digital operations platform and upgraded it in the process without any downtime or server meltdowns'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/9/12/1378991457816/servers.jpg'
  alt: 'Racks of servers at CERN'
  credit: 'Photograph: Torkild Retvedt/Public domain'
tags: []
---

This time last year, the Guardian digital estate was nearing end of support, and was starting to look a little long in the tooth. While the Guardian's [web systems](http://en.wikipedia.org/wiki/Web_operations) team has always been very good at making sure things are in configuration management and are easy to build and rebuild, you can't just magic up new resource where there isn't any. In short, we were at capacity. Also, adding new physical servers and network infrastructure to satisfy new requests for resource is time consuming, and was making bringing up new products take longer than any of us liked. Many development teams turned to [AWS](http://aws.amazon.com/) to bridge the gap in turnaround time, although this meant additional cost.

The need for a hardware refresh presented an opportunity for us: we could just replace the hardware and carry on much as we did before, or we could try to build a better platform. We have a varied internal userbase. Some development teams are happy running the entire [stack](http://en.wikipedia.org/wiki/Solution_stack) themselves, from configuring the OS to deploying the applications. At the other end of the scale, many projects use 'Platform as a Service' offerings like [Google App Engine](https://developers.google.com/appengine/) or Amazon's [Elastic Beanstalk](http://aws.amazon.com/elasticbeanstalk/), and don't worry about anything below the application level. Planning to support all of these varied use cases made it clear that we needed an API driven virtualisation platform that would enable us to give out access at the level needed.

We chose to build the new platform on Cisco's [UCS](http://www.cisco.com/en/US/products/ps10265/index.html) platform, [Ubuntu LTS](https://wiki.ubuntu.com/LTS), and [Openstack](http://www.openstack.org/), using [Netapp](http://www.netapp.com/) for storage. Cisco UCS gave us a good mix of manageability and burstability – it is possible to define server profiles so that, for instance, a new blade destined to be a virtual machine server starts off with all the BIOS settings done correctly. Other people have tried things like [running automated scripts](http://www.reddit.com/r/IAmA/comments/1k7tlu/we_are_the_operations_team_at_etsy_ask_us_anything/cbmcctw) when they have to change BIOS settings on dozens of servers. I prefer our choice for now.

Openstack was chosen for the best mix of features and developer mindshare. It has an [EC2 API](http://aws.amazon.com/developertools/351) that is complete enough for our use cases, and offers an awful lot of flexibility in the native API and in deployment strategies. This was necessary to build this out on top of existing networks and datacentre security models. Sadly, no green fields in sight. Once Openstack was chosen as the software, Ubuntu was a natural choice. It is roughly the reference platform for development within the Openstack community, and Canonical offer support for upgrades across versions of both Openstack and the Ubuntu OS.

Obviously, changing the platform, architecture, and workflow all at once is unlikely to go well. We decided to use a 'mixed-mode' approach for the migration – we built the new platform as we intended to eventually use it. Instead of revamping application platforms to take advantage of new features (and new foibles), we "lifted and shifted" as much as possible, grafting a traditional hosting environment over the top of a private cloud platform.

The transition hasn't been without its difficult moments of course – you can't introduce this much change without something creaking under the strain. Thankfully, our internal users have been forgiving, our architecture has been resilient enough that we never actually broke anything, and the Guardian's Digital Development team has been very gracious and helpful in fixing the things that just weren't going to work.

Now that we've pretty much bedded things in, we need to add some more features (autoscaling, load balancing, etc), and hand out access to developers. The goal is to be able to provide developers with resource quickly – we've been saying that our turnaround time should be the length of a coffee break. Hopefully, I'll be writing another one of these posts this time next year, detailing how things look on the other side of that goal.
