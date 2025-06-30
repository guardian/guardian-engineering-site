---
layout: ../../layouts/blog.astro
slug: 'info-2019-dec-06-software-quality-in-a-world-of-microservices-and-continuous-deployment'
headline: 'Software quality in a world of microservices and continuous deployment'
date: '2019-12-06'
authors: [Matthew Walls, Jacob Winch]
standfirst: 'How the role of quality assurance at the Guardian has adapted to support today’s fast-paced software landscape'
image:
  url: 'https://media.guim.co.uk/cf583363ae3781460875ec06cb99be4305262f25/0_133_4000_2400/4000.jpg'
  alt: 'Changes being prepared for production.'
  credit: 'Photograph: AFP/Getty Images'
tags: []
---

In today’s software landscape, we find ourselves for better or worse in the age of the service. Software is typically broken up into a host of cooperating pieces of infrastructure. The boundaries of where an application begins and ends are blurred and we have to contend with issues of timing, scaling, caching, data consistency and integrity.

Despite this fundamental shift in how we build and maintain our software, [the role of the Quality Assurance team has remained largely unchanged throughout time](https://www.theguardian.com/info/developer-blog/2015/nov/02/the-software-testing-identity-crisis).

Quality from the point of view of the traditional QA team has continued to mean sitting in front of an application’s user interface (or using Selenium) and trying various combinations of inputs to cause an error condition. Historically, we only ever tested the very tip of the iceberg - except the iceberg has now melted, exists in several places in time and locations concurrently, and is also on fire.

An obvious question is, does a modern QA team need to care about this at all? If an organisation values highly specialised roles, then having QA need to care about deeper technical aspects might seem somewhat foreign. At the Guardian, each product team is expected to have responsibility for supporting their own platform. We believe this culture of shared responsibility is more beneficial than having [dedicated DevOps or SRE teams](https://www.theguardian.com/info/developer-blog/2015/jan/05/delivering-continuous-delivery-continuously). When we think from first principles about what actually _helping to improve quality_ means to us, we have to be flexible enough to help teams tackle the wider quality issues that they face with building modern software.

The Guardian believes firmly that quality is a characteristic that is pervasive in everything we do, and if a QA team really cares about the experience of its users, it has to evolve to be just as pervasive as well.

In this post, we’d like to introduce one way in which the Guardian is trying to tackle software quality in the modern world, with the introduction of the ‘Software Engineer (Tools and Infrastructure)‘ role.

Introducing Software Engineers (Tools and Infrastructure) to the Guardian
-------------------------------------------------------------------------

The SETI, or ‘Software Engineer (Tools and Infrastructure)‘ is a title shamelessly borrowed from Google to describe a breed of engineer that comes from a technical background, but focuses on solving problems instead of releasing features. Whereas the traditional SET (Software-Engineer-in-Test) role improves the quality of the final product by testing the end result, the SETI improves the quality of _the development process_ _itself_ by improving how we build, deploy and monitor our software.

Examples of work that a SETI might find themselves doing could include: setting up Continuous Integration and Deployment pipelines, writing tools that help developers diagnose issues faster, creating monitoring and alerting for production apps, refactoring code, and carrying out performance testing. What a SETI does _not_ do is act as a blocker or gatekeeper to releasing work. A SETI does not typically review software changes to stamp them with a QA seal of approval, nor do they write unit tests all day. The Guardian allows its developers to peer review each other’s work, and write tests where appropriate.

At the Guardian, each SETI is embedded into an existing product team (I have worked with the team who build and maintain theguardian.com for three years). A SETI is expected to be able to work independently to find, prioritise and solve quality issues. However, the SETI is not a solitary animal, they spend much of their time working with fellow team members to solve issues that the team faces.

Although they are embedded onto product teams, SETI’s regularly meet to share knowledge about each other’s teams; discuss problems they have faced, solutions they implemented and can identify the overlap between teams. With enough SETI’s on enough teams, we can together come to a general understanding of the health of our organisation.

A day in the life
-----------------

The following are a few stories from our SETI’s about some interesting projects they have worked on:

**Monitoring features using production data**

The Guardian’s mobile team run large beta programs in order to maintain the quality of our iOS and Android apps. Although these programs provide extensive coverage of user-facing changes, some categories of bugs can still slip into production and remain undetected for long periods of time. For example, a bug that prevented users from seeing our dynamic subscription messaging was not picked up during our own testing nor by our beta testers.

In order to catch these types of problems earlier, we built [a monitoring service](https://github.com/guardian/data-lake-alerts) that allows developers to define automated, periodic checks on how features are performing in production. The monitoring service is written as an AWS Lambda, which queries our Data Lake using the AWS Athena SDK. Although the new service was primarily built by SETIs, we worked alongside other engineers in order to explain the new tooling and encourage its adoption for a wider range of features.

**Getting production-quality runtime performance characteristics at the Pull Request stage**

When releasing a new change to theguardian.com, there are many kinds of automated tests that we want to carry out that require the _entire_ application to be instantiated and ran. These are tests such as validating pages against the Google AMP specification, performing server-side load testing, checking for changes in browser performance such as the Time To Interactive and Lighthouse score, and so on. These tests are too long and cumbersome for developers to run themselves locally as part of a unit test suite, and if ran on developers’ personal machines, they may not give realistic results at all.

To tackle this, we wrote a tool called [PRBuilds](https://github.com/guardian/prbuilds).


   <figure>
   <img alt="PRBuilds Screenshot" src="https://i.guim.co.uk/img/media/abea9de69392ec8421f7556a7f0daf15246c1392/0_0_822_876/master/822.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=87416ef3d17fa57c65b9a8a01dab8a5e" loading="lazy" />
   <figcaption>
     PRBuilds Screenshot
    <i>Photograph: PRBuilds</i>
    </figcaption>
    </figure>

PRBuilds runs every time a GitHub Pull Request is updated and will build and run the underlying application in a production-like configuration, but in a sandboxed environment away from real user traffic. Configured tests are then executed, and the results are stamped back onto the original Pull Request as a comment. This allows us to get production-like feedback as soon as a Pull Request is first submitted.

What we hope to achieve with this approach
------------------------------------------

By embedding SETI’s onto Guardian product teams we hope to find a way to help teams embed quality into their culture, workflows and tech stack from the ground up, without becoming gatekeepers that slow down our release cycle.

By having SETI’s coordinate with each other, we further hope to gain insight into the quality problems affecting the Guardian’s Digital Department at a global level and can identify the overlap between teams where we can come up with reusable solutions and standards.

And finally, by working alongside our fellow engineers side by side we can gain a better appreciation for what it takes to build great software, and help bring our important editorial message to the world.
