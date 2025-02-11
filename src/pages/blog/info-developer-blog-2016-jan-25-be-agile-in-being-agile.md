---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-jan-25-be-agile-in-being-agile'
headline: 'Be agile in being agile'
date: '2016-01-25'
authors: [Thomas Kaliakos]
standfirst: 'The following blog post will try to briefly describe how agile is implemented at the Guardian, or at least in the Platforms team, as there is flexibility in how each team uses agile. The intention is to show how this specific shaping of agile methodology has evolved and why it feels that is the right way for tackling the complex problem of handling 977 million page impressions in a month and all these from a developer’s point of view.'
image:
  url: 'http://media.guim.co.uk/ed91dd34c55e1aa3748a0d16e8a63a2a11be71e5/0_50_737_442/737.jpg'
  alt: 'Inside the Guardian'
  credit: 'Photograph: The Guardian'
tags: [Programming]
---

In the Guardian’s Platforms team, agile is implemented as a hybrid of [Scrum](https://en.wikipedia.org/wiki/Scrum_\(software_development\)) and [Kanban](https://en.wikipedia.org/wiki/Kanban). There are fortnightly sprints, daily stand ups, sprint planning, retrospectives and a backlog. We use [Τrello](https://trello.com/) as a tool to monitor the tasks and various lists to track their state. The tasks are prioritised in the backlog and the developers have the freedom of selecting the “card” (i.e. task) they would be interested in doing.

No estimations - no deadlines
-----------------------------

Although sometimes sticking to certain time windows is essential (especially when there is third party involvement), deadlines are not a usual phenomenon here at the Guardian’s Platforms team. Additionally, estimations can be a quite painful concept for any developer, especially when they are sometimes (mis)treated as deadlines by product managers. Developing big software systems is in its essence a very complex problem. For each task we have to consider creating a system that can scale to large amounts of traffic and is able to handle large traffic spikes, whilst still providing a quality service. Investigations and exploratory tasks are also very common, whilst the work schedule itself is very dynamic, with support requests and urgent feature requests occurring quite often. All these points underline why estimations can be very difficult. Initially they were used, but were abandoned in the process as they weren’t very accurate and it was commonly believed that they didn’t bring much value to the process. It is worth mentioning the psychological factor too; it is much less stressful not to have to estimate the time for a task if you spend more time on it than your original estimate. Finally it’s worth noting that the fact that the Guardian, through its online version, offers a service instead of a product makes this feasible (as there is no date for the next version of the product to be shipped to its clients) and this could be considered one of the advantages of [software as a service](https://en.wikipedia.org/wiki/Software_as_a_service) in general.

Planning & Reviewing
--------------------

Having no estimates means that there are no burn down charts, no team velocity, no sprint planning with its typical meaning. During the sprint planning, milestones are set in the sense of what would be the desirable outcome at the end of the sprint. These milestones can, of course, change and adapt if in the process the goal post has moved. Setting an ultimate target and always seeing the bigger picture is what helps us understand if we are moving towards the right direction. For that purpose there are quarterly and mid-quarterly review meetings where we try to do that. In the quarterly sessions the team’s objectives are defined and clear targets are set. The focus of the mid-quarter sessions is to review the status and the progress against those objectives, as well as raise any issues or blockers that need attention. Metrics and [KPI](https://en.wikipedia.org/wiki/Performance_indicator)s are also valuable tools in our arsenal. For example, approximately one year ago, the [Content API](http://open-platform.theguardian.com/) went through a big restructure. It was migrated from an in-house datacenter to [AWS](https://aws.amazon.com/) and the majority of the code was reimplemented. As a result of these changes the system’s stability decreased. Instead of taking the usual approach and making a list of features along with deadlines for their delivery dates, a general goal was set to increase the system’s stability and started working towards it, whilst metrics and KPIs (like uptime) were used to check we were moving in the right direction. After a short time the system became robust and resilient, with 99,99% uptime (you can check how we use Pingdom and Pagerduty for measuring availability in a very interesting blog post [here](https://www.theguardian.com/info/developer-blog/2014/mar/25/monitoring-alerting-and-starting-from-scratch)).

Agile in its essence
--------------------

It is a very common pitfall for Scrum to be applied in a ritualistic form. Whenever this happens the true meaning of being agile is lost. In the Guardian we try to use all the considered agile best practices, but only in a way that makes sense in each specific case. Even the sprint’s duration is not fixed; it may change to one week for example, if it fits better the circumstances. In conclusion, we try to apply all the well known agile methodologies and practices but every time through a critical perspective, adapting and adjusting them. After all, this could be a great mentality to have not only in a software development process, but in different contexts too, like life...
