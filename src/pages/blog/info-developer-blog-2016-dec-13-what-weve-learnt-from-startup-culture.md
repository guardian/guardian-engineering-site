---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-13-what-weve-learnt-from-startup-culture'
headline: 'What we’ve learnt from Startup Culture'
date: '2016-12-13'
authors: [Chris Owen]
standfirst: 'For all of it’s limitless pivots, funding rounds and in-office football tables, Startup culture can teach established companies a thing or two.'
image:
  url: 'https://media.guim.co.uk/ba71afae41a1eade6f9d7d303eac90c9dc794da2/0_70_5616_3370/5616.jpg'
  alt: 'Street sign of Silicon Valley'
  credit: 'Photograph: Alamy'
tags: [Advent developer blog 2016]
---

Every engineering department has moments it’s not too proud of. That one major bug that made it into production, the code deployed to the real world instead of the testing environment, that piece of code so nasty no developer will even look at it. Well for us, it was _MyGuardian_. The feature we couldn’t finish. Three implementations, two name changes, one major redesign and countless developer hours and we still couldn’t get the feature to stick. Initially sold as a recommendations platform, users didn’t incorporate it into their daily habits and it failed to gain traction.

Retrospectively, we should have taken a leaf from startup culture’s sacred text [The Lean Startup (Eric Ries, 2011)](http://theleanstartup.com/book) which is, by this point, surely on the bedside table of every startup CEO in Silicon Valley. Above all, Ries promotes the idea of “_Build, Measure, Learn_” which states that any feature should be built in its most simple usable form, tested for changes in user behaviour and then learnings be implemented to improve the product. If the feature does not create a positive change then it should be retired as quickly as possible and new ideas generated. Herein is the first lesson that any large organisation should learn from a startup.

_**If you’re going to fail, fail fast.**_

This is of course, easier said than done. People become attached to ideas and naturally become affected by the [sunk cost](https://youarenotsosmart.com/2011/03/25/the-sunk-cost-fallacy/) fallacy as projects develop, but it is the responsibility of any developer to remain objective, notice the warning signs and act on them to create meaningful features faster.

Related to this is the need for every developer to have an active involvement in the development of features from inception to production, or put another way:

**_Developers should have ownership of products_**

This is something that comes naturally in the small, fast paced world of a start up but is a crucial aspect that large companies must keep track of and nurture within their teams. In large companies there are often many stakeholders each of whom want to see products develop in many (often conflicting) ways, and in the best case, this can lead to developers feeling out of touch with the products they work on every day and in the worst result in the feeling of working in a [feature factory](https://hackernoon.com/12-signs-youre-working-in-a-feature-factory-44a5b938d6a2). When this happens, developers start to care less about their product, innovation slows and products don’t advance. Thankfully, I can say that this hasn’t happened at the Guardian. It is something that we actively keep in mind within the department.

Finally, another cultural change that we encourage is for any developer to jump onto another project and make changes. We often say that:

**_A pull request is better than a complaint._**

Promoting knowledge sharing throughout the department strengthens ties between teams and improves the overall skill level but is again less likely to happen naturally in an established company. Time and effort must be spent keeping documentation up-to-date and all developers must be receptive to teaching and mentoring colleagues. This is no small task, but the payoffs for any company can be huge.

Outlined above are just a few of the parts of startup culture which we believe are valuable for larger companies to keep in mind. For all of its trendy open space work plans, standing desks and [in-house baristas](http://sprudge.com/coffee-tech-san-francisco-baristas-pov-108657.html), time tested kernels of truth remain at the heart of the startup scene which should not be discounted for all of its hyperbole.

As for _MyGuardian_, I recently had the joy of removing nearly 5000 lines of code when we finally retired it. We managed to salvage some of the backend implementation, simplified the offering and re-packaged it into a new section on the Home screen of the Android app. To date, it’s one of our most successful tests we’ve ran and will be heading into full production within the coming weeks.
