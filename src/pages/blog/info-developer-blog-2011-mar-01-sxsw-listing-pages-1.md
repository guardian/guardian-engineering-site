---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-mar-01-sxsw-listing-pages-1'
headline: 'Why we built our automated SXSW listings pages'
date: '2011-03-01'
authors: [Lisa van Gelder]
standfirst: 'How the Guardian''s automated music listings pages for the SXSW festival came about'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/3/1/1298971130533/friendly_fires_sxsw_page.jpg'
  alt: 'A Guardian SXSW listing page for Friendly Fires'
  credit: 'Photograph: guardian.co.uk'
tags: [Guardian Hacks SXSW, SXSW Interactive]
---

I'm going to the South by Southwest music festival this year and the listings on [sxsw.com](http://sxsw.com/) weren't that useful. Since our listing pages were built, sxsw.com has started to include videos and sample tracks for some of its artists, but when I first visited the site it all looked like this:


   <figure>
   <img alt="A listing on the official SXSW site" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/2/28/1298902597326/sxsw_site_listing.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=7251801bf1765c3347f83649995b255a" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

I don't know most of the bands who are playing, and the Guardian has no record of many of them. While some are established artists, there are many new artists that the Guardian hasn't written about yet. I wanted a way to build what was useful for me – a brief description of the artist, an idea of what type of music they play, sample tracks, sample videos.

How to build pages for artists the Guardian has never heard of ...
------------------------------------------------------------------

Linked Data
-----------

At the Guardian we were already thinking about how we might use [linked data](http://www.guardian.co.uk/help/insideguardian/2010/oct/18/linked-data-guardian-open-platform) to improve our existing music pages and had built some sample code proving it could be done. When the [GSxSW hack day](http://www.guardian.co.uk/technology/guardian-hacks-sxsw) came along I thought it would be fairly easy to repurpose some of that code to build fully automatic listing pages based on the SXSW data set.

The key to using linked data to build pages is that you need a universally understood identifier to ensure you are getting data for the correct entity. Luckily for music that already exists. [Musicbrainz](http://musicbrainz.org/) has generated ids for bands that are used by many websites and services such as [BBC](http://www.bbc.co.uk/music), [Last.fm](http://www.last.fm/) and [DBpedia](http://dbpedia.org).

Unfortunately I didn't have a list of Musicbrainz IDs. I had a list of artist names. So I started by scraping the SXSW music listing pages, giving me a set of bands who were playing and stored them in [Google Appengine](http://code.google.com/appengine/). Then I used the Musicbrainz.org API to get Musicbrainz IDs for the artists. Not all artists have Musicbrainz IDs. The ones that didn't don't have listing pages on the Guardian right now. Once I had the Musicbrainz ID I used the Last.fm API to find out more details about the artist - bio, most popular albums, most popular tracks, tags, related artists. Again, Last.fm didn't have details for all artists. If they had nothing at all, the artist didn't get an automatic page built. To pull in any articles the Guardian has on the artist, [Ivan Codesido](http://www.guardian.co.uk/profile/ivan-codesido) wrote a component that queries the [Guardian content API](http://explorer.content.guardianapis.com/#/?format=json) for artists with an external reference of that Musicbrainz ID. If you look at [Anna Calvi's](http://www.guardian.co.uk/music/sxsw/artist?mbid=462a9ce0-e1f3-4cbc-a21e-0998003d9386) page for example, there is a list of Guardian articles about her at the bottom.


   <figure>
   <img alt="Guardian content is included on Anna Calvi's SXSW listings page" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/3/1/1298971856741/anna_calvi_sxsx_page.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=c40d632f03734724c6e2d07af2d76c4d" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Not all artists we have written about are tagged with a Musicbrainz ID, that will improve as time goes on.

Search by artist name
---------------------

Ivan and I also wanted to pull in tracks and videos, and both YouTube and Soundcloud have APIs that make searching for artists easy. Unfortunately they do not allow search by Musicbrainz ID, so the data we get back from them is based on artist name. Ivan wrote a component that queries YouTube based on the band name and returns a set of videos. When the artist has a unique name or is well known, the YouTube component works brilliantly. For others the videos returned may not belong to the artist at all. The Soundcloud tracks are the same.

If no API exists, write it yourself
-----------------------------------

Gigs - Showcase times are starting to be listed on the SXSW site but they are not easy to scrape. sxsw.com has one line for each artist and gig pairing – if an artist plays three gigs they are listed three times on the same page (this also caused me to import duplicate artists by accident).


   <figure>
   <img alt="Duplicate entries for our SXSW pages in the back-end system" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/2/28/1298902881106/duplicate_entries.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=bcc034a294d5a11067a2170cc5b9324d" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

To make it more difficult, the information about each gig (time, venue) is on a different page which would mean making another separate web request for every artist. [Matt Andrews](http://www.guardian.co.uk/profile/matt-andrews) scraped the gig data and wrote an API that returned a list of gigs for a Musicbrainz ID. You can see the result in the top left corner of our listing pages.

_In the second part of this post later this week, I'll look at some of the problems caused by automatically generating pages on an editorial site such as guardian.co.uk, and what we did to solve them._
