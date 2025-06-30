---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2017-jun-26-championing-accessibility-at-the-guardian'
headline: 'Championing Accessibility at the Guardian'
date: '2017-06-26'
authors: [Kate Whalen, Simon Adcock, Shaun Dillon]
standfirst: 'What is digital accessibility, and how it can be considered part of universal design? How do we inform others of design considerations for a global audience, and common accessibility tools?'
image:
  url: 'https://media.guim.co.uk/d78687d7d151c7f80d10f7c5aa7b364aae4ad444/0_318_4013_2408/4013.jpg'
  alt: 'A member of the Guardian Accessibility Working group stands at a lectern, presenting a slide deck. The screen shows a diagram demonstrating the types of Accessibility requirements'
  credit: 'Photograph: Maria-Livia Chiorean/The Guardian'
tags: [Accessibility, Computing, Programming]
---

In preparation for [Global Accessibility Awareness Day](http://globalaccessibilityawarenessday.org/), the Guardian Accessibility Working Group decided to run a workshop for our colleagues.

Our aim was to talk about **digital accessibility**, and how it can be considered part of [universal design](https://en.wikipedia.org/wiki/Universal_design). We wanted to explain the importance of these two concepts, while also getting our colleagues to try out some digital accessibility tools!

Format:
-------

We had four stations, each one facilitated by a member of the Accessibility Working Group, and focusing on a different accessibility consideration, or tool. As our colleagues arrived, we asked them to choose a group. Once the interactive part of the workshop began, the groups would spend 10 minutes at each station before rotating to the next one.

During each rotation, we encouraged discussion while the challenges were being attempted. These tasks were designed to be hard, to bring home some of the frustrations users may have.


   <figure>
   <img alt="Groups get started on the workshops at the Digital Tech Time on Accessibility -  four tables with members of Guardian Digital clustered around them" src="https://i.guim.co.uk/img/media/c62bc7c83a5e66fc52c39934156e0316f511a83e/0_273_3940_2364/master/3940.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=ea79aa5ebad4a17d10826904407b88e9" loading="lazy" />
   <figcaption>
     Groups get started on the workshops at the Digital Tech Time on Accessibility
    <i>Photograph: Maria-Livia Chiorean/The Guardian</i>
    </figcaption>
    </figure>

Screenreaders:
--------------

To highlight the importance of decent [semantic structure](http://webaim.org/techniques/screenreader/) and [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets) labelling, one challenge required attendees to fill in and submit a short survey, while receiving minimal visual feedback. To help with the challenge, we introduced [VoiceOver](https://help.apple.com/voiceover/info/guide/10.12/); the screen reader for MacOS, and provided some cheatsheets of keyboard shortcuts for browser navigation with VoiceOver.

[Our survey](https://tt-a11y.herokuapp.com/) was built upon on the [fantastic work](https://github.com/lc512k/a11y-experiment) of Laura Carvajal that she [presented at London Web Standards](http://londonwebstandards.org/2017/03/lws-20-march-2017-lwsa11y17/) in March 2017. Visual information was restricted by applying css styling to blur the webpage.


   <figure>
   <img alt="The Guardian homepage with a significant blur filter applied, so that it becomes unreadable" src="https://i.guim.co.uk/img/media/ed84348131664684543534392f37791cc27a8df9/181_5_2567_1540/master/2567.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=61d9f6afc7058467a214da86a703b379" loading="lazy" />
   <figcaption>
     The Guardian homepage with a significant blur filter applied
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

When users submitted the form, the page would update to inform them whether it was successful, or if they had missed a required field. Unfortunately there was no [audible notification](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role) for these states, so our attendees were always uncertain if they had completed the challenge!

After frustrating everyone with an inaccessible survey, we tried out our own homepage (with a strong blur filter applied), to see what it sounded like with a screen reader, and if we could navigate to the main content.

No mouse:
---------

No-mouse navigation is one of the easier to implement, and more commonly used ways of accessing a website. Uses range from people with motor function issues to visual impairment to temporary problems such as injuring your dominant hand.


   <figure class="supporting">
   <img alt="Guardian Developers attempting to browse websites without using a mouse. One person is filling in a survey on a laptop, while two other people watch" src="https://i.guim.co.uk/img/media/1e7c0b9fb6571e9481ab20bf67fcc3cdf336d10c/720_0_2848_2848/master/2848.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f571647e62ac64b463d2dd0585938f87" loading="lazy" />
   <figcaption>
     Guardian Developers attempting to browse websites without using a mouse
    <i></i>
    </figcaption>
    </figure>

The challenge at this table was to fill out a [survey on the w3.org site](https://www.w3.org/WAI/demos/bad/before/survey.html) which has been purposefully sabotaged to be as frustrating as possible to fill in. This means changing the order that moving through the elements on the page would logically follow, removing highlights from currently selected items and not giving good feedback on errors and inputs. The teams quickly found the form unworkable, taking far longer than needed to fill out the survey.

Luckily, as the input comes from a common source, the keyboard, support for no-mouse navigation is well covered in software, including web browsers. The solution to a lot of the problems encountered in this challenge was to let the browser act as it should, ordering things correctly in the page and leaving the highlights alone, or ensuring you replace them when they’re removed.

These are seemingly tiny things, but make a world of difference to anyone that relies on them.

Colour blindness:
-----------------

Use of colour is integral to the design, branding and identity of a website, but it has important implications for readability and user experience. There are many examples on the web of user journeys and infographics that rely solely on the use of colour to distinguish data or signify calls to action, from buttons to election graphs to football team form charts. By not providing enough colour contrast, we may render text or forms inaccessible.

To simulate colour blindness and visual impairment, we asked participants to install the [NoCoffee Chrome Extension](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl). We then asked them to complete a series of exercises, such as interpreting election results and buying packs of t-shirts. We found that in some cases it’s difficult or even impossible to navigate a shopping journey or discover hyperlinks without the ability to differentiate between certain colours. An awareness of this fact will help us make the user experiences we design more accessible.

Voice navigation:
-----------------

Very much like keyboard navigation, voice navigation can easily get the user lost on a page if the developers do not use the right fields, or use strange tab orders. Voice navigation can be a slow process because it takes ages to understand. Therefore it is important to make the amount of steps to content as few as possible, and make undoing mistakes easy.

To let our colleagues try out voice navigation, we set up a Macbook with dictation enabled and used a standing microphone to input commands, to counteract the background noise of the workshop!


   <figure>
   <img alt="Members of Guardian Digital using verbal commands to control a Macbook" src="https://i.guim.co.uk/img/media/cee3e4fc159f82570cd30188f2d49914c468ed5d/0_275_4288_2573/master/4288.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=c9f200f72e1c20ad99e46bf3f57ec1bc" loading="lazy" />
   <figcaption>
     Members of Guardian Digital using verbal commands to control a Macbook
    <i>Photograph: Maria-Livia Chiorean/The Guardian</i>
    </figcaption>
    </figure>

Conclusion:
-----------

After giving everyone some time at each station, we wrapped up with a Q&A.

People showed a renewed interest in accessibility considerations, and how it impacts their day to day work. As well as our external facing products, the Q&A generated a lot of discussion about the accessibility requirements of our internal products.

What next:
----------

The goal of this workshop was not to transform everyone into accessibility experts; there are far too many considerations! However, we hope that the sessions helped our colleagues to get an understanding as to how people use these tools online, and the potential issues and annoyances that occur online, when accessibility isn’t considered.

We would like to start resolving some of our existing problems, so that we can easily monitor newly introduced problems later on. A recent addition to the codebase of the main website is the [introduction of Pa11y](https://github.com/guardian/frontend/pull/16587) - a tool that can be used for automated accessibility testing.

The Guardian Accessibility Working Group believe that by discussing and championing accessibility, we can all become more mindful when designing, building and refactoring features in our digital products.
