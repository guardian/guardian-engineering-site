---
layout: ../../layouts/blog.astro
slug: 'info-2024-feb-08-pinboard-transforming-communication-across-the-newsroom-part-1-of-3'
headline: 'Pinboard: transforming communication across the newsroom (part 1 of 3)'
date: '2024-02-08'
authors: [Tom Richards, Ana Pradas]
standfirst: 'Pinboard is a discussion and asset sharing tool (or rather tool within other tools) which is gradually transforming how the news room communicate as news stories move through the various phases of the production process'
tags: [Pinboard]
---

_This is part one of three ([part two](https://www.theguardian.com/info/2024/feb/09/pinboard-transforming-communication-across-the-newsroom-part-2-of-3) and [part three](https://www.theguardian.com/info/2024/feb/10/pinboard-transforming-communication-across-the-newsroom-part-3-of-3))._

<figure>
                <iframe class="video" src="https://youtube.com/embed/k2ApXAmUo1E" title="Introducing... Pinboard" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

Origin Story
------------

For the past few years, a lot of digital communication in the newsroom had been happening over email and chat – crucially outside our editorial tools (tools being the place where the content people are communicating about is actually being produced) which creates the potential for confusion and mistakes given the pace of the news agenda. Meanwhile, there was a general feeling that pieces would benefit from preparing assets (images and video) earlier in the production process.

David Blishen (the group product manager of the Editorial Tools team at the time) set the team a very broad yet succinct brief which was titled ‘content association’. Myself and Jenny (another developer in the team at the time) set about exploring the problem and prototyping some ideas, with the loose goal of being able to communicate better within our own tooling, with a focus on sharing assets (ideally earlier in the production process). We soon had our wonderful product designer, Ana Pradas, join our exploration.

We approached the challenge by starting with a discovery phase. We wanted to understand:

*   Who works on a story?
    
*   How many people does it take to put a story together?
    
*   How do they talk to one another?
    
*   Does a person’s role make a difference in their struggles with assets?
    
*   Do people work differently in different departments?
    
*   Do people work differently in each office?

So that we could learn what their main obstacles were and what the core problem we needed to solve was, we shadowed and talked to people across London, US and Sydney offices – working in different roles in editorial, from commissioning editor, to imaging, to picture editor, liveblogger, subeditor and designer.

From discovery all the way to beta testing we found that the biggest problems we needed to solve for users were:

*   Not creating yet another thing they need to look at elsewhere. Being integrated with the tools they are already using was important.
    
*   Each desk is a different world. They work at different paces, with different rota shifts, but at the same time, there is no such thing as an isolated desk. We initially tested with sports liveblogs and the [Global Development](https://www.theguardian.com/global-development) desk and although the feedback was promising and helpful, we quickly learned that launching to a single desk at a time wasn’t going to work.
    
*   We really wanted to avoid people using ‘noted-out article text’ at the top of Composer (our content management system) for communicating and exchanging assets.

Some of our main UX and design challenges were:

*   We needed to design something that could work integrated in tools with very different interfaces, purposes and users.
    
*   We were going to start with Composer (our CMS) and Grid (our picture system) to begin with, but would need to consider potentially becoming available in other tools without requiring a major redesign.
    
*   It needed to work for people working on small laptops from home and for people with big screens in the office. Screen real estate is already tricky in tools.

The Technology
--------------

Let’s start with language, it’s all [TypeScript](https://www.typescriptlang.org/), for client, server and infrastructure. We have shared constants and logic between all three and as such the Developer Experience has been great. TypeScript’s type system is pretty awesome these days, you can do lots of functional stuff and it’s fairly light.

We define infrastructure with [CDK](https://aws.amazon.com/cdk/), a good chunk of which is [GuCDK](https://github.com/guardian/cdk), but some of the earlier parts of Pinboard we have not yet migrated, since GuCDK was just getting started when Pinboard was taking shape.

We build with [esbuild](https://esbuild.github.io/), which is super fast. This is great locally, but combined with some parallelisation in our CI we have kept our build times down below a couple of minutes despite it being quite a big project these days.

We use [AWS Lambda](https://aws.amazon.com/lambda/) for everything server-side, eight lambdas at the last count. So aside from the database it’s all serverless, which made scaling straight forward and splitting things up has provided easy separation of concerns compared with a big monolith. Crucially, too, lambdas are very quick to deploy, and so if we have no infrastructure changes in a release, it typically takes about two seconds – great for rolling back, fixing quickly and combined with fairly quick builds makes for a fairly snappy feedback loop.

We use [AWS RDS (Postgres flavour)](https://aws.amazon.com/rds/postgresql/) for our own data (eg. what messages have been sent). Prior to that, we used [DynamoDB](https://aws.amazon.com/dynamodb/) for a good while [until we needed a more relational structure](https://github.com/guardian/pinboard/blob/main/ADRs/database.md).

We use [AppSync (AWS’ managed GraphQL)](https://aws.amazon.com/appsync/) for abstracting over the data we get from various sources; our own from our database, but also pulling in from other systems, such as workflow, the grid etc. and crucially for the real-time aspects of pinboard (but I’ll dig into that a bit later). We use [Apollo](https://www.apollographql.com/) on the client for connecting to AppSync.

Then on the client we have a fairly typical Guardian setup; [React](https://react.dev/) (actually, [Preact](https://preactjs.com/) in [compatibility mode](https://preactjs.com/guide/v10/switching-to-preact) to keep the bundle size down) with [Emotion](https://emotion.sh/) for styling and bundled using [Webpack](https://webpack.js.org/) (although we used [Parcel](https://parceljs.org/) for a good while).

Take a look at the architecture diagram to see how all that comes together:


   <figure>
   <img alt="Pinboard Architecture Diagram as of 5 Oct 2023. It shows how all the key parts of pinboard fit together, notably how the host application authenticates and loads from the bootstrapping-lambda, how the client then requests things from AWS AppSync, and how these are routed to various other lambdas, including the database-bridge-lambda." src="https://i.guim.co.uk/img/media/11e23c9754d1dba71aa414555fa6a1846bbf799b/0_0_2150_1610/master/2150.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9f7ce7e6dbf63c3f730415e8d9ff06da" loading="lazy" />
   <figcaption>
     Pinboard Architecture Diagram as of 5 Oct 2023 (see <a href="https://github.com/guardian/pinboard#architecture-diagram">https://github.com/guardian/pinboard#architecture-diagram</a> for latest)
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

  
_This is part one of three ([part two](https://www.theguardian.com/info/2024/feb/09/pinboard-transforming-communication-across-the-newsroom-part-2-of-3) and [part three](https://www.theguardian.com/info/2024/feb/10/pinboard-transforming-communication-across-the-newsroom-part-3-of-3))._

Credits
-------

Pinboard was built by **[Tom Richards](https://www.theguardian.com/profile/tom-richards)**, **Jenny Graham-Jones**, **[Thalia Silver](https://www.theguardian.com/profile/thalia-silver)**, **Andrew Nowak**, **Phillip Barron** & **Ara Cho** with additional development contributions from **[Fred O’Brien](https://www.theguardian.com/profile/frederick-o-brien)** & **[Samantha Gottlieb](https://www.theguardian.com/profile/samantha-gottlieb)**. Product Design from **Ana Pradas** and Product direction from **[Calvin Dickson](https://www.theguardian.com/profile/calvin-dickson)**. All the while supported by the rest of the content production team in the Product & Engineering department. Not forgetting the input/time/effort from countless Guardian journalists, who have helped shape Pinboard.
