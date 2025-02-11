---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-jun-24-creating-glassware-for-the-guardian'
headline: 'Creating Glassware for the Guardian'
date: '2014-06-24'
authors: [Lindsey Dew , Robert Rees]
standfirst: 'The Guardian developers discuss their experience of developing Glassware for the launch of the Google Glass UK Explorer programme. How difficult is it to develop a new application for a device on the bleeding edge?'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/6/24/1403618612411/1e6da424-d6e8-4fe6-9e6d-233b309dc742-2060x1236.jpeg'
  alt: 'Google Glass guide Alice Gabon looks at other Google Glass.'
  credit: 'Photograph: Nick Ansell/PA'
tags: [Google, Google Glass]
---

Recently we have been working on Guardian ‘Glassware’ for [Google Glass](https://www.theguardian.com/technology/google-glass) in time for the UK release of the device. It’s been an incredibly exciting challenge to develop for this platform, and to explore how Guardian content might best be served on wearable technology.

Most of the user experience for Glass is controlled by the [timeline](https://developers.google.com/glass/design/ui), a collection of all activity and notifications. Items in the timeline are called cards, and these are the main user interface components for Glass. Third party applications can populate the timeline with cards and these will be available in the user’s timeline in the order of time sent. Cards also have menu items, which allow users to carry out actions on the cards. For example, ‘share’ gives users the ability to share the card with their contacts.


   <figure>
   <img alt="A Glass card showing a Guardian headline" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/6/24/1403618063134/93417cb5-500a-4a1a-8a2f-3818541e1295-bestSizeAvailable.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=27f4a1afbf3f95afca7744cc8914dc4c" loading="lazy" />
   <figcaption>
     The Guardian's application shows the headline and a representative image. Photograph: /The Guardian
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

One of the challenges of developing for Glass was thinking of ways to best present Guardian content on this type of device. The UI for Glass best suits large text, images or videos – displaying anything more than a headline is usually more text than is comfortable to read on Glass. The Glassware we developed sends a selection of cards containing a summary of the latest news to the user’s timeline at regular intervals. It also sends notifications of breaking news. To give users the ability to access the contents of the article we implemented the ‘read later’ action which stores the URL of the article to the user’s Guardian Glass homepage. Users also have the option of sharing an item and having Glass read a short synopsis of the story.

There are two ways to develop ‘Glassware’ - Google’s term for software running on Glass. One is the using [Glass Development Kit](https://developers.google.com/glass/develop/gdk/index) (GDK), which lets you build Glassware that run directly on the Glass device. The other is with the [Mirror API](https://developers.google.com/glass/develop/mirror/stories), which allows you to build web-based service applications that interact with Glass without running code on the device. This works by first writing an authentication flow which obtains permissions to write to a user’s glass timeline API when a user installs Glassware. Then any content you post to this API is synced with the user’s Glass device. This is the approach we took because it meant we could reuse code from existing applications and it did not require any previous experience of developing for Android. This [sample application](https://github.com/googleglass/mirror-quickstart-python) provides examples of how you might interact with the Mirror API, and using this in combination with the Guardian’s [Content API](http://explorer.content.guardianapis.com/#/), we were able to rapidly produce the first iteration of Guardian Glassware.


   <figure>
   <img alt="A Glass card showing a Guardian breaking news alert" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/6/24/1403618201863/3d8b9f45-ffd3-4870-8dd4-36fae6a6bfd4-bestSizeAvailable.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=29d7bd0ebe5b48c48f3c5e48ae851cbe" loading="lazy" />
   <figcaption>
     Breaking news alerts are pushed to the Glass device. Photograph: /The Guardian
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

Google offers the ability for developers to define custom actions on cards, which we used for the ‘read later’ functionality. Custom actions can be implemented by subscribing to the user’s timeline and listening to events. As a user interacts with Glassware, Mirror sends information about that interaction back to Glassware, which can then perform logic depending on which interaction was chosen, and possibly update the contents of the card. This opens up many possibilities for two-way interactions between Glassware and user.

Most of our development work needed to be tested on Glass itself. Google has developed a [Mirror API Playground](https://developers.google.com/glass/tools-downloads/playground) which lets you test out how your cards would be displayed on Glass and provides example templates, but this isn’t sufficient to use as an emulator. Wearing the device around the office did spark a few conversation starters and demo requests. At first it felt quite strange to use, but it was surprising how quickly the swiping mechanism for accessing the timeline became second nature.

It’s been a fantastic experience to work with Google Glass and discover new ways of presenting Guardian content on this new platform. The scope for wearable technology is massive, and it will be interesting to further develop news consumption on these devices.
