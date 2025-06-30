---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-mar-01-notes-from-edge-conference'
headline: 'Notes from Edge Conference 2013'
date: '2013-03-01'
authors: [Patrick Hamann]
standfirst: 'A Guardian developer''s notes and highlights from this month''s Edge Conference, a web technology event in London'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/3/1/1362147747608/edgeconf.jpg'
  alt: 'EdgeConf: "Building out from the edge of web technology"'
  credit: 'Photograph: guardian.co.uk'
tags: []
---

I attended [EdgeConf](http://edgeconf.com/) on Saturday and wrote some up notes from the sessions included below. The conference was touted as "a new kind of one-day conference on advanced web technologies for developers and browser vendors" and did not disappoint.

The conference had a slightly different format than most – which I was dubious about at first – but it worked incredibly well: sessions were on a range of client-side topics with 10 minute introduction slides, which was followed up by a moderated panel with open questions from the crowd using an open [Google Moderator page](https://www.google.com/moderator/#16/e=1fddb1) – audience participation was actively encouraged.

The conference was held at Facebook's swanky new London offices and featured a strong representation from Google, Mozilla and Facebook themselves, which led to some very interesting discussions.

Offline
-------

*   AppCache is broken... as we all know from [Jake Archibald's prolific writing and talks on the matter](http://alistapart.com/article/application-cache-is-a-douchebag)
*   The new Application Controller spec/API is here to fix this, but very much in its infancy
*   Most people are storing "chrome" in AppCache and all "valuable" data in LocalStorage
*   Speed is still an issue with LocalStorage
    *   Interestingly, Firefox gets LocalStorage into memory before parsing the page's <head>, which lets it achieve lightning-fast storage read/writes
*   Is asset stuffing in LocalStorage a bad thing?
    *   Yes, but until better solutions arise, it's the best you can do!
*   Syncing data between local and server storage is still an issue, with everybody having to implement their own controller to communicate.
    *   Should there be a standardised API to do such syncing
*   A lot of discussion around storage quotas. How much is a website/app allowed? Whose decision does such quota belong to: the website, the browser or the user?
*   The [Quota API](http://updates.html5rocks.com/2011/11/Quota-Management-API-Fast-Facts) tries to solve this – but very underused by developers.

Network
-------

*   Should we have access to the [UA](http://en.wikipedia.org/wiki/User_agent)s bandwidth information? No!
    *   What would you actually use it for? What are the use cases for this?
    *   Too hard to judge and varies every second
    *   Too many presumptions made by developers on users' context.
*   [Radios](http://en.wikipedia.org/wiki/Mobile_radio) on mobile devices consume the second largest amount of power after the screen.
*   Every effort should be made to reduce long-living requests and continuous requests. Try and batch as many of them as possible.
*   [WebSockets](http://en.wikipedia.org/wiki/WebSocket) are great, but tricky on mobile. Network carriers block/drop sockets often.
    *   Use HTTPS to try and get around this issue.
*   Multiplexed protocols like SPDY/HTTP2.0 are going to save our bandwidth and radios by batching requests.
*   Images count for 60% of bytes sent on the internet!
    *   Most of these images are poorly-optimised, or even worse, the wrong file types.
*   Responsive images? Solutions vary. The working group is trying hard, but there are a lot of variables and no solid solution yet.
*   Could having access to the UA/devices features and screen dimensions solve this?
    *   i.e. solve this issue on the server-side, not client-side
*   For performance and responsive image reasons, BBC News doesn't include any images in the [DOM](http://en.wikipedia.org/wiki/Document_Object_Model) on initial page request.

Performance
-----------

*   You should worry about JavaScript garbage collection! Try to write code that can be cleaned easily.
    *   Don't create loads of objects
*   Will browsers/JS specifications allow us to clearly mark objects for collection and provide better interfaces for managing memory?
*   Use [WebWorkers](http://en.wikipedia.org/wiki/Web_worker) wherever possible to move processing off the main UI thread.
    *   Facebook have had a lot of success with this
*   Custom font rendering is slow – avoid as much as possible.
    *   Should we have font loading events to handle this better?
*   Scrolling large DOMs with thousands of nodes is a performance nightmare.
    *   Facebook are doing some very clever things to overcome these issues.
    *   Seems these performance tricks aren't widely shared, but they should be.
*   Avoid repaints and flows as much as possible.
*   Chromium's [Skia](https://sites.google.com/site/skiadocs/developer-documentation/skia-debugger) debugger looks amazing for visualising and debugging page rendering performance
*   translateZ(0) is great, but kills CPU/GPU, therefore be careful using it on mobile.
*   Too much client-side templating can slow things down. Compile lazy-loaded templates on the server and send whole blocks down.
    *   Progressive enhancement.
*   Surprisingly, SVGs take longer to render than decoding JPEGs (but of course SVGs have the resolution-independence win)
*   Test on real user devices, not beefy Macbook Pros

Responsive layout
-----------------

*   The FT's [Column Flow](https://github.com/ftlabs/ftcolumnflow) is very cool, but essentially just a polyfill for features we should have in CSS.
    *   CSS Grids and [flexbox](https://developer.mozilla.org/en-US/docs/CSS/Tutorials/Using_CSS_flexible_boxes) specs should solve these issues.
*   For truly OO CSS/HTML modules, should we be able to have media queries at a more granular component/widget level?
    *   Yes, but media queries may not be the correct answer. [Web components](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html) and [Shadow DOM](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/) are the ones to watch.

Input
-----

*   You should be binding to touch events wherever possible
*   Be careful with hover!
*   Microsoft's [Pointer Events](https://dvcs.w3.org/hg/pointerevents/raw-file/tip/pointerEvents.html\)) API is very good and seems like it may be accepted by other browsers.
*   Test on real touch devices, emulators are rubbish
*   Gestures will be the next big thing
*   What about three-dimensional inputs such as [Leap Motion](https://www.leapmotion.com/).
*   What about speech?

Privileged Access
-----------------

*   Security is a big issue.
*   The packed apps manifest/API landscape is blurry across platforms and is preventing uptake.
*   Do we need access to a standardised permissions API to device hardware and APIs like Facebook/Twitter apps do? Yes!
*   How do you make this UI and UX consistent across all user agents?
*   [PhoneGap](http://phonegap.com/) / [Cordova](http://cordova.apache.org/) seems to be leading the way with this.

Testing and tooling
-------------------

*   Chrome's developer tools are getting better by the day.
    *   Canvas inspection
    *   Continuous repainting
*   They are even contemplating it becoming a whole IDE: developers would never have to leave the browser.
*   Offline and AppCache are hard to test.
*   Proxy sniffers such as [Charles](http://www.charlesproxy.com/) are great for this.
*   Emulators suck. Testing on real devices is the only solution.
*   [OpenDevice labs](http://opendevicelab.com/) are making this easier for developers
*   Seems like Selenium is still the winner in the automated testing world/
*   [WebDriver](http://www.w3.org/TR/2013/WD-webdriver-20130117/) spec is helping to standardise this API so other UAs can be automated, such as PhantomJS and Chrome.
*   The BBC are using ImageMagick to do UI comparison to catch regressions
*   New tools such as [Fighting Layout Bugs](https://code.google.com/p/fighting-layout-bugs/) which plugin to Maven seem like better solutions.
*   Add CSSLint to your build process.
*   [Adobe Edge Inspect](http://html.adobe.com/edge/inspect/) can help speed up testing across large amounts of devices simultaneously.

[here](http://www.youtube.com/playlist?list=PLNYkxOF6rcICCU_UD67Ga0qLvMjnBBwft)
