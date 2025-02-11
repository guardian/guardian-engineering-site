---
layout: ../../layouts/blog.astro
slug: 'info-2021-feb-04-how-technology-is-powering-covid-19-investigations'
headline: 'How technology is powering Covid-19 investigations'
date: '2021-02-04'
authors: [Joseph Smith, Michael Barton, Reetta Vaahtoranta]
standfirst: 'Guardian journalists and software engineers worked together to hold the UK government to account over its response to the pandemic'
image:
  url: 'https://media.guim.co.uk/6b822d70109334a71c21a24ab8d3d40bac2d0381/568_233_2998_2514/2998.jpg'
  alt: 'Scrutinising Covid contracts with TypeScript scrapers reading from Contracts Finder and Tenders Electronic Daily.'
  credit: 'Photograph: Joseph Smith/The Guardian'
tags: []
---

_This is the last in a series of three_ _blogposts_ _about the first year of the new Investigations & Reporting team, a small group of software developers embedded in the Guardian newsroom. You can read about our work on [environmental reporting here](https://www.theguardian.com/info/2021/jan/12/how-technology-is-powering-environmental-reporting) and [election coverage here](https://www.theguardian.com/info/2021/jan/19/how-technology-is-powering-election-coverage)._

In May 2020 the Guardian turned its attention to a new strand of reporting: the scrutiny of high value public sector contracts awarded without the usual competitive tender, justified by a [legislative clause](https://www.legislation.gov.uk/uksi/2015/102/regulation/32/made) that provides for direct awards in emergency circumstances. As the government responded to the Covid public health crisis, it had to compete in a market distorted by the pandemic and the choices it made under such pressure were beginning to raise questions. Now working from home, we began collaborating with the editorial investigations team to ascertain which companies were profiting most from the situation.

There were two relevant sources of public data. The first, [Contracts Finder](https://www.gov.uk/contracts-finder), is a gov.uk service publishing contracts over £10,000 but limited to England. The second, [Tenders Electronic Daily](https://ted.europa.eu/) (hereafter TED) is an EU service with a higher minimum threshold ([typically €139,000](https://simap.ted.europa.eu/european-public-procurement)) but covering the entire UK. For [the first story on this topic](https://www.theguardian.com/world/2020/may/15/firms-given-1bn-of-state-contracts-without-tender-in-covid-19-crisis), we made use of both. As with [previous](https://www.theguardian.com/info/2021/jan/19/how-technology-is-powering-election-coverage) [projects](https://www.theguardian.com/info/2021/jan/12/how-technology-is-powering-environmental-reporting) involving Facebook Ads, we wrote scripts that queried APIs and turned the data into spreadsheets. These spreadsheets allowed [Rob Evans](https://www.theguardian.com/profile/robevans) and [Juliette Garside](https://www.theguardian.com/profile/juliette-garside) to sort and group the data to identify a Top 10 ranking of the biggest winners from the state’s largesse under duress.

<figure>
              <iframe src="https://interactive.guim.co.uk/uploader/embed/2020/05/top_10_contracts/giv-3902G3sEDrrVnf1h/" width="100%" height="700px" allowfullscreen></iframe>
              <figcaption>Back in May 2020, these were the biggest recipients of contracts without tender. The list would look different now, though one of these companies still makes the cut.</figcaption>
            </figure>

Both the [Contracts Finder](https://www.contractsfinder.service.gov.uk/apidocumentation/home) and [TED](https://simap.ted.europa.eu/web/simap/developers-corner) APIs had their quirks. Of the two, Contracts Finder was the easier to use and better documented, but TED offered greater flexibility through its “[expert search](https://ted.europa.eu/TED/misc/helpPage.do?helpPageId=expertSearch)” and was more comprehensive, covering all of the UK. As big contracts continued to be awarded without tender to companies with [political connections](https://www.theguardian.com/politics/2020/jul/10/firm-with-links-to-gove-and-cummings-given-covid-19-contract-without-open-tender) or [dubious prior expertise in the field](https://www.theguardian.com/world/2020/aug/06/fifty-million-face-masks-bought-government-cannot-be-used-nhs), we decided to invest further work in our TED scraper. We rewrote the scraper to run daily as an AWS Fargate task and to talk directly to the Google Sheets API, creating a well-formatted spreadsheet of the day’s new Covid-related contracts without any repetitive manual steps like uploading a CSV file.


   <figure>
   <img alt="Fetching a daily snapshot of the most recent Covid-related snapshots from TED and writing to a Google Sheet via the Sheets API." src="https://i.guim.co.uk/img/media/dd6b01d0e98b9f56e60932c71b28c1e45369d2b1/0_0_3877_3800/master/3877.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d1bca64801373f3eb31ffd36f5f2e04e" loading="lazy" />
   <figcaption>
     Fetching a daily snapshot of the most recent Covid-related snapshots from TED and writing to a Google Sheet via the Sheets API.
    <i>Illustration: Joseph Smith</i>
    </figcaption>
    </figure>

As the months went by and [story after story](https://www.theguardian.com/world/series/covid-19-investigations) about Covid contracts was published, it became clear that there were two ways that technology was helping.

The first was generating leads. Getting a daily digest of the latest government contracts allowed us to be quick off the mark reporting on those of particular public interest. One success of this approach was [a story about Randox](https://www.theguardian.com/world/2020/nov/04/tory-linked-firm-involved-in-testing-failure-awarded-new-347m-covid-contract), where [Juliette Garside](https://www.theguardian.com/profile/juliette-garside) combined an alert from our spreadsheet with her knowledge of the political context and wrote up the story before any other news organisation had reported it.

The second was turning a lead into a story by verifying it and fleshing it out with relevant contextual data. One particularly good example of this was the [Uniserve story](https://www.theguardian.com/world/2020/dec/18/uk-logistics-firm-almost-800m-covid-contracts-without-tender-uniserve) – our TED scraper, Contracts Finder scraper, and [Giant](https://www.theguardian.com/membership/2019/sep/06/guardian-investigations-giant-tech-data) all came together to supply crucial facts for the article.

It’s worth diving a little deeper into how these tools all came into play for that story. First, Guardian journalists [David Conn](https://www.theguardian.com/profile/davidconn) and [Simon Goodley](https://www.theguardian.com/profile/simongoodley) wanted to look for contracts where Uniserve was mentioned as the courier, to confirm reports that Uniserve had been given responsibility for a significant proportion of PPE freight. For this, we turned to our little-used Contracts Finder scraper, because unlike TED, Contracts Finder often provides links to the full contract documents. Once we had given the scraper the [Puppeteer](https://pptr.dev/)\-powered capability to download contract documents, we uploaded them to [Giant](https://www.theguardian.com/membership/2019/sep/06/guardian-investigations-giant-tech-data), which was built to extract searchable text from a huge variety of document formats (including scanned documents needing OCR). Now we could search for “Uniserve” and confirm that many of the PPE contracts awarded to other companies did indeed mention them as a courier.

The next step was to find out the total value of Uniserve’s contracts and how that compared with other companies. For this, we wanted the UK-wide TED data. We used our script to create a Google Sheet of all Covid-related contracts since the start of the pandemic, added some [GOOGLEFINANCE()](https://support.google.com/docs/answer/3093281?hl=en-GB) magic to convert currencies to GBP, and created a [Pivot Table](https://support.google.com/docs/answer/1272900?hl=en&co=GENIE.Platform=Desktop) to add up awards for each company. Remarkably, Uniserve topped the list.


   <figure>
   <img alt="This article’s headline and standfirst came from our analysis of data from Tenders Electronic Daily." src="https://i.guim.co.uk/img/media/6374b9007561a2157e7e1d29ac0c45d156d669e6/0_0_1746_1048/master/1746.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f25afecee42e4020dee469ea9b2346ac" loading="lazy" />
   <figcaption>
     This article’s headline and standfirst came from our analysis of data from Tenders Electronic Daily.
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

The story behind this story demonstrates the interplay between journalists’ sources, public data APIs, homegrown and third-party tools, and the complementary skill sets of journalists and software engineers. But it was only one of many [such](https://www.theguardian.com/profile/joseph-smith) [stories](https://www.theguardian.com/profile/michael-barton) in 2020. Taken together, they show even more clearly what can be achieved when [the two cultures](https://en.wikipedia.org/wiki/The_Two_Cultures) coalesce to hold power to account.
