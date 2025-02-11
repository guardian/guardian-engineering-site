---
layout: ../../layouts/blog.astro
slug: 'info-2022-feb-01-creating-pinned-posts-on-our-live-blogs'
headline: 'Get to the point! Why we added pinned posts to the Guardian’s live blogs'
date: '2022-02-01'
authors: [Joe Cowton, Anna Beddow]
standfirst: 'Live blogs are an integral part of the Guardian’s journalism. As engineers and developers, our role is to find innovative ways of making them more useful. Here’s one thing we tried …'
image:
  url: 'https://media.guim.co.uk/d51fa5ed113a3ebaf238018099df3d99dc94091c/0_0_2788_1268/2788.jpg'
  alt: 'pin block to the top of the liveblog screenshot'
  credit: 'Photograph: Screenshot/The Guardian'
tags: []
---

Live blogs
----------

To mark the 2,500th edition of the Guardian’s Politics live blog in January this year, political correspondent Andrew Sparrow said: “I have always thought of blogging as the first draft of journalism. It may not be the final word, but it’s deeply rewarding, especially in politics with round-the-clock breaking news and reader appetite for snap verdicts. Live blogging offers the space to tell these stories quickly and differently and in great detail, and to engage with readers about it on a minute by minute basis.”

As a key part of the Guardian’s journalism, live blogs provide a way of drawing readers into the app or website, but also offer up-to-the-minute documentation of breaking news and sporting events, as well as cultural updates such as the [Bake-Off final](https://www.theguardian.com/tv-and-radio/live/2021/nov/23/the-great-british-bake-off-2021-final-live) or [the Oscars](https://www.theguardian.com/film/live/2021/apr/25/oscars-2021-the-dresses-the-winners-the-weird-semi-masked-ceremony-in-a-train-station-live). Communities have formed around some of our blogs, such as Heidi Stephens’ [coverage of Strictly](https://www.theguardian.com/tv-and-radio/live/2021/dec/18/strictly-come-dancing-2021-the-grand-final-live), whose repeat audience has created an almost ritualistic shared experience.

Conceived in the late 1990s as the [minute by minute](https://www.theguardian.com/tone/minutebyminute) blog for cricket and football coverage, the live blog is now vital to the Guardian’s news and politics coverage, with writers like [Andrew Sparrow](https://www.theguardian.com/politics/live/2022/jan/24/uk-politics-boris-johnson-conservatives-labour-nusrat-ghani) achieving cult status and loyal followings. Live blogs are an engine for audience, forming a notable percentage of daily page views, particularly since they tend to cover the most significant and most searched-for events of the day. The numbers are strong too. To date, the Guardian’s Politics live blog with Andrew Sparrow has reached more than 1bn page views and still attracts more than 10,000 comments each day.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m not normally one for birthdays, but today my Guardian Politics Live blog celebrates its 2,500th edition, with more than one billion page views - Thank you to everyone who&#39;s read it, or contributed in any way - <a href="https://t.co/pysOBCqmkf">https://t.co/pysOBCqmkf</a></p>&mdash; AndrewSparrow (@AndrewSparrow) <a href="https://twitter.com/AndrewSparrow/status/1486654476631031818?ref_src=twsrc%5Etfw">January 27, 2022</a></blockquote>


Journalism Development Team
---------------------------

Journalism Dev is a new team at the Guardian. It was created in September 2021 and charged with helping the Guardian “become world-leading in our live coverage of news events”. Collating the talents of software engineers, UX designers, data scientists along with the Guardian’s head of editorial innovation, [Chris Moran](https://www.theguardian.com/profile/chrismoran), our team has been tasked with interrogating the existing live approaches and building upon them in a way that elevates us above our competitors.

Long term this is a tremendous opportunity for out-of-the-box thinking. The Guardian’s user experience lead, Zeek Ikomoni, has run some excellent UX sessions already, sharing his vast expertise and challenging us to think of new ways to approach our coverage. Data analysis and insights from Georgia Ellis have given us another angle again. Her focus on user testing is already providing clear targets for improvements. The future in this respect is hugely exciting.

From an engineering perspective, our first priority was to tick off some of the requests that had been discussed when the idea of the team was first mooted. Right away we demonstrated that we were capable of delivering quickly and efficiently straight out of the gate. These were tasks that we knew we wanted to complete and could be done without further research or investigation. “Quick wins”, if you like.

First, we added the functionality to filter live blogs by key-events only, a moderately complex and month-long backend task that required us to become more familiar with Scala and [Twirl templates](https://www.playframework.com/documentation/2.8.x/ScalaTemplates) as well as come to terms with the complexities of a [large web project](https://github.com/guardian/frontend) for which we are currently [revisiting the rendering tier](https://www.theguardian.com/info/2019/apr/04/revisiting-the-rendering-tier).

Sadly, the engineering effort you put in isn’t always reflected in what the end user sees; in this case a simple toggle at the top of the live blog. As Joe put it: “the expression on my parents’ faces when I explained to them over Christmas that this is what I’d been doing in my new role was crushing. One day they’ll understand.”


   <figure>
   <img alt="A pinned post on the site." src="https://i.guim.co.uk/img/media/5735cf0457f8cb54ba70a9f51c21f4ab7b2ee620/0_30_1232_739/master/1232.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=0a9524fce528955d74505d9c193108b1" loading="lazy" />
   <figcaption>
     A pinned post on the site.
    <i>Photograph: Screenshot/The Guardian</i>
    </figcaption>
    </figure>

Pinned posts
------------

The idea of pinning posts to the Guardian live blog first surfaced in 2015. The origin story is somewhat murky, but it’s thought they were first mentioned in the context of sports coverage – namely for the [Rio Olympics](https://www.theguardian.com/sport/2016/aug/22/cheers-boos-and-a-carnival-atmosphere-as-flame-goes-out-on-rio-olympics) and [Euros in France](https://www.theguardian.com/football/blog/2016/jul/11/euro-2016-fairytales-wales-iceland-defence) which both took place in 2016. We also found an email mentioning the possibility of pinned posts for the [US elections](https://www.theguardian.com/us-news/live/2016/nov/08/us-election-2016-polls-trump-clinton-live) coverage later that year.

Regardless of the exact stimulus for this earlier exploration, the intention seems to have been similar to now: to provide a way to orient users when first landing on a live blog. When discussing the proposal we felt that readers could be easily confused when first arriving on the page, and often felt a disconnect between the headlines and the first post in a fast-moving story. Having a pinned post at the top of the page would provide readers with easy access to the most important recent development.

As the Guardian’s digital editor, Claire Phipps explained: “The most common reader frustration with live blogs is that they click on them expecting to read a post relating to the headline, but then can’t easily find that post. By pinning the most relevant post to the top of the live blog, readers can instantly see the key news/sport/other lines, before reading the rest of the blog.”

One of the many reasons for choosing to work on pinned posts as part of the new Journalism stream was that while the original suggestion of pinning posts in 2015 had never been fully realised, a significant chunk of work had been done to add facility for pinning posts in both the data model and the aforementioned Composer CMS tooling. By utilising these changes we were afforded an instant head start.

A quick search of GitHub suggests that the first commit made toward pinning posts was adding _pinned_ as a _BlockAttribute_ in January 2016. Around the same time work was also done to create a feature flag for pinned blocks, add some attribute checkers and add a toggle to the UI of Composer frontend. Lastly, a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) exists entitled _Live blogs: pinning functionality._ Alas here the trail runs dry. Regardless, [Robert Rees](https://github.com/rrees), we salute you for your efforts.


   <figure>
   <img alt="How a pinned post looks when a journalist is editing it." src="https://i.guim.co.uk/img/media/3c45380801d0af793ee86e31baa4ee626d1e611b/0_50_1614_968/master/1614.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=966be8d4f4f134af804b76e4ebb8ac68" loading="lazy" />
   <figcaption>
     How a pinned post looks when a journalist is editing it.
    <i>Photograph: Screenshot/The Guardian</i>
    </figcaption>
    </figure>

Composer
--------

Building on the work that had been done previously, we had a number of important adaptations to make to the Composer UI:

*   Replace the existing toggle with one that matches our new design system
    
*   Revise the content overview column layout
    
*   Add a modal to ensure users were warned before pinning and unpinning

Despite having to navigate the challenges of working in Angular 1.5 we were able to work relatively quickly through the above tasks. The willingness of [Jon Herbert](https://www.theguardian.com/profile/jonathon-herbert) (a senior developer on the editorial tools team) to share his familiarity with the _Flexible Content_ codebase helped enormously, and we were even able to reduce some unnecessary complexity involved in the pinning functionality, making the UI more directly representative of the data that drives it in the process.

One of our biggest considerations was limiting the number of pinned posts to one. In the existing implementation, a Composer user was able to pin any number of posts: when the toggle was clicked to pin a post, the _pinned_ _BlockAttribute_ would be set to true. This could happen on any pinned post. This meant there was potential for any number of pinned posts appearing in the live blog feed.

There were early discussions around the idea of simply rendering only the last published pinned post. However, it was decided this was a risk, and if a post was to be pinned and unpinned while other posts were still pinned, which pinned post would be rendered then? An alliterative riddle to rival [Peter Piper](https://en.wikipedia.org/wiki/Peter_Piper) if there ever was one.

Another option was to unpin all other posts when a post was newly pinned, but that raised concerns about what would happen if the Composer client and server fell out of sync. Essentially there was too much scope for a browser window being left open while the server data changed, and this idea was also discounted.


   <figure>
   <img alt="The architecture." src="https://i.guim.co.uk/img/media/951d48c560cce6ea2889d7c8dba2693baa1f7f21/0_0_599_548/master/599.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4fcb4c3cf8e232658a9264d36ea41c41" loading="lazy" />
   <figcaption>
     The architecture.
    <i>Illustration: Marjan Kalanaki/The Guardian</i>
    </figcaption>
    </figure>

The solution to this problem was to create a _pinnedBlockId_ field that was set when the UI toggle was clicked. This would, and could, only store one value, and hence would always be representative of the actual pinned block. Working with Jon and our engineering manager, Alina Boghiu, we looked first at changing the _Flexible Model_ (the Thrift model which sits behind Flexible Content and CAPI) adding _pinnedBlockId_ as a new field and removing the _pinned_ _BlockAttribute_ altogether.

While this seemed effective, we were advised against changing the Thrift model unless it was absolutely necessary. Instead it was suggested that we create a transformer in the Composer backend to map the _pinnedBlockId_ against the _blockId_ and set the _pinned_ _BlockAttribute_ on the matching post. At this point the _pinned_ _BlockAttribute_ was set to _false_ on all other posts. This gave us the best of both worlds: journalists could only pin one post, but the model stayed exactly as it was.


   <figure>
   <img alt="The transformer in Flexible Content." src="https://i.guim.co.uk/img/media/82d89fbd48cab50ec4e9b55756c523ed094c7233/0_0_726_484/master/726.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=aac2bee4b86bb03e90de540a64f91ac3" loading="lazy" />
   <figcaption>
     The transformer in Flexible Content.
    <i>Photograph: Screenshot/The Guardian</i>
    </figcaption>
    </figure>

Frontend
--------

As mentioned earlier, none of the work to add pinned posts to Frontend had been completed with the first iteration of Composer work. Fortunately, as the _pinned_ block attribute existed on the model, we were simply able to add _pinned_ to the _[BlockAttributes](https://github.com/guardian/frontend/blob/d70d5eeca20a45c3d676c37b5b98a0b34cfe7b6c/common/app/model/liveblog/BodyBlock.scala#L156)_ case class in Frontend, and handle that attribute in the same way we do the other _BlockAttributes_: _keyEvent_ and _summary_.

We added a _body:pinned_ param to the [CAPI query](https://open-platform.theguardian.com/documentation/search) and passed the resulting pinned post data into _FirstPage_, making sure to remove the pinned post from the main block stream if it would have been the next block down. The next task was to create the UI which, as Frontend is written in Scala, meant creating a new Twirl template for the pinned post.

We don’t have a character limit on pinned posts; we leave it up to our journalists to decide how long it should be. This proved an interesting design challenge. With the pinned post being stuck to the top of the blog, a long post could fill a user’s screen and disrupt the flow of posts, especially on mobile web. We wanted to ensure that our users could still see all the new posts arriving underneath the pinned post so the blog didn’t appear stagnant.

<figure>
              <div style="width:50%; margin:auto;"><img src="https://uploads.guim.co.uk/2022/02/01/pinnedpost.gif" style="width:100%;"></div>
              <figcaption>pinned post in action gif</figcaption>
            </figure>

Our solution was simple: create an expandable container so the pinned post would only have a maximum height of 40% screen height on load. One implementation would have been to build the interactivity with JavaScript. However, some of our readers visit the site with JavaScript disabled so building it this way would render this feature inaccessible to them. To work around this, we built out the core expand/collapse functionality with pure HTML and CSS, without the need for JavaScript click handlers.

Once this had been implemented, we added further JavaScript enhancements such as scrolling on collapse. At the Guardian, [we strive to make our products as accessible as possible](https://www.theguardian.com/info/developer-blog/2017/jun/26/championing-accessibility-at-the-guardian) and so we added further functionality to make sure the pinned post was navigable by keyboards and screen readers.

Finally, we needed to measure the success of this new feature and understand how our users were interacting with it so that we can continue to iterate and push the feature forward. For this, we worked closely with our Data & Insight teammates to work out what the most important metrics were and implemented a variety of click and visibility tracking to support them.

Conclusion
----------

We completed the work on pinned posts the week before Christmas. With dwindling staff numbers in both product and engineering, and editorial, it made sense to release both the Composer and Frontend changes behind feature switches. This allowed Claire Phipps, and Matt Holmes in our Central Production team, to get to grips with the new feature in the relative downtime of the holidays and ensure that everything worked as it should. We removed the flags in the new year and received a great deal of fantastic feedback. There were a number of small bugs to resolve still, mostly visual but also some issues with tracking. Now, a month on, most of them are resolved.  
  
Pinning posts to live blogs has been an exciting and rewarding feature to work on. We’ve come together as a team to overcome a great many challenges, and in a short amount of time we’ve completed something that has been in progress for quite literally years. As engineers there is nothing more satisfying than seeing something like this through to production. We’ve learned a huge amount about how live blogs are used, and how they are thought about in the newsroom: this knowledge puts us in a strong position to innovate further.

_**Development of digital products is central to the Guardian. You could be building the products that showcase our progressive and independent journalism, crafting the tools that journalists use to write their stories, developing the services that allow those stories to be distributed across the globe, or safeguarding our financial future.**_

_**If you’re interested in joining our Product and Engineering department, please visit the [Guardian News & Media careers page](https://workforus.theguardian.com/index.php/careers/product-engineering/).**_
