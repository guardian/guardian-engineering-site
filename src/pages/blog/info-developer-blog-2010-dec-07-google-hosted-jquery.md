---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2010-dec-07-google-hosted-jquery'
headline: 'Switching to Google-hosted jQuery'
date: '2010-12-16'
authors: [Matt Andrews]
standfirst: 'A brief summary of guardian.co.uk''s recent changes to its Javascript framework'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2010/12/16/1292512460039/Tin-cans-006.jpg'
  alt: 'Tin cans'
  credit: 'Photograph: adrian brockwell / Alamy/Alamy'
tags: [Google, X]
---

Like thousands of other sites, the Guardian uses [the excellent jQuery framework](http://www.jquery.com) to power our javascript. Previously, our jQuery build was stored internally in our R2 platform, along with the other script files we use (Twitter feed refreshers, page analytics, image carousels and article comment counts, to name just a few). In release 102 of our R2 software, we've replaced this with [Google's hosted version of the library](http://code.google.com/apis/libraries/devguide.html#jquery) – you can read about other changes in the release over at [Martin's blog entry](http://www.guardian.co.uk/info/developer-blog/2010/dec/03/1).

This has a number of (admittedly small) risks, but also a range of benefits: the file has a stronger chance of being cached on the user's end as other sites reference Google's copy, and since Google use a worldwide [CDN](http://en.wikipedia.org/wiki/Content_delivery_network), our overseas users can actually download the file from a closer server than guardian.co.uk can offer them. Obviously there's the chance that Google might go down or become otherwise unreachable, but we're fairly confident that this happens so infrequently that the benefits outweigh the risks.

Just in case everything does fall apart over at Mountain View, though, we've put in a failsafe – browsers will fall back to our own internal copy of jQuery if Google's version doesn't load. We're pretty confident though – [Twitter](http://www.twitter.com) uses the same file on their main homepage, and software development site [Stack Overflow](http://www.stackoverflow.com) uses it exclusively. Hopefully by using it on guardian.co.uk we'll help increase the number of web users with a cached copy of jQuery on their systems.
