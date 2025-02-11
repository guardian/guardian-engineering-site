---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2017-aug-09-development-of-the-live-blog-at-the-guardian'
headline: 'Development of the live blog at the Guardian'
date: '2017-08-09'
authors: [Reetta Vaahtoranta]
standfirst: 'The live blog is one of the Guardian’s signature digital formats. We look at its history and influence on the tools we build'
image:
  url: 'https://media.guim.co.uk/4eabac6ded96d945133536e0e5f9f615a7d61943/177_0_1878_1128/1878.png'
  alt: 'Sports live blogs appearing on the guardian website'
  credit: 'Photograph: www.guardian.co.uk'
tags: []
---

The Guardian has been at the forefront of developing live blogs, starting with blogging sport events in the late 1990s. Now, it provides live online coverage of a wide range of news stories and events.

As a software developer in the editorial tools team, I am interested in understanding how the live blog came into being, because it could help us think about how similar innovations could come about in the future. I’ve been talking to people working in editorial, product and engineering who were involved with different stages of developing the live blog.

What I’ve found is that it is difficult to point to when the live blog began because it was not the result of one big innovation, but a series of smaller ones. These innovations came from editorial as well as engineering and product. There is no single inventor.

Minute by minute
----------------

The live blog began at the sports desk in the 90s. At this stage it was not called a live blog but a minute by minute.

A minute by minute would be updated with the latest developments of matches and games, covering mostly football and cricket. There wasn’t anything special about the minute by minute in technical terms – it was just an article being frequently republished.

The tool for producing these articles was not sophisticated. New posts took a while to go live and embedding anything was difficult because content was not properly separated from layout.

Although the concept was simple, it was not without distinctive features. It gained popularity because it had a playful, irreverent tone.

Cricket in particular lent itself well to this format because its slow pace allowed for more narrative. The playful language of the minute by minute even inspired a [book](https://www.theguardian.com/sport/football-cliches/2014/may/01/-minute-by-minute-as-it-happened-mbm-live).

Perhaps the best-remembered commentary on cricket was [Scott Murray’s meltdown in 2003](https://www.theguardian.com/sport/2003/mar/14/cricketworldcup2003.overbyoverreports) where the live blog on a slow-paced game turned into a series of complaints from the writer about his long commute London and his office job.

Spread to the news desk
-----------------------

The liveblogging tool underwent some improvements when guardian.co.uk was being [redesigned](https://www.theguardian.com/help/series/an-abc-of-r2). Although everyone knew live blogs existed and that there would have to be some kind of tool for them in the system, no one thought building this should take up a lot of resources. The live blog was still seen as a minor thing belonging to the sports desk.

But with the new tool, adding new kinds of content became easier. These changes enabled the spread of live blogs from sports to other desks. Significantly, the news desk started producing live blogs in 2008.

The informal tone carried over when the live blog moved on to politics, as much as it could in the context of rolling news coverage. The news live blogs started to get more popular with the [reporting](https://www.theguardian.com/uk/blog/2010/jan/27/iraq-war-inquiry-iraq) of the 2009 Iraq war inquiry because they allowed for better coverage of the hearings.

But the live blogging tool was never designed for the kind of use it was now getting, and it was becoming brittle and difficult to use. For example, embeds were popular but they kept breaking the live blog. The site was also heavily cached and it took a long time for updates to the blogs to go live.

The problems faced by the tool were not just related to the live blog – there was a more general need to find new ways of structuring content: the existing models for what an article was and what it should contain were too rigid.

A new generation of editorial tools
-----------------------------------

People started getting interested in non-relational databases, which would allow more flexibility in the structure of the content being created and make it easier to add things such as pictures or tags. This started the development of a new generation of editorial tools, with a mongo database.

Solving these problems also signalled a change in the way building tools for editorial was being approached. For the first time, the aim was not just to build a new tool for validating a particular piece of content but to build something that would address people’s frustrations, to make the use of the tools easier. This work was also the beginning of the editorial tools team.

When these changes were being discussed, live blogging began to be seen as an important new form of content that deserved a well-designed tool.

The new tool was developed through close interaction with the journalists who were going to be using it. People writing the live blog were involved in long discussions about the features that would be most useful in the new tool; they were observed in the UX lab and asked to try out different prototypes.

The hard work of developing the new tool together with its prospective users paid off. When it was released, users adopted it quickly because it was so easy to use. Embedding pictures and tweets in particular became easier with the new tool.

Yet, even after all the work of observing the tool in use, some of the ways it was used were surprising. The picture desk started using them, making live blogs with just pictures on them because it made picking images easier – this was the beginning of galleries.


   <figure>
   <img alt="A live blog being edited in the new tool" src="https://i.guim.co.uk/img/media/6bdff1cb728354b1535f60b36da9f2171e0bba07/154_0_1645_987/master/1645.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=05b2df5197fd0aaf7752f94511a333dc" loading="lazy" />
   <figcaption>
     A live blog being edited in the new tool.
    <i>Photograph: Andrew Sparrow</i>
    </figcaption>
    </figure>

But it was not just the new tool that was shaping the form of the live blog as this time. The politics live blog was initially in the form of the journal: its title was the current date and content a list of entries detailing the political developments of the day. However, the demands of the kind of content placed in prominent places on fronts were changing.

Content without a title would not be put on the UK front so the way the live blogs were written started to change. The live blogs started to have the clear focus on the leading news story or stories. Tweets were also becoming more prominent not only because the new tool made it easier to embed them but also because more journalists were using Twitter.

Once the new tool was in use it became very popular, and the Guardian started to produce a large number of live blogs, leading some to remark that the the Guardian was live blogging everything. Part of the reason for this may have been the ease of the new tool.

What can we learn from this?
----------------------------

The live blog was not a well-defined project from the beginning. There was not a finished idea presented by editorial to software developers. It grew from a series of innovations from different departments – from the informal tone adopted by sports to its implementation on the news desk, to the product and engineering teams experimenting with the next generation of tools, working closely with their prospective users.

Some of the things contributing to development of the live blog did not happen because someone decided to make them happen. Galleries were born because the new tool was easy to use and new demands in the form of online content meant news live blogs became more focused on a particular story.

The innovations that helped develop the live blog did not come from a particular department or group, but emerged from complicated processes with multiple actors. This means we need to think carefully about how we can best be a part of these processes. There are no simple answers.

If we sit back and wait for new ideas to be brought to us, we will miss out on how our tools can get in the way of new innovations. We should not go looking for a ready idea we can just implement. It is unlikely that this is how new ideas develop. Instead we are involving ourselves in multiple small innovations, which can then lead to big new ideas.

We are thinking about ways of interacting more with our users. This allows for seeing these smaller innovations occurring, finding gaps users themselves don’t know about yet or that we don’t know about either, giving our users tools that are easy to use and allow for innovation.
