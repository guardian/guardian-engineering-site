---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2010-dec-22-release-103-developers-freeze'
headline: 'The big freeze: notes on Release 103'
date: '2010-12-22'
authors: [Sally Goble]
standfirst: 'Our annual code freeze makes us change the the way we think about what will go into our pre Christmas release, updating our core content management and delivery system. Here are some of the pre code freeze changes we''ve made'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/12/19/1292768167209/A-sightseeing-tour-bus-on-004.jpg'
  alt: 'A sightseeing tour bus on Southwark bridge, London in a snowstorm.'
  credit: 'Photograph: Rex Features'
tags: [Computing]
---

The holiday period is coming up and for the duration of this period, when developers, systems staff and testers are thin on the ground, the Guardian technology development department has a code freeze.

The code freeze lasts from the end of last week until the first week of January – during that time no changes can be released into our live environment, although development can continue in the background. The code freeze is implemented partly because there are fewer people around to develop and test, and partly to stop any bugs from being introduced into the site and content management system that will then be difficult to fix with a skeleton staff.

Because of this static period in our release cycle, the last release before the code freeze can be a last minute flurry of activity. Product managers, editorial staff and developer teams have to anticipate, further in advance than usual, editorial needs and events that will require development between now and the end of January. Some development that was originally planned to be implemented for release 103 has to be dropped to make way for other changes that will be required to be definitely live in the new year. Jostling and hustling ensues.

Some of the changes implemented for this release are as follows:

Custom crops of pictures to be used for mobile platforms
--------------------------------------------------------

We have added an tool to easily allow our editors to add custom crop sizes for pictures that will better serve our mobile platform. These "letterbox" size crops that we will now be associating with our content will mean that we will be introducing pictures that are optimised for mobile platforms – which will enhance our mobile app experience. This is work we have had to do in advance of any release of new mobile applications.

Links to blocks in live blogs and minute by minutes
---------------------------------------------------

As part of ongoing work to enhance user experience, we have added a new linkable timestamp into our very popular [minute by minutes](http://www.guardian.co.uk/tone/minutebyminute) and live blogs. This means that if a user wants to link to a particular block in a live blog they can now copy the link embedded in the timestamp and that link will be to that specific block on the page. We think this will be particularly useful to users commenting on our live blogs and wanting to refer to a particular part of that blog.


   <figure>
   <img alt="Linkable time stamps" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/16/1292495713322/LiveBlogLink.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=98e0a9cb657174cd55cb810c5302727a" loading="lazy" />
   <figcaption>
     New developer work allows users to link to the timestamp within live blogs and minute by minutes
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

This is only going to be implemented for new live blogs though, not historical ones.

Other bug fixes and enhancements include:
-----------------------------------------

*   A fix to stop our network front from giving a 404 error in certain very particular and rare circumstances – a fault that cropped up last week
*   A new "kicker" that allows us to flag certain types of content in our trailblocks as belonging to "Guardian Professional" site
*   Browsers will now be able to auto-detect the addresses of the RSS feeds of every tag applied to an article, a [request](http://www.guardian.co.uk/discussion/comment-permalink/8628807) we responded to from one of our users.

We'll resume our normal two week development cycle in the new year.
