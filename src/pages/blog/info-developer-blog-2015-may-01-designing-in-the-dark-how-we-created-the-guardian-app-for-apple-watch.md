---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-may-01-designing-in-the-dark-how-we-created-the-guardian-app-for-apple-watch'
headline: 'Designing in the dark: How we created the Guardian App for Apple Watch'
date: '2015-05-01'
authors: [Helene Sears]
standfirst: 'How do you design a great experience for a product that does not exist?'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/4/29/1430307008370/ab7a29d0-8d46-498e-8248-2ef5bff9ec41-1020x612.png'
  alt: 'Selection of watch designs'
  credit: 'Composite: Frank Hulley-Jones/The Guardian'
tags: [Apple Watch]
---

Whenever we are creating something for our readers, we start by understanding their needs. Typically that involves digging into usage data to find patterns of behaviour in addition to speaking to people to understand how they are using our product. Last November when we kicked off designs for [Apple Watch](https://www.theguardian.com/technology/apple-watch) we had no such luxury. Not only had we never held one, but we could only guess how people would actually use it.

“Research” and idea generation
------------------------------

Although we could not do traditional methods of research, the whole apps team is passionate about mobile technology and quite a few of us have Android wearables, meaning we could pool our collective experiences. We also had the guidelines from Apple explaining that Watch would be lightweight, timely and highly personal.

Kicked off by our product manager [Tom Grinsted](https://www.theguardian.com/profile/tom-grinsted) and Mobile Editor [Subhajit Banerjee](https://www.theguardian.com/profile/subhajit-banerjee) we got together and discussed everything we knew about the device. Lead iOS developer [Petr Krojzl](https://www.theguardian.com/profile/petr-krojzl) had been working on the WatchKit (the code released from Apple for Watch) in his spare time and explained the key features: App, Glance and Notifications.


   <figure>
   <img alt="Working wall" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/5/1/1430469845669/23303e23-37b8-45dd-bc13-64a7ef66a4c2-2060x1236.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=cf5288ea8908df8e44e2765a0dfb745a" loading="lazy" />
   <figcaption>
     Our working wall of how the Apple Watch looked and worked
    <i>Photograph: Helene Sears/The Guardian</i>
    </figcaption>
    </figure>

The “App” is the full offering on the device - a mini version of the main app that is on the iPhone. “Glance” is a snapshot of the Watch app, it is meant to be whatever is most relevant at that time. Finally “Notifications” are the easiest to understand, they are alerts that something has happened (a new email for example) and Watch vibrates and pops up a message to tell you about it.

Quite quickly we realised that the experience had to be lightweight and relevant. We knew readers would be looking at the Guardian on Watch for a few seconds, tops. We listed all of the things the app could display, but as a team we honed in on the idea that the app should give the user one key thing that they should know at any given moment.


   <figure>
   <img alt="Selection of watch designs" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/5/1/1430470014093/7924b6a7-5847-49b6-b94d-f518cecbf4f9-2060x1236.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=a3c2a1076a276057e51b3d04cd1e1cc5" loading="lazy" />
   <figcaption>
     The team sketched out lots of ideas and we voted on our top choices
    <i>Photograph: Helene Sears/The Guardian</i>
    </figcaption>
    </figure>

Dubbed ‘Moments’ by Creative Director Alex Breuer (with the pun intended), the idea evolved to be a single piece of content for a user at any given time. Rather than always being news headlines however, the content itself would vary over the day depending on context and history to ensure the reader always gets something fresh and worthwhile. This also reflects the Guardian brand, which whilst serious at times is also not afraid to be fun and playful.


   <figure class="supporting">
   <img alt="Watch on wrist" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/28/1430234783780/024b4c61-a80a-4b4e-b754-16c8ba5d139d-2060x1236.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=ec1eef3d17db8d1e92bca6b0c8b71841" loading="lazy" />
   <figcaption>
     To get a feel for the actual size we made an Apple Watch to scale out of paper and held together with blue tack
    <i></i>
    </figcaption>
    </figure>

Mapping the day for Guardian Moments
------------------------------------

We know Guardian readers have core needs around getting fast updates, extending their knowledge and discovering new content. Especially first thing in the morning, there is a critical user need to know the very latest of what is going on in the news. Over the course of the day however, there is more interest in light and different stories and we wanted to show off the range of what we produce to help readers discover stories. We picked out our great content, ranging from [photo highlights of the day](https://www.theguardian.com/news/series/ten-best-photographs-of-the-day) on a Monday as a pick-me-up to [Peter Bradshaw’s film of the week](https://www.theguardian.com/film/series/peter-bradshaw-film-of-the-week) on a Friday to get ready for the weekend.

It must have looked a bit odd, but we printed images of Apple Watch to scale and while designing I kept one on my wrist, held in place by blue tack. It forced me to think about the experience on that small screen and how quick the interactions would be (holding your arm up for a long time is tiring). Although there was a lot of complexity behind what the Guardian Watch app was choosing to display, the user experience was designed to be extremely minimal and very relevant. We mapped the whole experience in a timeline.


   <figure>
   <img alt="Watch timeline" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/5/1/1430474382181/0c70ad4f-0975-4a6c-9820-9ab1531f9071-2060x770.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=c830827d3c1ad2dba90a6d6090bc21d3" loading="lazy" />
   <figcaption>
     A timeline for what the Guardian Watch app would display
    <i>Photograph: Helene Sears/The Guardian</i>
    </figcaption>
    </figure>

With the exception of the morning briefing - the editorial top stories of the day - once a piece of content has been seen or read, it refreshes itself with something new. Likewise we wanted the content to be personal, so the Watch app pulls in stories that the user hasn’t read from their app homepage, which can be personalised to ensure that if Archaeology is your favourite section then unread Archaeology stories are what you will get.

Finally we knew that football is something a lot of Guardian readers love. We introduced tracking in the app that would count the number of times you read a football story about a particular team. If you hit the threshold, match cards would appear on your Watch whenever your team is playing. This also ensured that people who were not interested in football would not see any of it.

Design and execution
--------------------

Designer Frank Hulley-Jones reworked the Apple Watch templates to give them Guardian style. The morning briefing kept a focused headline update tone, whereas features and movie reviews had a more relaxed feel.

> On one hand designing for the Apple Watch was about displaying content that was intriguing and timely. The second hand was mainly focused on not making too many watch puns.”  
> – Designer Frank Hulley-Jones

Frank emphasised it was crucial that readers instantly recognise that they’re reading Guardian content, no matter what device they’re on.

<img src="https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/5/1/1430472639233/GuardianAppleWatchwrist.gif" style="width:100%;">

Release and next steps
----------------------

Alongside many other enthusiasts we anxiously awaited the impact of Apple Watch. For our team it was seen as a chance to experiment and try something new.

Designing in the dark was daunting at first, but invigorating by the end. It meant we could not rely on previous products and decisions, but had to genuinely imagine our readers’ lives with this new bit of technology and trust our instincts.
