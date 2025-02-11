---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2017-mar-06-empowering-our-editorial-teams-to-impact-page-performance'
headline: 'Empowering our editorial teams to impact page performance'
date: '2017-03-06'
authors: [Michael-McNamara]
standfirst: 'Monitoring and alerting on page weight to enable content producers to have an impact on page performance.'
image:
  url: 'https://media.guim.co.uk/2900671a981c3314496455da53073af969cbe94a/420_0_1208_1510/1208.jpg'
  alt: 'Atlas - making your online world lighter'
  credit: 'Photograph: Timothy A. Clary/AFP/Getty Images'
tags: []
---

A lot has been written recently about the relation between page performance and user engagement. [DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) have shown that more than 53% of mobile users will leave a page if it takes more than 3 seconds to load. In addition the average size of a webpage is increasing, with the latest figures from [whatdoesmysitecost.com](https://whatdoesmysitecost.com/) showing an average page weight of just under 2.5 MB. [Google Accelerated Mobile Pages](https://www.ampproject.org/) and [Facebook Instant articles](https://www.facebook.com/business/news/improving-mobile-site-performance) have both arisen as an attempt to respond to these issues within their respective ecosystems. Tests on Guardian content confirm that there is a significant relation between page size and time taken for a page to load. This shows that if you can manage your page size, then it becomes easier to manage your performance, and thus prevent performance-related loss of engagement.

Normal practice for monitoring page performance is to select a small number of test pages and measure them regularly using a tool like [SpeedCurve](https://www.webpagetest.org/) to look for variations. This standard approach is effective for monitoring changes in the codebase, but only for those selected pages.

The Guardian generates hundreds of pages of content per day. These pages can have any number of rich-media embeds, and there are over 38 different types of embed encountered regularly on our pages. A page can range from being text-only to having a large number of embeds: I once counted 21 video embeds on a single page. As such, page size, cost and performance can vary wildly even if the code handling the pages remains unchanged.

As well as monitoring the impact that code changes might have on page weight, we were becoming increasingly concerned about the effect that large numbers of embeds were having on page performance. We needed a way to detect when pages were becoming too big, and then to alert our editorial teams to take action to reduce them by removing or substituting the embeds.

To meet this challenge we developed an Editorial Page Weight Performance Monitoring Tool - which we redubbed Atlas, as EPWPMT is really awkward to say.

Atlas follows a simple process every hour:

*   Get a list of recently published pages from our content api
*   Run the pages through a private webpagetest instance for both desktop and mobile views
*   Alert on any pages that are detected as being too large or slow
*   Present the results in a format that is useful to editorial teams, with helpful guidance on what action to take to reduce page-size for any offending pages

Because Atlas is designed to help content producers and editorial teams, the results it displays are kept simple. As usability was key, Atlas was iterated in close consultation with representatives of those teams. Users are alerted by email. They then have the ability to expand the results for pages that have been alerted on, and see a list of page-elements sorted by size. Page elements that are standard to every page, such as fonts and other resources are not shown. This helps users to identify what embeds on a page are causing size issues without drowning them in non-relevant information.

The tool is focused on the experience of a user when first landing on the page, so lazy loaded elements are not considered. To eliminate noise, the page is tested without ads. This ensures any performance issues flagged are caused by content and within the power of the users to remedy.


   <figure>
   <img alt="page weight dashboard" src="https://i.guim.co.uk/img/media/04abb3ec517a1f17b987c77bafd5d8afa2c5129c/0_0_1744_793/master/1744.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=26da964be7badf2d72f66f4903ba30f6" loading="lazy" />
   <figcaption>
     A dashboard showing the expanded information for an alerting page. A table shows a list of non-standard resources requested by the page, sorted by size. These enable editorial staff to track down sources of bloat and fix them.
    <i>Photograph: Michael McNamara/The Guardian</i>
    </figcaption>
    </figure>

Page performance is a complicated thing. If you get ten developers in a room to discuss what should be measured, you will get 11 different answers. After a period of trial and error, we settled on the following measurements:

**Metrics for page weight:**

WebPageTest defines “fully loaded” as the point at which there has been 2 seconds of no network activity. I have used “bytes-at-page-fully-loaded” as my metric for page weight, over other available options, as it captures most activity triggered by javascript after the main page loads.

**Metrics for page speed:**

Whilst initially only focusing on articles and liveblogs, the teams who create our interactive-journalism pages and the teams that manage our branded content pages have also requested a version of the alert tool for their content. This was basically the same tool, but because these teams had a larger number of developers, the results were modified to also alert if page load metrics exceeded a given threshold. The alerts for these teams also contain more technical information and a link to the webpage test result from which the data originated. Because the focus of the tool is on user experience at time of page load, the performance metrics selected to alert against were time to first paint and speed index.

Time to First Paint - correlates closely to when one of our pages becomes scrollable. On mobiles - especially for content that is largely text - it was decided that this would be a strong indicator of when a page feels ready. This is partially down to the way our pages are put together and may not follow onto other sites.

Speed Index - is an attempt to estimate how long it takes a page to appear loaded above the fold (i.e. the part of the page that is visible before scrolling). A detailed definition can be found [here](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index). It is a good fit for how long it takes a standard page on our site to appear loaded above the fold.

The main purpose of Atlas is to be an alerting tool. Possibly the hardest part of this whole exercise was trying to determine what performance thresholds should trigger an alert. To determine what size pages to alert on, and to confirm that there really was some correlation with page size and performance, I ran the webpagetest on a large sample of pages and compared the speed index and page size.


   <figure>
   <img alt="speed index plotted against page weight for a sample of 5000 article pages" src="https://i.guim.co.uk/img/media/12c5f98da9df8930666c8ec6392aee7361819343/0_7_969_581/master/969.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=07988c7af4ed941e319ae1aadb472ed7" loading="lazy" />
   <figcaption>
     Speed index plotted against page weight for a sample of 5000 article pages
    <i>Photograph: Michael McNamara/The Guardian</i>
    </figcaption>
    </figure>

Charting these samples, results showed a steady, if shallow climb on the mean speed index value, with a much more significant - although less linear climb on the max speed index values.

Using these charts and working over time with the editorial teams, we settled on a page weight threshold of 4MB for desktop article pages and 3MB for mobile article pages.

The key factors in setting these thresholds were ensuring that the page was heavy enough to be a significant problem to our users, and that the recipient of the alert would be able to make a difference to that page size. The worst case scenario would be that the alert was being triggered too often for trivial size differences resulting in “[alert-fatigue](https://en.wikipedia.org/wiki/Alarm_fatigue)”. By setting the alerts at a heavier weight than the ideal size, Atlas minimises the number of false alarms and maximises the chance that an alert will result in some kind of action.


   <figure>
   <img alt="An example of a page weight alert emailed to editorial staff. These staff members can then direct action to reduce the size of the page." src="https://i.guim.co.uk/img/media/7b3fb2f079c847c244c2a50a372d958f5acf42e1/0_0_878_264/master/878.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=20b2e9f4f3e1dce604360c55a075c102" loading="lazy" />
   <figcaption>
     An example of a page weight alert emailed to editorial staff. These staff members can then direct action to reduce the size of the page.
    <i>Photograph: Michael McNamara/The Guardian</i>
    </figcaption>
    </figure>

The tool has had significant impact. In terms of direct performance improvements, sixty percent of the pages alerted since the tool was implemented had performance problems resolved by editorial action. This has been by one or more of the following: correcting the method used to embed the offending item; using a different format - e.g. using YouTube instead of Vimeo embeds; or in the case of images, making smaller crops available for mobile pages.

In addition to this there have been unforseen benefits from the tool. More useful from a long term perspective, it has been possible to identify types of embeds that persistently generate performance problems, and target them for improvement. By changing our handling of these media types, we have been able to make systematic changes that can prevent performance problems on future pages that use these embeds.

A prime example of this in action are the pages in the “[Gifs that keep on giving](https://www.theguardian.com/sport/series/the-gifs-that-keep-giving)” series. These pages contain a large number of gifs that have been converted to video format. The conversion of gif to video format was a laborious process undertaken by the contributor to minimise the impact that content has on the page-weight. The idea being that the user would only play the embeds they wish to see.

Despite these efforts, page-weight alerts were being triggered on every item published in this series, showing that best efforts were having no effect on the page-weight. The investigation showed that all the videos embedded on these pages were downloading in full as part of the initial page load, leading to pages with weights of up to 24 MB. With help from the video-dev team, they were able to make some trivial changes to the html used to embed these videos, and stop them preloading. This trivial change to the embed process dropped the page weight on these pages from 24MB down to 1MB. Since these changes were adopted, there have been no performance alerts from this series.

What follows is a list of lessons learned during the course of this project. Some of these are things that went well for us and hope to repeat in the future. Others are lessons we wish we had learned sooner:

**Be clear about what you want to do but be open about how to achieve it**

You should have a very clear idea about the problem you are trying to solve, but then be very willing to collaborate with other people to find the best way to achieve that. The tools you create are better if you make them in collaboration with the people who are going to use them, so get their input as early as possible.

**Anything you send out to users should result in an action**

It was important to focus on prompting the users and giving them a frictionless path to action, rather than passively displaying information on a monitoring dashboard and leaving them to interpret it themselves. To paraphrase one of the editorial team members “I don’t want another page I have to constantly check”.

**Keep the information simple**

The target audience for Atlas was very busy and potentially non-technical. Consequently the tool was made effective by only showing information they needed to see - i.e. only the pages that were too heavy, and only the items that might be the cause. This enabled the user to stay focused on the task at hand.

**Think about how you can measure impact from the very start**

At a certain point in a project, you will either need to scale up your product or kill it and move on. Questions that are often asked at this point include: “What are the desired results of your product?”, “How to measure your impact?”, and “What are the costs of your product?” Answering those questions will often require the recording of information that isn’t needed for the development, or day-to-day running of the tool. It is much harder to go back and deduce this information after-the-fact than it is to just record it as you go.
