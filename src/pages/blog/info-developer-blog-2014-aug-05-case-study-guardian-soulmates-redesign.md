---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-aug-05-case-study-guardian-soulmates-redesign'
headline: 'Case study: Guardian Soulmates redesign'
date: '2014-08-05'
authors: [Kerstin Exner]
standfirst: 'How the Guardian’s dating website was redesigned with a new responsive layout'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/8/4/1407145869014/b0e2630f-6653-4907-9fd1-837854789122-620x372.jpeg'
  alt: 'Guardian Soulmates'' new design'
  credit: 'Photograph: Matt Andrews/Guardian'
tags: [Computing, HTML5, Mobile phones, Software]
---

Toward the end of 2013 we faced two challenges with [Soulmates](https://soulmates.theguardian.com): first, users had told us that the design looked a bit tired. Second, we had a mobile website which was lacking a lot of functionality, and was not very appealing visually.

We decided to develop a responsive site and give Soulmates a makeover with a new branding at the same time.


   <figure>
   <img alt="Old design homepage" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/8/1/1406905461261/b69a7ac9-d931-4279-a836-bb2cb1ddf22f-bestSizeAvailable.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2390ed6dfb01fce884295fa1b98236b4" loading="lazy" />
   <figcaption>
     Homepage in the old branding. Photograph: Soulmates
    <i>Photograph: Soulmates</i>
    </figcaption>
    </figure>

The new branding
----------------

We worked with design agency [Multiadaptor](http://multiadaptor.com/) to create a fresh new branding for Soulmates. The agency developed a new visual style which emphasises connectedness through stunning use of photography and a bespoke Soulmates font, which connects individual letters in a beautiful way.

The thinking behind the new branding is [best expressed on Multiadaptor’s own website](http://multiadaptor.com/work/soulmates/%20).


   <figure>
   <img alt="New photography and font" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/8/1/1406905800911/e2c6e9ef-92cd-4d2f-88ed-65f409515646-620x372.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=932e06cce217b724a112a78f068aad26" loading="lazy" />
   <figcaption>
     New photography and font. Photograph: Soulmates
    <i>Photograph: Soulmates</i>
    </figcaption>
    </figure>

The challenges
--------------

Creating a responsive site and implementing the new branding at the same time posed some challenges:

*   Rolling it out all in one “big-bang” release would mean sudden, massive changes to the site, which could potentially be confusing to users. We are a subscription-based website, so the experience of our paying customers needed to be protected throughout.
*   Rolling out the new branding in stages was not feasible, since the old and new design didn’t mix well visually.

The approach
------------

At the Guardian we aim for an Agile approach not just as an engineering process, but also as a way of deploying changes to users in small increments. It limits the amount of changes that users face at any one time, so causes less friction. It also allows early learnings and adjustments from the changes we make. As an added bonus, this process also allows us to roll back quickly and fix a problem if something goes wrong, because any issues can be isolated easily if code changes are small.

We decided to split the conversion to a responsive site and the redesign into two stages. The responsive site would be released incrementally and the rebranding then released on top at the end.

The responsive site
-------------------

First we created a responsive framework, which allowed us to switch over pages to a responsive version one by one. Some of the desktop pages were rearranged in layout for the responsive version so that they fit the information hierarchy required for a mobile view better. We then rolled out each responsive page across all device sizes to a small segment of the users and monitored the relevant metrics. Users were able to give us feedback on their experience on the new pages. Once we were happy with the metrics and the feedback we enabled each new page to all users. In this way we replaced the Soulmates site “brick by brick” rather than rebuild the house from the ground up.

There is a trade-off here, of course. Replacing a house brick by brick doesn’t allow major changes to the architecture along the way. But it does allow us to put in new plumbing and making the building future-proof. Since we felt that it wasn’t necessary to reinvent the whole Soulmates site, we decided that this approach worked best for us. The team working on the Guardian’s main website (which is currently being developed for its next generation) is taking a different approach by radically reinventing the news experience. It’s a matter of being really clear on what the primary goal is for the project to determine the right approach.

The rebranding
--------------

Once we had made all pages responsive, we turned our attention to the rebranding. As we had been replacing each page, we had consolidated the relevant CSS into a set of new global styles. This meant that new CSS incorporating the colours and fonts for the new branding could be created within a day. The new branding was more than just CSS changes, of course. It also required the incorporation of a new logo, new iconography and other visual elements, and a new way of using photography.

To facilitate the work of the design team we implemented a switch which enabled everybody internally to view the site in either the old or new branding at the click of a button. The design team was able to take the baseline pages in the new CSS and enhance them with a proper application of the branding. We then built the pages behind this switch.

Once we had completed all pages in the new branding, this switch enabled us to open the rebranded site for a public preview a week before the full launch. The rollout of the preview was trivial. The existing internal switch was exposed to users to allow them to opt in and give us feedback. A week before launch was too short a period to make any significant changes based on feedback, but it gave us reassurance for the launch and helped us prepare any FAQs. The actual rollout of the branding a week later was then equally trivial – we simply opted in all users to the switch!


   <figure>
   <img alt="Homepage in new branding" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/8/1/1406905901276/fe5190cf-4bd2-4a49-9633-0598c460bda3-1024x768.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=0eb2e142003a16bbdad40f9e18626c1c" loading="lazy" />
   <figcaption>
     Homepage in the new branding. Photograph: Soulmates
    <i>Photograph: Soulmates</i>
    </figcaption>
    </figure>

The whole process from the completion of the responsive site to the rollout of the new branding took about six weeks. Considering the scale of the changes, this was a great success – made possible by the groundwork laid before.

We have since received very positive feedback from users about the new branding. There also has been no detrimental impact on any user metrics, and in fact all crucial business metrics have gone up after the launch.

The learnings
-------------

The process chosen to replace the site incrementally was not uncontroversial at the time. Sometimes it felt like the “brick by brick” approach was slowing us down versus a more flexible “just rebuild it without constraints” approach.

One learning was that the complexity of having a mixed site of responsive and non-responsive pages should not be underestimated. Ironically responsive sites are often developed vertically for one device type first (mostly “mobile first”) and then scaled across all device sizes later. This can lead to significant rework when scaling. We chose to implement responsive behaviour across all devices horizontally page by page, which meant that pages did not have to be reworked.

Besides the previously mentioned benefits of the Agile approach chosen, there were also benefits for the continuous operation of the business: this process protected the steady subscription revenue stream for Soulmates. Changes were only ever small and never disruptive for users.
