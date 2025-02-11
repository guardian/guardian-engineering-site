---
layout: ../../layouts/blog.astro
slug: 'info-2023-aug-16-serverless-postgres-at-the-guardian'
headline: 'Aurora Serverless – a migration story'
date: '2023-08-16'
authors: [Philip McMahon]
standfirst: 'On our team we swapped databases 6 times in a year. We’ve landed on Aurora Serverless V2 – was it worth it?'
image:
  url: 'https://media.guim.co.uk/1bf5f3913840dcb51cb5dd5622d3068771411efc/0_158_5472_3283/5472.jpg'
  alt: 'A mix of dark and light clouds in the sky on a day of sunshine and showers. Seasonal weather, Rotherfield Greys, Oxfordshire, UK - 10 May 2023'
  credit: 'Photograph: Geoffrey Swaine/Shutterstock'
tags: [AWS]
---

Since our [migration from Mongo to Postgres in 2018](https://www.theguardian.com/info/2018/nov/30/bye-bye-mongo-hello-postgres), at the Guardian the search for the perfect database hasn’t stopped. In the last year on the Investigations and Reporting team we’ve spent a lot of time trying out AWS’s Serverless relational databases. We hope that by sharing our learnings we’ll help others avoid the pitfalls we hit along the way.

Application characteristics
---------------------------

The database in question is for a tool called ‘Lurch’. Lurch assembles different public data sources into a single search engine. These data sources vary in size (0.5 to 8GB) and how frequently they’re published (from daily to monthly).

Unfortunately, unlike [many](https://github.com/guardian/grid) [Guardian](https://github.com/guardian/typerighter) [projects](https://github.com/guardian/giant), Lurch is currently closed source, so I’m can’t link directly to PRs in this post.

The tool is only accessible to Guardian staff, with a small number of very active users, typically using it within UK working hours.

The whole point of this application is to provide journalists with quick answers to queries that would otherwise have been too time consuming to answer. With that in mind, good read performance is important.The most commonly used databases at the Guardian are Elasticsearch, Postgres and DynamoDB.

Probably any of these databases would have done the job. We thought Postgres was a good fit because the structure of the data we ingest is very predictable and we need to perform queries across multiple datasets (so lots of JOINs). Existing Postgres expertise on the team was also a consideration.

The tool links lots of different data sources together, so while we considered using a graph database, the data coming out of Lurch is often destined for a journalists’ spreadsheet, so we found it helpful to think about data in terms of tables.

Most of the challenges discussed in this post are to do with high write volume. On the read side we’ve been making use of the full text search functionality in Postgres (edge ngrams, tsquery/tsvector) and have been very happy with it. Any slowness in search queries has always been traced back to a missing index rather than a lack of resources on the database instance.

Application Architecture
------------------------

This is what Lurch looks like:


   <figure>
   <img alt="Architecture diagram of Lurch showing ingest microservices, Postgres database and lurch web application" src="https://i.guim.co.uk/img/media/aaae4cc46a008f2623a564b8e2dbea024f675b0a/0_0_1599_469/master/1599.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f807cf2064bcad5836bcb527e7687a0e" loading="lazy" />
   <figcaption>
     Architecture diagram of Lurch application
    <i>Illustration: Philip McMahon</i>
    </figcaption>
    </figure>

Database 1 – RDS Postgres
-------------------------

At $57/month, a db.t3.medium RDS Postgres instance seemed like a good starting point. So we set up an initial app with our first dataset (1.5 million rows).

The problems began when we started trying to ingest the full archive of historical public data – over 100 million rows, and over 100GB of data.

The T series of RDS instances are called ‘burstable’ instances. The main characteristic of these instances is that you don’t rent the entire CPU, just a fraction of it. The instance size we were using – db.t3.medium includes 20% of the CPU. Any time the instance uses less than 20% it ‘earns’ CPU credits, which are then spent whenever the CPU usage goes above 20%. This works well for applications which have inconsistent usage – for example with ‘spikes’ of usage at certain times of day.

A burstable instance seemed like a perfect fit for Lurch – particularly given that at this point we didn’t have any actual users. Our assumption was that whenever we weren’t ingesting data we’d be earning CPU credits, which we could then spend to complete the ingest jobs.

There’s a limit on the number of credits a burstable instance can earn – equal to the number of credits earned over a 24-hour period. A t3.medium database instance with its ‘maximum’ number of burst credits banked is able to use 100% of the CPU for four hours and 48 minutes.

Unfortunately, our ingest job was large enough that we burned through all of our burst credits. We decided that, at least while we were getting this large amount of historical data into Lurch, we should move to a different instance type. When downtime isn’t a concern, vertical scaling in RDS is easy. We moved to a db.m6g.large, increasing our monthly costs from $57 to $128. The M series of AWS instances provides 100% of the CPU so we no longer had to worry about burst credits.

IOPS Constraints
----------------

With two whole CPUs at our disposal, we kicked off our ingestion task again, only to run into another resource problem – this time related to read/write disk operations.

Amazon RDS has various payment models for a database reading/writing to disk. These derive from the instance storage type. The default in 2021 was gp2, where a DB would receive 3 IOPS for every GB of storage, with a minimum of 100 IOPS.

There’s a much better explanation of how gp2 storage works [here](https://aws.amazon.com/blogs/database/understanding-burst-vs-baseline-performance-with-amazon-rds-and-gp2/)**,** but I’ll do my best to summarise. Our database started with just 20GB of allocated storage(there’s a lot of duplication in the original public data). This equates to 20 x 3 = 60 IOPS, so we had the minimum 100 IOPS.

With 100 IOPS we can read/write 100 times a second, right? Wrong! gp2 storage is also ‘burstable’ – every IOP that isn’t used gets ‘banked’ as I/O credits up to a maximum of 5.4 million – or enough to perform 3,000 IOPS for 30 minutes.

In theory, this model was perfect for Lurch. We could use the burst capacity during our ingest jobs and store up credits the rest of the time. However, as with the CPU issues discussed above, our initial ingest job took a lot longer than 30 minutes. It would slow to a crawl once we’d burned through our I/O credits and had to make do with the baseline of 100 IOPS.

There were two options available to us: allocate more storage or switch to ‘provisioned IOPS storage’. We did both – first bumping to 100GB of storage, then when that wasn’t enough, moving to provisioned IOPS.

Provisioned IOPS storage (io1) is not cheap – [$0.11/IOPS/month](https://aws.amazon.com/rds/postgresql/pricing/?pg=pr&loc=3) – so for 1,000 IOPS (the minimum you can provision) we were looking at an extra $110/month – almost as much as the cost of the instance itself. We only needed to run this big ingest job once though. Once that was complete, we switched back to using the cheaper gp2 storage.

_Note – there is a new storage type – gp3 – now available in RDS. See [here](https://aws.amazon.com/about-aws/whats-new/2022/11/amazon-rds-general-purpose-gp3-storage-volumes/) for the details. The headline is it’s 20% cheaper and provides a much higher baseline number of IOPS._

All was well … until we started adding more datasets to Lurch – some of them updated daily rather than monthly. We found we were burning through our IOPs regularly during an ingest, resulting in the job failing or taking too long to complete.

Heading north
-------------


   <figure>
   <img alt="Aurora borealis Visible From North Coast Of Scotland" src="https://i.guim.co.uk/img/media/248244af7d5ac1f4ad81f031e02f42da4e6dbfa6/0_233_3499_2100/master/3499.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=b80a1d4dc88e3c2f86b01f8e40558bf6" loading="lazy" />
   <figcaption>
     The aurora borealis – not to be confused with a pile of VMs somewhere in eu-west-1.
    <i>Photograph: Peter Summers/Getty Images</i>
    </figcaption>
    </figure>

At this point, we started looking at Aurora. Aurora is a Postgres-compatible database engine re-engineered by AWS. Aurora uses distributed storage with a different payment model. Rather than provisioning or having burstable IOPs, you simply [pay per GB of data stored and per DB read/write operation](https://aws.amazon.com/rds/aurora/pricing/?pg=pr&loc=1).

We’d initially disregarded Aurora because at the time we were using the [Postgres S3 extension](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.S3Import.html) to import data directly from S3 into our database. We really wanted that new storage model though, so we decided to experiment with Aurora.

Migrating from Postgres RDS to Aurora Postgres RDS wasn’t as easy as we hoped. None of Amazon’s snapshot/restore tools worked so we used pg\_dump and pg\_restore to copy our data across. Running on an Aurora Postgres db.t4g.large instance ($112/month), our ingest jobs started running reliably again.

This was quite a win – for roughly the same price we now had a database that served our needs. We could have stopped there and got on with delivering value for our users, but unfortunately after all the migration work we’d forgotten how to write application code. So, time for another migration.

Make it more serverless!
------------------------

What we hoped would be the final step of this database journey was a migration to Aurora Serverless V1. Where Aurora makes storage and disk I/O fully scalable, Aurora Serverless makes compute and memory scalable as well. The model sounded perfect for a product such as Lurch – allowing us to have a powerful DB during ingestion, then scale right down the rest of the time. Aurora Serverless V1 has an ‘auto pause’ feature where it will switch off completely if no database queries are made for a set period of time – which we assumed would mean paying $0 for our database instance when the UK was asleep. Quite the saving.

The migration to Aurora Serverless V1 wasn’t fun. We ran into a whole host of issues. Our DB was using Postgres 13 while the max version of Aurora Serverless V1 was 10, so we had to rewrite some of our table definitions and queries to work with Postgres 10.

Furthermore, our dream of having a ‘free’ database when we weren’t using it didn’t come true, as the ‘scale up’ time of Aurora Serverless was more than 10 seconds – far too long for a journalist to wait to use our service. So we had to provision 2 ACUs (the minimum) permanently in production, and put up with the slow startup on our dev environment.

Finally, we ran into an undocumented constraint of Aurora Serverless V1 that took a lot of debugging time to resolve. I’m eternally grateful to the author of [this comment](https://www.jeremydaly.com/aurora-serverless-the-good-the-bad-and-the-scalable/#div-comment-18810), for explaining that Aurora Serverless V1 doesn’t actually have a completely scalable disk. Somewhere there’s a server with a set amount of disk space that is proportional to the number of ACUs you allocate to the database. As the DB can’t scale during a transaction, we ended up adding code to scale up the DB before running any ingestions.

Despite all these issues, we did run Aurora Serverless V1 for just under a year, while we waited for AWS to release cloudformation for their even _more_ serverless database – Aurora Serverless V2!

Aurora Serverless V2 – happily ever after?
------------------------------------------

Aurora Serverless V2 dealt with all of the issues above. It supports recent Postgres versions and (for our purposes) scales _almost_ seamlessly without having to be warned in advance that something is about to happen.

AWS dropped the ‘auto pause’ functionality for V2 so we do have to pay for 0.5 ACUs constantly on our production and dev clusters. This has the upside of delivering much better cold start performance. The only issue we have now is that if we perform a very expensive query from a cold start (0.5 ACUs), it will often take longer than 30s (the max timeout of API Gateway which we’re using for our backend). Repeating the same query a few seconds later once the DB has a chance to scale results in a much faster response.

The migration once again involved pg\_dump and pg\_restore – commands which we ran from our bastion host to speed things along. What made setting up Aurora V2 more challenging was the [lack of support](https://github.com/aws/aws-cdk/issues/20197) for it in CDK Level 2 constructs – only [added in May 2023](https://github.com/aws/aws-cdk/pull/25437). We worked around it by using the Level 1 CfnDBCluster construct but will now need to rewrite it using the nice new Level 2 constructs.

We’re spending roughly $220/month for storage and compute for the database. For the same price we could have rented a db.m7g.xlarge (16GB RAM, 4 vCPUs) Postgres instance along with 100GB of EBS storage or a db.r7g.large (16GB RAM, 2 vCPUs) Aurora instance. I suspect both of these options would have done the job for us, and maybe not have suffered from the same cold start problems as our serverless database, but after 3 migrations, it’s probably time to get back to doing some feature work!

Below is a table outlining how our monthly baseline database costs have changed – unfortunately I’ve had to include it as an image, for a responsive version see [here](https://gist.github.com/philmcmahon/25bc821e34dd34a2335079e2a75145d4).


   <figure>
   <img alt="Costs table for different stages of aurora serverless migration" src="https://i.guim.co.uk/img/media/f4875ba032f28d6d46fca79ad84d43baa2e96231/0_0_1942_520/master/1942.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=a8d990ca76931951919ec70e8fa1a213" loading="lazy" />
   <figcaption>
     Costs table for the different stages of aurora serverless migration
    <i>Illustration: Philip McMahon/The Guardian</i>
    </figcaption>
    </figure>

The end
-------

Aurora Serverless V2 solved almost all of our performance problems and we’re happy enough with it to keep using the platform for the foreseeable future. It’s great being able to assume that, if we suffer a performance problem, it’s probably our dodgy SQL rather than under-provisioned hardware.

It’s not clear whether we’ve saved any money, despite our application characteristics being near perfect for a serverless database. Our recommendation would be to use aurora serverless only when you actually _need_ to scale quickly - not purely as a cost cutting exercise.

The other key lesson in this process was not to adopt an AWS service that already has a ‘V2’ in active development - a clear sign something went wrong with V1!

_You can read more about the work of the Digital Investigations and Reporting team in a [previous series of blog posts](https://www.theguardian.com/info/2021/jan/12/how-technology-is-powering-environmental-reporting)_
