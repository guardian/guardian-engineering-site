---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-jun-13-notes-on-releases-113-and-114'
headline: 'Notes on Releases 113 & 114'
date: '2011-06-13'
authors: [Gideon Goldberg]
standfirst: 'Gideon Goldberg provides an overview of the most recent changes to guardian.co.uk'
image:
  url: 'http://static.guim.co.uk/sys-images/Sport/Pix/pictures/2009/5/7/1241690468902/Warwickshires-Ian-Bell-fi-001.jpg'
  alt: 'Warwickshire''s Ian Bell fields in the slips against Yorkshire'
  credit: 'Photograph: Carl Recine/Action Images'
tags: [Computing]
---

We've been snowed-under here at Kings Place making changes to the site so we haven't been able to publish these notes as quickly as usual. So here's a combined round-up of the new features that have been added to the guardian.co.uk site and CMS over the last 2 fortnightly iterations.

API Pickable trailblock
-----------------------

Editors can now create a trailblock using any query available in our [Content API](http://explorer.content.guardianapis.com/). This will enable the creation of much more flexible trails based on multi-faceted queries. The initial use case is to trail content from any of our [Professional Networks](https://www.theguardian.com/guardian-professional). The existing editorial system was based on querying our database directly and wasn't able to do a query like this including content from multiple site sections.

This also offers the possibility going forward for any of the interesting queries available the API to be used in trails on guardian.co.uk for instance [http://content.guardianapis.com/search.json?tag=music/lady-gaga,-music/music](http://explorer.content.guardianapis.com/#/search?tag=music%2Flady-gaga%2C-music%2Fmusic&format=json) which shows content about Lady Gaga _outside_ of our Music section.

[Guardian 1821: Vintage edition](https://www.theguardian.com/guardian-1821)
---------------------------------------------------------------------------

A mirror of our network front with vintage styling, produced as part of our 190th anniversary celebrations. See the [accompanying blog post](https://www.theguardian.com/info/developer-blog/2011/may/27/guardian-1821-front-page).

MRSS video feeds
----------------

We have introduced MRSS feeds for selected video content, including MP4 videos in the feed. You can see examples on our [Science video RSS feed](https://www.theguardian.com/science/science+content/video/rss)

Delayed loading of ads
----------------------

As part of our ongoing effort to [improve front-end performance](https://www.theguardian.com/info/developer-blog/2011/feb/14/performance-and-tracking), we have rolled out a change across the site to delay the loading of ads until the core content has loaded.

Migration of cricket feeds
--------------------------

In a continuation of our sports feed migration, our cricket pages are now powered by OPTA. This is purely a backend migration to maintain continuity of service for pages such as our [cricket scoreboards](https://www.theguardian.com/sport/cricket/match/33209).

Other small fixes
-----------------

*   Fixed bugs where a minute-by-minute (liveblog) article became corrupt if a [byte order mark](http://en.wikipedia.org/wiki/Byte_order_mark) unicode character was used, or under certain circumstances where invalid HTML was entered.
*   Some users with legacy usernames of less than six characters were unable to post comments.
