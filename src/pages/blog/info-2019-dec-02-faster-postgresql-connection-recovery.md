---
layout: ../../layouts/blog.astro
slug: 'info-2019-dec-02-faster-postgresql-connection-recovery'
headline: 'Faster PostgreSQL connection recovery'
date: '2019-12-02'
authors: [Alex Dufournet]
standfirst: 'This post covers how a database incident affected one of our services and what we did to improve the situation in the future'
image:
  url: 'https://media.guim.co.uk/082018d5f58ee662b9b3f15ac91a73a67905deb2/0_92_4744_2847/4744.jpg'
  alt: 'Ethernet data cables are seen in a server room in Canberra'
  credit: 'Photograph: Mick Tsikas/AAP'
tags: [PostgreSQL]
---

Being part of a DevOps team often means having to deal with unplanned or unexpected errors in production. In fact, a big part of our job is to make our applications resilient to outages, and as such, we need to take outages into account when designing our applications. In today’s article we’ll look into one such production incident, and what we did to improve the situation in the future.

I’m part of the mobile team and we recently experienced an outage due to a failure on one of our primary databases. We use Amazon’s RDS (Relational Database Service) to store our data in a PostgreSQL database. If you’re unfamiliar with RDS or PostgreSQL, all you have to remember is RDS is the service provider and PostgreSQL is the type of database.

We’ll dive into how the incident happened and what we can do to attenuate the effects of such an incident in the future, but before we do let’s go over a few concepts that we’ll need later.

RDS fail-over and connection pools
----------------------------------

If you know what a fail-over or a connection pool is, you can safely skip to the next section, if you don’t let’s define them.

A fail-over happens when RDS can’t keep the primary database alive for some reason such as a network failure, hardware failure, crash... RDS then promotes a copy of that database as the new primary database. That copy is in fact kept warm and up to date for the sole purpose of being promoted in case of an incident (If you’re interested here’s the [documentation](https://aws.amazon.com/rds/details/multi-az/)). This process usually takes about 30s to two minutes.

Once promoted, that copy becomes the primary database and gets to execute all the SQL requests.

Now, let’s talk about connection pools. A connection pool is a set of network connections kept connected to a database for the purpose of executing requests without having to create a new connection for each request. Once the application needs to execute a request, it checks if a connection is available in the pool and uses it to send the request.

If you use a relational database, chances are you are using a connection pool to access the database.

The most popular connection pool at the Guardian is called [Hikari](https://github.com/brettwooldridge/HikariCP) as it is the default connection pool used by the [Play framework](https://www.playframework.com/). In my opinion, it’s probably the best connection pool available for the JVM.

What happened
-------------

Over the weekend our primary production database experienced a network failure. Again, this is expected and we should plan accordingly.

The database failed over as it should, and most of our stack recovered swiftly.

Except one of our services (an application built with the Play framework). This had little impact on the overall service, but it’s still an issue. Looking at the logs and CloudWatch metrics it quickly became apparent there was a connectivity issue between our application and the database.

What happened is that all the TCP (Transmission Control Protocol) connections of the pool got into a sort of “zombie” state: broken yet not closed. The reason for that is the postgreSQL driver does not set a TCP timeout on the connections. The pool never attempted to close the connections and create new ones, yet no data would come in or out of these connections. The [Hikari documentation](https://github.com/brettwooldridge/HikariCP/wiki/Rapid-Recovery) describes the problem like this:

> The reason that HikariCP is powerless to recover connections that are out of the pool is due to unacknowledged TCP traffic. TCP is a synchronous communication scheme that requires “handshaking” from both sides of the connection as packets are exchanged (SYN and ACK packets).
> 
> When TCP communication is abruptly interrupted, the client _or_ server can be left awaiting the acknowledgement of a packet that will never come. The connection is therefore “stuck”, until an operating system level TCP timeout occurs. This can be as long as several hours, depending on the operating system TCP stack tuning.

From the point of view of the connection pool, all the connections were fine but for the newly promoted database there were no incoming connections from the application. It took the application six hours to eventually fail, with new servers coming online the database access was restored and everything went back to normal. This is far from ideal.

Reproducing
-----------

I managed to partially reproduce the issue in our test environment using the RDS console. It’s hard to reproduce a hardware or a network failure. In the RDS console there is an option to reboot the instance with a failover. Using that option while having a moderate amount of traffic to the service I managed to get a few of the connections to reach the same state we had in production. This contrasts with our production incident where _all_ the connections reached that state at the same time, but it doesn’t matter here as we only want to prove the pool can recover.


   <figure>
   <img alt="The AWS console offers a checkbox to reboot a database instance with a fail-over" src="https://i.guim.co.uk/img/media/05cea496b5fe95ca24b40020c666c01c2c2feb73/0_0_1680_558/master/1680.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=8d8d1f3672674036b89713d0ad322aa2" loading="lazy" />
   <figcaption>
     The AWS console offers an option to reboot a database instance with a fail-over
    <i>Photograph: THE GUARDIAN</i>
    </figcaption>
    </figure>

After a few database reboots (6), I saw the number of connections to the database going down. In other words, connections were dropped but our application still thought everything was fine and no further connection attempts were made.


   <figure>
   <img alt="A CloudWatch graph showing the number of connections to the database going down" src="https://i.guim.co.uk/img/media/aaed4989666df4a2a81a3d15f1e29609bd2ab52a/0_0_1780_324/master/1780.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d174ab279ef61155517a8e192446d791" loading="lazy" />
   <figcaption>
     A CloudWatch graph showing the number of connections to the database going down
    <i>Photograph: THE GUARDIAN</i>
    </figcaption>
    </figure>

The solution
------------

While rapid recovery isn’t a new concept I hadn’t heard of it. I only discovered it while investigating our incident. It turns out Hikari has a [brilliant page dedicated to it](https://github.com/brettwooldridge/HikariCP/wiki/Rapid-Recovery).

Their advice is two fold:

*   Ensure you don’t cache DNS for too long. The JVM default is indefinite for security reasons, but this didn’t age well with the advent of cloud computing. We changed the default such that any Guardian server with a JVM should only cache DNS for 60s. You can see how Max and Roberto implemented that change for our whole department [here](https://github.com/guardian/amigo/pull/239).
    
*   Ensure you set a TCP timeout. Some drivers support it, some don’t. PostgreSQL supports it but sets it to unlimited by default. So by default connections that have been dropped _might_ never be closed.

_How to set it?_

There’s likely multiple ways to do so, in our specific case I had to add it as a property of the data source. See the pull [request here](https://github.com/guardian/mobile-n10n/pull/467).

_What value to set it to?_

> HikariCP recommends that the driver-level socket timeout be set to (at least) 2-3x the longest running SQL transaction, or 30 seconds, whichever is longer. However, your own recovery time targets should determine the appropriate timeout for your application.

In our case: 30s.


   <figure>
   <img alt="Setting the socket timeout on a Hikari connection pool by using hikariConfig.addSourceProperty("socketTimeout", "30")" src="https://i.guim.co.uk/img/media/8568406d461341f7e83e5b53f92e842e0fa3eb1c/0_0_1142_168/master/1142.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5eefcecce8218a240343c8d162721068" loading="lazy" />
   <figcaption>
     Setting the socket timeout on a Hikari connection pool
    <i>Photograph: THE GUARDIAN</i>
    </figcaption>
    </figure>

The result
----------

Now that our pool has been reconfigured, let’s test again:


   <figure>
   <img alt="A CloudWatch graph showing the number of connections to the database remaining stable after multiple interruptions" src="https://i.guim.co.uk/img/media/07013f25f42739e1b02e383601696d2c8e3cfc33/0_0_1680_368/master/1680.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4231a3653de66064511d49de3c53cab2" loading="lazy" />
   <figcaption>
     A CloudWatch graph showing the number of connections to the database remaining stable after multiple interruptions
    <i>Photograph: THE GUARDIAN</i>
    </figcaption>
    </figure>

Four fail-overs later, the application always reconnects its 10 connections to the database.

No connections are staying in that zombie state: Success!

Conclusion
----------

Just one line of code or configuration can have a dramatic impact on any production system. In our case, it was really easy to miss. In fact, had I looked for any problem during the review process I wouldn’t have caught the issue - I simply lacked the knowledge to spot it in the first place. This seemingly innocuous settings sits right on the edge between already complex subjects such as TCP, Connection Pools, RDS and DNS.

I hope that by sharing my thoughts and learnings here you might have a second look at how your connection pool is configured. We certainly did and at least one other application was fixed following this work.
