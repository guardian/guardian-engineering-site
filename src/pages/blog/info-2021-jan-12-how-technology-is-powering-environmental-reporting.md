---
layout: ../../layouts/blog.astro
slug: 'info-2021-jan-12-how-technology-is-powering-environmental-reporting'
headline: 'How technology is powering environmental reporting'
date: '2021-01-12'
authors: [Michael Barton, Joseph Smith, Reetta Vaahtoranta]
standfirst: 'In the first of three articles, we look at how Guardian software engineers teamed up with the newsroom to investigate climate lobbying online'
image:
  url: 'https://media.guim.co.uk/c970c836c5d67eb988d561f866a585bb11e9263b/0_0_1372_823/1372.jpg'
  alt: 'Fossil fuel firms’ social media fightback against climate action'
  credit: 'Illustration: Guardian article'
tags: []
---

_This is part one of a series of three blogposts about the first year of the new Investigations & Reporting team, a small group of software developers embedded in the Guardian newsroom. Read about our work on [election coverage here](https://www.theguardian.com/info/2021/jan/19/how-technology-is-powering-election-coverage) and [Covid-19 investigations here](https://www.theguardian.com/info/2021/feb/04/how-technology-is-powering-covid-19-investigations)._

In the summer of 2019, the Guardian assembled a team of engineers to work alongside reporters to build tools to help them discover new stories. We were tasked with finding opportunities to collaborate closely with our editorial colleagues.

Such collaborations are not new at the Guardian. Our editorial tools team builds software for writing and publishing journalism, and our data journalism and visuals teams write bespoke code for individual stories. And our team wasn’t starting from scratch – we already had [Giant, the Guardian’s in house tool for securely searching and browsing data relevant to complex investigations](https://www.theguardian.com/membership/2019/sep/06/guardian-investigations-giant-tech-data). But we believed much more could be done at the news-gathering stage of the journalistic process. We needed to work alongside editorial staff to better understand the technical challenges of the newsroom.

An opportunity quickly presented itself. In October, the Guardian was preparing a [landmark series](https://www.theguardian.com/environment/series/the-polluters) focusing on the fossil fuel industry, and the structures behind it, which are driving the climate emergency. We were put in touch with environment correspondent [Sandra Laville](https://www.theguardian.com/profile/sandralaville), who was looking into supposedly grassroots organisations that were in reality funded by fossil fuel companies. Sandra wanted to know if online advertising by these groups had affected the passage of environmental legislation.

Sandra and fellow Guardian reporter [David Pegg](https://www.theguardian.com/profile/david-pegg) were interested not just in what adverts had been run but at what scale: how many people they had reached, in what areas, and how much the groups had spent.


   <figure>
   <img alt="A screenshot of Facebook’s Ad Library." src="https://i.guim.co.uk/img/media/afba8901e4b46f59bcb64a4421f738253d1c1b59/166_0_1188_713/master/1188.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=912cb68a134d9f777844d47a42e5c597" loading="lazy" />
   <figcaption>
     Facebook’s Ad Library.
    <i>Illustration: Facebook</i>
    </figcaption>
    </figure>

Facebook provides a [basic user interface to their Ad Library](https://www.facebook.com/ads/library).

But this UI didn’t let us filter or summarise the data in ways that would make the salient bits stand out. For instance, individual ads have information against them such as funding body, impressions, spending, demographic and regional targeting; but back in 2019, shortly after its launch, the UI did not allow you to sort, filter or aggregate by these categories. (Some but not all of this functionality has since been added by Facebook). If we pulled the data directly from the [Ad Library’s API](https://www.facebook.com/ads/library/api), we could fill in this missing functionality with our own tools.

We quickly wrote a scraper that queried the API for a set of search terms and stored the results. Sandra and David needed the data presented in a way that would allow them to scan for leads, so we modified our scraper to convert the JSON data to CSV and manually uploaded it to Google Sheets.


   <figure>
   <img alt="Diagram of turning Facebook ads into a spreadsheet via a script running an engineer’s laptop." src="https://i.guim.co.uk/img/media/af30e5197cbed5fd968088d2e979d8dffb7a5b5b/0_0_4662_2818/master/4662.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4d4736cadd29f6da03ccf7d67519e893" loading="lazy" />
   <figcaption>
     Turning Facebook ads into a spreadsheet via a script running an engineer’s laptop.
    <i>Illustration: Joseph Smith</i>
    </figcaption>
    </figure>

However, spreadsheets are not always ideal. For this project, we wanted to cast the net as wide as possible by querying Facebook’s API for very generic terms such as “fracking” and “jobs” and then rapidly filtering within this large set of results. Spreadsheets are not the best way to experiment with different filters on huge datasets. Instead, we turned to software very familiar to us as developers – the [ELK stack](https://www.elastic.co/what-is/elk-stack). Elasticsearch sits at the heart of our audience analytics tool, [Ophan](https://medium.com/@GuardianComms/behind-the-scenes-ophan-how-the-guardian-democratised-data-36cde3967062), and developers at the Guardian use Logstash and Kibana every day to interrogate our application logs.

With ELK we could quickly try different filters of the Ad Library data, then create visualisations from them. This allowed us to have rapid-fire sessions with reporters to try out ideas and identify leads. We were looking for examples not only of big spending or big impressions but also of adverts that we could confidently tie back to particular issues or organisations.


   <figure>
   <img alt="Diagram of uploading Facebook ads to Elasticsearch and browsing them with Kibana." src="https://i.guim.co.uk/img/media/2d83b6d2356def97fb6995b4a23d7364a422ccbc/0_0_4462_4875/master/4462.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f921cffb9c395af6724feb6a7e8b0b6c" loading="lazy" />
   <figcaption>
     Uploading Facebook ads to Elasticsearch and browsing them with Kibana.
    <i>Illustration: Joseph Smith</i>
    </figcaption>
    </figure>

We ended up focusing on two pieces of defeated legislation: [Proposition 112](https://ballotpedia.org/Colorado_Proposition_112,_Minimum_Distance_Requirements_for_New_Oil,_Gas,_and_Fracking_Projects_Initiative_\(2018\)), which aimed to set minimum distances between oil and gas projects and other buildings in Colorado, and [Measure G-18](https://ballotpedia.org/San_Luis_Obispo_County,_California,_Measure_G-18,_Petroleum_Extraction_and_Well_Stimulation_Regulation_Initiative_\(November_2018\)), which would have banned fracking in San Luis Obispo county California.

There were nuances to the data. The Guardian’s data projects team helped us avoid some pitfalls, particularly when it came to aggregations of spending and impressions, both of which Facebook provides in ranges rather than in exact values. For the [final story](https://www.theguardian.com/environment/2019/oct/10/fossil-fuel-firms-social-media-fightback-against-climate-action) we were able to use the combination of the lower bound and total count of adverts to put specific numbers on adverts placed by organisations such as “Protect Colorado” and “No on Measure G”, where funding for those organisations was traced back to large fossil fuel companies.

It was exhilarating to be building software, although simple, at the pace of the newsroom and to meet tight publishing deadlines. We had proved that we could help on a live project. As it turned out, we soon took what we had learned and applied it to one of the biggest editorial projects, the UK general election, which we will cover in [our next engineering blog](https://www.theguardian.com/info/2021/jan/19/how-technology-is-powering-election-coverage).
