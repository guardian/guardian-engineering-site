---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2012-aug-14-olympics-london-2012-second-screen'
headline: 'Reimagining the timeline: behind our Second Screen web app'
date: '2012-08-15'
authors: [Jonathan Richards]
standfirst: 'Pulling together the vast mass of Olympics-related updates - blog posts, tweets, pictures, results, and more - in a single app for tablet created a bunch of design challenges. Here we explain how we went about solving them, and what we learned along the way'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/8/9/1344533724549/Screen_shot_2012-08-09_at_18.33.05.png'
  alt: 'Guardian Second Screen, orientation page'
  credit: 'Photograph: guardian.co.uk'
tags: []
---

Here at the Guardian, we think a lot about timelines.

Timelines remain one of the most useful visual mechanics to display sequenced information. They also, as we have been discovering, relate very closely to that other "visual mechanic" of our time - the stream, which, thanks to Facebook and Twitter, is emerging one of the pre-dominant, if not [the dominant, metaphors for news distribution in the digital era](http://jonnyrichards.github.com/resonate_slides_2012/).

So when the opportunity arose to create a "[Second Screen](http://second-screen.guardian.co.uk/olympics-2012)" experience for the Olympics, which would have to display the huge variety of Olympics-related news: from blog posts, to tweets, pictures, and other data-based updates (results, medal tables, and the like), we wondered: was there a way to reimagine the timeline such that it enabled a better navigation of this voluminous stream?

**Early sketches**

We toyed around a lot with the issue of horizontal versus vertical scrolling. ([Chris Pearson](http://www.guardian.co.uk/profile/chris-pearson), our lead designer, drew more preliminary sketches than he'd care to remember.)


   <figure>
   <img alt="Early sketch for the Second Screen, with horizontal scroll" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344526301971/sketch_one_lane.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2e0a510e964c244e9a1b50f02a35ba4b" loading="lazy" />
   <figcaption>
     Early sketch for the Second Screen, with horizontal scroll ...
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

There are compelling arguments in favour of vertical scroll, not least because social networks have made vertically-scrolling streams familiar.


   <figure>
   <img alt="And with vertical scroll" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344526370236/sketch_vertical.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=38ce2d3c70ea7a5a988826c9a25e327c" loading="lazy" />
   <figcaption>
     ... and with vertical scroll
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

For us the decisive factor was the need to add a timeline - a second component: would it scroll vertically too, alongside the main window? Or would it [scroll horizontally, above](http://www.nytimes.com/interactive/technology/facebook-timeline.html#/%23time11_231)?

Ultimately, neither approach seemed quite right, particularly in light of the fact that our primary use case was a 'second screen', namely an experience you have on tablet. (Had we been building purely for mobile, that might have changed things.)


   <figure>
   <img alt="Early design" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/10/1344601762987/design_multiple_streams.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=be43b750f819302ca9b719245affcf7c" loading="lazy" />
   <figcaption>
     Early design
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

We also experimented with different approaches to the basic display: should we break out the streams (blogs, photos, tweets, results), showing many across the screen at once - as with this early sketch (above) and prototype?


   <figure>
   <img alt="Early prototype" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344531834138/news_atoms.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=3e52c54604760f9faf8fd002ec5cd716" loading="lazy" />
   <figcaption>
     Early prototype
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

The consensus was that having multiple streams would introduce unnecessary complexity. Better to retain a single focus at any one time, send the message: "This is the one thing you should be looking at in this moment". If readers wanted to navigate between streams - turn them on and off etc. - we could let them do that with filters. (More on filters later.)

**The timeline as index**

Easily the greatest interaction design challenge was the timeline. Most timelines which display content put the content on the timeline, at the point which corresponds with the content's timestamp. (This event took place at 12:52pm, so we'll place it "at 12:52" on the line.)

The seems self-evident - unavoidable, perhaps, at first glance - but the challenge this presents from a design point of view is clustering: what happens when lots of events take place at the same time? (They bunch up, is the answer. Often inelegantly.)

Most interfaces handle this problem by introducing a zoom mechanic. [Google Finance](http://www.google.co.uk/finance) is a well-studied example - it puts sliders on a horizontal axis that allow the user to change the focal length of the main display.


   <figure>
   <img alt="Zoom tool on Google Finance" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344532121373/G-finance.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=679fac7271660ce7286249345ca3c4bd" loading="lazy" />
   <figcaption>
     Zoom tool on Google Finance
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

We were also impressed by the beauty of [Timeline JS](http://timeline.verite.co/), which has a more traditional "map-like" zoom.


   <figure>
   <img alt="Timeline JS has an elegant zooming mechanic to deal with clustering" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344532176802/Verite.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=59b8afdab2a1c01b399acef2e9d4e818" loading="lazy" />
   <figcaption>
     Timeline JS has an elegant zooming mechanic to deal with clustering
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

We couldn't help feeling, however, that zooming seemed to introduce an annoying "bit of interface" that had to sit in between readers and our content. (Who wants to zoom in on a timeline?) What if, instead, you kept the timeline and the content display separate, and used the timeline as an index onto the content. Bringing 12:52 into focus on the timeline - with a tap, or by dragging the timeline there - would instead involve the front end asking the back end for the bit of content nearest in time to 12:52, which would in turn be served up.

Our front end developer [David Vella](http://www.guardian.co.uk/profile/david-vella) teamed up with [Ken Lim](http://www.guardian.co.uk/profile/kenneth-lim), who ran the back end, to make this happen.

This begged another question, namely: what would the timeline display, if not the content itself? The answer came: how about a measure of interesting-ness? How about something - some data, say - alerting a user that "something interesting" happened at this point? This seemed to have potential. But what would the data be?

Enter Twitter. With the help of our collaborator [Alex Voss](http://www.guardian.co.uk/profile/alex-voss), from the University of St Andrews, and colleagues from the [Analysing Social Media Collaboraton](http://www.analysingsocialmedia.org/), we put together an engine which mined Twitter for all Olympics-related tweets, giving us a data point which we could use as the basis of "Olympics-related activity". We could thus create a data-driven display which not only charted "interestingness" but could, as a result, act as a way of navigating and browsing the timeline.


   <figure>
   <img alt="Twitter-based 'activity meter' in our timeline" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344532358766/Screen_shot_2012-08-09_at_18.10.42.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=d3c3ae120dc6cdb4614847e14c4cc29d" loading="lazy" />
   <figcaption>
     Twitter-based 'activity meter' in our timeline
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

It paid off, we hope. Look at this grab from Super Saturday - the day Jessica Ennis, Greg Rutherford, and Mo Farah won gold. The tool was working the way we hoped it would.


   <figure>
   <img alt="The Second Screen on 'Super Saturday', when Ennis, Rutherford, and Farah, from team GB, won gold" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344532883479/ennis.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=03648e1ddf173994467ce8a65f3bc846" loading="lazy" />
   <figcaption>
     The Second Screen on 'Super Saturday', when Ennis, Rutherford, and Farah, from team GB, won gold
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

**Other design touches**

Other pieces started to fall into place at this point.


   <figure>
   <img alt="Zeebox's timeline" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/10/1344600730434/Zeebox.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=aac08f4216b5a9890a7efd6510f91fcb" loading="lazy" />
   <figcaption>
     Zeebox's timeline
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

  
With a nod to [Zeebox](http://zeebox.com/uk/), we decided to have a marker top and centre which always displays "where you are"; moving between times would thus involve dragging the whole timeline or tapping a particular point in time to snap to that point.

"Content type filters" - which would allow users to turn photos on, turn tweets off, etc. - began life in a drop-down ...


   <figure>
   <img alt="Content type filters in a drop-down" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/10/1344601030129/Screen_shot_2012-08-09_at_18.23.12.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=bef7d608ca2412be489ff4a474b07ce1" loading="lazy" />
   <figcaption>
     Content type filters in a drop-down ...
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

... but user-testing during Euro 2012 and the Tour de France suggested no one was using them, so we brought them out as standalone features in the top bar, which seemed simpler.


   <figure>
   <img alt="And brought out into the top bar" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344533118260/Screen_shot_2012-08-09_at_18.22.17.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=8039faa0a67c6212c141c023f1073472" loading="lazy" />
   <figcaption>
     ... and brought out into the top bar
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

This was also in keeping with the style of other Guardian apps, such as [Eyewitness](http://www.guardian.co.uk/mobile/ipad/eyewitness).


   <figure>
   <img alt="Full-screen pictures" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344533541621/Screen_shot_2012-08-09_at_18.27.02.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=15de2c2b9aed7630e9245881d2136bff" loading="lazy" />
   <figcaption>
     Full-screen pictures
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

"Tap pictures for full screen view" was a relatively late feature, though in retrospect it's amazing it wasn't higher up the list.

(It's been one of the most popular features.)


   <figure>
   <img alt="Icons before (top) and after (below)" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/10/1344602622476/composite.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=da06b5b4a459d38007353586bfb2ff69" loading="lazy" />
   <figcaption>
     Icons before (top) and after (below)
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

There were many other aspects of the design which required finessing. Icons were finetuned. (Thanks, [Mark McCormick](https://twitter.com/typeindication).)

We also had a big dilemma with the approach to different font sizes - so text could be more compelling depending on the length of update it represented. (A tweet should be more emphatic, and larger. A blog post would require a more zoomed out approach.)


   <figure>
   <img alt="Our orientation screen, which provoked some controversy internally" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/8/9/1344533680207/Screen_shot_2012-08-09_at_18.33.05.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=4760b6cd21cf0a4bd7df0a8014b665dc" loading="lazy" />
   <figcaption>
     Our orientation screen, which provoked some controversy internally
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Finally, there was also a spirited internal - [and external (via Twitter )](https://twitter.com/jonnyrichards/status/213543021080354816)\- debate about the merits of an orientation page. Our UX team were sceptical. In the end we decided that a simple, unobtrusive one-pager would serve not only to explain a few simple features of the app but also, by virtue of a lovely hand-written font (thank you, [Sarah Habershon](https://twitter.com/SarahJHabershon)), give the experience a friendly, relaxed tone.

That's about it. We hope you enjoyed using the Second Screen as much as we enjoyed building it As ever, we'd love to hear what you think.
