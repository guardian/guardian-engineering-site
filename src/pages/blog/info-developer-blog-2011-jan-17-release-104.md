---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-jan-17-release-104'
headline: 'Notes on Release 104'
date: '2011-01-17'
authors: [Gideon Goldberg]
standfirst: 'The last drops of ice have melted away following our Christmas code freeze and we are sufficiently recovered from the festivities to bring you the latest round of updates and fixes to the site'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2011/1/17/1295270941577/Footprints-007.jpg'
  alt: 'Footprints'
  credit: 'Photograph: Tim Wimborne/Reuters'
tags: [Computing, Internet]
---

Here's a rundown of the latest site updates and bug fixes that have made it into our first post-Christmas release.

Override navigation bar at page level
-------------------------------------

You will be familiar with the "crumbtrail" navigation bar which appears on every page on the site, allowing users to easily retrace their steps and navigate up and down the site hierarchy, or orientate themselves if they've arrived via a search engine. Normally we generate the crumbtrail automatically when an article is published based on the [tags](http://www.guardian.co.uk/info/developer-blog/2011/jan/10/tags-are-magic-1) used, which dictate what section the content belongs in.

However, we have now made it much easier for editors to override the crumbtrail navigation on any page to provide contextual navigation on that topic. You can see this feature in action on our [Data](https://www.theguardian.com/data/) site.


   <figure>
   <img alt="data site crumbtrail" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/1/12/1294847553109/datablog.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=6ef9db4f8ad0e83bc8b1a69131c52973" loading="lazy" />
   <figcaption>
     The crumbtrail navigation on the Data site
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

While this was possible before, it was taking up a large amount of editorial time to create these as it was a fiddly manual process, so we've now made it a one-click job from our CMS.

Other bug fixes and enhancements
--------------------------------

*   Podcast feeds used by iTunes and the like will now always show up to 15 items (subject to availability). Previously, a bug caused some items to be missing from our [Short stories podcast feed](https://www.theguardian.com/books/series/short-stories-podcast/podcast.xml), for example.  
    
*   Broken links were appearing in some cases within the 'more from' section on Series pages.  
    
*   The site search on the [UK](https://www.theguardian.com/uk/) and [World](https://www.theguardian.com/world/) sections now defaults to a combined scoped search of both UK & World.  
    
*   Comment counts now appear on the Top Story component as used for example on [Fitness](https://www.theguardian.com/lifeandstyle/fitness).

That's all from what was quite a quiet release, as many in the Technology department took a well-earned break. You can expect a bumper release in a couple of weeks.
