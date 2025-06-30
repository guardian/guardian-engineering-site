---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-may-05-notes-on-release-111'
headline: 'Notes on Release 111'
date: '2011-05-05'
authors: [David Shaw]
standfirst: 'David Shaw provides an overview of the most recent changes to guardian.co.uk'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/5/6/1304680419174/Royal_Wedding_Bento_Box_Corner.png'
  alt: 'Guardian Royal Wedding coverage'
  credit: 'Photograph: guardian.co.uk'
tags: [Computing, Internet]
---

Release 111 was deployed on 20 April, in time for the all of those holidays we've had recently, so apologies for the delay in this post but we've been busy preparing for the Release 112 next week. Here's a roundup of what was in 111 ...

Migration of sports feeds complete
----------------------------------

Our sports feeds provider, ESA, was recently acquired by Opta. We have completed the process of migrating away from ESA's feeds, which are being discontinued, in favour of those provided by Opta. These feeds drive popular content such as our [football match pages](http://www.guardian.co.uk/football/matches).

'Bento Box' changes
-------------------

The Bento Box is our special feature layout style for the [network front](http://www.guardian.co.uk/) and it was updated for the royal wedding. The whole box can now be themed – previously, there was a limited choice of background colours; now, a CSS file can be applied which will change the colour and background image if specified. Our slide-show component is now compatible with the Bento Box layout. Finally, a JavaScript sliding option can be applied to the theme, which allows the user to hide the box if desired – which proved popular during the wedding coverage.

Editors' picks in the Guardian's API
------------------------------------

The method by which the API retrieves editors' picks from the network front has been changed. It now loads the editors' picks from three specified trailblocks (columns of content each linking to a piece of content and usually displayed with a comment count a standfirst). This allows for greater control and flexibility of the content accessible to the API and therefore the platforms that rely on it, such as the mobile site and mobile applications.

Other small changes and fixes around the site
---------------------------------------------

*   RSS feed for PaidContent stopped at 30 March on guardian.co.uk/media. After investigation the feed used also stopped on 30 March, so have moved to a new feed through the mappings for the media section front.  
    
*   Video team was unable to upload video, and the cause was determined to be the accent in Nemanja Vidić. The accent was removed from the video file and uploaded successfully.  
    
*   Editors can now create more than one quiz type. The form element with the disabled attribute doesn't get sent to the server on a POST request, resulting in the default being used every time.  
    
*   The styling of the Money Supermarket component on the business home has been updated to reflect the section it's in and also where it's located within the page.  
    
*   Jobs RSS for local (Edinburgh, Leeds and Cardiff) had changed. This has now been updated.
