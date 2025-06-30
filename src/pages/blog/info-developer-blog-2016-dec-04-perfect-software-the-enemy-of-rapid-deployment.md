---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-04-perfect-software-the-enemy-of-rapid-deployment'
headline: 'Perfect software: the enemy of rapid deployment?'
date: '2016-12-04'
authors: [Sally Goble]
standfirst: 'In traditional and slow moving software delivery teams, the brakes are well and truly applied by endless cycles of painfully slow manual regression test cycles. The logical thing to do when considering moving towards a rapid release cadence is to speed up your regression by automating. Sally Goble, head of quality at the Guardian, argues that this is not right or necessary'
image:
  url: 'https://media.guim.co.uk/eef3ec165f8a110177e154230e2845eba64cae7e/0_165_4608_2765/4608.jpg'
  alt: 'Does the desire to have perfect software stop you from deploying as rapidly as you’d like?'
  credit: 'Photograph: Maxim Grigoryev/TASS'
tags: [Advent developer blog 2016, Computing, Software]
---

Popular opinion in the world of software development states that if you want to release your software frequently, or you want to move towards continuous delivery, you have to automate your testing. Have plenty of unit tests, move towards BDD, and automate integration and regression tests. Replace all of your manual regression testing with automated testing. Automate the hell out of everything.

And it seems logical. In slow paced software delivery teams, where releases happen infrequently, endless cycles of wide ranging rigorous manual regression testing often slow delivery down _even more_. So a logical consideration when moving towards a rapid release cadence is to speed up your regression by automating.

Software _Quality Assurance_, delivered by painstakingly thorough (and slow) software testing, is predicated on the old fashioned notion that we have to release perfect software. But in the context of the modern practices of frequent releases, which may happen many times a day, this seems a less convincing approach.

QA teams and testers could do well to learn lessons from the way that product/feature development has responded to the changing pace of delivery. In the olden days of waterfall delivery, the concept of shipping future-proofed, fully specified all singing all dancing products with a complete and perfectly considered exhaustive feature set was commonsense. Software needed to be specified with every eventuality considered, to within an inch of it’s life, because future releases wouldn’t be for months or years.

More or less the same approach was adopted to testing as to product and feature development. Everything that shipped had to be perfect from a quality point of view, bug free, and last for years.

But nowadays, just as rapid development and release cycles have changed the way we think about developing features – we are happy to release [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) products and iterate on functionality – the rapid development cycle gives us the opportunity to change the way we think about testing. Product owners have moved on - so should testers.

A few years ago at the Guardian, we realised that we needed to ship more frequently. We ended up, after much technical innovation, in a place where we could release to production at will - and we were soon deploying several hundred times a day. This forced the QA team to make a choice: insist on releasing near perfect bug free\* software that would slow down our ability to ship as frequently; or test much less, allowing us to release much more frequently. We chose the latter approach, because the need to ship and innovate more frequently was important to us as a business. But just as importantly, because we realised that it wasn’t _necessary_ for the software to be perfect and bug free.

Light touch testing
-------------------

We decided to move away from needing to release near perfect software which we tested rigorously with the object of finding every bug known to man, and instead adopt a ‘light touch’ approach to testing where we would only do the bare minimum amount of testing in order to release. We agreed - as an engineering team as a whole - that we would not have testing as a function any more - but rather we’d have the small amount of testing that we did feel we needed distributed among the product team. [Anyone could be doing our bare minimum ‘light touch’ testing](https://www.theguardian.com/info/developer-blog/2016/feb/09/testing-in-the-right-places) - from developers peer reviewing one another’s code, to a designer looking at UI/front end changes; to product owners doing their own acceptance testing. We began the process of becoming slightly more comfortable with the possibility of introducing bugs into production, and of mitigating risk.

‘Not wrong long’
----------------

If we were to live with the idea of bugs in production we needed to look at ways of finding and fixing them quickly (or rolling back). We put in place a toolbox of techniques that [mitigated the risks](https://www.theguardian.com/info/developer-blog/2015/jan/05/delivering-continuous-delivery-continuously) of our new approach, and that enabled us to find bugs very quickly if we did release any to production. Along the way we had created tools that allowed anyone in the team to do push button deploys and rollbacks - which meant fixing things was relatively easy... all we needed to do was spot issues in the first place.

As an engineering team we encouraged single feature releases or small changes in order to keep complexity - and therefore risk - low, and to allow traceability back to individual commits in case of problems. We got into the habit of putting most features behind feature flags - making them easy to disable if we did find problems. And we set to work improving our monitoring so that it became easier to spot issues in production, and we pared down our alerting so that the alerts we did get became meaningful. For lower traffic areas of our site, where we couldn’t rely on monitoring for feedback (because of the infrequency of events that we could use to verify the health of our products), we chose to create a bare minimum of automated critical path tests that ran post-deploy and in production. And, for risky changes, if all of the above were still not enough to make us feel confident to release to production, we used canary, or staged, releases to drip feed features to proportions of our users at a time, in order to build up confidence. As a logical progression to monitoring we started to increasingly consider the option of testing in production: using real time tracking of key user journeys in production to provide us with the confidence that we hadn’t broken key features once we’d deployed.

Meanwhile, in our apps team, because we couldn’t implement some of the other risk-mitigating techniques, and, crucially, because we couldn’t easily ship and fix quickly, we decided to spend time and effort creating alpha and beta programmes so that we could be confident in our releases before shipping to the play/app stores. The beta programmes have been surprisingly effective. Ultimately more bugs have been found by a large, varied and engaged user base than we might ever have found by our diligent in-house QA team.

Moving with the times
---------------------

The key to these changes in approach for our QA team specifically, and our engineering team more broadly, is that there is a drive from within the business to ship more frequently. Shipping more frequently creates more value for us, because it creates faster feedback loops. Which ultimately translates to greater value delivered to our users. Speed is of the essence and everybody wins.

\*Nothing is ever bug free.
