---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-sep-16-guardian-android-app-faqs'
headline: 'Guardian Android app now lets you save to SD card - an explainer'
date: '2011-09-16'
authors: [Rupert Bates]
standfirst: 'We''ve listened to your requests and added ''move to SD'' functionality – useful for devices with limited memory'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/red/blue_pics/2011/08/25/Android_460x276.jpg'
  alt: 'Guardian android app'
  credit: 'Photograph: guardian.co.uk'
tags: [Android, Guardian app for Android]
---

When we released version 1.0 of the [Guardian app for Android](https://market.android.com/details?id=com.guardian), by far [the most common request we received](http://www.guardian.co.uk/help/insideguardian/2011/sep/07/guardian-android-app#start-of-comments) was for the ability to move the application to the device's SD card.

This is a feature that was introduced in [Android](https://www.theguardian.com/technology/android) version 2.2 and is particularly useful for people whose phones have limited internal memory as by moving installed applications to external storage they are able to conserve that memory. Version 1.0.1 of the Guardian app, released this week, now enables this feature.

The move to SD functionality is actually very easy to implement for the developer; it is a one line change in the configuration file of the application (set the "installLocation" attribute to 'auto'), however it comes at the cost of some changes to the behaviour of those applications installed on external storage, which is why we did not enable it in the first version.

The main difference that the install location makes is described in [the Android documentation](http://developer.android.com/guide/appendix/install-location.html) as follows:

"When the user enables USB mass storage to share files with a computer or unmounts the SD card via the system settings, the external storage is unmounted from the device and all applications running on the external storage are immediately killed."

If the app is running and you plug your phone in to a computer and choose to share the files with that computer then the app will immediately exit. This is not a great user experience from the developer's point of view as it may appear to users of your app that it has crashed.

However, it is the same for all apps and it is probably safe to assume that someone who has installed an application on their SD card before will be aware of this limitation.

There is, however, another subtle difference in application behaviour that will not affect all applications, but does present problems for the Guardian app. When external storage is unmounted (in the ways described above), alarm notifications for applications installed on external storage are cancelled and it is up to the application to reschedule them the next time it runs. This means the user has to reopen the app after remounting the SD card to reschedule its alarm notifications.

Since the Guardian app uses an alarm notification to trigger scheduled downloads, unmounting the SD card will effectively cancel the scheduled download until the SD card is remounted and the application has been manually started.

Again, this is not a great user experience and is likely to lead to bug reports about failed downloads. However, the strength of feeling was so great about enabling this feature that we felt that it was worth doing.

We're still collating all your other feedback, so please feel free to add further comments below.
