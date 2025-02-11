---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-feb-09-testing-in-the-right-places'
headline: 'Testing in the right places'
date: '2016-02-09'
authors: [Jonathan Hare-Winton]
standfirst: 'Are your automated tests looking in the right places at the right times? Are they even adding value?'
image:
  url: 'https://media.guim.co.uk/779b73dddf6647e24b793288ebb973faaf4c92f8/0_0_4134_2482/4134.jpg'
  alt: 'Perils of being in the wrong place'
  credit: 'Photograph: Armand Grobler / Barcroft Media'
tags: [Testing]
---

In a [previous blog post](https://www.theguardian.com/info/developer-blog/2015/nov/02/the-software-testing-identity-crisis), I wrote about how we’ve tried to transition the QA team here at the Guardian from behaving like a separate business function, solely responsible for testing, and moved towards a model where the QA team facilitates a focus on quality for the rest of their product team.

One area that we felt didn’t meet this new objective was [automated UI testing](https://en.wikipedia.org/wiki/Test_automation). Across some of our teams, and industry wide, UI tests are detached from the products that they are checking, through location of code, technologies used, implementation, and process. An example of this was our mobile apps team, where the UI tests for our iOS and Android live news apps consisted of a combined set of [Appium](http://appium.io/) tests, maintained by our specialist QA team. These tests were written in [Scala](http://www.scala-lang.org/), which, while being a language we use heavily here at the Guardian, is not one used by Android or iOS developers. In order to serve both products, the tests lived in a separate git repository, and could not be worked on in either [Xcode](https://developer.apple.com/xcode/) or[Android Studio](http://developer.android.com/tools/studio/index.html), due to neither supporting Scala.

Our decision to take the approach of cross-platform tests in a separate repo originally was due to the tools available around mobile UI automation at the time we began the project, and saving time by using an existing [scalatest](http://www.scalatest.org/)\-based [framework that we had already developed](https://github.com/guardian/scala-automation), so that QAs across our various team had a common language for their automated tests. The end result however was that for any of our developers on the mobile team to maintain or add to our tests, they would have to switch to an unfamiliar language, development environment, code repository and use a 3rd party tool in order to maintain or write a new test. Clearly this put far too many obstacles in place for any of our developers to want to contribute UI tests, so the tests were solely the domain of the QA team.

However, in mid 2015, both Google and Apple released vastly improved tools provided with their SDKs, in the form of [Espresso 2.0 and UiAutomator 2.0](http://developer.android.com/tools/testing-support-library/index.html) for Android, and [XCUI Test](https://developer.apple.com/videos/play/wwdc2015-406/) in Xcode for iOS.

In order to make the UI tests a concern for the whole team, not just the QAs, we needed to remove the blockers to getting everyone in the team involved in testing. Using the example of the our Android team, what the new tools allowed us to do was to move the tests into the main Android app repository. This takes away one blocker. The next issue was the language. Again, the new tools from the official SDK use Java, so now the tests were in the same language as the rest of the app, which obviously also meant that Android Studio was back in play. Now in order to write a new UI test, there is no context shifting involved at all, just moving to a different folder in the repo. We’ve taken similar steps on our iOS app too, using the new XCUI Test tools in Xcode 7.

All of this makes perfect sense, and is a definite improvement for our team, but what about the elephant in the room: the old test suite. What happened to those tests and all the effort put into them?

Having tests that the whole team are not engaged with is pointless. If only a small element of the team has any knowledge of how to work with the tests, and are the only ones maintaining and adding to them, when those people move off the team, the tests invariably fall by the wayside. And if only a few people are working on the tests, it is likely that visibility, or even thinking about the tests is solely confined to those team members. So, regardless of the time already spent on them, the old tests were taken out of action, as they didn’t give us any value. Our approach to software development is to iterate and fail fast, so we should apply the same methodology to testing & quality; if something isn’t adding value, we should be bold enough to abandon it.

This ties in closely with our belief in frequently reappraising our approaches, and adjusting constantly. Just because something has been done a particular way in the past, does not make it the best approach for the future. As Quality Engineers in the modern agile development teams that we work in, we need to be able to flexible, and willing to embrace new technologies or approaches, even if it means moving away from old projects and specialities, and learning new skills and devising new approaches to enhance the quality of our products.

We’re hiring!
-------------

If you have a passion for product and software quality, and the above sounds like the kind of development you would like to be involved in, we are currently hiring for a new Software Engineer - tools, process & automation. You can apply [here](https://gnm.taleo.net/careersection/ex/jobdetail.ftl?job=KIN0000N1)
