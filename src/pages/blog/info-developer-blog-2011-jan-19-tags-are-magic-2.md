---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-jan-19-tags-are-magic-2'
headline: 'Tags are magic! - Part 2'
date: '2011-01-19'
authors: [Martin Belam, Peter Martin]
standfirst: 'In part two of this series of posts based on a presentation given at last year''s Online Information conference in London, the Guardian''s tag manager Peter Martin and information architect Martin Belam look at the use of folders to build a taxonomy from the tags applied to content'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/12/21/1292950449083/tag_nightthree_photo.jpg'
  alt: 'A bunch of name tags from a Barcamp conference'
  credit: 'Photograph: Justin Russell/Flickr'
tags: [Tags are magic]
---

Last week [we began a series of Developer Blog posts](http://www.guardian.co.uk/info/developer-blog/2011/jan/10/tags-are-magic-1) looking at how the tags on guardian.co.uk power a wide variety of features across the site and various platforms. In part two, we look at how we use folders to build these tags into a taxonomy.

Using tags as a taxonomy
------------------------

We can create useful clusters of topics by dropping tags into folders. These can be used to populate pages in a variety ways.

We can make new pages dynamically by [combining tags](http://www.guardian.co.uk/info/developer-blog/2011/jan/10/tags-are-magic-1#combiners), and if you're on the [Paris](http://www.guardian.co.uk/travel/paris) page you'll find a block of links pointing to the most heavily populated combiner pages for "\[Paris\]+\[tags placed in a Trip planning folder\]", giving links to combiner pages of Paris+ [Hotels](http://www.guardian.co.uk/travel/paris+hotels), [Restaurants](http://www.guardian.co.uk/travel/paris+restaurants), [Short breaks](http://www.guardian.co.uk/travel/paris+short-breaks), [City breaks](http://www.guardian.co.uk/travel/paris+city-breaks), [Cultural trips](http://www.guardian.co.uk/travel/paris+cultural-trips) etc.


   <figure>
   <img alt="Screenshot of the guardian.co.uk Paris Travel page" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/22/1293035928073/paris_suggestions.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9688d1e503c2453a4e4d3d0d5688bdfa" loading="lazy" />
   <figcaption>
     The suggestions panel on our Paris page is driven by calculating popular combinations of tags.
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

If you're on a "Type of trip" tag page, such as [Skiing](http://www.guardian.co.uk/travel/skiing), you'll find a block of links to the combiner pages for \[Skiing\]+\[the destinations that most frequently share a tag with skiing\]: [France](http://www.guardian.co.uk/travel/france+skiing), [Switzerland](http://www.guardian.co.uk/travel/switzerland+skiing), [Austria](http://www.guardian.co.uk/travel/austria+skiing) etc.

Because these links are generated based on frequency of tags in common, they will change over time to reflect our output, without any editor ever having to intervene. Categorising travel keyword tags into "Types of trip", "Trip planning" and "Places" makes obvious sense, because users tend to browse travel content with very clear goals in mind.


   <figure>
   <img alt="Screengrab of guardian.co.uk business sectors round-up page" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/22/1293035975464/business_sectors.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1e9992fc8f26e32c126dd321990298ef" loading="lazy" />
   <figcaption>
     Tags allow us to automatically group together business stories by industry sector
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

On news sections, where the paths users may choose to take are less predictable, we tend to use folders to generate pages rather than potential paths. A group of tags in a folder can be used to populate a roundup page such as [Business sectors](http://www.guardian.co.uk/business/business-sectors/roundup), [Middle East](http://www.guardian.co.uk/world/middleeast/roundup) or the [US states](http://www.guardian.co.uk/world/us-states/roundup). You can add a tag to as many folders as you like ([Egypt](http://www.guardian.co.uk/world/egypt) appears on both the [Africa](http://www.guardian.co.uk/world/africa/roundup) and Middle East roundup pages). We also use folders to generate list pages, such as the people page, [genre pages](http://www.guardian.co.uk/film/list/filmgenres) and most of our [A-Zs](http://www.guardian.co.uk/lifeandstyle/list/alllifeandstylekeywords).


   <figure>
   <img alt="Screengrab of the guardian.co.uk 'All life and style keywords page'" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/22/1293036008064/all_life_style_keywords.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e71cd9b3116b304d1202d1228a9af4ba" loading="lazy" />
   <figcaption>
     The A-Z index pages on guardian.co.uk are automatically generated based on the tags belonging to specific sections
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Parent/child relationships
--------------------------

A second method of creating tag relationships is "parent/child". If one subject always implies another (Rap ⇒ Music, Labour ⇒ Politics, Chocolate ⇒ Food and drink) then we can class the first tag as a "child" of the second. Paris (Travel) is a child of France (Travel) and therefore a "sibling" of other "children" of France. This allows us to add automated links on Travel's Paris page to other French cities and regions.

Annual events such as [festivals](http://www.guardian.co.uk/music/glastonbury), [awards](http://www.guardian.co.uk/books/booker-prize) and [sporting events](http://www.guardian.co.uk/sport/wimbledon), have an undated "parent" tag (giving us a single resource users can return to year after year) and "child" tags for the individual years (made after the event for archiving). On the undated pages we pull in a "child" driven block of links to previous years' coverage.

We also use parent/child tag relationships in our tools to propose parent tags when a child tag has been selected. So if an editor picks the ["London Evening Standard](http://www.guardian.co.uk/media/london-evening-standard)" tag, the tags "[Local newspapers](http://www.guardian.co.uk/media/local-newspapers)", "[Freesheets](http://www.guardian.co.uk/media/freesheets)", "[Newspapers](http://www.guardian.co.uk/media/newspapers)", "[Press and publishing](http://www.guardian.co.uk/media/pressandpublishing)", and "[Media](http://www.guardian.co.uk/media)" are all proposed and can be applied with one click, saving the editor from having to mentally climb a taxanomical tree and speeding up the process of adding tags.

While many of Travel's parent/child and folder driven components are hard coded, we also embed configurable components into our page templates. Folders, parent/child relationships, single tags and tag+tag combinations can be used to pull trails (headline plus a short description of the piece) of:

• A single tag such as a related blog  
• The page's topic filtered by a single tag such as comment, news, features etc.  
• A combination of any two tags  
• Any content tagged with any of the tags in a folder  
• Content tagged with parent, child or sibling tags

There's enough flexibility built into these options to automate large chunks of the site, allowing us to concentrate resources on the areas that are of most importance to us and our audience.

_In [part three of this series](http://www.guardian.co.uk/info/developer-blog/2011/jan/25/tags-are-magic-3), we'll look at how we manage our tags to keep them in line with editorial style, and to keep them useful for the audience._
