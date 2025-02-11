---
layout: ../../layouts/blog.astro
slug: 'info-2021-jul-12-how-we-backfilled-the-guardians-in-house-analytics-tool-to-provide-greater-journalistic-insight'
headline: 'How we backfilled the Guardian’s in-house analytics tool to provide greater journalistic insight'
date: '2021-07-12'
authors: [Frederick O''Brien]
standfirst: 'The Guardian’s in-house content analytics tool, Ophan, has expanded from showing two weeks of data to two years. This post looks at one of the key changes that made it possible, from plumbing and CSV files to robust digestive systems'
image:
  url: 'https://media.guim.co.uk/0f975ab2ae58a214e8da80c06e2df661d27c5692/0_205_8790_5277/8790.jpg'
  alt: 'Binary code, ones and zeros in a 1970 dot matrix font on a computer screen.'
  credit: 'Photograph: Matt Anderson Photography/Getty Images'
tags: [Elasticsearch, Ophan]
---

Ophan is our analytic audience tool we built that lets journalists see how stories are performing. Its metrics include number of readers, where those readers are coming from, and attention time. Until recently Ophan’s time frame was the last two weeks, and now it is the last two years.

**What is the backfill?**

Ophan’s data is specially formatted and stored in [Elasticsearch](https://www.elastic.co/fr/elasticsearch/), an open-source distributed search and analytics engine.

Storing a lot of historical data in an Elasticsearch data store can be prohibitive from a storage cost perspective and inefficient from a performance perspective. Fortunately, Elasticsearch recently introduced a new [Rollup](https://www.elastic.co/guide/en/elasticsearch/reference/current/rollup-overview.html) feature, which makes it possible to diminish the size of data by reducing the granularity of old data.

This meant that in addition to two weeks of super granular real-time data, Ophan could add 54(!) weeks of ‘rolled up’ historical data:


   <figure>
   <img alt="Rollup grid - full" src="https://i.guim.co.uk/img/media/577e932cd0a5bf3766a27fb7f3d70fd4cb9ffb5b/133_0_1333_800/master/1333.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1b64e18c5b5d3f19f65140ebff0d9824" loading="lazy" />
   <figcaption>
     Rollup grid - full
    <i>Illustration: Fred O'Brien/The Guardian</i>
    </figcaption>
    </figure>

Two-weeks of super granular real-time data - what we already had - could stay in its own lane, but years of aggregated historical information could sit alongside it.

For historical data to be displayed, all those weeks needed to be filled, but because we have not done it before, they were empty:


   <figure>
   <img alt="Rollup grid - empty" src="https://i.guim.co.uk/img/media/a78ba5f04ab96afb08685425a417af7da010ea5d/133_0_1333_800/master/1333.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f9c1026e953a9531656ece9f83db5165" loading="lazy" />
   <figcaption>
     Rollup grid - empty
    <i>Illustration: Fred O'Brien/The Guardian</i>
    </figcaption>
    </figure>

To fill those two years of historical data, we could have started using that feature and collected data, but it would have taken us, you guessed it, two years:


   <figure>
   <img alt="Real time flowchart" src="https://i.guim.co.uk/img/media/31d0af3db8575ed1980ced4855967808c6afd35f/0_0_545_1941/master/545.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=a363346d00f28182e01ab2c068d3661b" loading="lazy" />
   <figcaption>
     Real time flowchart
    <i>Illustration: Fred O'Brien/The Guardian</i>
    </figcaption>
    </figure>

However Elasticsearch is not the only data store where we store page views data, we indeed send collected data to our generic data lake.

[Simone Smith](https://www.theguardian.com/profile/simone-smith), one of our software engineers, showed that we could extract this data from our warehouse and fed it directly into the historical index, by manually crafting some old data into the specific Elasticsearch rollup format.

**The backfill process**

At this point, this extraction process needed to be automated. As Ophan’s technical lead [Roberto Tyley](https://www.theguardian.com/profile/roberto-tyley) recalls the two-stage process:

*   1\. [Query our data lake](https://github.com/guardian/ophan-backfill-step-function/blob/main/src/main/resources/backfill-query.sql) to aggregate and extract pageview data to static files containing minimal data. This all took place in Google Cloud, with the files being stored in a Google Storage bucket.

*   2\. In AWS, run a long-running Step Function activity, streaming those files into memory, augmenting them with content metadata and finally uploading them to Elasticsearch in the special Elasticsearch Rollup format.

Step one is where aggregation happened. This was done using [BigQuery](https://cloud.google.com/bigquery) and ensured the amount of data being exported was as small as possible. The most feasible compact data format was CSV, which led to the introduction of the [kantan.csv](https://nrinaudo.github.io/kantan.csv/) library. This made reading and translating the format much simpler.

In step two, the contents of these files needed to be augmented before being fed into Elasticsearch. This took place in the ‘ingester’, which took CSV data and turned it into something Ophan-friendly.

Using the article path, the ingester found that missing data from the Content API. An internal cache ensured any given path only had to be looked up once.

The sheer volume of data involved meant a streaming API was needed. The ingester brought through bite-sized chunks that its memory could handle.

**Refining and monitoring**

Roberto pointed out that a key part of the reactive process was the concept of [‘back pressure’](https://medium.com/@jayphelps/backpressure-explained-the-flow-of-data-through-software-2350b3e77ce7) - when data comes in faster than it can be fed out. Although back pressure could have been handled manually, a library called [Monix](https://monix.io/) offered a way of responding to such imbalances in real time, ensuring the ingestion process didn’t get indigestion.

By regulating the flow of data - complete with restart instructions should the process hit a snag - the ingester could hum away at a reasonable, manageable, yet efficient pace.


   <figure>
   <img alt="Backfill flowchart" src="https://i.guim.co.uk/img/media/5d192c53aa6a66333af80e9853c0c44fcfe72a26/0_0_720_1462/master/720.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=875949f2c9d26076352768ee0b671039" loading="lazy" />
   <figcaption>
     Backfill flowchart
    <i>Illustration: Fred O'Brien/The Guardian</i>
    </figcaption>
    </figure>

The backfill itself only took a couple of weeks. One of the Ophan team software engineer, Paul Roberts, put together a ‘checkerboard’ monitoring its progress. As data completed its journey from the data lake to Elasticsearch, the squares - each representing a day - filled up and turned green. If the expected document count was out by one either way, the box would instead turn yellow.


   <figure>
   <img alt="Backfill progress checkerboard" src="https://i.guim.co.uk/img/media/71c1d7ef7292ef423effbbe4c1c45f330334a681/8_0_1584_951/master/1584.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3fcb64c2af85e276878a9239f7f9e03c" loading="lazy" />
   <figcaption>
     Backfill progress checkerboard
    <i>Photograph: Fred O'Brien/The Guardian</i>
    </figcaption>
    </figure>

**The advantage of time and other benefits**

The Ophan team was given the time and space it needed to do the backfill properly. It was understood that, while there was nothing to see for a while, all the work was still being done behind the scenes. Leigh-Anne Mathieson, a software engineer on the project, observed this was helped by the interest of stakeholders and their enthusiastic engagement in the inner mechanics of a product.

The backfill’s most immediate benefit was that historical data would have two years in the bank at launch. It also safeguarded the quality of information. Head of editorial innovation, [Chris Moran](https://twitter.com/chrismoranuk) understood the importance of maintaining data accuracy.

It also provides a useful recovery mechanism. Should the historical data be lost or needs reformatting, then it can be recovered. The backfill process also allows for much greater flexibility as a ready built infrastructure for future innovations.


   <figure>
   <img alt="Ophan dashboard" src="https://i.guim.co.uk/img/media/d0c7448577af85980a841b51c22f125f2bf91d3e/253_0_3066_1840/master/3066.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=8e0e108cbc7bfb540c29055118a3d419" loading="lazy" />
   <figcaption>
     Ophan dashboard
    <i>Photograph: Fred O'Brien/The Guardian</i>
    </figcaption>
    </figure>

Interest in baking skyrockets during pandemic lockdowns. Who knew?

This latest update is one of the biggest steps forward for Ophan since it was released to the newsroom - a collaborative effort from the engineering team that now allows our journalists to access more information than ever before.
