---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-mar-03-sxsw-listing-pages-2'
headline: 'Why we built our automated SXSW listings pages - Part two'
date: '2011-03-03'
authors: [Lisa van Gelder]
standfirst: 'How the Guardian''s automated music listings pages for the SXSW festival came about'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/3/1/1298971856741/anna_calvi_sxsx_page.jpg'
  alt: 'Guardian content is included on Anna Calvi''s SXSW listings page'
  credit: 'Photograph: guardian.co.uk'
tags: [Guardian Hacks SXSW, Last.fm, SXSW Interactive]
---

Earlier this week I posted about [how we built our automated SXSW music listings pages](http://www.guardian.co.uk/info/developer-blog/2011/mar/01/sxsw-listing-pages-1). Generating automatic pages on an editorial site such as guardian.co.uk has some risks associated it, and this is how we coped with them

Problems with user generated content
------------------------------------

I wanted to list artists by genre as well as by name and the Last.fm api helpfully returns the tags users have given the artists. The problem with user-generated content however is that it can be quite random. As anybody on Last.fm can tag artists with whatever they want, you end up with artists tagged with meaningless things like ["bands i need to check out"](http://www.last.fm/tag/bands%20i%20need%20to%20check%20out) or the bizzarre ["bands that would eat children if only they could fit a whole one inside their mouths"](http://www.last.fm/tag/bands%20that%20would%20eat%20children%20if%20only%20they%20could%20fit%20a%20whole%20one%20inside%20their%20mouths) After the import process we were left with hundreds of tags, of which only some were useful to us. [Stephen Abbott](http://www.guardian.co.uk/profile/stephenabbott) spent quite a while deleting tags from our content and making sure they all made sense.

The robot
---------


   <figure>
   <img alt="The robot and disclaimer on our SXSW pages" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/2/28/1298902780071/sxsw_robot.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=dd8e07243fa8ebe951668d688ef41f78" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

With more than 1,800 pages and more being added daily, keeping up with all the band pages and making sure the data on them is accurate is an impossible task. So we decided not to try. Instead we added a little robot icon – designed by [Mariana Santos](http://www.guardian.co.uk/profile/mariana-santos) – and a disclaimer at the top of the page.

Admin pages
-----------

For obvious reasons, the Guardian would not launch automatic pages unless we had a quick way of taking them down when necessary. You can't see them, but there are some admin screens where editors can remove any artist and any tag from the site, and also turn off the YouTube and Soundcloud components for an individual artist if they return inaccurate results. They can also choose which artists to feature on [the a-z listing pages](http://www.guardian.co.uk/music/sxsw/listing/index?letter=a).

Under the hood
--------------

Although the pages look like Guardian content, I used the Guardian's  
[microapp framework](http://www.guardian.co.uk/open-platform/what-is-the-microapp-framework) to build the pages and all the data is hosted on an external app. The core of the app is data stored in [Google appengine](http://code.google.com/appengine/), a platform that makes it very easy to get apps hosted and up and running. When the app encounters an artist name or Musicbrainz ID that it has no record of, it adds a set of tasks to the taskqueue to collect data from [Musicbrainz](http://musicbrainz.org/), [Last.fm](http://www.last.fm/), [Soundcloud](http://soundcloud.com/), [Amazon](http://www.amazon.co.uk/) and [our gig  
API](http://www.guardian.co.uk/info/developer-blog/2011/mar/01/sxsw-listing-pages-1#gig_api).

Artist details are stored in appengine's datastore using [Siena](http://www.sienaproject.com/), a simple orm library. Each artist page is built by querying the datastore for records associated with the artist (gigs, albums, tracks etc). The results of the queries are then stored in [memcache](http://code.google.com/appengine/docs/java/memcache/) for a few minutes, to prevent high traffic causing too many concurrent queries to the datastore. Appengine makes it easy to create recurring tasks that run on a schedule. Our listing pages check the sxsw website daily to ensure we have the most up-to-date listings.
