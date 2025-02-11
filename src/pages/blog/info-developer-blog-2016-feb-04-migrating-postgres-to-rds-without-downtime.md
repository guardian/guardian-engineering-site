---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-feb-04-migrating-postgres-to-rds-without-downtime'
headline: 'Migrating Postgres to RDS without downtime'
date: '2016-02-04'
authors: [Nicolas Long]
standfirst: 'Our experience migrating from a self-managed Postgres cluster to RDS, without downtime.'
tags: [AWS, PostgreSQL, Software]
---

A note on Amazon’s new Database Migration Service
-------------------------------------------------

_Since our migration, and indeed the writing of this blog post, Amazon have announced their ‘[Database Migration Service](https://aws.amazon.com/dms/)’. Whilst this tool is not yet generally available, it is definitely worth investigating as a first option if you need to import data into/out of RDS and provided you can afford to wait for its wider launch. It does not appear to offer the full flexibility of the master-master replication approach we used, but it is likely to be much simpler to apply._

This blog post will focus on our migration from a self-managed Postgres cluster on EC2 to RDS - Amazon’s relational-database-as-a-service. We’ve been running on RDS for a while now; RDS has some downsides but has significantly reduced our operational burden.

Context
-------

Earlier in 2015 we migrated user commenting from our own hardware to AWS. We ended up running [Postgres](http://postgresql.org/) ourselves, managing replicas in an auto-scaling group with a separate master. For discovery we used AWS tags. Point-in-time recovery was supported through nightly snapshots of [EBS](https://aws.amazon.com/ebs) volumes and also storing WAL logs in [S3](https://aws.amazon.com/s3/).

The system worked and was stable but had a few disadvantages:

*   deploys (Postgres updates, etc) involved several manual steps and were slow
*   new team members found it difficult to get up to speed with the system
*   poor availability characteristics - whilst we were resilient to replica failure through redundancy, a primary failure would have required manual intervention to promote a replica. In addition, while we had good support for point-in-time recovery, and had practiced it thoroughly, it was still a somewhat involved process

In practice the system was not easy to maintain and did not inspire confidence in the team, many of whom were new and/or relatively inexperienced with Postgres.

It is worth noting that the system had run with essentially 100% uptime in AWS up to this point. Nevertheless, we found the arguments to switch to a hosted solution compelling.

Buy if you can
--------------

The Guardian adopts the general policy ‘buy if you can’. Specifically, hosted solutions are preferred if the technology is non-core (not strategically important to the business).

Even though this is more expensive upfront, it makes sense for us - our teams are small, agile and constantly focused on building new things for our users.

Needless to say, the specific data store chosen is rarely of strategic importance. What’s more, distributed data stores are highly complex both to understand and to run. Developer time can be saved by offloading the actual running to a third-party.

Enter [RDS](https://aws.amazon.com/rds/) - Amazon’s relational-database-as-a-service offering.

RDS offered the following benefits:

*   automated failover of primary in case of failure (‘Multi-AZ’)
*   automated creation of replicas
*   automated updates
*   a purely declarative setup, via Cloudformation

In our case, we expected RDS to reduce our maintenance burden and also to improve our availability and durability.

There are a few downsides to RDS, which we’ll cover later, but we were confident enough to make the switch.

Migrating the data
------------------

Our Postgres database currently holds a large number of comments, plus a whole load of related data - moderation statuses, recommends, and so on. The database clocks in at around 240gb of space during usage.

We decided on the following requirements for our migration:

*   safety (no data loss, including if rollback)
*   minimal downtime (switchover and rollback)
*   minimal effort for the team

However, in practice we found these requirements were conflicting. A simple dump and restore of the database requires minimal effort, but involves hours of downtime. Rollback is fast (with data loss) or very slow (with downtime) if you want to preserve new data.

Our testing bore this out; dump and restore proved too slow and we did not consider the downtime, nor risk associated with slow recovery, acceptable.

An alternative approach is to synchronise the old (self-managed) and new (RDS) systems. This way, particularly if the sync is master-master, switchover and rollback are quick and testing becomes easy - simply flick the switch for a brief period. The cost of this approach is greater upfront effort and complexity.

Postgres comes with in-built [replication mechanisms](http://www.postgresql.org/docs/9.4/static/high-availability.html), but Amazon does not support these for security reasons. However, trigger-based replication is possible using third-party tools like Slony, Bucardo or Londiste. Out of these, [Bucardo](https://bucardo.org/wiki/Bucardo) proved the best fit for us: it was relatively straightforward to set up, and at least a few others in web-land had successfully used the tool to migrate onto RDS before.

Using Bucardo we were able to establish master-master replication. Switchover was controlled by feature switches. Something I’d strongly recommend is to create separate switches for reads and writes. This allows you to test both in isolation and delay switching over writes - where most of the risk is involved - until you are confident the new service is handling read load successfully. In the event, we switched over reads and writes multiple times during our testing for multiple apps before making the final switchover.

Note, however, that we avoided writing simultaneously to the same tables on both systems. Conflict-resolution is notoriously complex and it’s better to avoid the need if possible.

Using Bucardo to safely replicate data to RDS is non-trivial and I’ve included a fuller write-up of the process on my personal blog [here](http://room271.net/2015/08/26/migrating-to-rds-using-bucardo.html).

RDS - some disadvantages
------------------------

RDS is not all fun and games. There are at least a few disadvantages to be aware of:

**Cost**

RDS is about 40% more expensive on a hardware basis than EC2. EC2 itself is hardly the cheapest source of VMs.

The hope is that reduced time spent on maintenance, either directly or through opportunity costs, will more than counterbalance the cost of RDS, but this will depend on your circumstances. If you are cash-poor or, at the other extreme, incredibly large scale, RDS may not be the right choice.

**Difficult to import/export data**

As discussed, the typical replication mechanisms are not available.

This represents a form of lock-in and also undermines your ability to easily develop your service in the future. For example, switching to another provider. In my view, lack of control/flexibility is the biggest disadvantage of using RDS for Postgres.

In our case, we assumed the system would not be undergoing substantial feature development in the near future.

**No direct access to instances**

This makes it harder to debug performance issues and other problems.

To be fair, RDS does a pretty good job of [providing metrics](http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/rds-metricscollected.html)  
here, but depending on your needs this may not be adequate.

**Some operations are slooowww**

For example, we observed durations of 8-12 hours to change the storage type of a volume from regular SSD to PIOPS. This is a particular issue for us because we run our primary on regular SSDs to save on costs (multi-AZ means it costs double), and send read operations to higher-performing replicas (using PIOPS). This is a cost-effective solution but means spinning up replicas is very slow as they are initially created with the same storage as the primary - Amazon then convert these to PIOPS. Fortunately, we can still serve without PIOPS if we have to at the cost of a more varied latency profile (in plain English: a smallish proportion of requests will exceed our desired latency threshold).

**Cloudformation support is mixed**

It is possible to get your Cloudformation stack into a broken state in certain edge cases - for example, if you change the ID of an instance during an update. Once broken, fixing things is slow; you either need to recreate the stack or raise a support ticket and wait 5-7 working days for them to fix things for you.

It is also quite possible for stack updates to timeout. For example, changing the storage type of a volume can, as mentioned above, take a very long time. The ‘solution’ is to make changes manually and once complete update the Cloudformation to be in sync.

On the plus side, it is quite possible to declare your RDS setup in Cloudformation.

So it’s probably fair to say that, while RDS and Cloudformation mostly get along, there are edge cases that can cause you to lose time and effort if you aren’t aware of them.

**Amazon \*can\* fail**

This isn’t so much a negative as a reminder.

It is usually a safe assumption that a service hosted by one of the big cloud providers will provide better uptime than your own efforts. This doesn’t mean that they never fail though. There are [recent examples](https://aws.amazon.com/message/5467D2/) of significant AWS downtime in key services. At the Guardian we’ve experienced our own AWS failures.

RDS isn’t currently cross-region; failures will happen; it’s up to you to work out the cost of unavailability and whether you need to take additional measures to mitigate the risk here.

Wrapping up
-----------

On the whole, the migration has been a success up to this point. Switchover involved minimal downtime (minutes rather than tens of minutes), and we’ve gone from a repository of Postgres-related code and configuration, to single Cloudformation template describing our primary, replicas, and monitoring. It’s too early to say whether maintenance effort has reduced and availability remained high, but the signs are good!

Further reading
---------------

If you’re interested in finding out more, a list of links is provided below. Many people have written useful blog posts on this topic. A big thank you especially to [David Kerr](http://www.davidmkerr.com/) for blogging relentlessly on the topic, writing the wonderful [rdstune](https://bitbucket.org/davidkerr/rdstune) and putting up with my questions.

[http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.html](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.html) (all of the RDS docs really)

[http://justatheory.com/computers/databases/postgresql/bootstrap-bucardo-mulitmaster.html](http://justatheory.com/computers/databases/postgresql/bootstrap-bucardo-mulitmaster.html)

[http://www.slideshare.net/DavidKerr17/migrating-postgres-from-ec2-to-rds](http://www.slideshare.net/DavidKerr17/migrating-postgres-from-ec2-to-rds)

[https://www.compose.io/articles/using-bucardo-5-3-to-migrate-a-live-postgresql-database/](https://www.compose.io/articles/using-bucardo-5-3-to-migrate-a-live-postgresql-database/)
