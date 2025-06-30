---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-jul-17-introducing-the-content-api-v2'
headline: 'Introducing the Content API v2'
date: '2014-07-17'
authors: [Cantlin Ashrowan]
standfirst: 'The Guardian are making some changes to the Content API, the principle service of the Open Platform. Here’s everything you need to know.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/6/30/1404142625316/126c4932-89af-44fa-a621-469f5ab719c1-2060x1236.jpeg'
  alt: 'Content API response'
  credit: 'Photograph: The Guardian'
tags: [Content API]
---

Quick start
-----------

The new API is a faster, mostly backwards compatible version of the old one. You need to start using it by August 30th. More detail follows. If you just want to get started right away, follow these steps:

*   Register a new API key at [guardian.mashery.com](http://guardian.mashery.com). Your old key won’t work.  
    
*   Update your app. Use your new key and change the API domain from [content.guardianapis.com](http://content.guardianapis.com) to [beta.content.guardianapis.com](http://beta.content.guardianapis.com/).  
    
*   Everything should Just Work. If it doesn’t, [let us know](https://groups.google.com/forum/#!forum/guardian-api-talk).

Why are we making changes?
--------------------------

We recently developed a new version of the Content API for our use internally. We’d like to share the benefits with our developer community, including:

*   Faster response times.
*   Faster availability of newly published content and updates.
*   More sophisticated rights management, making more of our content available.

What changes are being made?
----------------------------

The new version of the API is largely backwards compatible with the old one. The endpoints are the same as ever, the interchange format is unchanged, and most of the current filtering and output control features are still available in the new version.

We’re taking this opportunity to simplify the tiers of access. The new default access level for an API key is called “developer”. This allows access to everything you could get via the old “approved” tier.

For our partners there’s also a new tier, “rights-managed”, which replaces the old “partner” and “external-partner” tiers. Again, there is little practical difference between the old arrangement and the new one.


   <figure>
   <img alt="v2 dashboard" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/6/30/1404141152823/cfb134d4-a250-42fc-a3a5-14e5d671c749-620x368.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=44344836a0ec13c652f4ab5160ab6917" loading="lazy" />
   <figcaption>
     v2 dashboard: <a href="http://status.content.guardianapis.com">status.content.guardianapis.com</a>
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

What features are being deprecated?
-----------------------------------

Because of rights issues, we generally don’t distribute images and videos through our API. In some special cases though partners have been able to access media like pictures and videos in our content through a feature called **media assets**. These are being replaced by a much better feature called **elements**. [See here](https://docs.google.com/a/guardian.co.uk/document/d/14ySuCv3UyjGt0TAmFwjKemSJZIeuHjrzZSmOmQ3yLIc/edit) for guidance on migrating from assets to elements.

Other niche features like **show-snippets** and **show-refinements** have also been removed. [See here](https://docs.google.com/a/guardian.co.uk/spreadsheet/ccc?key=0AuUzhz34KpnqdHBXQ3BEdnZfaEIxakV5Q0ozbW1jWEE) for a complete list of all features and their status.

When is this change happening?
------------------------------

All clients should switch to the beta.content.guardianapis.com domain by August 30th. On that date we will update the old content.guardianapis.com domain to use the new service. Clients who have not migrated will start receiving errors due to their old key no longer being valid for the new service.

Will you be changing the terms of service?
------------------------------------------

Yes, but they will retain the spirit of the [current terms](https://www.theguardian.com/open-platform/terms-and-conditions). Stay tuned.
