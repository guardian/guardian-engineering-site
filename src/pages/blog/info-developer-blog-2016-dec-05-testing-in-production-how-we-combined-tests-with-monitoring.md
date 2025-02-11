---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-05-testing-in-production-how-we-combined-tests-with-monitoring'
headline: 'Testing in Production: How we combined tests with monitoring'
date: '2016-12-05'
authors: [Jonathan Hare-Winton, Sam Cutler]
standfirst: 'How the Guardian Digital team supplemented traditional monitoring with production testing to provide a comprehensive alerting system'
image:
  url: 'https://media.guim.co.uk/acffa5ad6993bb263a9ec88d8147a7a206a899f8/388_0_1130_678/1130.png'
  alt: 'Production monitoring screenshot'
  credit: 'Photograph: Sam Cutler'
tags: [Advent developer blog 2016, Testing]
---

The Guardian QA team have spoken in [previous](https://www.theguardian.com/info/developer-blog/2015/nov/02/the-software-testing-identity-crisis) [blog posts](https://www.theguardian.com/info/developer-blog/2016/dec/04/perfect-software-the-enemy-of-rapid-deployment) about how the development practices of our Digital department have changed over the last few years, and how this has required the Quality team to take some new approaches to tackle the challenges of software quality.

Traditionally, testing in [continuous delivery](https://en.wikipedia.org/wiki/Continuous_delivery) has taken the form of running automated tests or checks, triggered by a deploy or a new merge, as part of the production pipeline. These are generally run on a separate test environment. While this is a solid approach, in reality, a lot of the issues that are seen in production do not manifest on the initial deploy of the system, they occur when that particular build has been in production for some time. So rather than triggering a test run after a new release, then calling it a day, we wanted to continue to test on the production system. If we do this issues that manifest slowly, or are intermittent are detected as quickly as possible.

Approaching production testing with this mindset starts to blur the lines between testing and monitoring. We have extensive monitoring on all of our current systems, alerting on issues like response times, traffic levels, http errors etc. These alarms and metrics are incredibly useful, however are limited; they do not exercise the system as it used.

We wanted to try to plug these kinds of gaps in the monitoring of our editorial tools. These are products that we build in-house, and are used by our editorial staff to create, publish and manage all of our content. To get effective continuous reassurance, we have to generate more comprehensive actions on the system ourselves, in the same way that a real user would.

To do this, we built a new Production Monitoring system, imaginatively named Prodmon, that combines the two ideas of testing in production and system monitoring. We run a couple of tests to first create and publish a simple piece of content, and then take it down from the website as these are our most import user journeys. We use [Selenium Webdriver](http://www.seleniumhq.org/) to handle all of the user actions, so we are fully simulating an editor working on a piece of content. The tests then perform a series of [API](https://en.wikipedia.org/wiki/Application_programming_interface) checks to ensure that the user actions have triggered the appropriate updates. These behave like standard automated tests, using all the usual assertion techniques etc. Where these differ from a traditional tests however, is that they are not simply triggered by a new release. Prodmon runs continually, 24 hours per day, 7 days a week on our production systems. And rather than producing standard test reports, we alert on issues in the same way as our other monitoring systems, by triggering alarms to notify the team. We also provide an interface to investigate issues through the data produced by the tests themselves.

By having these running continually, the success of the tests themselves gives us reassurance of stability. The fact that user actions are taking place on the systems also means that our monitoring is far more likely to be triggered if there are any issues, and far quicker, thus doubling the level of reassurance that we are getting, particularly during periods when the system is not getting much use.

This is not necessarily straightforward to implement. Prodmon is built using [Scala](https://en.wikipedia.org/wiki/Scala_\(programming_language\)), so were able to make use of [Scalatest](http://www.scalatest.org/) to handle some of the test infrastructure for us. However, like most testing frameworks, Scalatest is not designed with continuous running in mind. We therefore had to expand the framework, and while doing so encountered several unexpected issues, solely because we were pushing the tools into new territory.

Additionally, and particularly in the cases where we are using Webdriver to create UI actions, getting tests on fully integrated production systems to run reliably can be very hard. Webdriver tests are almost always executed in a sanitised test environment, whereas our tests are running in the ‘real’ world. This introduces all the varying parameters and underlying complications of a real environment, so the tests must be incredibly robust. We found that getting the tests to around 95% reliability was straightforward. The remaining 5% was much more challenging. Even with some tolerance built into the system for an occasional false-positive, when you’re running over one thousand tests per day even a small amount of unreliability damages trust. After several weeks of careful optimisation we managed to achieve 99.5% reliability.

As the Prodmon tests produce and publish real content, we have to make sure that this is not visible to our readers, and does not inadvertently skew any of our business metrics. We have a dedicated area of the site where this content is hidden from search engines, syndication partners and our internal metrics.

Prodmon has proven itself extremely useful in alerting the engineering team to specific problems that standard monitoring is too coarse to detect. And it has proven to us that we can get value from tests in production that go beyond the conventional merge-deploy-test pipeline, and we believe that this approach is transferrable and beneficial to other products, teams and organisations.
