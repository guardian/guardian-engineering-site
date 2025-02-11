---
layout: ../../layouts/blog.astro
slug: 'info-2021-feb-23-how-technology-unlocked-the-secretive-power-of-queens-consent'
headline: 'How technology unlocked the secretive power of ‘Queen’s consent’'
date: '2021-02-23'
authors: [Michael Barton]
standfirst: 'How Guardian developers used web scraping to investigate the secretive parliamentary procedure'
image:
  url: 'https://media.guim.co.uk/cb3e6cc442f24ac1120a03913c965ebac111285d/0_0_4000_2400/4000.jpg'
  alt: 'Illustration of the Queen in front of some computers to accompany the Engineering Blog post about Queen’s Consent'
  credit: 'Illustration: Guardian Design'
tags: []
---

Is the royal family always impartial when it comes to the formation of UK law, or could they be influencing legislation in matters that affect their interests? For months Guardian journalists [David Pegg](https://www.theguardian.com/profile/david-pegg) and [Rob Evans](https://www.theguardian.com/profile/robevans) submerged themselves in the [National Archives](https://www.nationalarchives.gov.uk/), sourcing information on the archaic convention known as [Queen’s consent](https://www.theguardian.com/uk-news/2021/feb/08/royals-vetted-more-than-1000-laws-via-queens-consent).

Previously seen as a formality, Queen’s consent occurs when parliament asks for permission to debate bills that could affect the interests of the crown. This consent is recorded in [Hansard](https://hansard.parliament.uk/) with phrases such as “_Queen’s consent signified_”. Through painstaking work, David and Rob had compiled a list of parliamentary records that contained that term. Their question to us developers was: how could we use digital means to find out if their list was complete?

The [Hansard website](https://hansard.parliament.uk/) is an archive of UK parliamentary debates. Searching it is straightforward and quick. It even looks nice, like the best government websites. It was reliable and stable, even in the face of what we were about to put it through. You simply type in your search term and it shows you the transcript where that phrase was said.

Documents containing “_Queen’s consent signified_” and “_Prince of Wales’s consent signified_” were easy to find. Other cases were trickier, with phrases such as “_we_ _have it in command from_” the Queen or Prince Charles that they have “_consented to place_” their prerogative or interests so far as they are “_affected_ _by the_ _Bill_” at the disposal of the house. An eager assistant, the Hansard website allows “_AND_” between search terms, so we could combine phrases and see only those results that contain them all in the same reading.

These searches gave us back 4,684 results, spread over more than 150 web pages each showing 30 results.

I understood why David and Rob had come to us: the work of cleaning up these results manually would be tedious and error-prone.

It was time to fire up one of the most useful tools in a [news nerd’s](https://twitter.com/newsnerdrepos) arsenal: the web scraper.

Have you ever right-clicked on a webpage and pressed the “View Page Source” button? You’ll see the HTML building blocks: the mark-up incantations used to build the page on your screen. The HTML focuses on presentation: what colour that text should be, how big that image should be, and so on. [Web scraping](https://en.wikipedia.org/wiki/Web_scraping) is the art of transforming this semi-structured soup back into the structured data that produced it – in this case, who was speaking in which chamber at what time, and what did they say.

In the Investigations & Reporting team, working with journalists, this often means [putting the results in a spreadsheet](https://www.theguardian.com/info/2021/feb/04/how-technology-is-powering-covid-19-investigations).

There are lots of web scraping tools. During the [2019 UK election campaign](https://www.theguardian.com/info/2021/jan/19/how-technology-is-powering-election-coverage), data journalist [Pamela Duncan](https://www.theguardian.com/profile/pamela-duncan) had taught us about [webscraper.io](https://webscraper.io/). It runs as a browser extension and lets you point and click to build up the data you need from the webpage. You can see the JSON definition of our Queen’s consent scraper [here](https://gist.github.com/mbarton/b52d6be7ef5ad0551bfb460169331902). As software developers, we were comfortable coding up web scrapers with libraries such as [Puppeteer](https://pptr.dev/), but this was a perfect opportunity to learn something else. We build effective tools by learning from those that are already available.


   <figure>
   <img alt="Screenshot of webscraper.io being used to extract data from Hansard" src="https://i.guim.co.uk/img/media/d36741dbd772ad11b5ad4f02398702ab1ec14244/0_92_2066_1240/master/2066.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=10b28023aaf54cd7643df61887e81c93" loading="lazy" />
   <figcaption>
     Screenshot of webscraper.io being used to extract data from Hansard.
    <i>Photograph: Guardian Developer</i>
    </figcaption>
    </figure>

Click “Export as CSV” and you’re in business! Practically every time anyone had uttered those phrases in parliament was now in a spreadsheet.

But we weren’t done. David and Rob wanted to know how many bills had been subject to this procedure, which meant deduplication. 4,684 results did not mean 4,684 bills because the same bill could appear multiple times and in both chambers. For each entry in our raw data, we needed to group them by the bill title, date and which chamber (Commons or Lords).

For this process we turned to [Athena](https://aws.amazon.com/athena). Much like the Hansard website, it’s a simple but powerful piece of software. We use it to get the precise and reproducible analysis of SQL without having to worry about maintaining our own database servers.

To be comprehensive, we scraped each search term individually and then deduplicated it all with a query. You can see the queries we used [here](https://gist.github.com/mbarton/fe1375f58cd43f73866b5670fe89dd27).


   <figure>
   <img alt="Screenshot of some of the SQL code used to analyse usage of Queen’s Consent" src="https://i.guim.co.uk/img/media/b12159dd3a704bd20bdc581f719111a25588f696/0_0_2433_1460/master/2433.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=590d1a409e034b439f561080f22f5019" loading="lazy" />
   <figcaption>
     Screenshot of some of the SQL code used to analyse usage of Queen’s Consent.
    <i>Photograph: Guardian Developer</i>
    </figcaption>
    </figure>

From those results, Rob and David delved back into the data. We had reduced the data enough that they could spot check every entry, allowing us to fix typos and triple-check our working. We even found some more bills that we’d missed the first time around. We used source control to keep, review and collaborate on our queries for each project and get as many eyes as possible on our spot checks and data quality discussions. This process got us to the headline figure of [1,062 parliamentary bills that have been subjected to Queen’s consent](https://www.theguardian.com/uk-news/2021/feb/08/royals-vetted-more-than-1000-laws-via-queens-consent) during Elizabeth’s reign.

The work showed us what developers were able to achieve by being involved early in an editorial project. Sure, we automated away the boring stuff. But we’d also given David and Rob a batchful of fresh leads and given the story a nice kick. We’re only just starting to scratch the surface of how developers can help reporting.

A couple of days later, our colleague Colin King excitedly showed us his new spreadsheet of App Store ratings for Guardian apps. Inspired by our use of [webscraper.io](http://webscraper.io), he’d built his own scraper to keep track of things. We learn daily in this team that when we make time for ad-hoc collaborations between developers and others from across the Guardian, our reporting wins and the business wins.

_If you’d like to read more about the work of the Investigations & Reporting team, check out our blog posts on [environmental reporting](https://www.theguardian.com/info/2021/jan/12/how-technology-is-powering-environmental-reporting), [election coverage](https://www.theguardian.com/info/2021/jan/19/how-technology-is-powering-election-coverage), and [Covid-19 investigations](https://www.theguardian.com/info/2021/feb/04/how-technology-is-powering-covid-19-investigations)._
