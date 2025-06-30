---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-aug-12-open-sourcing-grid-image-service'
headline: 'Open sourcing Grid, the Guardian’s new image management service'
date: '2015-08-12'
authors: [Sébastien Cevey]
standfirst: 'This is the story of how we are building Grid, the Guardian’s new image management system, working very closely with our editorial colleagues and using a modern technology stack. Oh, and it’s all Open Source.'
image:
  url: 'http://media.guim.co.uk/55b1fa7f4d3c13a5017a773658abd33cf4bbfd21/0_0_2286_1371/2286.jpg'
  alt: 'Screenshot of the Grid image service showing results for a search for Edward Snowden'
  credit: 'Illustration: The Guardian'
tags: [Open source, Software]
---

For about a year, a small dedicated team has been building the Guardian’s new image management service.

From the beginning, the [vision](https://github.com/guardian/grid/blob/master/VISION.md) was to provide a universal and fast experience accessing media that is well organised and using it in an affordable way to produce high-quality content.

To deliver it, the team relied on a pragmatic Agile approach, working directly with users to quickly develop a product that fits their needs and expectations. The new service is now integrated with our print workflow and used for almost half of the images published in our digital content.

It’s called [Grid](https://github.com/guardian/grid) and today we are open sourcing it.

<figure>
                <iframe class="video" src="https://www.youtube-nocookie.com/embed/ZoddCAH9EPE?wmode=opaque&feature=oembed" title="Sample demo use of Grid to search, select, preview, upload and crop images, as well as importing them into the Composer CMS." allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

Modern editorial tools
----------------------

As the wider Editorial Tools teams worked on building a modern suite of editorial products, from content authoring and workflow management to editing of front and section pages, the need for a rich source of media became increasingly pressing.

Unfortunately, the incumbent system was nearing end-of-life, having been around for over 15 years. Old and crippled by a poor and incomplete API, the need for a replacement wasn’t controversial.

We set out to buy a commercial image management system that met all our requirements:

*   Ingest and index all our images past, present and future
*   Very fast and powerful search
*   User upload, metadata editing, cropping, publishing of optimised assets
*   Rights management, historical usage records
*   Collaboration workflows
*   In-browser experience from anywhere
*   Integration with all our internal tools (Composer CMS, fronts editing tool, InDesign for print, etc)
*   Deployable to the AWS cloud

Build vs buy is often a difficult decision, and while there were systems that we could have bought in, they were typically expensive, a poor fit with our existing technology, or not yet shipping. On top of that, they would all have required various levels of customisations to fit our needs, at the risk of complicating future software upgrades.

When we spoke to our colleagues in other publishers, we found they had all encountered the same challenges.

Ultimately, we believe the quality of our editorial tools directly influences the journalism we are able to produce at the Guardian. Having a flexible solution completely tailored to our needs and which we can continue to build on was much more important to us than betting on a proven but more constrained off-the-shelf solution.

Collaborative development
-------------------------

The work started with a single developer working on a proof-of-concept for 4 months, at the end of which we had a basic but functional prototype, proving the feasibility of the project.

After a short period of due diligence and official project sign-off, the project was officially started. Over the last 11 months, the [team](https://github.com/guardian/grid/graphs/contributors) has grown from 1 to 4 developers, along with a group product manager and a UX architect.

From the beginning, the philosophy of the team was to move fast and iterate quickly. The first images were used in production after less than 3 months, with usage steadily growing to around 45% of the images in our digital content today. It also provides most images for our front and section pages, as well as our membership site. And, last but not least, it’s also used every day to put images into the newspaper.

It’s worth noting that the migration has been on a purely voluntary basis: nobody was forced to moved to the new system, users chose to adopt Grid on their own because it worked better for them.

We are closely tracking the rate of adoption using our KPI dashboard, with the goal to fully transition to Grid as the sole source of imagery for all Guardian products in the coming few months.


   <figure>
   <img alt="Grid KPI dashboard showing adoption rate on published content." src="https://i.guim.co.uk/img/media/8ec10dda65cf6cf64be53b34549416f1b535a75d/82_74_2085_1251/master/2085.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=51cf4e6866aee9308d18d59d582d31e9" loading="lazy" />
   <figcaption>
     Grid KPI dashboard showing adoption rate on published content.
    <i>Illustration: The Guardian</i>
    </figcaption>
    </figure>

We attribute much of the success and speed of this project to the development methodology we adopted.

Borrowing both from the [developer anarchy](http://martinjeeblog.com/2012/11/20/what-is-programmer-anarchy-and-does-it-have-a-future/) approach and [previous experiments in development processes](https://www.theguardian.com/info/developer-blog/2015/feb/09/do-what-you-want-building-great-products-through-anarchy) at the Guardian, all members of the Grid team work directly with users, picture and sub-editors, imaging and rights experts, as well as with the other teams consuming images.

Maintaining this constant dialogue allows us to form a clear sense of priorities: what are the main blockers, what is the next most important thing, how many people struggle with a feature, etc. By confronting the engineers with the reality of the problems, they are able to identify quick wins and, more generally, the technical opportunities to find the simplest solution.

By developing personal relationships with many of our users, rather than abstracting them away behind story cards and layers of management, we also get to empathise with their needs and frustrations. Conversely, users also learn about the human beings behind the products they use, which helps dispel resentment driven by management barrier (“_they_ never do what we ask for”) and replace it with more polite and constructive conversations. In the best case, power users feel they are part of the development team – which they are.

Finally, this process empowers both developers and users to make a difference on a day-to-day basis. There is nothing more satisfying for everyone than being able to go back to a user within less than an hour to show her that her niggle has been fixed.

<blockquote class='pullstring'>It’s so fast – really makes a difference that it’s so quick to search</blockquote>

One of the reason traditional management structures don’t encourage such direct interactions is the fear that they would distract the team from working on the less obvious but more important challenges. We have found that having a [clear product vision](https://github.com/guardian/grid/blob/master/VISION.md) as well as committing to medium term high-level objectives and a longer term roadmap is enough to keep the work focused. They are also extremely valuable resources to share with users to help them put the product and their demands in perspective.

This way of working has proven very successful for us to deliver value quickly and at a very low expense.

Technical innovation
--------------------

The architecture of Grid draws from the best practices developed by various teams across the department. We tried to stay pragmatic, by delivering value at the highest cost/benefit ratio, while also constantly allowing ourselves to experiment and innovate where we see an opportunity.


   <figure>
   <img alt="Architecture diagram for the Grid image system" src="https://i.guim.co.uk/img/media/4b90640b27d458a50f0611199b700be987dd6c93/0_0_1190_721/master/1190.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d0a1acd912a651925bbceb83f0d8f8bb" loading="lazy" />
   <figcaption>
     Architecture diagram of the services forming the Grid image system.
    <i>Illustration: The Guardian</i>
    </figcaption>
    </figure>

The overall system follows the principles of a [microservice architecture](http://martinfowler.com/articles/microservices.html), with server-side components written in [Scala](http://www.scala-lang.org/) ([Play framework](https://playframework.com/)) and communicating asynchronously via SNS/SQS as much as possible to improve the overall resilience to failures.

The fast search is built on top of an [Elasticsearch](https://www.elastic.co/products/elasticsearch) cluster which indexes all the images and their metadata, while other AWS services are leveraged to store files ([S3](https://aws.amazon.com/s3/)) and metadata edits ([DynamoDB](https://aws.amazon.com/dynamodb/)). Horizontal scaling enables us to comfortably support our archive of over 3 million images (8 TB), with around 20,000 new images ingested every day.

All our services are implemented as [hypermedia APIs](https://en.wikipedia.org/wiki/HATEOAS) using our standard [argo media-type](https://github.com/argo-rest/spec). Relying on expressive REST APIs allows us to expose business logic, conditional actions (eg subject to permissions or business rules), and links to other resources declaratively in the API responses themselves, rather than hardcoding them in the clients (for more details, see my [Hypermedia: APIs of the Web](http://slides.com/theefer/hypermedia-apidays) talk). The [theseus](https://github.com/argo-rest/theseus) JavaScript client library provides a simple interface for argo APIs.

The main user interface is implemented as an AngularJS application, written in ES 2015 (aka ES6) with the excellent [JSPM](https://github.com/jspm/jspm-cli)/[SystemJS](https://github.com/systemjs/systemjs) combo as package manager and module loader. Some advanced UI features, such as the smooth infinite scrolling of search results, make heavy use of reactive programming (see [Infinite Scrolling with Angular and RxJS](http://slides.com/theefer/infinite-scroll-ngrxjs)).

We have found that these generic self-documenting APIs made integration by other teams very quick and easy. They also enabled us to externalise non-key features into separate small web applications. One example is the [grid-inspector](https://github.com/guardian/grid-inspector), a utilitarian metadata explorer, which we used as an opportunity to experiment with a new approach to build interactive applications using reactive programming and Virtual DOM (see [The Reactive Loop](http://slides.com/theefer/reactive-loop-funjs)).

And, like a lot of the software we develop, we have released it as Open Source. Openness is in line with the [Scott Trust’s values](https://www.theguardian.com/the-scott-trust/2015/jul/23/the-values-of-the-scott-trust) and we believe in giving back to the community we get so much from.

It’s all there in the [Grid project on GitHub](https://github.com/guardian/grid), for you all to see and borrow from.
