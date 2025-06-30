---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-jan-25-tags-are-magic-3'
headline: 'Tags are magic! - Part 3'
date: '2011-01-26'
authors: [Martin Belam, Peter Martin]
standfirst: 'In part three of this series of posts based on a presentation given at last year''s Online Information conference in London, the Guardian''s tag manager Peter Martin and information architect Martin Belam look at how we keep our tags useful for the audience, and in line with house style'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/12/21/1292950629589/tag_teamaskins_photo.jpg'
  alt: 'A tag lying across a MacBook keyboard'
  credit: 'Photograph: Teamaskins/Flickr'
tags: [Internet, Tags are magic]
---

In [a series of posts on the Developer Blog](http://www.guardian.co.uk/info/series/tags-are-magic), we've been looking at how we use tags on guardian.co.uk to drive features on the website and other devices, and to build a taxonomy of subjects. In today's post, we are looking at how we manage the tags to keep them useful and in house style.

One tag or two? (or three or more?)
-----------------------------------

While the tags are designed to expose content on a variety of site sections, there are areas that are siloed off from one another because of the nature of the content. There are two China keywords, one in [World news](http://www.guardian.co.uk/world/china) and one in [Travel](http://www.guardian.co.uk/travel/china). A single all-encompassing China keyword page that mixes travel features and hard news isn't desirable either editorially or commercially.

In the main, we aim for one resource per topic: at one point we had three Microsoft keywords, Microsoft (technology), Microsoft and the Media, and Microsoft (business). Technology take all Microsoft stories so it made sense to replace the others with [Media+Microsoft](http://www.guardian.co.uk/media/media+technology/microsoft) and [Business+Microsoft](http://www.guardian.co.uk/business/business+technology/microsoft). Fewer similar tags mean greater clarity for users and more consistent tagging.

Every tag belongs to a site section, though in some cases a tag could belong to more than one section: [Media law](http://www.guardian.co.uk/law/media-law) (Media or Law?), [Social networking](http://www.guardian.co.uk/media/socialnetworking) (Media or Technology?), [Allen Stanford](http://www.guardian.co.uk/world/allen-stanford) (Sport, Business or World news)?

If a person refuses to settle into one area of activity we sometimes find as neutral a place as possible for their tag (the Culture section is very useful for polymorphous polymaths like [Russell Brand](http://www.guardian.co.uk/culture/russell-brand)). Sometimes tags must be moved: cricket promoter turned Ponzi scheme operator, Allen Stanford, started in Sport and currently resides in World news (Business seemed too specific for such a colourful character). There was a dangerous moment recently when it looked like [Wyclef Jean](http://www.guardian.co.uk/world/2010/aug/17/wyclef-jean-haiti-presidential-election) might have to take the long walk from Music to World news.

If a new tag is needed we decide the section of the site the tag should belong to (a process sometimes accompanied by careful negotiation), then we add the tag to any content in the archive significantly about the subject. New tags and their associated pages can be made in minutes (if there is a [small content set and a unique word in the name of the subject](http://www.guardian.co.uk/world/john-boehner) it can take seconds).

Keeping tags in line with editorial style
-----------------------------------------

If a tag is set up in the wrong section, or doesn't reflect style, or clashes with our values, then we'll either delete the tag, merge it into another tag, or remake it completely. We have tools that allow us to move all the content associated with a tag onto another tag, setting up redirects and even replacing links across the site with the new tag.

Our tags should be an index of our editorial preoccupations. We don't have a tag for every notable person we write about, we make tags as subjects become interesting to us or when someone notices a [Titanic](http://www.guardian.co.uk/uk/the-titanic) hole in the archive. It's an ongoing process that everyone at the Guardian and Observer is encouraged to contribute to. We should also encourage our audience to contribute by telling us what's missing from out growing list of keyword tags. 8,500 is, after all, a very small number.

Batch tagging
-------------

All this manipulation of tags requires special tools if it isn't to become tedious, and so within our R2 CMS we have the "batch tag editor".


   <figure>
   <img alt="The batch tagging tool within the gurdian.co.uk CMS" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/1/19/1295431871044/batch_tagging_tool.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4a21fe529b28bb870d064438b8674508" loading="lazy" />
   <figcaption>
     The batch tagging tool within the gurdian.co.uk CMS
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

This is essentially an internal facing advanced search tool, allowing production staff to narrow down their search results to occurrences in particular parts of an article (ie, headline or URL) and to home in on a particular date range.

Once a set of articles is displayed by the batch tag tool, staff are able to carry out a series of tag related operations. We are also able to generate a spreadsheet listing the primary tags on content published in the previous month.


   <figure>
   <img alt="The 'primary tag' report in spreadsheet form" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/1/19/1295431929346/primary_tag_report.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=97a8fe63ab9b2a36b65db9be3ba66eea" loading="lazy" />
   <figcaption>
     The 'primary tag' report in spreadsheet form
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

_In [the final part of this series](http://www.guardian.co.uk/info/developer-blog/2011/feb/02/tags-are-magic-4), we'll be looking at how we use tags to improve search and navigation, to place components on the page, and how we are linking them out to the wider web._
