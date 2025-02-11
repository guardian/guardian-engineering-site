---
layout: ../../layouts/blog.astro
slug: 'info-2023-oct-24-standardisation-the-merit-of-consistent-patterns'
headline: 'Standardisation: the merit of consistent patterns'
date: '2023-10-24'
authors: [Max Duval]
standfirst: 'Coming back from a long holiday? Recently joined the department? Collaborating on a complex, cross-team problem that spans different tech stacks and programming languages? At one point, we’re all going to find ourselves in one of these situations. So how can we ensure that no one feels overwhelmed or unable to make meaningful contributions?'
image:
  url: 'https://media.guim.co.uk/bf8911bb16eb0610296fe1a2c66c669d45105f9e/1_0_7498_4500/7498.jpg'
  alt: 'Illustration of screw driver standardisation. Slotted, Torx, Robertson and Phillips.'
  credit: 'Illustration: Max Duval/The Guardian'
tags: []
---

Short answer: by enabling everyone to quickly focus on the task at hand.

By “focus” I simply mean deciding what is in scope and what is not. For a company that’s been around for more than 200 years, and online for an eighth of that time, a proliferation of systems is bound to happen. No single person is ever going to grasp the complexity in its entirety. Zooming out, we create architectural diagrams to help us understand how the different parts fit together; and zooming in, we [write code that requires as little context as necessary](https://github.com/guardian/recommendations/blob/main/coding-with-empathy.md).

In this blog post, I will:

*   discuss the benefits of standardisation;
    
*   describe which tools we have created help keep consistency;
    
*   offer some thoughts on balancing familiarity and innovation.

**The benefits of standardisation**

“_The less we need to know to be useful, the more we can do.”_

Typically, engineering tasks will take the form of a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) followed by a deployment. A pull request is a proposal to change parts of the code of a project. A deployment takes the code with said changes implemented and runs it in production. The first step is to decide what should change. Clear documentation and code organisation are essential in finding which file to edit. Let’s assume great diligence from previous developers: they’ve found the file quickly. Deciding on the new instructions will depend on familiarity with the programming language. Thankfully, we run programming language learning groups for common languages at the Guardian, so they confidently make the changes. Confirming whether the change had the desired effect will depend on actually running the program. Instant feedback speeds up development, and will have them running it locally, on their own machine. Having tested locally, they can raise the pull request. This will kick off the [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) pipeline: a series of tests that ensure the change does not have adverse effects on other parts of the program. If successful, and with their colleagues’ approval, they can merge the changes. In turn, this should trigger a continuous deployment pipeline, ensuring that the latest version of the program is automatically run in production.

To help developers feel empowered, we promote consistent patterns that help reduce [extraneous cognitive load](https://en.wikipedia.org/wiki/Cognitive_load#Extraneous) via a growing set of [recommendations of best practices](https://github.com/guardian/recommendations/blob/main/best-practices.md) across all our teams. This is essential, especially on repositories with thousands of files, where the opportunities for distractions and surprises abound. Developers don’t need to learn a whole new set of tools for each pull request. Repetition helps build confidence. By having shared tools, we ensure that developers can build on their existing knowledge.

**Great tools make for happy crafting**

When left unchecked, systems grow in complexity over time, as unique solutions are applied to each new encountered problem. To find similarities, we need to see the bigger picture, across time and teams. When a problem has been encountered enough times, say [at least three](https://en.wikipedia.org/wiki/Rule_of_three_\(computer_programming\)), there may be value in creating a unifying pattern. Our developer experience team, which was created in 2018, is specifically geared towards solving these issues by creating the right abstractions over common tasks. We aim for consistent testing suites, package managers, build scripts, code formatting and deployment strategies.

One such example of an abstraction is [the Cloud development kit (CDK) library](https://guardian.github.io/cdk/), which allows configuring infrastructure as code, and having a microservice deployed on AWS – the deployments are also orchestrated with [Riff-raff](https://github.com/guardian/riff-raff), which allows continuous deployment and rollbacks. It can be hard to strike the right balance between reasonable defaults and allowing customisation, especially when building for dozens of different teams.

The web experience team, which looks after the Guardian’s website, uses an [isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) (JS) application to deliver HTML, CSS and JS to our readers since [we last revisited our rendering tier](https://www.theguardian.com/info/2019/apr/04/revisiting-the-rendering-tier). This allows building components that contain their styles, DOM representation and behaviour in a single file. As a programming language, JavaScript is a multi-paradigm language, which means that it can be used in functional or imperative programming styles. It’s dynamically typed, which means that you cannot enforce method signatures. It’s also constantly evolving under the [TC39 specification](https://tc39.es/), which means that new syntax and features are frequently added, with varying levels of support in browsers like Chrome, Firefox and Safari and server runtimes like Node and Deno. Developers cannot be expected to take all of this into consideration on every change they make. For example, you can turn a **NodeList** into an array of **Elements** in at least five different ways:


   <figure>
   <img alt="Five ways to turn a NodeList into an array of Elements" src="https://i.guim.co.uk/img/media/b57dfebae93abd7714b717eeae022e8db7aed119/0_149_2588_1215/master/2588.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3b078e2e446e47cf0d3a2e8f4fcf6d5c" loading="lazy" />
   <figcaption>
     Five ways to turn a NodeList into an array of Elements.
    <i>Illustration: Max Duval/The Guardian</i>
    </figcaption>
    </figure>

If the flexibility of JavaScript is what has helped it gain a lot of popularity, it’s also what makes it very unpredictable. Thankfully, automated tooling can help. We use TypeScript and ESLint to minimise the potential for runtime errors. With consistent linting and formatting, we can reduce the different number of ways we achieve the same task. Configuring these tools requires a flurry of files and dependencies, which can themselves be brittle. For most of these tools, we publish default configurations under the [@guardian scope on NPM](https://www.npmjs.com/search?q=%40guardian). We also created a [client-side monorepo](https://github.com/guardian/csnx/) last year, which comes with all these defaults preconfigured, and has become the home to most of our JS libraries.

**Balancing familiarity and innovation**

We want teams to be empowered to make the decisions that will best support their objectives. Rather than have a strict enforcement of standards across all teams, we try to demonstrate the benefits of each standard on its own. This ensures that there is an incentive to build great tools that are a delight to use, rather than one where standards are felt as pointless hoops that engineers have to jump through. We want to strike the right balance between robustness and resilience. Not all programs should be written in the same language, or have the same strict type guarantees or test coverage. Code should feel familiar, but that shouldn’t get in the way of innovation. Thankfully, our engineers are allotted 10% of their time to self development, where they are free to explore bold new ideas and patterns – a key part of what helps innovation thrive, and for our work processes to constantly improve.
