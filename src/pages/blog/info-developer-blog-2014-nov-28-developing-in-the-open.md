---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-nov-28-developing-in-the-open'
headline: 'Developing in the open'
date: '2014-11-28'
authors: [Robert Rees]
standfirst: 'In the Digital Development department we try to be as open and transparent about our development as we can be. That means developing in public repositories where anyone can see our work. What does it feel like to work this way and why do we think it matters?'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/10/10/1412948776662/2668834386_e515577409_o-1024x768.jpeg'
  alt: 'A sign reading "Internet Open"'
  credit: 'Photograph: Blaise Alleyne/flickr'
tags: [Programming]
---

At the Guardian one of our key goals is to be open, with our audience and with our communities. Part of this for the development team is trying to be open with the code and products we are creating.

Some of the things we create are useful for lots of people: [gu-who](https://github.com/guardian/gu-who) helps manage your Github organisations and set rules for the members, [Scribe](https://github.com/guardian/scribe) is a rich-text editor built on top of the [contenteditable spec](http://www.w3.org/TR/2008/WD-html5-20080610/editing.html), in conjunction with Mozilla and the [Knight Foundation](http://www.knightfoundation.org/) we have created a platform for data journalism called Swarmize. Other projects are more specialised, [Alerta](https://github.com/guardian/alerta) is a set of applications that allow you to monitor and manage events and raise alerts based on them.

We have roughly three categories of projects: _closed_, the project is sensitive (perhaps embargoed for a specific release date or it reveals how we do things within the Guardian we think are unique to us); _open_, this is the default, the code and development are in the open, but we have not given the code an open-source license and we are developing the software specifically for our needs. Finally there is _open-sourced_ where the project has a license and we encourage people to use it and contribute back to the project.

The open by default model means that if we start all our projects in this mode they will be easier to release them under an open source license later as there will not be the temptation to slip in proprietary information and there is an impetus to properly divide the responsibilities of the code in the repository. It also helps us to live our principles and to think of the audience and community we have beyond engineering.

A few people have asked me how it feels to develop software in this way, after all this way of working is so rare in the industry that I had never done it before working at the Guardian. Other employers had open-sourced projects after development was complete and the opening of the project was a big discrete event. Other projects were owned and driven by developers first and incorporated into the closed codebase we worked on, usually via library dependencies.

Developing in the open is disconcerting and many times people go for the safety of using private repositories. When you work this way then mistakes are very public and it can be difficult take back a mistake that has been broadcast on the internet, particularly on [Github](https://github.com).

Openness is a constraint and like a lot of constraints one that ultimately leads to greater discipline in your work. Making things public means you think about what the consequences of your actions will be more. It also serves as a kind of code review: are you happy to attach your name publicly to this convoluted piece of code or model-breaking hackery?

You also need to accept that at some point you will make a mistake and therefore it is important to think of what you will do to mitigate and correct mistakes before you make them. When you are developing in the open you are going to have to secure your endpoints and make sure that you can revoke permissions to keys and services when you have to. Security through obscurity is never really an option but in open development it is not even a starter.

It is not just about checking API keys or other private information into the repository either. The way that you interact with people in pull requests and issues changes too. You find yourself communicating with people outside the Guardian, sometimes explicitly in the bug reports and issues that people raise on our projects; often implicitly when talking at conferences to the people who have looked at Guardian code for inspiration or understanding.

These interactions help you understand that the way you work and behave can have a huge impact. On the positive side you can inspire people and embody the values of the Guardian in your work. Less optimistically, a tetchy or off-colour comment can annoy not only a colleague but possibly a reader and potential collaborator.

My experience is that open projects tend to be better behaved and more civil than those buried deep inside a big organisation. Rather like the family that behaves better when a stranger is visiting.

At the same time I am a realist; the [Guardian Github organisation](https://github.com/guardian/) lists three hundred projects. Most people do not spend their time crawling through the projects looking for what is happening in them. We may be working in the open but often no-one is watching.

One of the great things about being a [developer at the Guardian](http://developers.theguardian.com) is that when I am discussing software with people, inside and outside the organisation, I can often stop a conversation and simply say “let me just show you the code”.
