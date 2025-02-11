---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-15-levelling-up-our-client-side-developer-experience'
headline: 'Levelling up our client side developer experience'
date: '2016-12-15'
authors: [Simon Adcock]
standfirst: 'Client side development moves pretty fast. If you stop and look around once in a while, you’re probably missing a bunch of dependencies.'
image:
  url: 'https://media.guim.co.uk/3efe85d074b8aa0d48292b9e2640452a4a49b510/0_192_5760_3456/5760.jpg'
  alt: 'The realities of client side development.'
  credit: 'Photograph: Alamy Stock Photo'
tags: [Advent developer blog 2016]
---

Developers spend a lot of time improving the performance, features and overall experience of our websites for the benefit of our users. And rightly so. However this can be to the detriment of the other people who use our applications – namely, well, ourselves.

Developers developers developers
--------------------------------

At the Guardian, developers often find themselves outside their comfort zones. As I’m sure most of you do! A lot of us go by the title of full stack developers, and are as likely to be found improving a piece of business logic in Scala, as we are knee-deep in some CSS optimisation, or debugging a JavaScript Symbol polyfill for Internet Explorer.

A few of us, however, specialise in client side development. We often found ourselves asked quite reasonable questions. Questions such as:

*   How do I build the JavaScript? Do I use Grunt or Gulp? Or is it Make? (unfortunate fact: it was all three)
*   How do I install dependencies? Do I need to run npm install, or are the dependencies checked in somewhere? Or are they installed as a WebJar? (again, all three –and don’t forget we use yarn now)
*   How do we write components? Are we using React yet, or Preact, or do we have an undocumented bespoke solution of our own? (take a guess)

These questions, and their harrowing answers, seem to derive from two approaches: keep existing features stable; new features make good test beds for new technologies.

It meant there was no one way to do things: it was the wild west. Something needed to be done.

Defeat in detail
----------------

There were too many problems to tackle all in one go, so we did what any reasonable group of web professionals would do and borrowed a strategy from Napoleon. We brought our meagre client side developer force to bear against each problem in isolation, with the hope of eventually destroying our enemy as a whole while exposing ourselves to the smallest possible risk. We wrote a Client Side Developer Experience Defeat in Detail Document (a title we catchily shortened to CSDXDIDD) that captures each of our tech debt enemies, and explores what needed to be done in order to defeat each one.

Tasks
-----

Grunt was the workhorse of our task-running strategy, hidden behind a simple API we built using Make. It was good for the time, but our Gruntfile eventually grew to become an obscure witches’ brew of plugins, wrappers and configuration magic. It relied on a whole bunch of single-use dependencies (Grunt plugins) that wrap useful libraries but which can’t be used outside of the Grunt context.

We decided to move away from Grunt towards a bespoke task runner (a lightweight wrapper around [listr](https://github.com/SamVerschueren/listr)) that allows us to define our tasks as normal JavaScript functions. This has significantly improved the build time and removed all those single-use dependencies, and has made it clearer what each task is doing.

Now when a developer clones our frontend repo, all they have to run is \`make compile\` and sit back as all the dependencies are installed and the application is built.

Bundles
-------

Our application uses AMD modules bundled by [the requirejs](http://requirejs.org/docs/optimization.html) tool r.js. We wanted to move to a bundler that supported a more modern workflow, integrating tools like Babel and hot reloading. Ideally we’d be able to take advantage of the latest language features in ES6 and ES7, and incorporate static type checking using Flow.

We identified [Webpack](https://webpack.github.io/) and [Rich Harris](https://www.theguardian.com/profile/rich-harris)’s [Rollup](http://rollupjs.org/) as our potential bundlers of choice.

After running some tests, we noticed that the execution time of bundles built with Rollup was significantly shorter than those built with Webpack. Bundle sizes were smaller too. Many eyebrows were raised.

However [after some analysis](https://docs.google.com/spreadsheets/d/1Zk_cAt7V_oOjHXYH-hjd1G0Nc5eQ8lkFuvv7EXS3k3s/), we ended up choosing Webpack for two main reasons. Firstly Webpack has a larger community, is more mature and has more support for larger applications such as ours. Rollup’s target audience is currently smaller applications and libraries, lacking support for essential features such as [code splitting](https://github.com/rollup/rollup/issues/372) and [commons bundles](https://github.com/rollup/rollup/issues/1115).

The second reason is that Webpack maintainers are looking to utilise the Rollup engine, or at least Rollup’s most successful strategies of [live code inclusion](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.2jl29axqc) (AKA tree-shaking) as opposed to dead code elimination, and hoisting all bundled modules into a single scope. This will hopefully bring Webpack bundles sizes and execution times into line with Rollup’s.

Something to watch out for when migrating from RequireJS/r.js to Webpack is that you will need to find a new way to load external scripts. This proved slightly problematic for us during migration as some of the external libraries have state, which needs to be shared between the newly growing Webpack application and the remaining RequireJS/r.js application. We solved this problem by exposing the libraries and functions shared between the methods on the window object, allowing them to all call the same singleton.

Components
----------

In the near future, we will turn our attention to our neglected component architecture.

Since our HTML is server-rendered using the Scala Play Framework, it seems like overkill to serve a heavyweight framework such as Angular or React to handle presentation logic to the client.

We have experimented with Preact, a skinny clone of React, but we are becoming more excited by “frameworkless” approach exemplified by [Svelte](https://svelte.technology/). This fits in well with our modular, microlibrary strategy, borrowing from the [Unix playbook](https://en.wikipedia.org/wiki/Unix_philosophy) by ensuring each of our dependencies are focussed on achieving one goal, and can be switched out for an alternative at a later stage without too much refactoring.

We’d love to hear your thoughts and stories relating to client side developer experience.
