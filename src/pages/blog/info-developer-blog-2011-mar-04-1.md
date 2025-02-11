---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-mar-04-1'
headline: 'Notes on Release 107'
date: '2011-03-04'
authors: [Martin Hearn]
standfirst: 'Martin Hearn provides an overview of the most recent changes to guardian.co.uk'
image:
  url: 'http://static.guim.co.uk/sys-images/Books/Pix/pictures/2008/01/04/reader460.jpg'
  alt: 'A child reading'
  credit: 'Photograph: Christopher Thomond'
tags: [Books]
---

Here's an overview of the latest updates to the site.

New Children's Books section
----------------------------

This release included work that enabled us to launch our new [Children's Books](https://www.theguardian.com/books/childrens-books) section. Several new components were built for this page, including a labelled Editable component and an Age Range Selector component.

The front page also includes some book review carousels that retrieve data directly from our [Open Platform API](http://www.guardian.co.uk/open-platform) based on children's age tags.

Our main carousel component was built entirely in-house. We looked at a variety of third-party options, including [jCarousel](http://sorgalla.com/jcarousel/) and [jCarouselLite](http://www.gmarwaha.com/jquery/jcarousellite/) but felt on reflection, these plugins either did too much or not enough for what we required, and so we decided to build the functionality from scratch.


   <figure>
   <img alt="Guardian Children's books" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/3/3/1299156430502/Screen_shot_2011-03-03_at_12.46.38.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=11e65f5af6c9ed16f861cda75b3e644c" loading="lazy" />
   <figcaption>
     New Children's Books front page
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Lead content in the API
-----------------------

An update to our API has been released. The notes for the API go out separately to the Guardian API Talk group. To join the group click [here](https://groups.google.com/forum/?hl=en&pli=1#!forum/guardian-api-talk)

Javascript Loading Performance
------------------------------

We've been testing deferred loading of non-essential javascript in specific areas of the site in order to improve the page rendering speed of the site.

Bug fixes and enhancements
--------------------------

*   Fixed a bug where articles were being sorted on publication rather than web-publication date on roundup pages
