---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-apr-18-scala'
headline: 'Scala at guardian.co.uk'
date: '2011-04-18'
authors: [Graham Tackley]
standfirst: 'Graham Tackley gives an overview of why we''re using the Scala programming language'
image:
  url: 'http://static.guim.co.uk/sys-images/Media/Pix/pictures/2011/4/18/1303132141004/Content-API-explorer-007.jpg'
  alt: 'Content API explorer'
  credit: 'Photograph: Public Domain'
tags: [Scala]
---

I recently gave a talk at the [London Scala Users' Group](http://www.meetup.com/london-scala/) about our use and experiences of the [Scala](http://www.scala-lang.org/) programming language.

The software behind theguardian.com is implemented using a fairly typical enterprise open source Java stack of [Spring](http://www.springsource.org/), [Apache Velocity](http://velocity.apache.org/) and [Hibernate](http://www.hibernate.org/), with a proprietary relational database backend protected by [memcached](http://memcached.org/). This has served us pretty well, and as you see from the [release notes](https://www.theguardian.com/info/developer-blog/2011/mar/24/release-109) posted in this developer blog we continue to be able to evolve and enhance this platform.

However, as a development team, we're always looking for tools, technologies and techniques that enable us to deliver functionality faster. As part of this effort, when we implemented our [Content API](http://content.guardianapis.com) last year, we chose to use Scala. This has worked out really well for us, and we're now choosing Scala by default for all new projects hosted on the Java Virtual Machine.

The [video of the talk](http://skillsmatter.com/podcast/scala/how-we-mostly-moved-from-java-to-scala) is online to watch. There's also an [interview over at InfoQ](http://www.infoq.com/articles/guardian_scala) which covers a lot of the background of our experiences with Scala.
