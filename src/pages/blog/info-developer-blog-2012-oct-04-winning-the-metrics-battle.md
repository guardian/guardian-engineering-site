---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2012-oct-04-winning-the-metrics-battle'
headline: 'Winning the metrics battle'
date: '2012-10-04'
authors: [Simon Hildrew, Nick Satterly]
standfirst: 'The Guardian''s lead Infrastructure Developer runs through the team''s use of metrics and monitoring for guardian.co.uk'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/10/3/1349269501235/mainpic.jpg'
  alt: 'A developer dashboard showing guardian.co.uk metrics in action'
  credit: 'Photograph: guardian.co.uk'
tags: []
---

This blog post is an outline of [our talk](http://velocityconf.com/velocityeu2012/public/schedule/detail/26576) at [Velocity EU 2012](http://velocityconf.com/velocityeu2012).

Over the last three years, the Guardian's Digital Operations team has been trying to upgrade and improve our [metrics](http://en.wikipedia.org/wiki/Software_metric) and monitoring systems. These systems help us to watch all of the network, servers, middleware and applications that make up the Guardian's digital products and backend APIs.

We had a couple of false starts, trying to use technology stacks that didn't work out, but 18 months ago we started making serious progress. The false starts were due to not truly understanding the problem we actually wanted to solve. We had initially been focusing on monitoring (a system to alert us when something was wrong), but we later started to focus on metrics (a system to gather and visualise data allowing us to better understand the systems).

The real problem
----------------

We did gather metrics before this project started using [Cacti](http://www.cacti.net/), but we didn't collect enough of them or collect them frequently enough. It was hard for developers and Operations to set up the instrumentation for applications (it would typically take a couple of days' work) and to make things worse, lots of new applications were coming on board. If developers wanted to change the metrics later, or Operations wanted to change which servers hosted the application, then we'd spend another few hours fixing it up. Because it wasn't trivial to get metrics recorded, very few people made the effort.

As well as not recording very many metrics, we only collected them every five minutes. That may sound quite frequent, but it isn't if you hope to use metrics to detect and resolve problems. You come up against the reality that the time to fix a problem is the sum of the time to detect, diagnose and resolve the problem. Assuming you rely solely on metrics, your mean time to detect cannot be less than half of your metrics interval. This is amplified when trying to diagnose problems. We believe that you need four samples before graphs start showing genuinely useful trends in the data. If you only sample every five minutes, then it will be over 20 minutes before you have a useful graph. As a result, we found ourselves logging onto servers and running [top](http://www.unixtop.org/man.shtml) and other tools to establish what was going on, and not bothering with metrics.

At the time, we were alerting using one system and drawing metrics with another. We would collect the data twice, which was not only inefficient, but was confusing, like when we got an alert that didn't show on the graph (or saw a spike on a graph that didn't generate an alert).

Finally, very few people were actually using the tools. One of the tools required users to login (and only Operations had accounts) and the other looked like you needed a login unless you knew the URL to view the graphs. So the metrics data we were collecting wasn't really being used – it was a frustrating cycle.

We've now come up with a monitoring mantra for the "right" approach to monitoring:

*   measure everything (network, os, middleware, applications)
*   measure frequently (every 15 seconds)
*   measure each data point once (don't use different tools to collect the same data)
*   input and output must be open

Where we are today
------------------

Across our estate, the number of metrics we record has gone from 1,400 to over 180,000 in the last year - over 16,000 of those come directly from developer applications. We measure every metric every 15 seconds, which can produce a graph that is useful for diagnosis in just one minute. We've made it trivial to instrument and gather data from applications and much easier for developers to dive through graphs and build their own dashboards. We are also working on our own monitoring system which uses our metrics system as a source of data.

In the diagram below you can see that we've assembled a number of open source products to create the metrics stack (left hand side) that we use. We use [Ganglia](http://ganglia.sourceforge.net/) and [FITB](https://github.com/lozzd/FITB) to collect metrics, [Graphite](http://graphite.wikidot.com/) for drawing and composing graphs and [Etsy Dashboards](https://github.com/etsy/dashboard) (with auto deploy from git) to enable developers and Operations to easily bring graphs together. The developers wrote the [guardian-management](https://github.com/guardian/guardian-management) library to ease the collection of metrics (amongst other things). We decided to roll out metrics before having to address the lack of monitoring. Good metrics were such a big win that this wasn't an issue at all. The second stage was to develop the components for monitoring, shown on the right.


   <figure>
   <img alt="The Guardian’s metrics and monitoring system" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/10/3/1349256331448/image01.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=51e70a4f88b2d790e6cab6a24c5449b0" loading="lazy" />
   <figcaption>
     The Guardian’s metrics and monitoring system
    <i>Photograph: Simon Hildrew/guardian.co.uk</i>
    </figcaption>
    </figure>

It turned out that once we had metrics on so many interesting items, it also became easier to implement useful monitoring. Very simply, the monitoring system works by having a number of small agents pushing alerts onto a message queue. These agents vary from taking SNMP traps, alerts from [syslog](http://en.wikipedia.org/wiki/Syslog) or thresholding real-time Ganglia metrics via our JSON [ganglia-api](https://github.com/guardian/ganglia-api). Another piece of custom software, [alerta](https://github.com/guardian/alerta), picks up messages from the queue and correlates, stores and displays them in a high-level dashboard.


   <figure>
   <img alt="Guardian alerta in action" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/10/3/1349256354881/image00.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=d3172f2f2abd394dda19eecc74147b29" loading="lazy" />
   <figcaption>
     Guardian alerta in action
    <i>Photograph: Simon Hildrew/guardian.co.uk</i>
    </figcaption>
    </figure>

Developers now have far more interest in production than before; they actively add metrics to help them understand how their application is performing and behaving. We've gone from having one screen displaying metric graphs to having almost 20, most of which are next to developers and showing graphs they have created themselves. Not only that, but developers now proactively point out production issues they have noticed on the graphs to Operations.

Dashboards are now the first place we go to: detect and diagnose problems, test fixes, profile performance and identify bottlenecks.

We're not yet there, but we've made huge progress. The effect it has had on the way in which developers and Operations work has been dramatic.

For those of you who are interested, these are the slides from the Velocity presentation.

<iframe src="https://www.slideshare.net/slideshow/embed_code/14649255?rel=0" width="460" height="369" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe>

  
**[Winning the metrics battle](http://www.slideshare.net/sihil/winning-the-metrics-battle "Winning the metrics battle")** from **[sihil](http://www.slideshare.net/sihil)**
