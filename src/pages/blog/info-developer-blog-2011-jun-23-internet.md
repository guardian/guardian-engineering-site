---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-jun-23-internet'
headline: 'Developing the new artist pages'
date: '2011-06-23'
authors: [Robbie Clutton]
standfirst: 'The Guardian music site''s new artist pages make it so much easier for you to say thank you for the music'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2011/6/23/1308835104999/ABBA-005.jpg'
  alt: 'ABBA'
  credit: 'Photograph: GAB'
tags: [Internet, Music]
---

Recently we took another small step towards mutualising the Guardian website through our new artist pages in the music section. There are many more bands out there then we can cover, but we want to encourage and enable visitors to the site to find information about and have conversations about those bands.

**The app**  
Our first step is having artist pages and to build these we looked backed at our [band pages](http://www.guardian.co.uk/music/sxsw-2011-band-tracker) for the [South by South West (SXSW)](http://www.guardian.co.uk/culture/sxsw) coverage in March of this year.

Those pages were an aggregation of data pulled in from the web, and these pages follow the same principles. To construct these pages, we pull in data from [Last.FM](http://www.last.fm/api), [Songkick](http://www.songkick.com/developer), [YouTube](http://www.youtube.com/), [MusicMetric](http://developer.musicmetric.com/) and [MusicBrainz](http://musicbrainz.org/). Where possible we are trying to use MusicBrainz identifiers to get information for bands, but that's not always possible.

For instance, you can't search YouTube with a MusicBrainz ID, but you can find official YouTube channels for an artist from MusicBrainz. Its all part of the fun of attempting to build fully automated, non-editorial pages. If you do see something amiss, it can be reported to userhelp, just look for the little robot on the artist pages for more details.

If we have a tag for that artist, we can pull in content related to that tag, further fusing our content with that of the wider web. As we move forward we will be looking at how we can bring additional data and content in from the web to further enhance these pages and start to facilitate discussions around bands and their music. If you've got ideas about what you might like to see on these pages, please do let us know.

The rest of this blogpost will be fairly technical, so I won't feel bad if you stop at this point.

**The code**  
Still with me? Great. In addition to mutualising and aggregating content, we are also refactoring out common code to call music based web APIs. That code is over on [Github](https://github.com/guardian/music-api-scala-client) and is written in our tool of choice, Scala.

For the moment it contains the code to call out to Last.FM, but hopefully we'll be adding the other web APIs into that project so we can use it future music projects and maybe even help other Scala developers out there wanting to quickly and easily use these APIs. Perhaps someone might find them useful at a future hackday.

This application is about as clear a perfect use case for our microapp framework as there can be. We're creating new pages to point your browser at on guardian.co.uk and yet we don't want to model that content we're displaying in our content management system (CMS).

Building this music application as a microapp allows us to keep our CMS clean, and means we can create a single focused application. Some of the interesting side affects of building a microapp is the caching you can get for free.

In between our CMS that will create the actual HTML to send to your browser and our microapp is a caching proxy. By sending the appropriate 'Cache-Control' headers in our response to our CMS those responses will be honoured by that caching proxy.

As we are largely providing a page which is an aggregation of content from the web, including our own [Content API](http://explorer.content.guardianapis.com), we don't want to store and synchronise this data, but retrieve it on an ad-hoc basis. This might sound expensive, but these caches allow us to concentrate on keeping our application simple and hopefully deliver quicker and with a certain level of confidence.
