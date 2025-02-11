---
layout: ../../layouts/blog.astro
slug: 'info-2024-feb-10-pinboard-transforming-communication-across-the-newsroom-part-3-of-3'
headline: 'Pinboard: transforming communication across the newsroom (part 3 of 3)'
date: '2024-02-10'
authors: [Tom Richards]
standfirst: 'Pinboard is a discussion and asset sharing tool (or rather tool within other tools) which is gradually transforming how the news room communicate as news stories move through the various phases of the production process'
tags: [Pinboard]
---

_This is part three of three ([part one](https://www.theguardian.com/info/2024/feb/08/pinboard-transforming-communication-across-the-newsroom-part-1-of-3) and [part two](https://www.theguardian.com/info/2024/feb/09/pinboard-transforming-communication-across-the-newsroom-part-2-of-3))._

<figure>
                <iframe class="video" src="https://youtube.com/embed/k2ApXAmUo1E" title="Introducing... Pinboard" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

‘MVP’ challenges
----------------

We’ve worked on Pinboard at varying degrees of intensity (at peak it’s been [OKR](https://en.wikipedia.org/wiki/Objectives_and_key_results) supported with three developers, sometimes it’s just been me, using 10% times, hack days and any other cheeky opportunities to crowbar it in among other OKR work) … that’s perhaps one of the reasons it took more than two years from conception to a rollout to the entire organisation.

Probably though the bigger reason is the challenging situation we found ourselves in when trying to settle on an MVP for a project like Pinboard. Something like Pinboard lives or dies based on what we termed a “critical-mass” of users. Pinboard doesn’t offer much value if there’s only some people using it, because the conversations won’t be that useful … and they’re likely to simply stop using it … and our efforts will be wasted and potential opportunity squandered. So we were acutely conscious of this “critical-mass” notion and it was front of mind throughout. To ensure users wanted to use it, we added many of the features and functionality upfront which for other projects you’d expect to be added many iterations after the MVP. It ended up very feature-rich and polished at the point of the main rollout.

This is something we reflected on in a mega-retro we conducted a few months back, a little while after the org-wide rollout, where we invited all devs involved in the process and the different engineering managers of the team from throughout the time we’ve worked on Pinboard. The point was raised about how it suddenly became a complicated chat application, when we could have just done something simple in the tooling to make it a bit easier to surface images etc, which is a fair point to raise, but in preparation for this post I found one of the early OKRs that articulates the ‘opportunity’ associated with expanding the scope beyond some simple way of being able to propose pictures. I think “opportunity” is a nice way to think about it and reassure us that we did the right thing.

Adoption
--------

Throughout, we’ve stayed very engaged with colleagues across editorial, some of the people from our early shadowing, but also other more senior colleagues, demoing prototypes & designs and getting feedback. Many many meetings and demos.

As we neared an “MVP” (albeit a long-developed, feature-rich one), we began conducting trials with real users in production. Since pinboard only loads if the user has permission, with help from our Central Production team we could easily opt users in to start a trial and opt them out after.

First we ran a couple of trials with live blogs**,** we chose liveblogs because they’re relatively short lived (typically no more than 24 hours) so we could collect feedback and make observations in a fairly short space of time. Overall this was successful, users could see the benefit and we collected lots of feedback to refine the product.

Next we needed to test the value of having these conversations live alongside the piece over a longer period, where people do handovers over many days. So we managed to secure a trial with the [global development](https://www.theguardian.com/global-development) desk and crucially all the people involved in the process across different functions (writers, subeditors, picture desk etc). Again, this was successful, users could see the benefit and we collected lots of feedback to refine the product further.

Given some positive and tight relationships with the newsletters team, they wanted Pinboard early, and so we simply gave them permission and observed them immediately use Pinboard more/less exactly as we’d envisaged and hoped users would (sharing and discussing pictures, discussing wording, handing over etc.) even if it did spoil the plot on a huge episode of Succession for one our devs Ara.

Meanwhile, Ara had been evolving a wonderful idea of hers: an “interactive tour” which can guide users through all the features step-by-step. It even lets users practise sending messages, mentioning, editing and deleting. When using Pinboard for the very first time it will start automatically, but can be started manually at any time too …


   <figure>
   <img alt="Gif of the interactive tour in Pinboard, which is guiding users through all the different features step-by-step" src="https://uploads.guim.co.uk/2023/10/25/interactive_tour_620.gif" loading="lazy" />
   <figcaption>
     Interactive tour of Pinboard.
    <i>Illustration: Tom Richards/Ara Cho</i>
    </figcaption>
    </figure>

So with the successful trials combined with the interactive tour functionality, we were given the green light to release to all journalists. We wrote a tweak to the permissions mechanism to infer pinboard permission from anybody who had Composer or Grid access and … **it was live for all users on 15 May** 🎉. With no production issues, no rollback, a slow but steady uptake (which we observed from our metrics dashboard) and some good feedback via the dedicated feedback form linked from within the tool. The launch was a success, I cobbled together a somewhat terrifying ‘decorate yourself’ cake to celebrate the launch.

What we have seen since launch:

*   We have a number of really engaged users in editorial (including senior ones) who believe in Pinboard and are encouraging others to use it.
    
*   We’re continuing to have really productive meetings with different teams, making more and more teams group mentionable, with more to come such as our audience team and lawyers.

We’ve seen a decent uptick in usage following …

*   A promotional video (similar to the one at the top of this post) which plays frequently on many of the TV screens in the office.
    
*   I narrated the promotional video at the company-wide morning conference too (a suggestion from one of our engaged senior users).
    
*   Featured in the org-wide internal newsletter via an “explain it to me” section, including a link to the video.

What’s next for Pinboard?
-------------------------

While it’s not been an OKR focus since the launch, we’ve still managed to find time to implement some nice improvements to the integration in Workflow, which was in direct response to user feedback from a number of users.

As a side project in sessions with someone I mentor, we’ve made a start on an ‘important messages’ feature. This seeks to address one of the scariest uses of our existing tooling, which is users using ‘noting’ in composer body copy to leave important messages for one another, these risk being published and causing embarrassment at best and legal issues at worst. We want to move these sorts of messages out of the body copy and into Pinboard (where they can’t be published), yet display them with the same prominence as notes at the top of a piece.

Another side project, is to make it easy for users to request cutouts, retouches etc. of images from the Imaging team directly in Pinboard. There’s a lovely process for print where users in InDesign can right click on an image for the paper and make an ‘Imaging Order’, which appears in a queue directly in the Photoshop of imaging team members, where they can pick up the work and share the edited image back. The flow for doing the same for digital (rather than print) is horrible by comparison and involves emailing and attachments. This problem has been described as _“going unsolved for 10 years”_… so I’m looking forward to the day when we can announce that it’s a couple of clicks in Pinboard for the requesting users and the same familiar and friendly queue experience for the folk in the imaging team.

_This is part three of three ([part one](https://www.theguardian.com/info/2024/feb/08/pinboard-transforming-communication-across-the-newsroom-part-1-of-3) and [part two](https://www.theguardian.com/info/2024/feb/09/pinboard-transforming-communication-across-the-newsroom-part-2-of-3))._

Credits
-------

Pinboard was built by **[Tom Richards](https://www.theguardian.com/profile/tom-richards)**, **Jenny Graham-Jones**, **[Thalia Silver](https://www.theguardian.com/profile/thalia-silver)**, **Andrew Nowak**, **Phillip Barron** & **Ara Cho** with additional developer contributions from **[Fred O’Brien](https://www.theguardian.com/profile/frederick-o-brien)** & **[Samantha Gottlieb](https://www.theguardian.com/profile/samantha-gottlieb)**. Product Design from **Ana Pradas** and Product direction from **[Calvin Dickson](https://www.theguardian.com/profile/calvin-dickson)**. All the while supported by the rest of the Content Production team in the Product & Engineering department. Not forgetting the input/time/effort from countless Guardian journalists, who have helped shape Pinboard.
