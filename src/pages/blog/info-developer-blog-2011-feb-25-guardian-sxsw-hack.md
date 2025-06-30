---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-feb-25-guardian-sxsw-hack'
headline: 'Things I wish I''d known before the Guardian Hacks SXSW event'
date: '2011-02-25'
authors: [Robbie Clutton]
standfirst: 'A mere half-hour delay can feel catastrophic in the context of a single weekend, so what can be done to smooth the process?'
image:
  url: 'http://static.guim.co.uk/sys-images/Society/Pix/pictures/2011/1/28/1296207113624/Write-letter-computer-008.jpg'
  alt: 'Write letter computer'
  credit: 'Photograph: Alamy'
tags: [Guardian Hacks SXSW, SXSW Interactive]
---

The first hack event I went to I only made the first day of a two-day event, so I suppose this was my first full hack event. I've been to plenty of small meet-ups, larger BarCamp events and mammoth conferences, but a hack day definitely has a different and more intimate vibe to it. The number of attendees seemed pretty optimal and it was certainly a good mix of developers, designers and journalists – although this only really shone through in the final presentations.

Although I had an idea of what I was intending to build at the event, and had even done some thinking about how the application might work (but no coding before the pistol on Saturday morning, as that's cheating!), it still took me a while to get started. I probably would have coded my idea up in [Node.JS](http://nodejs.org/) as it's quickly becoming my language of choice in the 'get something done fast' category, but as I was building something I hoped would eventually be brought into the Guardian for festival coverage I thought I should build the application in what is fast becoming the language of choice at the Guardian, [Scala](http://www.scala-lang.org/).

Scala, although fantastically awesome, still runs on the JVM and still requires a Java-like setup with web.xml files and the like. This isn't a problem in itself, but it means some non-trivial time is spent just setting up a project the way you like it – which leads nicely into...

Lesson one
----------

_If you are intending to use a language that requires some investment in setup, look for a way of reducing this, perhaps by having a library of 'hello world' applications pre-configured for repeat use._

By deciding to use Scala, as a relative newbie to the language I know I was doing certain things in an inefficient way and that was compounded by the timescales of an event like this. When you suffer a setback working on a project – either because you don't know how to do something or because something you thought would work doesn't – you generally have time to investigate, ask around and try a few things out. However, that is a real luxury when trying to build things in hours and not weeks.

Lesson Two
----------

_If you're going to use a hack day to experiment with a new technology, expect frustrations and delays. Even a half-hour delay can feel catastrophic._

In relation to Scala – and this may be my lack of knowledge of the language – I wish the JSON and HTTP support were a little better. Compared with the XML support, which is an excellent xpath-like implementation, the JSON support felt clunky. I actually had to change the data I was getting (I was reading from a file, so I could do this) to remove some parts which I couldn't get the code to parse. As for the HTTP support, I had to bring in the Jetty HTTP client (which didn't seem to recognise 'utf-8' as a character encoding), then bring in the Apache Commons HTTP client to request data from the [Last.FM API](http://www.last.fm/api). One post on [Stack Overflow](http://stackoverflow.com/) I was reading while I was looking for answers to a Scala problem suggested having a personal library for wrapping functions you wished were supported better.

Lesson Three
------------

_Knowing how to do common things really well, and fast, is essential. In my case, using web-based APIs using JSON and rendering JSON in turn._

One technology I did employ which I'm now using on a day-to-day basis is [MongoDB](http://www.mongodb.org/) and this is where knowing something about a technology really came into it's own. Getting stuff into and out of the database was as easy as it should be. I used the effective but perhaps slightly noisy Casbah Scala driver to talk to MongoDB. I was also using the Last.FM API to get information about bands, probably one of the first public web APIs I ever used thanks to a [Paul Downey](http://blog.whatfettle.com/) workshop when I was a fresh-faced graduate. The API doesn't look to have changed (in a good way), which should be great as anything I built in that workshop might have a chance of working today. I was using the XML APi but I only found out on the Monday that the Last.FM APIs also support JSON.

Lesson Four
-----------

_Know your APIs. Knowing that Last.FM supported JSON might just have influenced my decision to use Node.JS instead of Scala due to the support of JSON over XML._

As this was a music project, the sensible thing seemed to be to use [Music Brainz](http://musicbrainz.org/) IDs for the bands. But although this worked in many instances, some of the bands playing SXSW don't yet have Music Brainz IDs and perhaps more surprisingly the Last.FM API doesn't seem to provide Music Brainz IDs for all of the bands in it's API – even top 100 chart bands can be without one. The algorithm I built depended on this data, and although I could do a best effort and call Music Brainz directly, it would have been nice if this was covered off by the larger provider, Last.FM.

_The original version of this article appeared on Robbie's own blog, [http://blog.iclutton.com](http://blog.iclutton.com/2011/02/guardian-sxsw-hack-review.html)_
