---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-feb-18-computing-internet'
headline: 'Notes on Release 106'
date: '2011-02-18'
authors: [David Shaw]
standfirst: 'David Shaw provides an overview of the most recent changes to guardian.co.uk'
tags: [Computing, Internet]
---

Here's an overview of the latest updates to the site.

Concurrent modification warnings for content editor
---------------------------------------------------

Up until now, there was no indication if more than one person is editing the same piece of content in the CMS. This could result in changes made by one person being overwritten by another.

This new functionality now alerts the editor of such an event, giving them the option to either refresh the page and update it with the other editor's changes, or save, which will still overwrite any changes made by someone else – but at least they will be aware of doing so.

Redesign of Sport and Football fronts
-------------------------------------


   <figure>
   <img alt="Old Football Front" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/2/11/1297421314813/footballpre.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f9c0dc4aa269822bff719183a5db1eb1" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

  
Two of the Guardian's most popular web sections are being refreshed both from a design and maintenance perspective. The design elements will be obvious to the user, however the method by which the content is updated has now been changed, but in a more concealed manner.


   <figure>
   <img alt="New Football front" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/2/11/1297421330733/footballpost.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=7db1268e7fc2ab0be6a85254da1b951b" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

  
The editors will have much greater flexibility with regard to the components used and the way in which they are presented on the page. Similar migrations have already been completed for other sections, including Environment and World. Instead of updating a "static" template, the page is constructed of individual components that can be added, removed and customised.

Simplify process of taking down bad crosswords
----------------------------------------------

A new tool has been created to allow production desk to easily remove any crossword that is causing problems and replace it with an article. The tool consists of an addition to the crossword tool that allows you to either take down a crossword or to change its date and type.

Modification to the Sponsored Features component
------------------------------------------------

The Sponsored Features component previously displayed two features. The style has been changed slightly (larger image) and there is only one feature displayed now. This allows the one feature to be occupy more space and also is a more efficient use of the ad server.

Other bug fixes and enhancements
--------------------------------

*   The "Send to friend" functionality for content has had a JavaScript error resolved  
    
*   Users that are signed in can now view all comments on one page where there are more than 500 comments  
    
*   Default in-article Table elements to full-width, not half width  
    
*   Allow 18 items in Pickable Tag Combiner Trailblock (from 15)  
    
*   Add Explanatory placeholder text to the Carousel Trailblock component
