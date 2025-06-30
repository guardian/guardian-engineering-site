---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-12-stepping-into-a-new-world-what-we-have-learnt-from-creating-the-guardian-vr'
headline: 'Stepping into a new world: What we have learnt from The Guardian VR'
date: '2016-12-12'
authors: [Chris Wilk]
standfirst: 'Last month we launched The Guardian VR on Daydream, Google’s VR platform. It was a roller coaster ride and here is what we learned.'
image:
  url: 'https://media.guim.co.uk/ae0a05c1c354517bf0dd988ef53e1829ae3b4a1f/0_275_1446_867/1446.png'
  alt: 'Designing for VR'
  credit: 'Photograph: Guardian Design Team'
tags: [Advent developer blog 2016, Virtual reality]
---

In August, we formed a cross-functional [virtual reality team](https://www.theguardian.com/membership/2016/oct/04/the-guardian-and-virtual-reality) here at Guardian. Last month we achieved a huge milestone. We launched [The Guardian VR](https://www.theguardian.com/technology/ng-interactive/2016/nov/10/virtual-reality-by-the-guardian) app for Daydream and our second real-time piece, Underworld: a virtual exploration of London’s victorian sewer system.

As the year comes to a close, we wanted to reflect and share what we’ve learned so far.

1) A good piece can have a long life
------------------------------------

Virtual reality is a hot topic in the press, but it is still early days. Google Cardboard has achieved wonders for the industry, by making VR easily accessible. 360 videos are now commonplace on Facebook. I’d argue that these undersell where we truly are today.

We’ve seen audiences unsurprisingly over-index to the early tech adopter - male and under 35. To reach a different demographic, you will have to actively get your product in front of them. This will take time and patience.

As a consequence, a good VR experience can have a long lifespan. More people are discovering virtual reality every day, so your older pieces will continue to be seen by a fresh audience. [6x9](https://www.theguardian.com/world/ng-interactive/2016/apr/27/6x9-a-virtual-experience-of-solitary-confinement) has been out since April 2016 (on GearVR and Cardboard) and the audience for it is still growing.

2) Storyline trumps interaction
-------------------------------

Starting a new VR project always brings the big kid out of us. We’re overly excited. Ideas come thick and fast. It can be very easy to lose focus on the purpose of the piece. An important lesson we have learned is that the interaction should add to the story, and not overshadow it. It should be used as a tool to embody the protagonist and bring the story to life.

This is not just relevant to journalism. Many of the games out today focus too much on showcasing the interaction capabilities of VR and the outcome is underwhelming.

3) It’s easy to make people feel sick
-------------------------------------

That being said, the interaction design is so much fun! We’re a cross-disciplinary team that is very comfortable building apps and video documentaries. Even for us, there was a steep learning curve when it came to UX.

To start off, we did some homework first. There are a handful of well-written articles on the web that can help you navigate the common pitfalls. Medium is a gold mine for [VR UX tips](https://medium.com/tag/virtual-reality). Here are my favourites:

*   [Design Practices in Virtual Reality](https://uxdesign.cc/design-practices-in-virtual-reality-f900f5935826#.yibz40gwg) - Jonathan Ravasz
*   [Practical VR](https://medium.com/@hitsmachines/practical-vr-ce80427e8e9d#.e4klzm2oa) - Ryan Betts
*   [VR Design Practices](https://medium.com/@LeapMotion/vr-design-best-practices-bb889c2dc70#.fzhyyna85) - LeapMotion

Google has been helpful in this regard. For Cardboard, they created a best practices app called [Cardboard Design Lab](https://play.google.com/store/apps/details?id=com.google.vr.cardboard.apps.designlab) and for Daydream, there is a [series of talks at Google IO](https://www.youtube.com/watch?v=00vzW2-PvvE) that cover some of the basics.

By simply following these we would have still made a bunch of mistakes; user testing was essential to creating a smooth experience. Each individual has a different tolerance for motion sickness. In the same way, some people get motion sickness on boats or roller coasters, but others don’t.

For Underworld, we prototyped many of our ideas for navigation in Unity and then tried it out ourselves with a headset. The problems were obvious, and sometimes so harsh you very quickly took the headset off. More subtle issues like walking speed, lighting and claustrophobia had to be tested on dozens of test participants. We iterated and repeated tests on users that were particularly sensitive.

4) Shoot from the most natural perspective possible
---------------------------------------------------

Whether you’re making a 360 video or a real-time experience, the positioning of the person’s head is critical. Getting the height wrong will make them feel too tall or too short. An unnatural position, like in the middle of a table, will make them feel like they have a table coming out of their chest. Clashing environment, like a low ceiling, will make them feel like they will bump their head.

Best case, it will mean less empathy as they won’t buy into the experience. The worst case we’ve observed lead to delayed motion sickness. Users will just feel “weird” after taking the headset off and feel very queasy 15 or so minutes later.

We try our best to empathise with the user within each scene and test ideas first.

5) Don’t forget about what’s behind you
---------------------------------------

Working in 3D means you have to embrace and utilise of the whole environment. During the storyboarding stage, we tried to design what is going on around you. However, we still found issues with navigation and in-app menus that could have been caught much sooner.

If you can’t use the full 360 you should ask yourself, what does virtual reality add to this story?

6) Immersion is not just about what you see
-------------------------------------------

Visuals are important, but audio can make or break the experience for the user. A good sound designer can help carefully plan the positioning of the sound elements. Use audio to direct the user to the core components of the story or clues to what they have to do.

7) Recruit non-gamers
---------------------

Gamers are comfortable to console controllers and playing in environments with different physics or rules. We recruited a nice mix of gamers and non-gamers to try our piece as it’s being developed. We actively looked for the people who were hesitant to try VR. This meant UX issues came to the surface faster, but we’ve received much richer feedback as a result.

Gamers will lean to the more matter of fact in their response - “That was cool” or “I found the resolution of the bricks grainy”. They can easily work around interaction issues and not report them.

Non-gamers feedback has interestingly been more about the story and what emotions they experienced - “I was pretty spooked by the torch flickering” or “I loved the...”. They will take off the headset as soon as they get frustrated with the controls.

8) Most people want a seat
--------------------------

We’ve been showcasing our pieces at a number of events and festivals over the past few months. More people seem to be comfortable with the idea of VR when seated as they don’t want to look “silly”. If possible, design the piece so that it can be enjoyed while seated. If not, give the user enough prompts in the UI to play standing.

9) Keep an eye on the purse strings
-----------------------------------

Be strict on how much you want to spend and stick to it. Excitement can lead to a great number of last minute ideas and significant scope creep. Timelines and costs can easily run away from you, so keep an eye on those purse strings.

10) Understand the platform nuances
-----------------------------------

The capabilities of each platform are wildly different at the moment. We have been focusing on understanding the differences of each. 6x9 was first created for GearVR and Cardboard where interactions are mostly limited to gaze input. We wanted to give 6x9 a lease of life on Daydream. We found by prototyping some ideas. The only one that added a sense of solitude was allowing the user to walk around the cell. Going forward, we will be designing the interaction to suit the platform

\---

If you have a Daydream headset already or hoping to get one for Christmas, you can [download The GuardianVR on Google Play](https://play.google.com/store/apps/details?id=com.guardian.gvr). We will be releasing new pieces in the new year.

Keep an eye on [theguardian.com/vr](http://theguardian.com/vr) for future developments.
