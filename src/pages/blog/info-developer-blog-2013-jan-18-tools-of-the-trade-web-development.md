---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-jan-18-tools-of-the-trade-web-development'
headline: 'Tools of the trade: the browser-based tools the Guardian''s digital team uses for coding'
date: '2013-01-18'
authors: [Guardian Digital Development team]
standfirst: 'After an internal email discussion about useful tools, we''ve collected a roundup of the best free online resources for helping with web development, as used by the Guardian''s team.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/1/18/1358512125225/knife.png'
  alt: 'A Swiss army knife: just like the toolset below. Photo by Jürg Vollmer via Flickr'
  credit: 'Photograph: Jürg Vollmer/Public domain'
tags: []
---

As a department, the Guardian's Digital Development team have quite a few preferred tools when it comes to quickly testing things, sharing short snippets of code, or producing test cases to share with other developers to quickly help debug issues. Some of them are well known and loved, others are newer and perhaps in need of publicity. This post summarises an internal email kicked off by QA [Gwyn Lockett](http://www.guardian.co.uk/profile/gwyn-lockett), discussing some of the tools on the Guardian's Swiss army knife of debugging.

[jsFiddle](http://jsfiddle.net/)
--------------------------------


   <figure>
   <img alt="jsFiddle: a tool for quickly experimenting with JavaScript" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358509516171/jsfiddle.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=161bcacccc36b318299658bfbd614c01" loading="lazy" />
   <figcaption>
     jsFiddle: a tool for quickly experimenting with JavaScript
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

This is a pretty common one, suggested by Gwyn. jsFiddle allows developers to quickly throw together blocks of HTML, CSS and JavaScript, and instantly see the results. Not only that, but these pages can be shared and [forked](http://en.wikipedia.org/wiki/Fork_\(software_development\)) by other developers, making them useful when linked in questions on sites like [StackOverflow](http://stackoverflow.com/). jsFiddle also has a nice feature where common JavaScript frameworks can be automatically included in the fiddle itself.

[JS Bin](http://jsbin.com/)
---------------------------


   <figure>
   <img alt="JS Bin is another interactive code editor, mainly for JavaScript-based prototyping and debugging" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358509697271/jsbin.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=b182afa0bbd4f818584f28dfbb3e07c4" loading="lazy" />
   <figcaption>
     JS Bin is another interactive code editor, mainly for JavaScript-based prototyping and debugging
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Suggested by our Developer Advocate, [Michael Brunton-Spall](http://www.guardian.co.uk/profile/michaelbruntonspall), JS Bin is similar to jsFiddle but perhaps simpler and quicker. As well as the features of jsFiddle it also offers a console similar to the one bundled with the browser's developer tools, and has a much more minimalist user interface which allows you to get straight down to coding.

[CodePen](http://codepen.io/)
-----------------------------


   <figure>
   <img alt="CodePen is a tool to create quick code samples with the aim of teaching others and testing across multiple devices" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358509848457/codepen.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=543c7ad630b0d9b45c3d1c5829355054" loading="lazy" />
   <figcaption>
     CodePen is a tool to create quick code samples with the aim of teaching others and testing across multiple devices
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

CodePen, suggested by client-side developer [Matt Andrews](http://www.guardian.co.uk/profile/matt-andrews), is similar to the other tools above but is aimed equally at teaching others – its Pro mode offers a "live view" which updates as you code, and "Collab Mode" where multiple people can edit at the same time. It also features a paid-for "Professor Mode" which allows multiple people to watch one person teach a code example on a single page.

[wireframe.cc](http://wireframe.cc/)
------------------------------------


   <figure>
   <img alt="Wireframe.cc is a tool for quickly wireframing websites and mobile apps" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358510031952/wireframe.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=3899fcc28802a261a4683dcc550904a4" loading="lazy" />
   <figcaption>
     Wireframe.cc is a tool for quickly wireframing websites and mobile apps
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Wireframe.cc, suggested by developer [Ken Lim](http://www.guardian.co.uk/profile/kenneth-lim), is a beautifully-designed tool allowing quick and simple [wireframing](http://en.wikipedia.org/wiki/Website_wireframe) of products. Its click-and-drag interface and limited colour palette make it simple to produce standardised "blueprints" and as with the other tools listed here, is geared up for sharing and collaboration too.

[RequestBin](http://requestb.in/)
---------------------------------


   <figure>
   <img alt="RequestBin, a free online service for inspecting HTTP requests as you develop code" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358510258392/requestbin.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=fe9dedf90d096c23de1cd1cf13e67ea7" loading="lazy" />
   <figcaption>
     RequestBin, a free online service for inspecting HTTP requests as you develop code
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Developer [Roberto Tyley](http://www.guardian.co.uk/profile/roberto-tyley) suggested this tool (with possibly the coolest URL on the list), which in its own words, "lets you create a URL that will collect requests made to it, then let you inspect them in a human-friendly way". Rather than burying your head in server logs or browser network traces, use this to see useful information easily.

[REDbot](http://redbot.org/)
----------------------------

Another suggestion from Michael Brunton-Spall: this time it's a tool which checks a page's cache headers and informs you about best practice. As Michael says, "it will let you know if you've forgotten to set the [max-age](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) correctly, if you've got static content without [far future headers](http://www.askapache.com/htaccess/apache-speed-expires.html) and so forth". Very useful.

[Postman Chrome extension](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en)
--------------------------------------------------------------------------------------------------------------------------------


   <figure>
   <img alt="Postman, a Chrome extension for working with REST APIs" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358510515067/postman.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=7617a4616bcaf9091e10a37b8f43105b" loading="lazy" />
   <figcaption>
     Postman, a Chrome extension for working with REST APIs
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Lead Android developer [Rupert Bates](http://www.guardian.co.uk/profile/rupert-bates) suggested Postman, a [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) client for Chrome. It allows you to quickly create HTTP requests with optional parameters, file upload support, variables and more, for testing APIs and other RESTful endpoints.

[Python Tutor](http://www.pythontutor.com/)
-------------------------------------------


   <figure>
   <img alt="Python Tutor, an educational tool for learning to program using Python " src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358510567940/pythontutor.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=2f96c21a995defed785ef3d5724e4156" loading="lazy" />
   <figcaption>
     Python Tutor, an educational tool for learning to program using Python 
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

A third suggestion from Michael Brunton-Spall, Python Tutor isn't strictly a tool, but an educational program showing how [Python](http://www.python.org/) code is executed. It beautifully illustrates the flow of code and how variables and methods interact with one another, making it useful for students and teachers alike.

[Python Anywhere](https://www.pythonanywhere.com/)
--------------------------------------------------


   <figure>
   <img alt="PythonAnywhere, an interactive web-based Python environment, usable from anywhere" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358510765114/pythonanywhere.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=3be69adb3ad01f814c5cd0eaf53b3c0e" loading="lazy" />
   <figcaption>
     PythonAnywhere, an interactive web-based Python environment, usable from anywhere
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Developer [Nicholas Tollervey](http://ntoll.org/about/), a Python guru, immediately rose to Michael's challenge and submitted PythonAnywhere as a "a funky service that, er, lets you get a hosted Python console anywhere (browser, iPhone, Android etc...)". Essentially a Python platform in the cloud, it makes for quick and accessible Python environments solely via a web browser.

[Cloud9 IDE](https://c9.io/)
----------------------------


   <figure>
   <img alt="Cloud9 IDE, a fully-featured development environment inside your web browser" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/18/1358510815487/cloud9.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=cfa2896d4b534504c55d9ee8ecbff136" loading="lazy" />
   <figcaption>
     Cloud9 IDE, a fully-featured development environment inside your web browser
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Client-side developer [James Gorrie](http://www.guardian.co.uk/profile/james-gorrie) suggested Cloud9 IDE, a masterfully-designed browser-based IDE. It's powerful and features good integration with common development tools, and even offers a free version. Proof of the power of HTML5 and the things we can build with them today.

Suggestions from Twitter
------------------------

Followers of the [@gdndevelopers](https://twitter.com/gdndevelopers) account submitted a couple of additions to this list – here's a few of the best.

[Niall Paterson](https://twitter.com/_niall/status/291871136281681920) seconded our recommendation of CodePen, while [James Sewell told us](https://twitter.com/Hons/status/291874514478968832) he prefers [REST Console](https://chrome.google.com/webstore/detail/rest-console/cokgbflfommojglbmbpenpphppikmonn?utm_source=chrome-ntp-icon) over Postman. Former Guardian Developer [Dan Vydra](https://twitter.com/dvydra) suggested a couple of useful tools, too: [/reFiddle+/](http://refiddle.com/), an interactive regex editor, and [Edit This Cookie](https://chrome.google.com/webstore/detail/edit-this-cookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en), a Chrome extension for, well, editing cookies.

What are your web development must-haves? Are there any useful browser-based debugging tools we've missed? Let us know below.
