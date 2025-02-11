---
layout: ../../layouts/blog.astro
slug: 'info-2020-aug-11-welcome-to-the-dark-side-deploying-dark-mode-on-the-guardian-live-app'
headline: 'Welcome to the dark side: deploying ‘dark mode’ on the Guardian live app'
date: '2020-08-11'
authors: [Gwyn Lockett]
standfirst: 'Do you like to read the headlines at night? QA/test analyst Gwyn Lockett discusses the introduction of dark mode on the Guardian’s main news app'
image:
  url: 'https://media.guim.co.uk/076292685a634a1c63d391b539cec3fc7cf77e20/0_0_5000_3000/5000.jpg'
  alt: '‘Dark mode’ screens from the Guardian live app'
  credit: 'Composite: Guardian Design Team'
tags: [Android, Apple, iOS]
---

As the QA/test analyst for the Guardian’s mobile apps team, part of my role is processing user feedback and suggestions. One of our most requested features has been a night-time reading solution on the Guardian live app.

With the introduction of dark mode as a system setting in both iOS 13 and [Android](https://www.theguardian.com/technology/android) 10, we are pleased to report we now offer this brilliant feature for readers. The sleek new dark theme will sit alongside our standard colour palette. In this blog post, I’ve outlined some of our considerations and steps we took during the development process.

Accessibility
-------------

There are a lot of concerns about how technology can affect us physically and emotionally. Research indicates too much time at a computer may lead to eye strain, back problems, and carpal tunnel syndrome.

When we talk about the potentially damaging effects of white-background screens, this usually relates to “blue light,” part of the light spectrum made of short, high-energy wavelengths and that using smartphones, tablets, and other blue-light emitting screens can also disrupt our sleep cycles, but there are some [benefits to a darker](https://blog.weekdone.com/why-you-should-switch-on-dark-mode/) theme.

Guardian app users can now choose dark mode as their default interface style by activating their device’s system setting at any point during the day. The new dark colour scheme uses the local device settings so that it is consistent with other installed apps. With a new, darker colour palette for all screens, views, menus, and controls, it uses more vibrancy to make foreground content stand out against the darker backgrounds.

How we did it
-------------

The task to complete the work was always understood to be a big undertaking, but with [Apple](https://www.theguardian.com/technology/apple) and Google releasing system-wide support for dark mode that removed some of the design and engineering barriers, it felt like a perfect time for us to implement this feature.

The work began with the design team auditing the current scheme, cataloguing and naming all colours, hues and tones used within the app, as well as scrutinising the colours for accessibility conformity. Following this, a brand new colour palette was generated, which our developers could then use to render the new dark mode theme.

Nailing the design
------------------

Our Guardian design team aimed to create a quieter, more muted experience for dark mode. They found that certain strong and bright colours in the current Guardian brand palette appeared too harsh when seen against a darker background. So they started out by reducing each screen and component to grayscale and then re-introducing colours sparingly. In doing so, they often used darker or warmer colours from the existing palette as well as adding a range of new extra-dark tones. In all instances, the design team checked colour contrasts for accessibility according to [WCAG 2.0 standards](https://www.w3.org/WAI/standards-guidelines/wcag/).

Once the new colour palette was established, it was then handed over to the backend team to incorporate the new values for server-side rendering and any templates used by the front-end developers.

Development work
----------------

Following Google’s material design principles for a dark theme ([Dark theme - Material design](https://material.io/design/color/dark-theme.html)) the Android development team implemented dark mode on the Android app, which meant making some fundamental changes to how we named and used resources within the Guardian news app. After 100 pull requests and two months of beta testing, we completed the majority of the dark mode work and released our dark mode work to production.

The iOS development team tackled adding dark mode on a screen-by-screen basis. There were hundreds of colours used in code dating back to 2013 that didn’t have a direct match to a palette colour and therefore had to be changed. They too undertook the development work using guidelines and principles from Apple’s new [iOS 13 dark mode guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/).

The amount of work and collaboration involved between designers and developers working side by side to undertake this task was no small feat. More than 250 individual colours and tones had to be audited, named and referenced in the codebase. Our teams worked meticulously to accomplish the goal of creating this great new look and feel. We are excited to bring this feature to Guardian app users.
