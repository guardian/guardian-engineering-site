---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-mar-24-release-109'
headline: 'Notes on Release 109'
date: '2011-03-24'
authors: [Martyn Inglis, Gideon Goldberg]
standfirst: 'Martyn Inglis and Gideon Goldberg provide an overview of the most recent changes to guardian.co.uk'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2008/07/29/460pass.jpg'
  alt: 'A thriving market in British passports'
  credit: 'Photograph: Martin Argles/Guardian'
tags: []
---

Here's an overview of some of the changes that have been happening on guardian.co.uk over the last fortnight.

Identity
--------

We have made two quite major changes this week to our sign-in and registration system (known internally as identity). These changes should not be visible to our users but they allow for some improved functionality in the coming weeks and months.

Our identity system is powered by an internal [API](http://en.wikipedia.org/wiki/Application_programming_interface). This allows us to build all our internal systems from a consistent and extensible base. Currently this API is providing a view of our old database, but as we move towards creating a new database, powered by [mongo](http://www.mongodb.org/) we have made a change to the responses our API provides. This change required us to make registration unavailable for a short period during the update. However we will be introducing [versioning](http://stackoverflow.com/questions/389169/best-practices-for-api-versioning) in the near future so that we will be able to do substantial updates with no down time.

The second change is also internal. We are gradually moving all site functionality that requires registration into our new identity system. The next item on our list is [clippings](http://www.guardian.co.uk/community-faqs#417). It is not complete yet as it requires an update to our commenting system, but we are now able to process a request for clipping correctly through our identity system. Once discussion has been updated we will retire another piece of our old registration system.

Comments off by default in tools
--------------------------------

Previously our CMS turned on comments by default for certain types of content such as Comment is Free articles and blog posts. However, we have now set the default to Off for all new articles. By making editors always have to choose to turn on comments we will reduce the risk of inadvertently turning on comments where they might be editorially or legally inappropriate such as on our [Children's Books site](https://www.theguardian.com/childrens-books-site).

Migration of sports feeds
-------------------------

Our Sports feeds provider ESA was recently [acquired by Opta](http://www.optasports.com/about/news/esa-acquisition-strengthens-opta%27s-product-set.html). We are in the process of migrating away from ESA's feeds, which are being discontinued, in favour of those provided by Opta. This means we are busy re-writing backend code in order to provide continuity of service for popular content driven by these feeds such as our [football match pages](https://www.theguardian.com/football/matches).

Other small bug fixes
---------------------

*   Fixed a bug where timestamps on our minute-by-minutes/Liveblogs were laying out incorrectly in IE7.
