---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-10-code-mesh-2016'
headline: 'Code Mesh 2016'
date: '2016-12-10'
authors: [Dominic Kendrick, Kate Whalen]
standfirst: 'Code Mesh is a conference for non-mainstream programming languages. Here are a bunch of things we have learned, along with our highlights!'
image:
  url: 'https://media.guim.co.uk/d9cefdd8bd1bf3b0457899cb61594fbcb332216e/715_303_3317_1989/3317.jpg'
  alt: 'Final keynote of Code Mesh 2016 - Joe Armstrong and Alan Kay are seated onstage before the talk begins'
  credit: 'Photograph: Kate Whalen/The Guardian'
tags: [Advent developer blog 2016, Programming]
---

Using Scala and being fond of functional programming techniques at The Guardian, we were really looking forward to the [Code Mesh](http://www.codemesh.io/) lineup this year. We were especially excited about bringing more functional languages to client side development, so we were looking closely at the Elm and PureScript talks, as well as the more familiar Scala talks.

What follows is a quick round up of the talks we saw and things that interested us.

Conflict Resolution for Eventual Consistency
--------------------------------------------

As progressive web apps, service workers and an [offline-first approach](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/) become the latest and greatest thing, we need systems that can avoid the performance and connection issues of network dependence.

When multiple users can access and edit a document concurrently, conflicts will arise. At the Guardian, our editorial tools include a fairly extensive [content management system](https://www.theguardian.com/info/developer-blog/2014/mar/20/inside-the-guardians-cms-meet-scribe-an-extensible-rich-text-editor), therefore the insights from [Martin Kleppmann](https://twitter.com/martinkl) - as he discussed the different approaches and algorithms for conflict resolution - were incredibly helpful.


   <figure>
   <img alt="Martin Kleppmann giving his talk ‘Conflict Resolution for Eventual Consistency' at Code Mesh 2016. The slide is titled ‘Ordered List CRDT’ and shows how unique IDs are added to each transformation." src="https://i.guim.co.uk/img/media/e5d60aecab20d452ad7765debfbac76964c645f8/0_110_4032_2418/master/4032.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=490329cdb2384df70ba2385474740cc0" loading="lazy" />
   <figcaption>
     Martin Kleppmann giving his talk ‘Conflict Resolution for Eventual Consistency’
    <i>Photograph: Kate Whalen/The Guardian</i>
    </figcaption>
    </figure>

Eventual consistency requires delivery and convergence; a message should be relayed within a finite period, and if data diverges, it needs to converge again.

A system of operational transformations with unique IDs is one solution to concurrent operations; the unique ID can be based on the node ID and and an incrementing transaction ID.

<blockquote class='pullstring'>How do we design APIs for concurrently editable data, that are not horrendously confusing?</blockquote>

However, you will still need to decide which operation ‘wins’ in some scenarios (according to business requirements), and deleting operations remain tricky! Martin explained an approach where a character is marked as ‘deleted’, yet the ID is kept around as a tombstone, so that it can still be referenced.

Martin also gave an excellent talk at Code Mesh 2015 on [Transactions: Myths, Surprises and Opportunities](https://youtu.be/eo2EBdSbO10?list=PLWbHc_FXPo2jB6IZ887vLXsPoympL3KEy).

Load balancing is Impossible
----------------------------

Why do websites use load balancers? Abstraction and failover are the two main reasons, then finally, balancing load, which is more often about load distribution than load balancing. [Tyler McMullen](https://twitter.com/tbmcmullen), CTO at Fastly, has been modelling load balancing and request latency. This talk was of particular interest, since [Fastly is the Guardian CDN](https://www.fastly.com/customers/guardian).


   <figure>
   <img alt="Tyler McMullen, CTO at Fastly, giving his talk ‘Load balancing is Impossible’ at Code Mesh 2016. The slide shows the latency of different load balancing configurations." src="https://i.guim.co.uk/img/media/3c43c3262d42f43fa2e23a39f0f4fed7f2f4b466/318_575_3714_2227/master/3714.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f224a6053601ba962421a1bd329e0660" loading="lazy" />
   <figcaption>
     Tyler McMullen giving his talk ‘Load balancing is Impossible’.
    <i>Photograph: Kate Whalen/The Guardian</i>
    </figcaption>
    </figure>

Efficient load balancing is an exceptionally hard problem. Most load balancers talk to origin servers using a ‘round-robin’ or ‘randomize’ approach. However, random load balancing is detrimental to latency due to the high variance in random allocation. This talk was an exploration of other load-balancing methods.

<blockquote class='pullstring'>If you are not seeing latency issues, you are probably over-provisioned</blockquote>

At a scale where multiple load balancers are required, load balancing becomes even more challenging! Distributed load balancers are hard, and distributed ‘join-shortest-queue’ is a nightmare. What does work quite well in modelling is ‘power of two choices’, where the load balancer picks two nodes at random, then applies the ‘join-shortest-queue’ choice. The final option covered was ‘join-idle-queue’; where available servers ask for a task from the load balancer.

Quaich: A “Serverless” Microframework for Event-driven Scala Programming on AWS Lambda
--------------------------------------------------------------------------------------

This talk was looking at the [Quaich](https://github.com/bwmcadams/quaich) (pronounced ‘quake’) AWS Lambda library by [Brendan McAdams](https://twitter.com/rit).

This library simplifies the marshalling of AWS Lambda JSON events for various event types. This reduces a lot of the boilerplate code when working with HTTP requests for API gateway, and implements a scalatra-like interface for defining routes etc. We use Lambda a lot at The Guardian, so I’m looking forward to seeing support for other events types (S3, DynamoDb).

As an aside, our own [Simon Hildrew](https://www.theguardian.com/profile/simon-hildrew) is working on [Plaλ](https://github.com/sihil/plambda) (pronounced ‘plambda’) which attempts to [wedge the Play! framework](https://skillsmatter.com/skillscasts/9204-plambda-running-the-play-framework-in-aws-lambda) into Lambda. We also have an exciting list of [Lambda tools and examples](https://github.com/guardian/awesome-lambda).

Distributed Jamming with Sonic Pi and Erlang (Joe Armstrong and Sam Aaron)
--------------------------------------------------------------------------

Has there ever been a better keynote than [Joe Armstrong](https://twitter.com/joeerl), co-inventor of Erlang, talking about [Black MIDI](https://en.wikipedia.org/wiki/Black_MIDI), musical theory, and experiments with Erlang and [Sonic Pi](http://sonic-pi.net/)? We experienced the joy of live coding 19821 parallel processes (each representing one note) and discovered the pitfalls of process timing. As the after party kicked off, [Sam Aaron](https://twitter.com/samaaron) continued the live coding with Sonic Pi.


   <figure>
   <img alt="Code Mesh 2016 keynote ‘Distributed Jamming with Sonic Pi and Erlang’. Joe Armstrong adjusts a synth under instruction from Sam Aaron. The screen behind them shows Sonic Pi running." src="https://i.guim.co.uk/img/media/cc502b59985580c781270254849a66d06cd8014c/0_127_3766_2258/master/3766.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d46f883f9aa6ccdaf9dddbec62610505" loading="lazy" />
   <figcaption>
     Code Mesh 2016 keynote ‘Distributed Jamming with Sonic Pi and Erlang’
    <i>Photograph: Kate Whalen/The Guardian</i>
    </figcaption>
    </figure>

Streaming, Database & Distributed Systems: Bridging the Divide
--------------------------------------------------------------

An exciting and informative whistle stop tour of stream processing approaches and problems. [Ben Stopford](https://twitter.com/benstopford) showed us the analogs between streams and traditional table structures in terms of architecture, and then went further into the pitfalls of stateful stream processing. This was a lot to take it at 9am in the morning, but we do a large amount of stream processing as part of our analytics platform using AWS Kinesis and Lambdas. The ideas presented here should hopefully help us out in future stateful processing needs!

Web Programming without Errors, and Coding without Typing
---------------------------------------------------------

This was an impressive, high energy presentation about Elm! [Jessica Kerr](https://twitter.com/jessitron) did a fantastic job live coding her way through a Elm app for adding diagram annotations and gave a great introduction to [Elm](http://elm-lang.org/), it’s processing lifecycle, and how its static typing reduces runtime errors.

Jessica also did most of the presentation using [atomist](https://www.atomist.com/), a tool that assists project creation and evolution. It does this by using predefined macros for automating the management of code that may be boilerplate, or need to be duplicated across multiple locations.

You can also see [Jessica in action at Elm-conf](https://www.youtube.com/watch?v=jJ4e6cIBgYM).

Building a Graphical IDE in Elm/Purescript for an Embedded Language that Compiles to the Erlang VM
--------------------------------------------------------------------------------------------------

More Elm in this talk; [Claudia Doppioslash](https://twitter.com/doppioslash) took us a through an experience report on her IDE for developing software on embedded devices. She did a very thorough comparison between the different Elm versions, a great comparison between the various languages that compile to JavaScript, a good overview of [PureScript](http://www.purescript.org/) and the various libraries and frameworks that she has tried out.

Flexible [Paxos](https://en.wikipedia.org/wiki/Paxos_\(computer_science\)): Reaching Agreement without Majorities
-----------------------------------------------------------------------------------------------------------------

Heidi Howard gave a brilliant talk about constructing new fault-tolerant systems, with sufficient server personification to make the talk highly memorable.

<blockquote class='pullstring'>Majorities are not necessary to safely reach distributed consensus.</blockquote>

Heidi already has a detailed write-up of the key points on [her blog](http://hh360.user.srcf.net/blog/2016/08/majority-agreement-is-not-necessary/), which I recommend reading.

Final keynote: Joe Armstrong Interviews Alan Kay
------------------------------------------------

I feel like this section could just be a selection of aphorisms from [Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay):

> Computing is like a pop culture, it is not interested in the past

> By the time a language gets in good shape, the language has become obsolete

> You can only be proud of the fact that you did it, you can never be proud of the thing

> Science doesn’t give you science, something like the Royal Society gives you science; you have to have other people to debug your brain

Alan Kay confessed he used to be more of a page and paragraph person, until he worked at Xerox and needed to catch the attention and imagination of managers for stuff to get done.

Besides some amazing quotes, we also got a crash course in industry history as Alan talked through the evolution of programming. Conversation then ranged from music and philosophy, to biology.

Elsewhere
---------

If the monads, databases and lambdas became too much, Code Mesh also had a great track on the history and the philosophy of computer science. After a packed room last year for his talk on the Apollo guidance computer, [Brian Troutwine](https://twitter.com/bltroutwine) took the main stage to give us ‘A History of Space Stations’. Another fantastic talk was ‘Before Unix: An Early History of Timesharing Systems’ by [Mark Allen](https://twitter.com/bytemeorg).

Conclusion
----------

All in all, it was an enjoyable conference, with a passionate group of attendees and speakers. We will be back next year!

Videos of all the 2016 talks should be online soon. The Code Mesh 2015 talks can be found here: [https://www.youtube.com/user/ErlangSolutions](https://www.youtube.com/user/ErlangSolutions).
