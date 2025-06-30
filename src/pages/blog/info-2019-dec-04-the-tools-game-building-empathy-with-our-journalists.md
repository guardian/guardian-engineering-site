---
layout: ../../layouts/blog.astro
slug: 'info-2019-dec-04-the-tools-game-building-empathy-with-our-journalists'
headline: 'The Tools Game, building empathy with our journalists'
date: '2019-12-04'
authors: [Akash Askoolum]
standfirst: 'Learn how we dogfooded our digital tools as a learning exercise and as a way to gain a deeper understanding of how our journalists use our tooling'
image:
  url: 'https://media.guim.co.uk/cf76a7862480df7262b087321c60b53503112b7d/0_0_6720_4032/6720.jpg'
  alt: 'People playing games'
  credit: 'Photograph: Christopher Thomond/The Guardian'
tags: []
---

At the Guardian, the Editorial Tools team build and maintain a suite of tools that enable the newsroom to publish content online, including live blogs, galleries, crosswords, podcasts, etc.

We’ve built many of our tools in-house while working closely with our editorial colleagues to ensure we fully understand the problems being solved. Following the single responsibility principle, we try to make each of our tools do one thing and one thing only. For example, the Workflow tool is responsible for tracking the life-cycle of an article and our publishing tool Composer is responsible for creating articles and [live blogs](https://www.theguardian.com/info/developer-blog/2017/aug/09/development-of-the-live-blog-at-the-guardian).

In total, we have more than 20 tools. In an effort to make them simple to use, we integrate them very closely. For example, whenever an image needs to be selected in a tool, we open [Grid, our image management tool](https://www.theguardian.com/info/developer-blog/2015/aug/12/open-sourcing-grid-image-service), in an iframe modal. This creates a smoother process than, for example, having to open a new tab, find an image and copy paste its url into an article that’s open in Composer in another tab. We see this as one of the benefits of building our tools in-house.

<figure>
                <iframe class="video" src="https://youtube.com/embed/ruSrINCG4LY" title="Demonstrating Tool integration" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

**Problem**

Initially, our estate of editorial tools was small. As time has passed, the number of tools has grown, our UX principles have changed and the members of the team and department have also changed. In an attempt to get the department familiar with our tools, some of which may have been created before most members joined the Guardian, we thought we’d run an exercise in which we pretended to be journalists and use the tools through their eyes.

We called this the Tools Game.

**Solution**

We invited our colleagues in the Digital department to form teams and undertake typical journalism tasks. These included creating an article, a photo gallery and responding to a surprise breaking news event that we announced 30 minutes into the session. The exercises were designed to use as many of the tools as possible.

In order to produce high quality output, the exercises were scored against a number of criteria, for example metadata, linking to other content to provide an onward journey, etc. A certificate and prizes were presented to the winning team.

**Why this format?**

Although the Editorial Tools team work closely with the newsroom, we often get wrapped up in our small areas of focus. The Tools Game meant using the tools as they are in the wild and provided a more holistic view. After all, the mission statement of the team is to provide a world class, cohesive suite of tools that are easy to use.

We all learn in different ways and this type of interactive exercise is a fun way to introduce new members of the department to our tools. It’s different from the whiteboard introduction we also give.

Lastly, we are proud of our tools. The team is fairly small and the number of tools in the estate is much larger than the size of the team.

**Learnings**

The inaugural Tools Game ran within the Editorial Tools team and did not go well. We discovered we were too ambitious about the number of tasks that could be completed within the hour planned. Additionally, although we built the tools, we found some parts were not very intuitive. We revised the tasks multiple times, each time doing a dry run ourselves.

We treated the planning of the Tools Game like any other project and had regular catch-ups to discuss blockers and assign actions.

We’ve run the Tools Game a handful of times within the department and have found teams of two to three people to be the optimal size as it encourages discussion and leader rotation.

With each tool having its own URL, as a journalist, you’re required to remember them or have them bookmarked. To make discovery easier, we have created a Tools Index that lists all the tools and allows searching by category. So you no longer need to remember where Composer, Grid or the Fronts tool lives, you can simply search for it.


   <figure>
   <img alt="Digital Tools Index" src="https://i.guim.co.uk/img/media/061a465dd24bc1acc8044c6af568acd72d0c6001/76_47_2631_2101/master/2631.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=d19fc7169e9bcd4cc1a870f9384177f1" loading="lazy" />
   <figcaption>
     Digital Tools index
    <i>Photograph: Akash Askoolum/The Guardian</i>
    </figcaption>
    </figure>

Finally, you’re never too old to receive a clip-art certificate! If anything, they are rare and more valuable.

**Conclusion**

The Tools Game is an exercise designed to demonstrate our estate of tools through real world scenarios. We could reinforce this idea in future plays by embedding a member of editorial staff in the teams.

We think it is important to continue to iterate and improve our work. Participants of the Tools Game are asked to provide feedback on the game and, more importantly, the tools themselves. Some feedback has included suggestions on accessibility improvements and the simplification of processes. We’re slowly chipping away at these alongside our regular [OKR work](https://felipecastro.com/en/okr/what-is-okr/) to better the lives of our colleagues in the newsroom.

Overall, the Tools Game has proven to be a useful dogfooding exercise and we aim to run it at least twice a year.
