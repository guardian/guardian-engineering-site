---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-apr-08-release-110'
headline: 'Notes on Release 110'
date: '2011-04-08'
authors: [Robert Phillips]
standfirst: 'Robert Phillips provides an overview of some of the most recent changes to guardian.co.uk'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2011/4/8/1302267019594/Royal-wedding-007.jpg'
  alt: 'Royal wedding'
  credit: 'Photograph: Guardian'
tags: [Computing, Internet, Programming]
---

For our latest iteration of development we've been making some changes for the event that all Guardian readers have been waiting for. That's right, the royal wedding.

Well, sort of. We have been making some new components and layouts which will allow for easier coverage of the event, but really these new developments are useful for any big event – it's just that the wedding was the event that's focused it. So you'll see it all in use elsewhere before long, and not just for a few days at the end of April.

Slideshow component
-------------------

We've put together a new placeable slideshow component which will allow the online editors to put together quick image galleries for events. We've made it placeable in a number of areas and for a number of different widths. This means it won't just be limited to use on the network front, but will pop up around the site. Think of it as a condensed version of our gallery page. It has the basic back/forward/pause/play controls for when you see a nice shot of Kate and Wills you'd like to focus on.

Major news layout
-----------------

For the network front, we have several different layouts for the main trailblock area which get used. These can change based on whether there is an important event going on or if there's a project we've been focusing on for a while. As part of this release, there is a change to our layout for major news. The change has been made to add pixies and the slideshow component to the layout when needed – a pixie is an image on the site with a heading which has a hover state displaying more text.

CS performance optimisation
---------------------------


   <figure>
   <img alt="jQuery carousel and CSS Sprite" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/4/7/1302184028323/Image_for_blogpost_110.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=2f9da639cb92f267f377a748eb8223b7" loading="lazy" />
   <figcaption>
     Snapshot of a sample carousel, plus the CSS sprite
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

The in-house jQuery carousel used across guardian.co.uk previously made use of six button images representing three different states (on, mouse-over, off) for the back/forward buttons. There were occasional delays when hovering over these buttons as the new images were requested, so we decided to rework them as a single image CSS sprite. The resulting image loads more quickly and cuts down on HTTP requests to the server – always a good thing.

Performance improvements
------------------------

There's a change to to the Comment is free pages to improve load times. [As trialled on the Politics front a few releases ago](http://www.guardian.co.uk/info/developer-blog/2011/mar/04/1) we've made it so that the adverts are the last things to load on the page. This means your content will get to you a few milliseconds faster in this area. We'll be looking to make this change to other areas in the future as well, but for now we don't want to make wholesale changes to the page load process.

Other small changes and fixes around the site
---------------------------------------------

*   A fix has been made to the way that the byline on content pages was being formatted, removing some erroneous spacing.
*   There was an issue with the related video tabbed component on video content pages whereby a blank tab was being displayed which has now been rectified.


   <figure>
   <img alt="In-Skin changes" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/4/7/1302184160204/skin.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5837052189cacc747b33b37c8c6bb217" loading="lazy" />
   <figcaption>
     An example of what a wrap-around ad looks like
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

*   As part of a commercial improvement, we're also making some changes to the way that we implement full-page ads that wraparound some section fronts. This change will help allow the ad team to target these easier as well as reducing the glitches we've seen with this functionality previously.

*   Another project we have on the hob at the moment is a [change to our sports feed provider](http://www.guardian.co.uk/info/developer-blog/2011/mar/24/release-109). A larger project has been undertaken to improve the feeds which power things like our live scores and match statistics. We're hoping that this will be ready to launch in the next couple of weeks, so keep your eyes peeled for more news.
