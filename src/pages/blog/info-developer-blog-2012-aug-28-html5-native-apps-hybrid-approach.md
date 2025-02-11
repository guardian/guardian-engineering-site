---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2012-aug-28-html5-native-apps-hybrid-approach'
headline: 'HTML5 and native apps: the hybrid approach'
date: '2012-08-28'
authors: [Andy Hume]
standfirst: 'Andy Hume, the Guardian''s front-end architect, on why we''re betting on HTML5 (but building native apps, too)'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/8/28/1346161721541/html5.png'
  alt: 'HTML5: an extremely stable and trustworthy format'
  credit: 'Photograph: Matt Andrews/guardian.co.uk'
tags: []
---

Much fuss is made in the mainstream technology press about the merits – or otherwise – of HTML5 as a mobile development platform. Recent examples of this include Facebook [moving away from HTML5 in their iPhone app](http://bits.blogs.nytimes.com/2012/06/27/facebook-plans-to-speedup-its-iphone-app/), vs [the FT's move to deliver 'native-like' mobile experiences using open web technologies](http://www.guardian.co.uk/media/appsblog/2012/apr/24/financial-times-web-app-2m).

The term HTML5 (the biggest buzzword in web technology since AJAX) means this discussion is often framed by a very lazy and simplistic two-sided argument: you're either for HTML5 or you're against it. Of course, the reality is rather more nuanced, and I want to explain our current thinking on building cross-platform mobile applications here at the Guardian, where we build specific mobile experiences for the Web, iPhone, iPad, Android and Windows Phone 7.

What's the difference?
----------------------

The common belief is that mobile applications built with web technologies are slower and more sluggish than their native equivalents. In general, that's a reasonable assertion to make. Having access to a device's native rendering tools is going to result in smooth and fast interactions on screen. If you're using a WebView you have to pass that work through to a browser-based rendering engine such as WebKit, and then let it deal with parsing HTML, CSS and painting this to the screen. This is the primary reason [Facebook have chosen to use fewer WebViews in the most recent version of their main iPhone app](http://www.guardian.co.uk/technology/appsblog/2012/aug/24/facebook-iphone-app) (and possibly Android apps, in the future).

However, notice that I say _fewer_ WebViews. It's likely that Facebook have reduced the use of WebViews for some of their core interactive pages, such as timelines and profiles. I strongly doubt that they will remove use of _all_ WebViews in their apps, because WebViews are extremely useful when you need to do one particular thing: render HTML.

Betting on HTML
---------------

The Guardian publishes the body text of all news stories through [our Content API](http://www.guardian.co.uk/open-platform) as HTML. This HTML is consumed by our mobile website, our iOS, Android, and Windows Phone 7 apps, our Facebook app, and any other third-party applications built on our API.

Sometimes, the developers who work on these apps have to jump through a few hoops to deal with that HTML. They have to make sure that the code they use to render that content can cope with the arbitrary HTML that is thrown at it. And sometimes, they have a jolly good moan about this. But unfortunately, it's their problem.

HTML is an extremely stable and trustworthy format. If there's any format I'd be willing to bet on long-term (and I mean long-long-term), it's HTML. Equally importantly, the mechanisms for rendering HTML are also stable and trustworthy. They are ubiquitous in all manner of devices across the world. The details of how to build them are specified in painstaking detail in multiple public and open forums. No format for marking up textual content has _ever_ been so successful, and it makes absolute sense to mark up our article content using that format – including embedding images and other media, and links to other documents.

If your app chooses to render using a proprietary, platform-specific technology, that's great. But you'll have to deal with the fact that our article content is presented to you as HTML. Of course, a better way is to use a rendering technology that is designed to render HTML. iOS and Android-powered devices come with one of the most powerful rendering engines of them all: WebKit. Windows Phone 7 comes with a version of Windows Internet Explorer – which is, as much as you hear people moan about it, a modern and trustworthy platform.

The hybrid approach
-------------------

At the Guardian we believe that the performance benefits that native code gives us results in a better experience for our users, and this is a primary consideration for us when evaluating client-side technology. We have experimented building with tools like [PhoneGap](http://phonegap.com/), [Titanium](http://www.appcelerator.com/), and [Kirin](https://github.com/KirinJS/Kirin), and we don't rule out using these kind of approaches for a certain class of application.

For our core applications, however – the applications that deliver the Guardian's journalism to over 60 million unique browsers per month across the world – we'll continue to build native applications. We'll continue to use the expertise we've built up in-house on these platforms, and to take advantage of the quality of those platforms' SDKs, and the quality of the experiences they can provide.

However, inside of those native applications, when it comes to rendering the HTML that our article content relies on, we're more than happy to take advantage of the HTML rendering technology provided by that platform.
