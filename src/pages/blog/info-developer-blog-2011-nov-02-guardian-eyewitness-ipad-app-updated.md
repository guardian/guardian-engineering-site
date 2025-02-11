---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-nov-02-guardian-eyewitness-ipad-app-updated'
headline: 'Guardian Eyewitness iPad app updated'
date: '2011-11-02'
authors: [Martin Redington]
standfirst: 'Upgrade to our Eyewitness app for iPad improves the interface and speeds up photo downloading'
image:
  url: 'http://static.guim.co.uk/sys-images/GUARDIAN/Pix/pictures/2011/1/7/1294423276957/Guardian-Eyewitness-app-007.jpg'
  alt: 'Guardian Eyewitness app'
  credit: 'Photograph: Alicia Canter/Guardian'
tags: [Apps, Guardian apps, Photography]
---

I am very happy to report that we have released an update to the [Guardian Eyewitness iPad app](http://www.guardian.co.uk/mobile/ipad/eyewitness). Each day, the [Guardian Eyewitness series](http://www.guardian.co.uk/world/series/eyewitness) showcases one distinctive and provocative photograph, providing a visual reflection of global events.

New features in version 1.0.8 include:

• Various user interface tweaks and fixes;  
• Support for the built-in Twitter integration that Apple introduced in iOS 5;  
• Some fixes for Facebook sharing;  
• A redesigned settings panel;  
• Faster photo downloading;  
• An option to allow photos to download over 3G.

This last feature was a very common request from users. To enable 3G downloading, open Settings (from the About screen, tap the cog icon in the top left corner) and set "Only use Wi-Fi" to "OFF".

We have also added support for the iPad VGA adapter with the original iPad so that you can display and play slideshows of the Eyewitness photos on a larger screen. If you have an iPad 2, and the VGA adapter, or an Apple TV, then you should also be able to use these to show the Eyewitness photos on an external display or HDTV.

One feature of the new release that we'd like to highlight concerns "favourites". Eyewitness downloads a rolling 100-day window of photos. When photos are older than 100 days, they are no longer available for viewing, unless you have starred them as a "favourite" from within the app.

As part of the changes for iOS 5 and iCloud, Apple now requires applications to save all downloadable data [in temporary directories that are not backed up to iCloud](http://developer.apple.com/icloud/documentation/data-storage/), that can be cleaned automatically when the iPad's storage gets close to being full. The rationale behind this is that this data can easily be downloaded again, when required, so it should not be stored in more permanent locations, which would be backed up to iCloud (increasing the time it takes to perform a backup).

If any of your favourite photos are more than 100 days old, and your iPad storage starts to fill up, your favourite photos will be deleted automatically by the operating system and, because they are outside the 100 day limit, you will not be able to download them again.

Eyewitness is not the only application to be unintentionally affected by this change in iOS behaviour – [Marco Arment](http://www.marco.org/) has also indicated that ["this is going to be a problem"](http://www.marco.org/2011/10/13/ios5-caches-cleaning) for his popular [Instapaper](http://www.instapaper.com/) application.

We hope to extend the 100-day time limit (which is there mostly for reasons to do with distribution rights) for favourite photos in a future version of Eyewitness, so that your favourite photos really will stick around.
