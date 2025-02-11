---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2012-mar-21-developing-google-tv-app'
headline: 'Developing the Google TV app in Beta'
date: '2012-03-21'
authors: [Dan Catt]
standfirst: 'We''ve launched the Guardian on Google TV as an app in beta, HTML5, prototypes and video playback'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2012/3/21/1332344853380/Google-TV-app-007.jpg'
  alt: 'Google TV app'
  credit: 'Photograph: guardian.co.uk'
tags: [Google, Guardian beta]
---

We've launched the Guardian on [Google](https://www.theguardian.com/technology/google) TV as an app in beta.

As the developer of this project, I have been working on this project for a number of months. Launching it in beta allows us to continue to tweak and change the app until we have settled on one that we are completely happy with. Feedback on the app is welcome; either leave a comment below or tweet them to us using the hastag #GdnforTV.

What is Google TV and how is the Guardian 'on' it?
--------------------------------------------------

There's been an increasing amount of ConnectedTV talk recently. Televisions that connect to the internet for either web browsing, specifically designed film/tv/music streaming services, app downloading and so on. Google has developed Google TV, which is based on the Chrome web browser.

Like Android, Google has licensed it in a way that allows manufactures to build it into their hardware. We've started seeing TVs sold with Google TV pre-installed on it, or seperate boxes that you plug into the TV. Some manufactures have designed their own "ConnectedTV" experiences and, of course, there's Apple with their Apple TV unit.

In most cases, it means the internet is on your telly, which in turn means that websites are already by default "on TV".

Looking at a website on TV is a very different experience to a desktop computer, laptop, tablet or phone. It's normally across the room from the user, and [Google even has design documents](https://developers.google.com/tv/web/docs/design_for_tv) for the experience. This is often called the [10-foot user Interface](http://en.wikipedia.org/wiki/10-foot_user_interface).

We wanted to have a go at designing a Guardian news experience for the large screen, to see what did and didn't work. Big pictures and video work well, but lots of text not so much.

'You can build prototypes in the time it takes to have a meeting,' as said by Simon Willison
--------------------------------------------------------------------------------------------

Some projects require careful planning, meetings, wireframes and so on because they touch something that already exists (ie, updating or adding to a current website). Others because you have one chance to get them right and be judged, for example our [(award winning) iPad project](http://www.guardian.co.uk/mobile/ipad/guardian-ipad-edition).

Sometimes, it's better to wade right in and knock out a prototype if:  
a) the technology involved is really simple or well understood  
b) it's easier to show the prototype to explain the project than co-ordinate various meetings with everyone who'll eventually be involved  
c) not many people are watching (and those that are watching tend to be early adopters).

As Google TV is basically the Crome web browser in a box, that meant I could use skills I already have: HTML, CSS, javascript and some Python on the server side. Better still, it used HTML5 and CSS3 giving me access to the <video> and <audio> tags and various neat CSS effects. Google TV also has a great supportive, helpful and responsive team behind it that wants it to succeed and work. That's everything a developer wants when they hit a bug or niggle they need help with.

On our side, we have the Guardian's ContentAPI, which exposes all our content specifically so it can be used by developers to hack things like this together.

Basic Design Decisions
----------------------

1) Build the minimum viable product to get version 1.0 shipped.

We've missed a lot of stuff on our wish-list out: customising the content, subscribing to videos, sending content to Facebook, Twitter or your computer/phone to read later/closer, comments, podcasts, interactives, polls, crosswords. How the list goes on.

If we tried to include them all we'd be here until next Christmas before shipping anything. Better to get it out there and keep iterating on it.

2) Make it usable.

We learnt a couple of things quite early on...

**Reading Articles**

Reading words off a screen 10ft away is tiring. But as we played with it we discovered that it's good for glancing the headlines to get an overview of what's going on. The display also automatically updates as new articles are published.

A quick "click" on an article, would bring up a bigger picture and what we call the "trail text" the quick one sentance synopsis. It allowed you to go "I wonder what that's about. \*Click!\* Oh right, that's what it's about", quickly dipping in and out of stories. Which is why we made the "Close" button the default next action when you "clicked" a 2nd time, just two clicks to get you in and out of the story.


   <figure>
   <img alt="Google TV app" src="https://i.guim.co.uk/img/static/sys-images/Technology/Pix/pictures/2012/3/21/1332345322914/Google-TV-app-005.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=dbb5ba0003b6db6a275fcf931d23f368" loading="lazy" />
   <figcaption>
     The Guardian's Google TV app Photograph: guardian.co.uk
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

If you want to find out more then you can scroll down to continue reading.

**Galleries and Video**

The app really shone with galleries and video, large bright pictures worked really well on the TV. So much so that when showing galleries we decided to make the title and thumbnail "ribbon" move out of the way after a few seconds so you see the image unobscured. A tap of the up and down arrow will always bring them back.

The 24 hours in pictures gallery is quite astonishing. Personally, I think it's one of the main features of the Guardian on Google TV. When you have a screen that large, bright and viberant it begs to have pictorial content on it and the Guardian do it really well.


   <figure>
   <img alt="Google TV app" src="https://i.guim.co.uk/img/static/sys-images/Technology/Pix/pictures/2012/3/21/1332345430910/Google-TV-app-004.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=76eb27a930598d52ea311171caaa92cb" loading="lazy" />
   <figcaption>
     The Guardian's Google TV app Photograph: guardian.co.uk
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Video of course is good too, it being a TV and all. However this is where we've run into some trouble. Although HTML5 and the <video> tag works on Google TV, this is the area of the project that's caused the most problem.

Our video is encoded in a number of different formats, one for our website (MP4, that's at the traditional 4:3 ratio) and a couple for phones (3GPP) that are widescreen. The widescreen ones that display really well on the TV kept stuttering, while the MP4 videos played really well but it is letterboxed and then has side bars when playing because it's not wide enough.

Fortunately the team over in the multimedia department started pushing out videos for us in widecreen MP4 format where possible. Not all of them are HD yet but we're getting there.

We may end-up switching over to a Flash video player that will be able to monitor the amount of buffering going on and switch between high & low bandwidth version, but we thought we'd gather some feedback & metrics before taking the pludge.

The Wrapup
----------

The number of connected TVs is small, although with more TVs per household in the US than people that number could grow quickly. When you factor in other devices such as the XBox 360 and PlayStation 3, it seemed worth exploring how our content could work on a larger screen in a different enviornment to usual.

I think we'll probably give it a few weeks and maybe rollout a couple of updates just to see how it goes and then maybe even head towards a version 1.5
