---
layout: ../../layouts/blog.astro
slug: 'technology-developer-blog-2011-may-24-internet-explorer-computing'
headline: 'So long, IE6, it''s the end of testing times'
date: '2011-05-24'
authors: [Sally Goble]
standfirst: 'Sally Goble on the balancing act of testing our website in different browers'
image:
  url: 'http://static.guim.co.uk/sys-images/Business/Pix/cartoon/2011/5/24/1306229543690/internet-explorer-7-Dean--007.jpg'
  alt: 'internet explorer 7 Dean Hachamovitch'
  credit: 'Photograph: Elaine Thompson/AP'
tags: [Computing, Firefox, Internet, Internet Explorer, Testing]
---

Every time the Guardian website is updated (which happens, whether you notice it or not, every two weeks) the quality assurance/testing team spend around two days browsing the soon-to-be-made-live version of the website to see if anything has broken stylistically or functionally.

The testing team maintain a dynamic list of more than 75 urls, which represent as many different types of pages and content types as time allows us to check.

These 75 urls are then in turn tested in most standard browsers – currently Firefox 3.6.x, [Internet Explorer](https://www.theguardian.com/technology/internet-explorer) 8, 7 and 6, Chrome 11.x and Safari 4.x or 5.x. The list of browsers we test are dictated by collating users' browser data from our tracking software (Omniture). However, resources are finite and we can't support everything all of the time so we have to keep an eye on when browsers are in the ascendancy and when they are in decline. Monitoring the stats allows us to do this.

New for old
-----------

We don't necessarily have the resources to test all recently released browsers such as [Internet Explorer 9](http://www.beautyoftheweb.com/) or [Firefox 4](http://www.mozilla.com/en-GB/firefox/) or even development versions of browsers such as [Internet Explorer 10](http://ie.microsoft.com/testdrive/).

It really doesn't make much sense to devote resources to testing new browsers until the uptake of those browsers reaches critical numbers – we can debate what these "numbers" mean in some other post – so we are keeping an eye on our site stats in Omniture. Pragmatically, there seems little point in developing for, or testing in, newly released browsers whose features may change radically in the weeks and months following a public release (whether those features change in response to bug fixes or enhancement requests).

At the same time as keeping an eye on user uptake of Internet Explorer 9 and Firefox 4, we have been having continuing discussions about officially phasing out first-line support for Internet Explorer 6. Our site statistics show that use of IE6 has slipped in a year from about 15% of our users to about 3%. This percentage is falling month after month. Microsoft itself recently launched its official [IE6 Countdown site](http://www.theie6countdown.com/default.aspx) and now we are comfortable saying that we will only offer second-line support for IE6 as a browser.

So what does that mean? It means that we will no longer regression test or browser test our 75 pages in IE6; rather we will only respond to support questions and requests from users who contact us with issues. We'll be reactive rather than proactive for IE6.

When we do investigate support issues reported by users, we won't spend time fixing design issues, and we will only fix issues raised around functionality if we consider them critical and if the fixes don't introduce more risk to the rest of the site.

In making a decision to phase out first-line support for IE6, we free more resources to explore greater support for more modern browsers and technologies supported by these browsers; to spend our time developing new stuff that will enhance the experience of the whole site for many users.

In the future we aim to keep you posted, on this blog, as to which browsers we think our site is best viewed in – and of course we'd suggest to users of guardian.co.uk that it's good to keep your browser more or less up to date, if you can, in order to benefit from the best functionality that the Guardian site has to offer.
