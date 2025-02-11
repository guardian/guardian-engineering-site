---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-apr-28-extra-extra-rethinking-the-guardian-breaking-news-experience'
headline: 'Extra! Extra! Rethinking the Guardian Breaking News Experience'
date: '2015-04-28'
authors: [Mario Andrade]
standfirst: 'Rethinking how breaking news stories should be covered on the Guardians’ new responsive site meant taking an in-depth look at what makes these types of stories so unique and the value they bring to our readers.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/4/28/1430219744487/aaac18db-baff-4101-8924-319311d4462b-1020x612.png'
  alt: '“The world has never been as connected as it is today.”'
  credit: 'Photograph: The Guardian'
tags: []
---

A news organisation that readers can trust is one that provides an accurate representation of the days’ events and understands the differences in speed that news stories naturally have. Most news stories are slow: they evolve gradually and some can even be easily predicted. Other stories live on the fast end of the scale. They develop quickly and their details aren’t always clear. It’s on this end of the scale that we can find one type of story that’s quite different. A type of story that develops very quickly, where not all the details are clear and of a relevance and impact to a wider audience that sets it apart from all others.

This is the remit of breaking news stories.

In this post I’ll show some of the work we’ve been doing to rethink the Guardian breaking news experience – but first, let’s take a step back in time…

1858
----


   <figure>
   <img alt="Map of the 1858 Atlantic Cable route" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429633029125/d2ae14dd-ee83-4de9-bcea-70e7d72bdb0f-2060x809.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=da9f69ba6fa9d5c8bcf1357dbf134c4c" loading="lazy" />
   <figcaption>
     Map of the 1858 Atlantic Cable route.
    <i>Illustration: Howe's Adventures & Achievements of Americans</i>
    </figcaption>
    </figure>

157 years ago the first successful transatlantic telegraph cables were laid on the bottom of the Atlantic ocean. It was a breakthrough moment in technology and in the way we communicate. News that used to take 10 days to go from Europe to America by ship could now be transmitted within seconds. This was how a journalist at the time saw impact of the telegraph on reporting news stories:

> “The press laid it fresh before the reader like steak hot from the gridiron, instead of being cooled and rendered flavourless by a slow journey from a distant kitchen.”
> 
> **\- [W. David Sloan, Lisa Mullikin Parcell. 2002. American Journalism: History, Principles and Practices](http://books.google.co.uk/books/about/American_Journalism.html?id=JOItkXKZ-3EC&redir_esc=y)**

With big technological shifts, just like the transatlantic telegraph cable, the way we communicate and report on the world around us changes dramatically. The internet, personal computers and all the little devices that surround us are sort of the transatlantic telegraph cables of today and their impact in our lives is exponentially greater.

The same is true for news organisations, as with these digital connected platforms news organisations can:

*   be faster than ever before  
    
*   reach new audiences  
    
*   easily collect audience contributions  
    
*   provide more engaging visual experiences

The world has never been as connected as it is today. It’s an incredibly exciting time for news organisations to explore new and better ways to reach their audiences. And breaking news is the key editorial area where this is most important.

To better understand breaking news stories, let’s explore three characteristics that make these stories so unique and how we’ve been tackling them throughout this project.

Breaking news stories are relevant to a wide audience
-----------------------------------------------------

Making the judgement of what events are breaking news isn’t quite as obvious as it may seem – there’s always the danger of being too open and diluting the value of this special type of coverage. At the Guardian we see breaking news events as unexpected, momentous or informative events that are relevant to a wide audience. On top of this definition, our editors also consider other aspects of the events:

*   Is this event part of an ongoing story?  
    
*   Is this event part of a subject the Guardian often reports on?  
    
*   Is this event relevant to the readers in our editions? (United Kingdom, United States of America and Australia)

The importance, relevance and impact of these events to our readers justifies the need to reach out and proactively make them aware of the story. The push notification alerts on the Guardian’s iOS and Android apps allow our editorial team to do just this. This has been an incredibly successful feature as we currently have a very high number of users staying opted-in to the push notification alerts and from their feedback we know it provides a valuable service.

Though the apps took this first step, the use case for making our readers aware of a breaking news story is the same whether they are using the app or the site. This was one of the starting points for the project: how could we easily display breaking news alerts on the site?

The team knew we couldn’t necessarily replicate the same level of interruption that a push notification on the apps achieves, so we’ve decided to take a different approach. We’ve created an alert overlay which, once triggered by the editorial team, displays prominently across all the pages of the site. This would ensure a high level of visibility as we’re reaching out to all the readers of the site in that moment, whether they’ve just opened the site on the homepage or arrived at an individual story from following a link from social media.


   <figure>
   <img alt="Breaking News alert on the Guardian site." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429633179784/cbf3b3e5-5aa7-45aa-ba18-bafc3e1469f6-1020x612.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=067462b2aa1c0e7966c1584d33d5306f" loading="lazy" />
   <figcaption>
     The alert overlay is prominently displayed on the bottom of the screen of every page of the Guardian site.
    <i>Composite: The Guardian</i>
    </figcaption>
    </figure>

The process of creating this alert overlay was defined by several quick iterations. The team started with a low-fidelity version of the alert and tested it with users to capture their initial reactions to the alert. One of the things we’ve learned was that this format wasn’t prominent enough, which should be its main job. This got us thinking about how could we create more effective ways of making users aware of the alert. We quickly ran a second round of testing where we tested three separate versions of the alert.


   <figure>
   <img alt="Three breaking news alert variations." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429633247086/b5420d5e-8bf5-42e3-beeb-56a9669ab49e-1020x191.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=371b1439bf10aeb0c930171fcdab60a2" loading="lazy" />
   <figcaption>
     The three breaking news alert variations that we’ve tested.
    <i>Composite: The Guardian</i>
    </figcaption>
    </figure>

The three versions of the alert were designed to achieve different levels of intrusiveness. Intrusiveness is a key characteristic to consider when creating an interface for raising awareness. The more intrusive something is, the more likely you are to see it – but if it’s too intrusive it can be deterring to the experience. This test helped us find the right balance between intrusiveness and awareness.

The final version we’ve arrived at is a solution that’s halfway between these three versions. It’s not the most prominent visually but it compensates by staying persistently in view until opened or closed, meaning it always requires an interaction from our readers. Even if they don’t open the story, they will have been exposed to the alert headline and are aware of the story.

There is real value in raising awareness to breaking news stories and delivering an alert to all our readers so effortlessly – independently of what device they’re using – was definitely a big step forward.

Breaking news stories are constantly developing
-----------------------------------------------

From the moment a breaking news event first catches the attention of the news desk, it will continue changing and developing at a very fast pace. Publishing a full, highly detailed story is time consuming. A considerable amount of time is necessary to commission the story from a journalist, for the story to be written, edited and published. By the time this process is finished, the whole effort might turn out to be useless as the direction of the story may have changed dramatically. When covering breaking news stories, speed is paramount and that can only be truly achieved when both the news desk’s processes and the editorial tools are optimised.

Throughout the project we’ve interviewed all the editorial team members involved in covering breaking news stories and created a diagram which breaks down the whole editorial process. This includes all the steps in the process, who is involved at each step and the different variations in the process.


   <figure>
   <img alt="Diagram of the editorial process to cover breaking news stories." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429633372965/270b6216-b668-4521-85ea-00535630d3ea-1020x612.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=84512949252115732920d265ad94173d" loading="lazy" />
   <figcaption>
     This diagram provided a useful overall view of the editorial process for covering breaking news stories.
    <i>Composite: The Guardian</i>
    </figcaption>
    </figure>

This exercise allowed the team to see more clearly the bottlenecks and opportunities in their day-to-day processes and to start thinking about how we could achieve a simplified editorial process.

One of the important steps we’ve recently taken to address the process findings was to assign the coverage of all the aspects of breaking news stories to a small group of news editors. The group is now responsible for actively looking for stories, writing and editing all the early reporting, publishing the story and sending alerts to apps and web. This small structural change was a very important step forward as it gave full ownership of breaking news to these news editors, allowing them to cover the stories a lot more efficiently.

From the perspective of our editorial tools, the development of the breaking news alert on the site was a big step forward and it came with the benefit of being powered by a new tool. This new tool is better integrated with the other editorial tools, more flexible but most importantly it is very fast. The tool allows the news editors to easily find stories, create alerts and display them on the site very efficiently.


   <figure>
   <img alt="Editorial tool used to send breaking news alerts to the Guardian site." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429633759831/d12f8970-14ea-4954-a9ae-14dd4136847a-1020x612.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=e3bc3bf459b2e786765aa4b6ce728f2b" loading="lazy" />
   <figcaption>
     The breaking news tool provides only the core functionality necessary to find a story and quickly draft the alert headline.
    <i>Composite: The Guardian</i>
    </figcaption>
    </figure>

This tool originated from a hack project built on top of an existing editorial tool for editing fronts. We tested this early version by running a trial with news editors during a couple of weeks. This quick testing approach allowed the team to quickly learn from our editors how the tool was performing and understand how to keep refining it before opening the tool to more people in the organisation.

Becoming a faster organisation requires lots of changes in multiple places, but the changes we’ve made so far have already allowed us to be a lot quicker and responsive covering breaking news stories.

Breaking news stories are often unclear
---------------------------------------

Because breaking news events are generally unexpected and coverage often starts from a blank slate, it means journalists don’t always have a full perception of all the defining story details when they start reporting. As the coverage gradually starts picking up pace, the amount of information that flows in can be overwhelming. This creates a sense of uncertainty, especially at the beginning of the coverage. There’s a lot of information that is just not visible to the journalists and to the readers, which might move the story forward in unpredictable directions. Reporting quickly is obviously the best way to address this uncertainty but as part of this project we’ve tried to think beyond that. One of the areas we’ve been thinking about is the role push notification alerts can play solving this uncertainty.

Think about [the attacks in Paris last year](https://www.theguardian.com/world/charlie-hebdo-attack). The story was very loose at the beginning, it wasn’t clear what was happening. And even when some information started surfacing, the story kept evolving. Our editorial team in that day sent several follow up alerts to ensure our readers were aware of the true nature of the story.


   <figure>
   <img alt="Breaking news push notifications sent during the Charlie Hebdo coverage." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429633913123/a7987719-3ccb-42ef-8e3a-f02df97905b0-1020x612.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=cff204183feb7683143a5945e25766aa" loading="lazy" />
   <figcaption>
     Examples of push notification breaking news alerts sent during the coverage of the Charlie Hebdo events in Paris.
    <i>Composite: The Guardian</i>
    </figcaption>
    </figure>

This was a great way to address this uncertainty but it isn’t a pattern we can use for all our breaking news stories. Sending follow up alerts for every single story would be very interruptive because not all readers will be interested in following the coverage so closely and not all stories are so relevant and impactful to deserve a follow-up alert to everyone. We have to be mindful and respectful of our readers’ attention.

One solution we’ve been thinking about is providing a ‘follow the story’ call-to-action for readers to express interest in the story.


   <figure>
   <img alt="Concept of a breaking news 'follow this story' button." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429634052194/1b3e7a4a-ca22-4757-9d45-7fd0d4b6457e-620x620.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=74f418a83837bcee396e1d66c201e811" loading="lazy" />
   <figcaption>
     A ‘Follow this story’ button could be provided next to breaking news stories on the Guardian site and apps.
    <i>Illustration: The Guardian</i>
    </figcaption>
    </figure>

This would allow the interested readers to receive follow-up alerts with important, shorter story developments, independently of what device they’re using. They could even press the ‘Follow the story’ call-to-action on the site and receive a push notification on their phone.


   <figure>
   <img alt="Feedback for pressing the 'follow this story' button and example of a follow up alert on the device." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429634243731/3b5c03aa-d55f-4f81-a2ad-700b6dad1b89-1020x510.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=c572940b09a7147eaad619aea9a8703a" loading="lazy" />
   <figcaption>
     After following the story, any relevant follow up alerts could be sent to the readers that opted in.
    <i>Illustration: The Guardian</i>
    </figcaption>
    </figure>

Though at the moment this feature is only a concept, it could be very powerful as it gives the readers an effortless way to address the uncertainty around these stories, by trusting the Guardian to reach out and keep them updated with all the important story developments.

2015
----

Looking back at the unique characteristics of breaking news stories, we do know what things we need to continue doing going forward. The Guardian’s breaking news coverage should raise awareness of these stories, report them as quickly as possible and look for new ways to reduce the uncertainty around them.

At the beginning of this article I talked about the first transatlantic telegraph cable and how that changed the way we communicate. Nowadays, these cables have been replaced by many telecommunications cables that spread across the all the ocean floors and aren’t even comparable in speed and reach.


   <figure>
   <img alt="Global Traffic Map of voice traffic flows on the world’s largest international calling routes." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/4/21/1429634423681/3ab4c232-f8c9-4047-85f5-b13744ec5635-1020x612.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=186d6205b701998e609242b2c7a6b764" loading="lazy" />
   <figcaption>
     This map depicts voice traffic flows on the world’s largest international calling routes.
    <i>Composite: TeleGeography</i>
    </figcaption>
    </figure>

All the work I’ve shown you today has allowed us to take a first step into this exciting connected world. There are still many exciting opportunities ready to be explored. And many ways we could create a better breaking news experience that plays to the strengths of the Guardian.

> To live in modernity \[…\] is to be constantly reminded that, thanks to science and technology, change and improvement are continuous and relentless. This is part of the reason we must keep checking the news in the first place: we might at any moment be informed of some extraordinary development that will fundamentally alter reality.
> 
> **― [Alain de Botton, The News: A User’s Manual](http://alaindebotton.com/news-users-manual/)**

Thank you to [Matt Andrews](https://twitter.com/mattpointblank), [Subhajit Banerjee](https://twitter.com/subhajitb) and [Chris Clarke](https://twitter.com/mr_mr) for all the feedback and help bringing this post to live.
