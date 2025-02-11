---
layout: ../../layouts/blog.astro
slug: 'help-insideguardian-2011-mar-11-sxsw-2011-band-tracker-explainer'
headline: 'SXSW 2011: How we made our interactive band tracker'
date: '2011-03-11'
authors: [Alastair Dant, Lisa van Gelder, Matt Andrews]
standfirst: 'A hack weekend here, a site scrape there and pretty soon we had this wonderful new tool for tracking artists at the SXSW festival

•&nbsp;Check out our SXSW 2011 band tracker'
image:
  url: 'http://static.guim.co.uk/sys-images/guardian/Pix/pictures/2011/3/8/1299601123046/SXSW-005.jpg'
  alt: 'SXSW'
  credit: 'Photograph: Getty'
tags: [Culture, Guardian Hacks SXSW, Justin Bieber, Last.fm, Music, SXSW]
---

Alastair Dant
-------------

Last year I attended my second [Music Hack Day](http://london.musichackday.org/2010/), a spirited event encouraging geeks who love beats to get together and build new and unusual projects. After a busy weekend building a web-based karaoke game that enables spontaneous formations of choirs, I sat back to watch all the great ideas at the final presentation.

There amid the demos, something caught my eye. A chap named Jameel Syed was showing off an app that transformed numbers measuring the popularity of [Justin Bieber](https://www.theguardian.com/music/justin-bieber) into a groovy electronic track. He mentioned that his company specialised in such measurements and was developing tools to help the music industry track the popularity of artists in all manner of different ways.

This led to an ongoing conversation about how we might use [MusicMetric](http://www.musicmetric.com/)'s data to power interactive content for the Guardian. Jameel and I discovered a mutual affinity for machine learning and Detroit techno but unfortunately couldn't pin down a specific project on which to collaborate.

Upon hearing that the Guardian was sending a posse to cover the [South By South West festival](https://www.theguardian.com/culture/sxsw), I saw my opportunity. Few places rival Austin when it comes to the music industry's efforts to promote new bands. In the words of Poe: "There are few cases in which mere popularity should be considered a proper test of merit; but the case of song-writing is, I think, one of the few."

In order to promote developer/journalist collaborations, [Google agreed to sponsor a hack day of our own](https://www.theguardian.com/technology/guardian-hacks-sxsw), focused on creating new tools for covering large events. This would give three members of our dev team a chance to create hacks to help our coverage of SXSW. When I heard what [Matt](https://www.theguardian.com/profile/matt-andrews), [Robbie](https://www.theguardian.com/profile/robbie-clutton), and [Lisa](https://www.theguardian.com/profile/lisavangelder) were planning to build, I had a bit of a brainwave. [Rosie Swash](https://www.theguardian.com/profile/rosieswash) in our music team had mentioned that it would be great to have a tool for tracking the popularity of all the artists we're following at the festival.

By combining [Lisa's system for combining third-party data into cohesive artist pages](https://www.theguardian.com/music/sxsw/listing/index?letter=a) with Matt's gig scraper and interface ideas, we had the basis of a band tracker that uses MusicMetric data to figure out every artist's popularity throughout the course of the festival. The icing on the cake was realising that Robbie's recommendation engine would enable [Last.fm](http://www.last.fm/) users to find out which bands might be the best match for their tastes.

At this point, we had to find a way to visualise the data in a cross-platform manner. After trying various options, a language called haXe came to the rescue which gave us the ability to render to both HTML5 and a Flash fallback from a single code base. Keep an eye on our developer blog if you're interested how we're starting to use haXe to create cross-platform content - there's an article to follow soon.

Last but not least, our interactive team designer, Mariana Santos, worked hard to design a series of pages that would suit the tone of the festival whilst fitting in with our in house rules.

We're really happy to have had the chance to do something a little experimental. A fully worked version of these ideas could come handy with our upcoming coverage of this summer's many festivals. Please accept our apologies if things aren't quite perfect. All being well, all our brown paper and string will hold together after we leave for Austin!

Lisa van Gelder and Matt Andrews
--------------------------------

There are more than 2000 artists playing at SXSW music this year and deciding which ones to track can feel rather daunting. We are doing our best to make it easier. Our music team have picked [the 10 artists they think are worth keeping an eye out for](https://www.theguardian.com/music/musicblog/2011/feb/17/sxsw-bands-interactive-artist-pages).

We also invited you to [write in and tell us who you thought were worth paying attention to](https://www.theguardian.com/music/musicblog/signup/2011/feb/25/sxsw-2011-music-nominate-artists) and you can see the results on our readers' recommend page. Want to know which bands are trending? Our most popular page updates hourly with the latest figures. Have a Last.fm account? Use our recommendation service to show you artists playing at SXSW who are similar to artists you already like.

If you want to go beyond our selection, our [A-Z listings allow you to track any band playing at SXSW](https://www.theguardian.com/music/sxsw/listing/index?letter=a) with a [MusicBrainz ID](http://musicbrainz.org/). Listen to music, find gigs and track artists popularity on Twitter, Facebook etc.

**How they work:** We scraped [the SXSW website](http://sxsw.com/) to get the complete list of artists playing and got the unique MusicBrainz ID for each of them from the Musicbrainz.org API. Then for each artist we pulled in pictures and bio from Last.fm and music from [Soundcloud](http://soundcloud.com/).

Guardian software developer Robbie Clutton wrote a Last.fm-powered application which took a username and grabbed their top bands, then compared similar bands to the ones playing SXSW, allowing us to build a custom list of recommended acts to check out tailored to each user. Front end developer Matt Andrews then took the resulting JSON feed and sent it back to [Last.fm](https://www.theguardian.com/media/last-fm) to grab artist images (making sure to respect their API request rate limit, of course) and display the results in a Javascript-paginated window. We also made use of several CSS3 selectors to style the band tracker, including border-radius and nth-child.

The Last.fm API provides artist recommendations based on your favourites – we wrote an API that compares those recommendations to the artists playing at [SXSW](https://www.theguardian.com/culture/sxsw) to provide personalised recommendations.

But that is only the beginning - Musicmetric can track the popularity of any artist with a MusicBrainz ID and their data powers our graphs. Stay tuned to see how they change during and after the festival.
