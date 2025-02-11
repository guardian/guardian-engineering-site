---
layout: ../../layouts/blog.astro
slug: 'info-2019-dec-26-how-the-guardians-engineering-team-supports-the-24-hour-news-cycle'
headline: 'How the Guardian’s engineering team supports the 24 hour news cycle'
date: '2019-12-26'
authors: [Mark Butler]
standfirst: 'Managing the out of hours engineer support rota to meet the demands of a global news operation'
image:
  url: 'https://media.guim.co.uk/55df34d39748c4db81e50e84783dada6a442f356/0_140_4200_2520/4200.jpg'
  alt: 'Computer programming chaos panic stress'
  credit: 'Photograph: welcomia/Getty Images/iStockphoto'
tags: []
---

News happens 24 hours a day, seven days a week. It’s essential our audience can access our journalism at all times, we cannot have any disruption to our service.

Whilst we build our software for reliability through the use of [microservices](https://martinfowler.com/articles/microservices.html) and removal of [single points of failure](https://en.wikipedia.org/wiki/Single_point_of_failure), occasionally we need an engineer to take a look at a problem out of regular working hours. With complex software and integration across a wide variety of systems, it’s not possible to predict all technical failures.

During UK office hours engineers who maintain the systems are available to fix issues. Out of hours support is provided for a defined set of critical systems only, by a small number of on-call engineers covering evenings, weekends and public holidays. Undertaking an on-call shift is optional at the Guardian, engineers decide their shifts and work around other commitments.

Our systems predominantly run in public clouds. The development teams follow a dev-ops mentality; we don’t have operations teams. This allows us to move fast when developing. We want to share our experience with our on-call process so you can learn what works for us.

A week on the rota
------------------

At the beginning of each shift, the engineers rolling off shift meet with the new shift at a handover meeting. The aim of the meeting is to share knowledge from the previous week and discuss any incidents. A first-line support representative also attends to highlight any potential risks that have been identified in the upcoming week. The remit of on-call covers a subset of our systems, one engineer may handle initial debugging, while another engineer can manage communication with stakeholders.

Responding to a call
--------------------

Technical issues can be surfaced to the first-line support team through automated alerts but often they are first reported by our editorial colleagues. The strong relationship between this team and editorial is crucial in identifying and fixing issues promptly.

First-line support triage incoming issues and only escalate if they are of the highest priority (P1) usually indicating problems with publishing content, the slow rendering of our articles, or with our news apps or breaking news notifications.

> At first glance this might seem like overkill, but it’s extremely useful if the call is made in the early hours of the morning

If the first-line support team determine that the issue requires escalation, they will telephone one of the on-call engineers. The engineer will then follow a playbook that outlines what to do next.

The initial advice is to understand the problem. It is critical engineers have a clear grasp of the problem to avoid merely speculating on solutions or making assumptions. We have pre-canned questions the engineer can ask first-line support in order to gather the right information.

At first glance this might seem like overkill, but it’s extremely useful if the call is made in the early hours of the morning and ensures the rapid collection of data.

Starting the investigation
--------------------------

Next the engineer will contact the other on-call engineer. It’s important that we communicate effectively during the incident and have a log of information to reflect on afterwards. Our engineers are responsible for sending out communication to the business and keeping an event timeline. A timeline is a crucial document for reflecting on the incident and will revisit this later.

Follow the playbook
-------------------

Our engineers follow playbooks which document steps for diagnosing a problem, the system architecture, links to useful dashboards and other tools. We use playbooks as we believe that a clear process is the best solution to relieving the pressure on engineers when dealing with out-of-hours calls. If the engineers are able to fix the issue they then document the incident in a spreadsheet and send out communication to the business.


   <figure>
   <img alt="A messy bunch of ethernet cables." src="https://i.guim.co.uk/img/media/19522a08a444f981bdd12eae5b884a22ac8b0a5e/0_0_5184_3111/master/5184.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=ad73da84d9d1cde655fdd95d8f8667ab" loading="lazy" />
   <figcaption>
     Debugging the problem can be challenging.
    <i>Photograph: Michael Bocchieri/Getty Images</i>
    </figcaption>
    </figure>

Our on-call engineers are not expected to solve every problem that is reported out of hours. If the problem cannot be solved by following the playbook, and we agree that it continues to be urgent, we will escalate to more specialised staff. We have decided that if the people on call are not able to fix the issue within 30 minutes, they will contact third-line support. The third-line support staff are responsible for the specific system exhibiting the issue and will provide support for fixing the underlying problem.

Afterwards …
------------

It’s important to us that our on-call engineers rest after responding to incidents late at night or early in the morning. Once everyone is back in the office we organise an immediate retrospective meeting to go over the incident. The intent is to understand the problem with a view to identifying actions and areas of improvement in the overall process.

We understand that taking part in the on-call rota can be somewhat disruptive, we provide laptops and devices so they are able to investigate incidents from any location. For special events such as elections we have arranged out-of-hours capacity.

Conclusion
----------

Being on-call can be daunting, but with the right process and support in place we have found we can mitigate this. A step-by-step process and simple, clear up-to-date documentation is critical in helping our engineers solve problems quickly and effectively.

We have a shared understanding of what is supported by our on-call engineers which greatly simplifies our process. Hopefully you can use some of our learnings to improve your own process.
