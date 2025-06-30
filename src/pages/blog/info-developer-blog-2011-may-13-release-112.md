---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-may-13-release-112'
headline: 'Notes on Release 112'
date: '2011-05-13'
authors: [Gwyn Lockett]
standfirst: 'Gwyn Lockett provides an overview of the most recent changes to guardian.co.uk'
image:
  url: 'http://static.guim.co.uk/sys-images/Media/Pix/pictures/2011/5/11/1305125843129/Ballot-box-007.jpg'
  alt: 'Ballot box'
  credit: 'Photograph: Rui Vieira/PA'
tags: []
---

With the excitement of the elections and the AV referendum we deployed some micro-app code last week and then Release 112 of the core system this week. Here's what went out...

PA feed for election & AV referendum
------------------------------------

We developed the mechanism to poll the Press Association (PA) feed by FTP to get the latest election data on 5 and 6 May and store it in the micro-app cache for use by front-end components such as the Flash interactive.

Tag mappings
------------

New mappings between Guardian tags and external references (eg  
Musicbrainz IDs) were taking up to a week to show up in the API. The reason is that they were only being index when the full set of tags was indexed on a Tuesday morning. We have now changed the mapping manager to "touch" the last live time of the tag when a mapping is added, changed or deleted so that it is caught in the next partial index. These mappings should now appear in the API after a couple of minutes.

Stop redirecting comment pages to the mobile site
-------------------------------------------------

There are no comments on the mobile site, so comment pages will no longer be redirected to the mobile site.

Image on print pages
--------------------

A new addition is the ability for our production staff to add an image/logo (that can link to a website) to the top right corner of the print-format pages on guardian.co.uk with the image appearing on screen and on the printer version.

Other small changes and fixes around the site
---------------------------------------------

*   A third ad slot has been added to some key pages
*   New look and feel to the sign-in process for some of our products
