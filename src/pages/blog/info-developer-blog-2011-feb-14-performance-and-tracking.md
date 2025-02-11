---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-feb-14-performance-and-tracking'
headline: 'Balancing front-end performance with tracking'
date: '2011-02-14'
authors: [Grant Klopper, Kwame Luke]
standfirst: 'Grant Klopper and Kwame Luke on a recent small performance improvement'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2011/2/14/1297696661707/racehorse-007.jpg'
  alt: 'racehorse'
  credit: 'Photograph: Vassil Donev/EPA'
tags: []
---

When visiting a web page such as an article on guardian.co.uk, you can basically divide the page up into two parts. The core piece of information that you have come to see (in this case the article) and the things that support that article such as adverts and links to similar pages.

Among those things which support the content are things that happen on a page that are invisible to the person visiting the page – for example, we register every page that is visited and those statistics are very important to us. They lets us know what "works" on the site, what type of content is popular, how much time people spend reading it and much more. These statistics are one of the measures used to determine how successful a website is and they are [audited and published](http://www.guardian.co.uk/media/abce).

One of the really important things that influences the perceived performance of your website is how quickly the core piece of content that someone wants to read is visible to them. They do not really care how long it takes the advert at the bottom of the page to load; they do, however, really care when they are staring at a blank page while in the background all sorts of things are happening (things that they do not care about even if we do).

Until recently, the mechanism that allows us to track information about visits to guardian.co.uk was included as one of the first things that happened while the web page was being loaded into your web browser, breaking the rule of loading the content you want to read first and then loading supporting things afterwards. A couple of years ago (forever in computing terms) this seemed like the obvious thing to do to ensure that we got our "page hits" no matter what.

As part ongoing improvements to the performance of our site we have now moved this code to the bottom of our page (since early December 2010). It is now one of the last things that loads instead of one of the first.

Today this seems like the obvious thing to do, we count your page view after we have shown you the page, not before. This (very slightly) improves the performance of our web pages in your browser, and also ensures that whenever possible we only count page views once the content of the page has completely loaded. This in turn gives us more robust data that we can publish with confidence.

One of the important things we did to mitigate any risks was to set up the reporting so that we could move it from the top to the bottom of the page (and back again) at the flick of a switch. This allowed us to run trials that proved that we were not "breaking" our page view statistics. From the trials, the impact on our reported page views was minimal (less than 2% reduction) even allowing for the cyclical nature of the news.

This is just a step on a journey. We realise there are still more things we can do to improve the perceived performance of our site and make visiting guardian.co.uk a little bit better each time.
