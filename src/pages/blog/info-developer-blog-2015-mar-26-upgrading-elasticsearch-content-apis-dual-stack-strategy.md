---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-mar-26-upgrading-elasticsearch-content-apis-dual-stack-strategy'
headline: 'Upgrading Elasticsearch: Content API’s dual stack strategy'
date: '2015-03-26'
authors: [Luke Taylor, Chris Birchall]
standfirst: 'Evaluation and explanation of process used to upgrade Elasticsearch with Route53 and a dual stack strategy on the Content API team at the Guardian. '
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/3/25/1427302497657/d12e6983-1fa1-4baa-ad87-8417dfdd94fa-680x1020.jpeg'
  alt: 'Content API lego tower'
  credit: 'Photograph: Digital Development at the Guardian'
tags: [Cloud computing, Computing, Content API, Elasticsearch, Internet, Programming]
---

Here on the [Content API](http://open-platform.theguardian.com/) team, we’ve recently had to upgrade [Elasticsearch](https://www.elastic.co/products/elasticsearch) on our cluster. The upgrade was especially painful because we were several major versions behind the latest (we were running Elasticsearch 1.1.1) meaning that we would need to recreate the Elasticsearch index. The reason for running such an old version was that we have been focused on stability over the last few months in light of the release of the new theguardian.com website, which meant avoiding potentially disruptive operations such as upgrades.

We set out with the following goals for our Elasticsearch upgrade:

*   zero downtime to any of our clients
*   the ability to easily switch back in the event of any problems
*   increased automation, to make it easier on whoever has to do this next (ha!)

With these goals in mind, we decided to try out AWS’s Route 53 service.

Route 53
--------

Route 53 is “a highly available and scalable cloud Domain Name System (DNS) web service” provided by Amazon Web Services. Effectively what this means is that it allows you to connect requests from your users to your applications (running on infrastructure inside or outside of AWS), with support for a variety of different routing strategies (latency-based routing, weighted round robin etc.)

Beyond our already heavy use of AWS and the fact that it plays nicely with our existing AWS infrastructure, we primarily decided on Route 53 because it gives us fine-grained control over what percentage of traffic goes where. This allows us, for example, to spin up a new stack on demand for a particularly risky change and direct a small percentage of traffic to it to test it out in the wild under production conditions. Or, in the case of our Elasticsearch upgrade, move all of our traffic to a replica stack so we can work on our existing stack in isolation, without fear of causing catastrophic problems in production.

This granular control of traffic means you can ramp up at your own pace while providing 0% downtime, with Route 53 respecting the TTL of the Elastic Load Balancers (60 seconds), allowing for quick failover in the event of an incident. Route 53 also provides us with the possibility of using round robin/blue-green deployment, something we are keen to consider at some point.

<blockquote class='pullstring'>Granular control of traffic means you can ramp up at your own pace while providing 0% downtime.</blockquote>

If you want to learn more about Amazon’s Route 53 you can view the documentation here: [http://aws.amazon.com/documentation/route53/](http://aws.amazon.com/documentation/route53/)

Upgrading Elasticsearch on the Content API
------------------------------------------

Our high level strategy for upgrading Elasticsearch with Route 53 was:

1.  Create a new stack with the new Elasticsearch version.
2.  Populate that stack with all of the data matching the existing stack, whilst ensuring that both stacks are also receiving all new updates.
3.  Configure Route 53 to direct traffic to the new stack, ramping up slowly while monitoring for issues.
4.  Upgrade Elasticsearch on the existing stack.
5.  Point Route 53 back to the newly upgraded stack, ramping up slowly once again.
6.  After ensuring everything is running smoothly, delete the replica stack.

Difficulties experienced
------------------------

Although using Route 53 has been beneficial in helping us upgrade Elasticsearch and minimize the impact on end users, we did have some difficulties. The most problematic issue was that many of our API clients did not respect the DNS record time to live (TTL) values being broadcast by Route 53. As we ramped up the ratio of traffic being directed to the replica stack, we quickly found with our internal monitoring tools that our Route 53 settings were not being reflected in the number of requests hitting the respective load balancers of each stack.

When clients receive DNS records from Route 53, those records come with a TTL (in our case, this was set to 60 seconds). So clients should only use an IP address for 60 seconds, before contacting the Route 53 DNS servers again to perform another DNS resolution. This means that when we tell Route 53 to route clients to a new stack, the change should take effect within 60 seconds. But this was not happening - some clients were ignoring the TTL of the DNS record and continuing to connect to the original stack indefinitely. This was worrying, as it means we can’t failover to a new stack quickly in the event of any problems with the current stack.

As we could see which API keys were hitting which load balancer, we are able to work out that the problem was not systematic, but rather specific to certain clients who were using our very own [Content API Scala client](https://github.com/guardian/content-api-scala-client). This raised suspicions that the Scala client was over-zealously caching DNS records.

How we Tested
-------------

The problem with troubleshooting this issue was that DNS caching can happen at so many levels of the stack. The Content API Scala client uses the [Dispatch](https://github.com/dispatch/reboot) HTTP client internally, which is built on top of [AsyncHttpClient](https://github.com/AsyncHttpClient/async-http-client), which in turn uses Netty for its low-level HTTP processing. Moving further down the stack, the JRE also performs DNS caching (although it is only enabled under certain conditions) and the OS also has a DNS cache.

We started at the bottom of the stack, checking that the OS was respecting the TTL of DNS records. This was pretty simple to test. We just set up a loop to send a request every few seconds using curl, changed the Route 53 settings, and checked that curl started connecting to the new IP address after 60 seconds.

```
while (true); do
  curl -v $host 2>&1 /dev/null | grep “Connected to”; sleep 10
done
```

Having eliminated the OS, we looked at the Java runtime’s DNS caching functionality. After trawling through a lot of contradictory documentation and JDK source code, we decided that the JRE was not the culprit. Because we are not using a SecurityDispatcher, the JRE does not cache DNS records for more than 30 seconds.

Finally we wrote a simple test harness for the Scala client. It used basically the same approach as we used to test the OS-level DNS cache above, but this time sending requests using the Scala client and using tcpdump to see what IP address the client was connecting to.

What we found
-------------

Hunting through the source code of Dispatch, AsyncHttpClient and Netty, we eventually narrowed it down to AsyncHttpClient. As a performance optimisation, AsyncHttpClient pools Netty channels for reuse. By default it expires an idle connection after 60 seconds, but if a connection is used more than once per minute then it will be pooled and reused indefinitely. Of course, most of the internal Guardian services that use the Content API make a lot more than one request per minute!

Resolution for the Content API Scala client
-------------------------------------------

Luckily, this channel pooling behaviour is configurable, so it turned out to be [a one line fix](https://github.com/guardian/content-api-scala-client/pull/65). We simply had to configure AsyncHttpClient not to reuse connections for more than 60 seconds.

Resolution for Other Clients
----------------------------

Besides the Content API Scala client, the same problem also occurred in a number of other applications, namely those using the Play framework’s ‘play-ws’ library. Like Dispatch, play-ws uses AsyncHttpClient internally, so these applications needed to be fixed in the same way.

Unfortunately Play does not make it possible to access the configuration parameter that we need to set, so we wrote [a Play plugin](https://github.com/cb372/play-configurable-ningwsplugin) that does. We’ve also made a pull request to the Play framework to make this possible without a plugin in future.

Conclusions
-----------

Overall, we’re somewhat sceptical that Route 53 as an out-of-the-box solution is the right one for us going forward. As most of the heavy consumers of the Content API reside internally at the Guardian and therefore use the [Scala client](https://github.com/guardian/content-api-scala-client) for the Content API, we can ensure that the DNS TTLs are respected by a majority of clients. And this also rings true for those external clients using the latest version of the Scala client (which we most certainly recommend). But for those who choose not to use the Scala client and roll their own solution, we have no guarantee that they will respect the TTLs of our DNS records.

Now that we have rolled out our update to the Content API Scala client, we have an effective means for upgrading Elasticsearch for the time being in a manner that satisfies the needs of the Guardian. But as the Content API becomes more and more widely used externally, the need for a more resilient solution will only continue to grow.

An alternative solution that would give us more control would be to place a proxy server such as [HAProxy](http://www.haproxy.org/) in front of our stacks. This would allow us to route traffic dynamically, with the bonus that any routing changes can be applied instantly. But it comes with an operations overhead, as it is one more system to maintain. It’s also a potentially dangerous single point of failure, as a typo in the proxy server’s configuration file could stop any traffic from reaching our API.

If there are any other solutions for zero-downtime, granular cross-stack routing on AWS, we’d love to hear about them! Please let us know in the comments, the [Guardian API Google group](https://groups.google.com/forum/#!forum/guardian-api-talk) or contact us on [Twitter](https://twitter.com/openplatform).
