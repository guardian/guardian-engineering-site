---
layout: ../../layouts/blog.astro
slug: 'info-2021-jan-19-how-technology-is-powering-election-coverage'
headline: 'How technology is powering election coverage'
date: '2021-01-19'
authors: [Michael Barton, Joseph Smith, Reetta Vaahtoranta]
standfirst: 'In the second of three articles, we look at the role of software engineers in analysing online political advertising during the 2019 UK General Election'
image:
  url: 'https://media.guim.co.uk/fdd9d52ef469c4f5bb16eb39788600754fb48d33/0_0_2561_1537/2561.jpg'
  alt: 'Facebook ads from the 2019 UK general election.'
  credit: 'Illustration: Guardian Design/Facebook'
tags: []
---

_This is part two of a series of three blogposts about the first year of the new Investigations & Reporting team, a small group of software developers embedded in the Guardian newsroom. Read about our work on [environmental reporting here](https://www.theguardian.com/info/2021/jan/12/how-technology-is-powering-environmental-reporting) and [Covid-19 investigations here](https://www.theguardian.com/info/2021/feb/04/how-technology-is-powering-covid-19-investigations)._

The 2019 UK general election campaign was a big test of our ability to work with journalists to an editorial deadline. We used all the knowledge and skills we had gained while [working on the Polluters Project](https://www.theguardian.com/info/2021/jan/12/how-technology-is-powering-environmental-reporting).

The Guardian’s editors decided that tracking digital campaigns would be a significant strand of our election coverage. We knew that all parties were likely to go into overdrive when it came to online advertising. To put a spotlight on the opaque nature of algorithms, we decided to show readers what political adverts other people were seeing on Facebook.

The software engineers in the investigations and reporting team were in a good position to help gather such data. Not only had we worked with the [Facebook Ad Library](https://www.facebook.com/ads/library/) before, but we were now sitting in the newsroom next to journalists, allowing us to collaborate daily. We teamed up with [David Pegg](https://www.theguardian.com/profile/david-pegg), [Pamela Duncan](https://www.theguardian.com/profile/pamela-duncan) and [Niamh McIntyre](https://www.theguardian.com/profile/niamh-mcintyre) to produce the [Election Digital Dashboard](https://www.theguardian.com/politics/series/the-digital-campaign) – a month-long series of articles covering, among other things, political advertising on Facebook.

The date for the election, 12 December, was approved by Parliament on 29 October, so we didn’t have much time to plan and write a lot of new software. We adapted our [Polluters Project scraper](https://www.theguardian.com/environment/2019/oct/10/fossil-fuel-firms-social-media-fightback-against-climate-action) to gather daily snapshots of what political ads were active on Facebook in the UK. We used deliberately broad search terms to gather as many ads as possible and we often saw multiple entries in the library with the same text: evidence, we believe, of A/B testing and targeting particular demographics or regions. To make this intelligible, we wrote [Node.js](https://nodejs.org/en/) scripts that deduplicated the ads by text and produced a daily CSV of unique active ads. This was then loaded into a Google Sheet for browsing, sorting, filtering and aggregating, making it easy for journalists to find, say, the [most frequently seen Labour ads](https://www.theguardian.com/politics/2019/nov/12/uk-election-parties-winning-online-war-ads-cash-votes-digital-dashboard).


   <figure>
   <img alt="Diagram of running a daily Fargate task in AWS to fetch and de-duplicate Facebook ads." src="https://i.guim.co.uk/img/media/54679cbfc0423565da01bc28a2b3c8c64f4e4574/0_0_4606_3787/master/4606.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=660b0c2644bfd539b991c04d46204911" loading="lazy" />
   <figcaption>
     Running a daily Fargate task in AWS to fetch and de-duplicate Facebook ads.
    <i>Illustration: Joseph Smith</i>
    </figcaption>
    </figure>

Even then, the limitations of the data provided by Facebook hampered certain lines of inquiry. Particularly frustrating was the absence of useful regional targeting data. This was after all the election where the conservatives would “take the north”, so constituency-level analysis would have been fascinating. Facebook’s advertisers have postcode-level control over where their ads get targeted, but the granularity in the company’s “advertising transparency” service went no further than England, Scotland, Wales and Northern Ireland.

As we got closer to publication each week, the pressure to double and triple check our findings grew and our CSV-producing scripts became a source of bugs, especially as we attempted more complex analysis of the data. So [Joseph Smith](https://www.theguardian.com/profile/joseph-smith), drawing on his experience with the Guardian’s reader revenue team, put our data into [Athena](https://aws.amazon.com/athena/), an AWS service that runs SQL queries against files in [S3](https://aws.amazon.com/free/storage/s3/). By simply storing the JSON responses from Facebook’s API in S3 and defining a schema for them, the effect of many lines of procedural TypeScript code could be replicated by a single declarative SQL query. Using Athena’s [CREATE TABLE AS SELECT (CTAS) functionality](https://docs.aws.amazon.com/athena/latest/ug/ctas.html), we could easily store the de-duplicated ads produced by this query in S3 with a table schema over the top, avoiding the need to recompute on the fly.


   <figure>
   <img alt="Diagram showing use of Athena to produce our report of unique ads with SQL instead of TypeScript." src="https://i.guim.co.uk/img/media/faa49649fd3665cf212b728a25957a8817ced938/0_0_4606_4162/master/4606.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2aebf287c8e7d30731b6017e0810accb" loading="lazy" />
   <figcaption>
     With Athena we could produce our report of unique ads with SQL instead of TypeScript.
    <i>Illustration: Joseph Smith</i>
    </figcaption>
    </figure>

Within a few days we had switched our analysis over to our brand new data lake. It was more reliable, the results easier to trace back, and it provided a flexibility that was later key to pitching more complex stories. Articles delving into the [demographics that each party was targeting](https://www.theguardian.com/politics/2019/dec/03/digital-election-what-demographics-are-the-parties-targeting) were backed by [Jupyter notebooks](https://github.com/guardian/investigations-platform/blob/master/loch-data/notebooks/%5Bfb-ad-library%5D%20Major%20UK%20party%20demographics%20by%20impressions.ipynb) explaining our working, all powered from this lake.

Throughout this process we had been collaborating with editorial, talking to them about the ideas they had for stories and working out the best way of supplying them with the data they needed. As the weeks went by, we became more confident at noticing interesting trends and making suggestions. For instance, using Athena in this way allowed us to easily ask questions in SQL such as “which ads were seen only by one gender?” This led to the [newsworthy](https://www.theguardian.com/politics/2019/dec/12/how-parties-used-facebook-instagram-and-google-ads) discovery of contrasting conservative messages to male and female users. An advert seen only by female users read “we’re recruiting 20,000 more police and giving them the powers they need to keep you safe”, while male-targeted ads claimed post-Brexit Britain would be the best place to “start a business” and promised a conservative victory would “unleash the potential of all our towns, cities and villages”.


   <figure>
   <img alt="Two Conservative Facebook ads, one seen only by women (left) and the other only by men (right)." src="https://i.guim.co.uk/img/media/c8b3143a1aff552be8c1eaaf0dc515b060ec78db/0_15_5430_3259/master/5430.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=538a751da41cde67c836db4a90c9a2d6" loading="lazy" />
   <figcaption>
     Two Conservative Facebook ads, one seen only by women (left) and the other only by men (right).
    <i>Composite: Facebook</i>
    </figcaption>
    </figure>

On election day, we noticed an increase in conservative adverts where the text had been copied from older adverts but the constituency name had been changed. We realised they had focused their ad spend on certain constituencies, leaving some with barely any. Some of these constituencies were marginal or traditionally blue, suggesting the party was either confident of victory or had considered the constituency lost. With help from data projects editor, [Caelainn Barr](https://www.theguardian.com/profile/caelainn-barr), we tidied up this research and shared the story with the news desk. For the next hour, it sat at the top of the [election day live blog](https://www.theguardian.com/politics/live/2019/dec/12/general-election-2019-uk-polling-day-live-news?page=with:block-5df25cad8f08b5e670042ba0#block-5df25cad8f08b5e670042ba0).


   <figure>
   <img alt="Michael Barton and Caelainn Barr’s election ads analysis makes it to the top of the Guardian front page." src="https://i.guim.co.uk/img/media/12cecb58ebec0556b59589b9a7dcca6ff28c8565/0_0_1956_922/master/1956.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=768b9cccbe422b4e7ecb95f9e7b58de7" loading="lazy" />
   <figcaption>
     Michael Barton and Caelainn Barr’s election ads analysis makes it to the top of the Guardian front page.
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

This project was proof that developers in the newsroom could make an impact. Many of the challenges we faced did not fit neatly into the realm of traditional software development. For example, the imprecise impressions and spending data provided by the Ad Library API challenged our confidence in our findings and we were grateful for the patient help of the data projects team when validating our analysis. During the process we’d formed close working relationships with journalists, and these relationships proved essential to the [success of future projects](https://www.theguardian.com/info/2021/feb/04/how-technology-is-powering-covid-19-investigations).
