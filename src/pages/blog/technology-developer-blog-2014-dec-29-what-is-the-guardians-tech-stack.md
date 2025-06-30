---
layout: ../../layouts/blog.astro
slug: 'technology-developer-blog-2014-dec-29-what-is-the-guardians-tech-stack'
headline: 'What is the Guardian''s tech stack?'
date: '2014-12-29'
authors: [Robert Rees]
standfirst: 'The Guardian does not have a fixed tech stack, instead we allow our teams to choose the technology that solves their problems. That leads to a lot of variety in the software we use'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/12/22/1419270610775/14067308622_641b7fda42_o-2060x1236.jpeg'
  alt: 'A variety of spanners providing a metaphor for software tools'
  credit: 'Photograph: flickr'
tags: [Computing, Programming, Software]
---

The last time I had to give an answer as to what the Guardian’s “tech stack” is was for [Silicon Milkroundabout](https://www.siliconmilkroundabout.com/). It turns out that for the event’s booklet, “it depends” is not the right answer.

The most common answer I give when pressed is the following:

*   [AWS](http://aws.amazon.com/)
*   [Scala](http://www.scala-lang.org/)  
    
*   [Play](https://www.playframework.com/)
*   [JavaScript](http://www.ecmascript.org/)
*   [AngularJS](https://angularjs.org/) or [micro-libraries](http://microjs.com/)
*   [Postgres](http://www.postgresql.org/)
*   [Elasticsearch](http://www.elasticsearch.org/)
*   [Objective C](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html), [Swift](https://developer.apple.com/swift/) and Java for native device apps

All these things are on the Guardian’s “whitelist” of technologies where no-one would question why you would use them and there are plenty of existing projects and code to provide examples and support if needed.

It is also a drastic simplification of the situation.

In terms of historic projects we have codebases written in Java and Python. Python on Google App Engine is also whitelisted so it is a really handy platform for serving out static content or single-page apps that are really written in JavaScript.

The less critical an application is, the less concern there is about the technology used. Monitoring displays, tools for journalists and command-line utilities can be a good place to play around with different technologies.

We have decided that in future we should not be trying to run our own datastores. We have historically run [Mongo](http://www.mongodb.org/) instances and the bulk of our archived content lives in an Oracle database. We have already built things on top of [DynamoDB](http://aws.amazon.com/dynamodb/) but it also seems that MySQL compatibility is the lingua-franca of cloud stores with both Amazon and Google offering CloudSQL services. So even our storage story is complicated!

A lot of organisations standardise technologies to help them move faster. Our whitelist attempts to do this for us. If you believe in autonomy, though, then you have to let teams choose the technology that solves their problems most effectively.

If you want to do simple asynchronous processing you might also choose to make the case for using [Node](http://nodejs.org/) rather than something like [Akka](http://akka.io/). As cloud services mature then you may want to use services from both [Google](https://cloud.google.com/) as well as Amazon.

The consequence is that whenever someone asks what the Guardian’s tech stack is the answer really is “it depends” and it depends on the problem the team is trying to solve. A lot of people look to a company’s tech stack as a proxy for progressiveness and innovation. I hope that our lack of a fixed tech stack shows our genuine commitment to innovation and letting teams deliver value, rather than following rules.
