---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-jan-10-tags-are-magic-1'
headline: 'Tags are magic! - Part 1'
date: '2011-01-12'
authors: [Martin Belam, Peter Martin]
standfirst: 'Last year at the Online Information conference in London, the Guardian''s tag manager Peter Martin and information architect Martin Belam gave a presentation called Mapping the Guardian''s Tags to the Web of Data. In a series of posts for the Developer Blog, they outline why Tags Are Magic'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/12/21/1292949729676/tag_ianmunroe_photo.jpg'
  alt: 'A card tag'
  credit: 'Photograph: Ian Munroe/Flickr'
tags: [Tags are magic]
---

Every article that appears on guardian.co.uk has a series of "tags" applied to it. They include things such as the origin of publication (the Guardian, the Observer, or guardian.co.uk for example), the tone of the piece (news, review, obituary etc), the name of the author, and usually a set of keywords describing the topic of the article.


   <figure>
   <img alt="Adding tags to an article" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/22/1293034929017/adding_tags_in_r2.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=0f6a6a3be24450415b0e2e18da664ee8" loading="lazy" />
   <figcaption>
     Tags can be added to guardian.co.uk content via our R2 content management system
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Applying these tags, like most metadata tasks, is generally regarded as rather dull and tedious. It is done at the time of content production either in our print systems, or via a separate web interface onto our R2 content management system.

While not being the most fun part of production, tags are an important part of our publishing platform, and drive a lot of the behaviour that users see on the website and other devices. In a series of posts over the next couple of weeks, we'll be looking at some of the features that tags deliver.

Related links and tag pages
---------------------------

First of all, they give us related links to the right-hand side of every article. For some articles, this may be one or two topics mentioned in the piece. For others, like [Saturday's FA Cup Third Round clockwatch](http://www.guardian.co.uk/football/2011/jan/08/fa-cup-live-football), the number of related tags, one for each team involved, can be huge.


   <figure>
   <img alt="Related tags on a guardian.co.uk page" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/1/10/1294653525228/fa_cup_clockwatch.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=0b7232862ecbb5461114958e082447f0" loading="lazy" />
   <figcaption>
     Most of the teams in action in Saturday's FA Cup Third Round appeared as a related tag on our minute-by-minute coverage.
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

We also have "tag pages", where we aggregate every piece of content that carries a particular tag. This may not seem particularly exciting, but this means that we have around 8,500 topic indexes, all being built automatically. We would never have the resources to manually manage a page specifically devoted to [Maternity & Paternity rights](http://www.guardian.co.uk/money/maternitypaternityrights), but with tags we get one almost for free.


   <figure>
   <img alt="The Guardian's maternity and paternity rights tag page" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/22/1293034985193/maternity_tag_page.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=c7b79521774920ac32ace03639e1f9ff" loading="lazy" />
   <figcaption>
     The guardian.co.uk maternity and paternity rights tag page
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Tags also allow us to cross-promote content effortlessly. When [Peter Bradshaw reviewed The Damned United in 2009](http://www.guardian.co.uk/film/2009/mar/27/damned-united-brian-clough-leeds-united-film-review), simply adding the "Leeds United" football tag to the review meant that as well as appearing in the Film section of guardian.co.uk, the review was listed on [the Leeds United page](http://www.guardian.co.uk/football/leedsunited). The Film desk and the Sport desk didn't have to have a lengthy conversation about it – the application of the tag meant the same piece was presented to both audiences.


   <figure>
   <img alt=""The Damned United" film review on the guardian.co.uk Leeds United tag page" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/8/16/1281953595372/damned_united_review.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=85a2107fc1a1bd5c37fc9a6b91cd3535" loading="lazy" />
   <figcaption>
     The Damned United film review on the guardian.co.uk Leeds United tag page.
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Combiners
---------

Another feature enabled by tags on the site is adding together fragments of URLs to make "combiner pages". These can be obscure, like [Bullfighting plus Vuvuzelas](http://www.guardian.co.uk/world/bullfighting+football/vuvuzelas), which, to date, produces one article.


   <figure>
   <img alt="An obscure tag combiner page: Bullfighting plus Vuvuzelas" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/8/16/1281953642950/bullfighting_vuvuzelas.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=a11c7e15867e92836d7e2de839e14f87" loading="lazy" />
   <figcaption>
     An obscure guardian.co.uk tag combiner page: Bullfighting plus Vuvuzelas.
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Or these combinations can be more useful, like [books/books+tone/review](http://www.guardian.co.uk/books/books+tone/reviews) which automatically aggregates every book review on the site into one place, or [environment/environment+content/gallery](http://www.guardian.co.uk/environment/environment+content/gallery) which generates pages containing all the galleries published by the Environment site.


   <figure>
   <img alt="Marina Hyde's guardian.co.uk profile page" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/8/16/1281953694727/marina_hyde_tag_tabs.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2161b0a06c10637c8dcf432eaa438b48" loading="lazy" />
   <figcaption>
     Marina Hyde's guardian.co.uk profile page, featuring navgation tabs allowing the user to concentrate on one of the topics she writes about.
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Combining tags also allows us to split up a contributor's articles into clear sections. For example, on [Marina Hyde](http://www.guardian.co.uk/profile/marinahyde)'s page, there are tabs allowing the reader to explore her writing on [sport](http://www.guardian.co.uk/profile/marinahyde+sport/sport), [celebrity](http://www.guardian.co.uk/profile/marinahyde+lifeandstyle/celebrity), or [last year's election](http://www.guardian.co.uk/profile/marinahyde+politics/series/marina-hyde-campaign-trail).

_In [part two of this series](http://www.guardian.co.uk/info/developer-blog/2011/jan/19/tags-are-magic-2), we'll be looking at how we utilise folders to turn our tags into a taxonomy._
