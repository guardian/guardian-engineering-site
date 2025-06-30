---
layout: ../../layouts/blog.astro
slug: 'help-developer-blog-2012-oct-18-responsive-design-guardian-introduction'
headline: 'Responsive design at the Guardian: an introduction'
date: '2012-10-18'
authors: [Matt Andrews]
standfirst: 'An overview of what responsive design is and how we''re planning to make use of it at the Guardian'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/10/17/1350469579687/responsive-devices.jpg'
  alt: 'Responsive design: the same Guardian webpage, rendered on multiple devices'
  credit: 'Photograph: Matt Andrews/guardian.co.uk'
tags: [Help]
---

The rise of "responsive design", as the technique was coined by Ethan Marcotte in his now-classic [_A List Apart_ article of the same name](http://www.alistapart.com/articles/responsive-web-design/), is currently making waves all over the web. Perhaps most prominently displayed in the high-profile relaunch of the [Boston Globe](http://bostonglobe.com/) (a project presided over by Marcotte himself), it's also been used in recent revamps of more home-grown websites, including [Channel 4 News](http://www.channel4.com/news/) and [BBC News](http://m.bbc.co.uk/news).

Here at the Guardian we've been keen to dive into this approach ourselves. The benefits to us as developers are clear: we can avoid the headache of re-implementing features and concepts across multiple platforms multiple times, and streamline our release process to allow us to push updates and enhancements out to several of these platforms simultaneously. The benefit to the end user is the experience of browsing a webpage which is tailored for their particular viewing context, rather than attempting a one-size-fits-all approach which either forces everybody into a lowest common denominator pigeon hole, or assumes a high bar of entry which not all visitors can match.

This process has involved a restructure of almost our entire technology stack, ranging from JavaScript frameworks to server configurations. Our responsive design project is still in its early stages and we've yet to launch a release candidate, but we're experimenting with putting our work-in-progress beta site in public as we develop it. This page is by no means finished (and there's no guarantee it'll even work correctly at this stage) but it represents a snapshot of where the project is at the current time. **[You can view the current work-in-progress beta site here](http://beta.guardian.co.uk)** – ideally on a mobile device, as this is our design starting point.

This is the first entry of what will hopefully be several in a series about how we've architected this new responsive Guardian and where we see it developing, but for now consider this a brief overview of the project.

One major enhancement of the in-progress system is the concept of ["swimlaning"](http://akfpartners.com/techblog/2008/05/30/fault-isolative-architectures-or-%E2%80%9Cswimlaning%E2%80%9D/). Broadly speaking, this is the process of structuring a web application in such a way that if one part of it fails, the rest of the app carries on as normal - decoupling unrelated parts so that they can be released and updated independently. We've put in a lot of structural groundwork to enable this, meaning that, for example, our articles are served via different servers from our galleries – and if our gallery server crashes and burns, access to articles won't be impeded. Equally, we can roll out a code update to galleries without interrupting anyone's experience of articles – this is swimlaning.

We're using [Play](http://www.playframework.org/), a Scala framework, to power the site. The flexibility and power of [Scala](http://www.scala-lang.org/) over its internal predecessor, Java, has opened up our development and allowed us to code quickly and responsibly. Similarly, our fantastic [Content API](http://www.guardian.co.uk/open-platform) has meant that we've never had to write a database query – all of our code communicates with the API to receive its data.

On the client-side, the app is heavily structured around the [AMD JavaScript pattern](http://addyosmani.com/writing-modular-js/), with use of [RequireJS](http://requirejs.org/) to load distinct modules which are then combined together at build time. CSS is organised according to [Jonathan Snook's SMACSS standards](http://smacss.com/) and we're also making use of [Pasteup](http://pasteup.gu.com/), the Guardian's in-house styleguide and baseline CSS library, to manage some of our styling.

The responsive aspect of the project is still fairly brief – our initial goal is simply to update the Guardian's [current mobile website](http://m.guardian.co.uk). Eventually we aim to scale up to handle resolutions up to desktop width, but this goal is a while away yet. With that in mind, the site currently feels a little unwieldy when viewed at large resolutions, but we expect this to evolve gradually as the project continues. There are a few nods to the responsive concept, though – watch as "trail text" appears underneath related content headlines as the device width increases (or you resize your browser).

Over the coming months we expect to share more about [our code](https://github.com/guardian/frontend), what we've learned, and what we're planning, but for now, this is all. I'd like to point out again that what we're sharing today is a work-in-progress, and should be considered only as a "beta" project (as the page's URLs should confirm). That said, we welcome feedback – if you have any initial thoughts and opinions on the project, we'd love to hear them below. It's likely that we're already aware of any major issues, but if you've spotted an annoying bug or have a device which renders our content in an unusual-looking way, please let us know.

This is just the beginning of a long-term project we'll be working on – stay tuned to hear more about it.
