---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-may-29-maintaining-an-open-source-project-at-the-guardian'
headline: 'Maintaining an open source project at the Guardian'
date: '2015-05-29'
authors: [Robert Rees]
standfirst: 'Scribe is the most popular in-house open source project in the Guardian. Recently community developers have been making some major contributions to the project, confirming the value of open-source and the benefit of the Guardian of being open about our work.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/4/2/1427986937368/4582294721_7d9c5ea7dd_o-2060x1236.jpeg'
  alt: 'Children sharing a snack'
  credit: 'Photograph: Ben Grey/flickr'
tags: [Computing, Open source, Programming, Scribe]
---

Over the 2015 Easter holiday the [Scribe project](https://github.com/guardian/scribe) received more than 3000 stars (a combination of bookmarking, liking and favouriting) on [Github](https://github.com), making it easily one of the most popular open-source projects we have created at the Guardian.

In addition to that milestone we also celebrated the release to our internal production systems of a number of community-contributed changes to Scribe. Guardian journalists now benefit every day from participation in the open-source community!

With what Scribe’s achieved, it’s worth taking a look at the ups and downs of open-sourcing software and of the Scribe project itself.

What is Scribe?
---------------

Scribe is a [polyfill](https://remysharp.com/2010/10/08/what-is-a-polyfill) (although sometimes it has a touch of the [shim](http://irisclasson.com/2013/01/30/stupid-question-139-what-is-a-shim/) about it) for the [Content Editable spec](http://www.w3.org/TR/2008/WD-html5-20080610/editing.html) ([MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable) | [HTMLDoctor](http://html5doctor.com/the-contenteditable-attribute/)). Content Editable allows blocks in a web page to become editable directly in the browser, and in some ways it is the culmination of Tim Berners-Lee’s vision of the read-write web.

As a polyfill Scribe exists to make the behaviour of Content Editable consistent across browsers. You can read [more about Scribe in our original Developer Blog post](https://www.theguardian.com/info/developer-blog/2014/mar/20/inside-the-guardians-cms-meet-scribe-an-extensible-rich-text-editor) about it.

Expanding Scribe with Plugins
-----------------------------

When you add in its [eco-system of plugins](https://github.com/guardian/scribe/wiki/Plugins) then Scribe is a powerful and complete web editor. The link above is just to the plugins that the Guardian development team maintains. A number of other developers have created their own plugins to meet the needs of their own users.

Ankit Ahuja from Coursera has written about [how Scribe has been used to create course material](https://tech.coursera.org/blog/2015/03/31/make-editing-courses-on-coursera-fun/). Even better, [the Coursera plugins have been open-sourced](http://coursera.github.io/scribe-plugins/), so if you want to add a table in Scribe you can simply load the existing plugin.

A combination of plugin configuration and the ability to fork an existing plugin means that it is possible to create bespoke behaviour easily.

Recent contributions
--------------------

Plugins are not the only place that people are making contributions to Scribe. Recently we wanted to try and change our default undo manager – [our users were frustrated by the default behaviour](https://github.com/guardian/scribe/issues/335) which was to undo one character at a time. A very safe choice but not suitable for journalists who wanted something a bit more dynamic. Enter Abdulrahman Alsaleh who [submitted a PR](https://github.com/guardian/scribe/pull/346) that attempted to address our tentative issue on the subject whilst also [scratching his own itch](https://github.com/guardian/scribe/issues/334) in classic open-source style. Getting the pull request into the code base involved effort from both ourselves and Abdulrahman but, when it finally landed, our users loved it and we had saved a lot of effort having to code it entirely by ourselves.

Another great recent contribution came from David Tobin who submitted [a PR that allows Scribe instances to control what default plugins](https://github.com/guardian/scribe/pull/363) are loaded in a base Scribe instance. By default we choose a setup that matches what we want for the Guardian but we always realised that some of those baked-in rules ran contrary to other people’s expectations.

The configuration contribution was less user-facing and more aimed at the developer community that exists around Scribe. Making it easier for people to use and build on what we had already built and making it more valuable to the community. Such contributions help develop the software we collectively own rather than waiting for Guardian developers to find the time to address an issue that doesn’t directly affect our use of Scribe.

Both contributions show the immense [value and potential of open-source software to organisations like the Guardian](https://www.theguardian.com/info/developer-blog/2014/nov/28/developing-in-the-open). It is great for an organisation to be able to open repositories as freely as we have done and it feels even better when that openness is rewarded with collaboration and contributions from the community.

To those people who make this possible: thank you.
