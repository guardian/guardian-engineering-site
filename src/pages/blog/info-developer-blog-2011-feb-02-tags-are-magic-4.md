---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-feb-02-tags-are-magic-4'
headline: 'Tags are magic! - Part 4'
date: '2011-02-02'
authors: [Martin Belam, Peter Martin]
standfirst: 'In the last of a series of posts based on a presentation given at last year''s Online Information conference in London, the Guardian''s tag manager Peter Martin and information architect Martin Belam look at how our tags are used to link to the external world, improve search and navigation, and to place components on our pages'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/12/21/1292951432122/tag_rbrwr_photo.jpg'
  alt: '"Your tag sucks" in graffiti'
  credit: 'Photograph: guardian.co.uk'
tags: [Tags are magic]
---

In [a series of posts for the Developer Blog](http://www.guardian.co.uk/info/series/tags-are-magic), we've been exploring the role that tags play in our content management system, from building topic pages to forming a taxonomy, and how we keep them useful and in house style. In this final part, we are looking at some other roles that guardian.co.uk tags play, including linking them to the wider web.

Placing components on pages
---------------------------

The tags attached to an article can trigger related content to appear in the right-hand column of our pages. On [Technology stories tagged with Apple](http://www.guardian.co.uk/technology/apple), for example, you'll see a component that automatically displays the latest tweets featuring keywords like "apple", "ipod" or "ipad" from Guardian technology and media staff such as [Charles Arthur](http://www.guardian.co.uk/profile/charlesarthur) or [Josh Halliday](http://www.guardian.co.uk/profile/josh-halliday).


   <figure>
   <img alt="Screengrab of our tag-driven Twitter component" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/22/1293037101141/apple_news_on_twitter.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d30255d91152ca1e63b5ea0557a74f84" loading="lazy" />
   <figcaption>
     Tags can be used to trigger or modify the type of content that appears in the right-hand side of the guardian.co.uk website
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Article tags are used to fine tune some of the commercial inventory on our pages. If you visit articles tagged with Environment, you should be presented with a promo slot for [Guardian Jobs](http://jobs.guardian.co.uk/), where the positions being advertised are relevant to those interested in the topic.

Exploring content on other platforms
------------------------------------

Two of the distinctive features of [the Guardian iPhone app](http://www.guardian.co.uk/iphone) are based on tags. The "Trending" page lists the tags that are on the articles currently attracting the most attention.


   <figure>
   <img alt="Tags in use in the Guardian iPhone app" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/1/20/1295518142560/tags_in_iphone_v2.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1e8f2c47743d7bfcbf29f66d0204aa20" loading="lazy" />
   <figcaption>
     Tags power several features in the new version of the Guardian's iPhone app
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Users are also invited to explore content on the app by using the "tag overlay". Each article headline has a small yellow tag icon underneath it. Tapping this reveals the keyword tags for that particular story. This means that a user can very quickly drill down to a specific topic within the app without having to navigate nested menus.

Improving search and navigation
-------------------------------

Tags help us to improve the results on our site search.

When users input terms that are synonyms or near-synonyms of topics we cover, we can return the relevant tag page amongst the top results. This means that if you search for "global warming" on guardian.co.uk, you'll get the tag pages for [climate change](http://www.guardian.co.uk/environment/climate-change) and the [Copenhagen climate change summit](http://www.guardian.co.uk/environment/copenhagen) up at the top.


   <figure>
   <img alt="Screengrab of a search on the guardian.co.uk site" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/22/1293037157606/global_warming_search.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=fee209734fb3f74c63138a909b170be9" loading="lazy" />
   <figcaption>
     We can make tag pages 'Editor's picks' for search terms that are synonyms or near-synonyms
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Likewise, when there is interest in a specific person closely associated with a topic – for example, Julian Assange – we can use these tag picks to offer people the WikiLeaks page when they search for his name.

Connecting our tags to the rest of the web
------------------------------------------

A recent development with our tags has been the ability to query them using some common external identifiers via our API.

And in English?

That means you can pop an ISBN into our [Open Platform Content Explorer](http://explorer.content.guardianapis.com/#/), and it will let you know if we have reviewed the book. Or you can put in the MusicBrainz ID for The Magnetic Fields – a string of computer gobbledegook like 3ff72a59-f39d-411d-9f93-2d4a86413013 – and get back articles that are _only_ about the band, not just any article on the website where the band _or_ the electric phenomena has been mentioned.

This is part of a move toward using "linked open data" on our platform, and you can read more about it here: "[Adding Linked Data to the Open Platform](http://www.guardian.co.uk/help/insideguardian/2010/oct/18/linked-data-guardian-open-platform)"

So metadata isn't boring after all ...?
---------------------------------------

Metadata has a reputation for being boring. However, we hope that over the course of the four blog posts you might have come to realise that adding additional metadata to Guardian and Observer content isn't in fact a boring menial task, but something that adds real value to our content, and enhances the way that we present that content digitally.

If you want to find out more about how we ended up with the content model that we did, then in 2008 Nik Silver and Mat Wall wrote [an essay on using domain-driven design in the rebuild of our content management system](http://www.infoq.com/articles/ddd-evolving-architecture). It is quite a technical essay, but well worth a read to see the lengths that the technical team went to in order to make sure they understood the editorial needs and requirements of our publishing systems.
