---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-apr-08-building-bonobo-the-guardians-open-source-api-key-management-tool'
headline: 'Building Bonobo, the Guardian''s open source API key management tool'
date: '2016-04-08'
authors: [Maria-Livia Chiorean]
standfirst: 'Here’s the story of how we built our own open source API key management tool and of how we made the new starters grow'
image:
  url: 'http://media.guim.co.uk/1152ced8c0bf4ca7e697ded85be1ed9d86abadd2/0_313_4887_2933/4887.jpg'
  alt: 'Credit: Photo by Anup Shah and Fiona Rogers / Rex'
  credit: 'Photograph: Anup Shah and Fiona Rogers / Rex'
tags: [Programming]
---

Getting involved
----------------

It was a sunny September morning when I was first told that we would be building our own key management tool. Or maybe it was October - I can’t quite remember. Either way I was one of the newest members of the team, having joined straight from university I had little knowledge of how applications are developed in the real world. Little did I know about the great amount of knowledge I would be gaining over the next 3 months.

The motivation behind this project was replacing [Mashery](http://www.mashery.com/), the API keys management service we were using at that time. Having our own tool - created in house - would give us more flexibility over our data.

We decided to call the product Bonobo. The plan was for it to be used by Guardian staff for a number of things; to visualize the people who had signed up for API keys, to manage their accounts and keys, to create new users and keys and to filter them. The idea was that the application was also to be used by people who wanted to register for developer keys or submit requests for commercial keys. Our main goal was to build a quick and easy service that could benefit everyone.

An ad hoc team of three developers was formed within the Platforms Team - two out of three were new starters. The rest of the team helped to review the code, share ideas and also gave us some valuable feedback. We had a very good work flow, splitting the process into small tasks and allowing ourselves enough time for research and to experiment. We spent a long time experimenting, given that the new starters were not only new to the company but also had no previous experience.

Technology
----------

The software developers from the team had been discussing the project for weeks and after experimenting with different products we decided to use [Kong](https://getkong.org/) for our API access control layer. Kong is an open source service developed by [Mashape](https://www.mashape.com/) which provides a wide range of plugins. We were particularly interested in three of them: key authorisation, rate limiting and analytics. This service uses Cassandra for storing the API keys and other necessary data.

We built the application using the [Play Framework](https://www.playframework.com/) and [Scala](http://www.scala-lang.org/) [\-](http://www.scala-lang.org/) the programming language that the Guardian widely uses for backend development. This required a lot of patience as the community for these technologies is still quite small and the documentation can be rather limited. However, having very talented Scala developers in our team allowed us to make mistakes and guided us in the right direction. They made a big difference.

As for hosting Bonobo, storing our data and sending emails we used [Amazon Web Services](https://aws.amazon.com/). One of our biggest challenge was using DynamoDB. For example, getting paginated results is not something that can be done easily and it required some work from our side. We also faced some obstacles while writing our CloudFormation configurations because of the complexity of the system. It took some complicated diagrams to create the perfect communication between Bonobo, Kong and Cassandra.

After the time and effort spent designing the perfect system, we had little energy left for actual user interface. This is where Twitter’s Bootstrap comes in. Is it just me or is Bootstrap making a good team especially with the backend developers?

Step by step
------------

This was an application developed whilst we learnt about the technology. This meant we started with the basics. For example we started with simple things like connecting to DynamoDB to save and retrieve data. Slowly we learnt about how to [add forms in the Play Framework](https://www.theguardian.com/info/developer-blog/2015/dec/30/how-to-add-a-form-to-a-play-application), why we should use case classes in Scala and how to switch from Java and start thinking functional. We felt like we were being punished when we had to learn about [Futures](http://www.infoq.com/presentations/Asynchronous-Scala-Java) and when we had to deal with CloudFormation, but after we survived all of that, we knew we were going to be just fine. And so was Bonobo.

Soon we had a working prototype and made the application deployable using [Riff Raff](https://github.com/guardian/riff-raff), our in-house continuous deployment tool. After making sure all the three endpoints (admin, developer, commercial) had basic functionality, it was time to prepare for the data to be migrated from Mashery. That was when we wished we had been thinking more thoroughly about our models - they didn’t match. You learn from your mistakes, they say.

Migrating from Mashery took lots of scripts and patience. The first day we tested the full stack by slowly replicating our traffic was painful. Cassandra was throwing errors we weren’t able to solve, Kong seemed to have many bugs we weren’t aware of and we were generally overwhelmed by the situation. It took a whole week of talking with Mashape and experimenting to regain faith in Bonobo. A few fixed issues later and after drinking too much coffee, we finally felt confident with the results. And we still had a few days left before the deadline. All we had left was celebrate.

A couple of months later
------------------------

We have been using [Bonobo](https://github.com/guardian/bonobo) as our new key management tool for over two months now. From a business perspective it is a great product, people are using it daily and even external companies have expressed an interest in using it. The plan going forward is to keep it performant and secure and to make it less Guardian specific so that everybody can benefit from our open source code.

Looking back, I realise there are things that could have been done better. It’s always like this. However, we have learnt a great deal as individuals and as a team. There is no better way to start your career than with a project like Bonobo. You get to be part of every bug, every fix, every scream of despair and every success. And when you have a passionate team around you, the process is always a lot easier.
