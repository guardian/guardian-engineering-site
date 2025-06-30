---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-jun-18-guardian-software-development-flow'
headline: 'The Guardian development flow'
date: '2013-06-18'
authors: [Phil Wills]
standfirst: 'By moving towards a GitHub flow with continuous integration, the Guardian''s software team describe how they''ve streamlined development and testing'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/6/18/1371573395160/guardianpipe.jpg'
  alt: 'Photo by Travis Modisette via Flickr'
  credit: 'Photograph: Travis Modisette/Public domain'
tags: [Git, Software]
---

We're constantly seeking to find better ways to develop the software that's used to create and present the Guardian. One key element of developing software is a source control system, used to maintain a history of changes to code. Over the past year we've moved away from a [trunk-based model](http://paulhammant.com/2013/04/05/what-is-trunk-based-development/) to something much closer to the [GitHub flow](http://scottchacon.com/2011/08/31/github-flow.html), using branches for almost all work. Whilst both models have their strengths, we've no intention of going back.

The key reason we initially switched to a flow based on feature branches was to better facilitate code review. From viewing and contributing to open source projects, we had seen that Github's pull requests provide a great way to collaborate on discussing changes. Since we were already using Github to host [our repositories](https://github.com/guardian), it was a small step to take advantage of this through the use of feature branches.

As expected, this has proved a useful way to discuss the details of technical changes to the system, e.g. [adding asynchronous attributes to our JavaScript tags](https://github.com/guardian/frontend/pull/854) or [allowing deployment of applications via Magenta](https://github.com/guardian/deploy/pull/96). Alas, it has also proved a source of gratuitous [cat gifs](https://github.com/guardian/frontend/pull/943).

We had also been moving to smaller, more frequent releases and feature branches work best alongside this approach. A branch is only merged when it's ready to go live and then released soon afterwards.

Much of the reasoning behind taking a trunk-based model is based around the importance of continuous integration and the pain of merging. These are real concerns, but tooling has ameliorated them considerably. Our continuous integration tool, [TeamCity](http://www.jetbrains.com/teamcity/), now supports automatic builds of all branches of a repository meaning that, while different elements of work in progress are independent, changes are continuously integrated and tested against the rest of the application. Git is _really_ good at cleanly merging.

Have we had some messy merge conflicts to sort out? Yes, but they are relatively infrequent and are caused by us failing to adhere to the supporting practise of finding ways to release small changes early and often, leading to branches hanging around for longer than necessary. They're pain that highlight a real problem.

It's much clearer what changes are being made to what by whom than it was previously. However, there's variation between teams as to the details of how new work is approved and merged in, so we have now started to make use of Github's contribution [guideline support](https://github.com/blog/1184-contributing-guidelines).

The really pleasant surprise we've had is that one of the biggest benefits has been to those who haven't previously used our source control repositories. Those members of the team, such as those responsible for QA of the system, now have a much clearer view and feel more involved in the process since we moved to using pull requests. This in turn has led to some progress towards actively contributing fixes to the repositories themselves, as the process has been demystified.
