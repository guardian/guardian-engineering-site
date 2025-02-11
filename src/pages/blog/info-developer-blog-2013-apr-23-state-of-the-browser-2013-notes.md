---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-apr-23-state-of-the-browser-2013-notes'
headline: 'State of the Browser 2013: conference writeup'
date: '2013-04-23'
authors: [Sébastien Cevey]
standfirst: 'One of the Guardian''s software development team shares his thoughts on the recent web conference event'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/4/23/1366726520990/sotb2013.jpg'
  alt: 'State of the Browser 2013 conference'
  credit: 'Photograph: guardian.co.uk'
tags: []
---

On Saturday, I took advantage of the glorious weather to lock myself into a room full of nerds (including our very [Andy Hume](http://www.guardian.co.uk/profile/andy-hume)) to listen to [people talk about browsers](http://browser.londonwebstandards.org/). It was fun. Here's a rundown of the event:

Keynote by Molly Holzschlag (via recorded video)
------------------------------------------------

A passionate argument about the need for a plurality of browsers and the dangers of a WebKit monoculture. (Note: I believe it was recorded after [Opera's announcement that they'd use WebKit](http://my.opera.com/ODIN/blog/300-million-users-and-move-to-webkit), but possibly before [Google's announcement about Blink](http://www.guardian.co.uk/technology/2013/apr/05/blink-google-rendering-browser).)

WebKit Monoculture Isn't Breaking the Web: You Are by Alp Toker, WebKit dev
---------------------------------------------------------------------------

Alp argued (somewhat rhetorically) that in fact, WebKit was a multi-culture: WebKit is not a browser, it's an engine, and it's used in a great variety of products (mobile, headless, embedded, browsers, etc.), with a form of long-tail distribution (lots of small forks and ports). WebKit makes it easy to embed a web engine in your product, it's a generator of browser diversity, an enabler of other projects and it fuels unlikely collaborations (Apple, Google, Opera, etc).

He didn't say it as such, but I understood his point to be that WebKit was to the web what Linux was to computers: an open, reusable, communitarian core.

Internet Explorer - Touch the web by Martin Beeby, Microsoft
------------------------------------------------------------

A necessary reminder that Internet Explorer is still a strong presence on the web.

Couple of interesting points:

*   There is a <meta> tag for customizing the Win8 [desktop tile](http://msdn.microsoft.com/en-us/library/windows/desktop/jj673981\(v=vs.85\).aspx) for a website (and an API to interact with native notifications, apparently).
*   "touch != mobile", and MS bring their own (actually quite good) [Pointer Events](http://www.w3.org/TR/pointerevents/) to IE, which work with any number of points of touch, and treat mouse, pen and touch (aka your finger) identically. Based on a similar API to their native touch events. Apparently Bill Gates has a screen that supports up to 100 points of touch; it was, however, not revealed whether he had 100 fingers...
*   Reminder that we shouldn't forget that Internet Explorer exists, and use [modern.ie](http://www.modern.ie/) to test our sites for it.

State of the Mobile Web by Paul Kinlan, Chrome
----------------------------------------------

When measuring the performance of a webapp, we all turn to the easily-measurable network metrics ("time to glass"). But we should really also closely monitor the "UI Jank", i.e. the problem of blocking your user interface on slow operations ("time to frustration"), to ensure a smooth and engaging experience. Hint: it's not just about the JS, but also [repaints and relayouts](http://davidwalsh.name/browser-repaint).

There was also a survey of features by availability on used mobile browsers. Most interesting is how they differ from the desktop browsers.

Business as usual: bringing the world wide web to the whole wide world by Andreas Bovens, Opera
-----------------------------------------------------------------------------------------------

Showcase of [mobile Opera 14](http://www.opera.com/mobile), the new beta version based on WebKit and Chrome. It includes nice handling of background audio playback, and an "Off-Road Mode", which is essentially Opera Mini, i.e. pages are rendered on Opera servers, optimized and streamed back to the mobile device, hence saving a lot of processing and bandwidth. Doesn't quite work with JS or AJAX though. Android tablet, iOS and desktop versions of the new Opera to come out soon.

Highlight: Making your HTML5 efforts worthwhile by Chris Heilmann, Mozilla
--------------------------------------------------------------------------

I never really believed in this [Firefox OS](http://www.mozilla.org/en-GB/firefox/partners/) business, but Chris made an appealing case for it.

Firefox OS will run on low-spec, cheap phones for the "emerging markets". The idea is for people to buy those instead of limited feature phones, or low-spec Androids running ancient versions of the OS which you can't upgrade. The goal is to get all people who can't afford high-end phones a high quality, cutting-edge browser, giving them access to the modern web.

The OS/phones will feature app billing via SIM card / monthly bill rather than credit cards (people in emerging markets don't always have access to credit cards). An intriguing search function lets you search and discover apps by content (e.g. search for "david bowie" and get Spotify, Last.fm, Songkick etc. in the results). Apps are webapps, i.e. websites + a manifest. You can add these apps to your phone and they act native. Lots of web APIs for native integration (battery, bluetooth, alarm, audio), that are getting standardised; for restricted operations (dial, take picture, etc.), they rely on either an explicit user interaction (e.g. press the dial button), or a set of permissions for privileged apps, which go through a submission process. Other apps _don't_, they're just added to the market.

All of this works natively on Firefox OS, and also on mobile Firefox for Android. There's a [Firefox OS simulator](https://addons.mozilla.org/en-US/firefox/addon/firefox-os-simulator/) extension for Firefox, and you can buy a Firefox phone on [geeksphone.com](http://www.geeksphone.com/).

Frontend web architecture by Steve Workman
------------------------------------------

"Don't use jQuery, write tests, use AMD and LESS/Sass, MVC, etc." Nothing particularly new here, I thought.

Highlight: Web Components: Getting Started by Pete Gasston
----------------------------------------------------------

Very exciting presentation of [Web Components](http://www.w3.org/TR/components-intro/), which let you create standalone, encapsulated, importable components for the web, bundling an HTML template, scoped CSS (and from quick research, scoped JS).

Pete talked about the [Shadow DOM](http://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/) (a hidden sub-DOM laid out over elements and which you can style separately, e.g. the <video> tag player, but you can make your own); HTML Template (<template>), browser native DOM fragment that is not rendered but you can use in your code; HTML Imports (<link rel="import">) to import external HTML, typically templates; Custom elements, so you can make your own elements by extending existing ones; Decorators, to apply a template with CSS and let you alter the markup with a CSS media query.

A lot to take in, but this really feels like the key to the future of the web (and web apps) in the coming few years. It was interesting to note that AngularJS acts as a polyfill for a lot of these features.

I also discovered the [Toolkitchen Project](http://toolkitchen.github.io/), which uses a lot of the features above (polyfilled if necessary) and a couple more (Model Driven Views, Mutation Observers) to provide a framework for web components.

All in all: an inspiring conference (just check out these amazing [sketchnotes](http://www.flickr.com/photos/makaylalewis/sets/72157633305467464/) Makayla Lewis took), with two highlights for me, and a lot of points to technologies to research and play with!
