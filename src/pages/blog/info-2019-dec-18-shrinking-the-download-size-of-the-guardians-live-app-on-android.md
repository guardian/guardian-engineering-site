---
layout: ../../layouts/blog.astro
slug: 'info-2019-dec-18-shrinking-the-download-size-of-the-guardians-live-app-on-android'
headline: 'Shrinking the download size of the Guardian’s Live app on Android'
date: '2019-12-18'
authors: [Jordan Terry]
standfirst: 'How we shrunk the size of the Android app by 30% using the Android app bundle'
image:
  url: 'https://media.guim.co.uk/53a17040293a0fffe2db632890aa23ddae74ba16/0_266_3984_2390/3984.jpg'
  alt: 'Bundles of envelopes'
  credit: 'Photograph: Carol Jeng/Unsplash'
tags: [Android]
---

The [Android app bundle](https://developer.android.com/platform/technology/app-bundle) was announced at Google I/O 2018 as a new publishing format for Android apps to be deployed via the Google Play Store; bringing with it smaller app sizes and more dynamic delivery. The package is an alternative to deploying your app using the APK.

The APK
-------

An APK is like a zip file but with the file extension APK, produced from the build process. It contains compiled code, resources, native libraries and anything else required to install your app onto a device. It is uploaded to the Google Play Store where users can download and install it onto their devices.

The APK does a great job, but as apps grow larger and users install more apps on their devices the limits of the APK format become obvious. Users have to download resources for all different device configurations to their own, like images for different device resolutions or language strings for different languages. This means excessive download sizes for users who may not have unlimited data plans or WiFi connections to download the app.

The Android App Bundle
----------------------

Luckily, Google have produced a solution to this challenge – the Android App Bundle. Rather than building a monolithic APK containing all the code for an app, we now build a bundle containing all code for the Guardian Live app. This bundle is in a format that will allow the Google Play Store to split it into smaller APKs based on screen density, language or device architecture. This means the Google Play Store only provides a user device with the relevant APKs, saving data and space on a device.

The video below, from the Android Dev summit in 2018, summarises some of the benefits of the Android App bundle – bigger apps lose acquisitions and the best way to increase app downloads is by reducing the size of your app.

<figure>
                <iframe class="video" src="https://www.youtube-nocookie.com/embed/st9VZuJNIbw?wmode=opaque&feature=oembed" title="" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

### Our experience

Converting the Guardian Live app from APK format to using the Android App Bundle was an extremely straightforward process. Using the bundle has reduced the size of our app from _15.7 mb_ to _11.1 mb_ a whopping saving of 23%. That’s less than the average savings of 35% [mentioned by Google](https://medium.com/googleplaydev/what-a-new-publishing-format-means-for-the-future-of-android-2e34981793a). Needless to say, we are really pleased with the result.

Updating our build process was a breeze, we changed our _assemble\*\*_ gradle tasks to their equivalent _bundle\*\*_ task. We used [fastlane](https://fastlane.tools/) to upload our artefacts to the Google Play Store and to update that process we just had to change an argument to the supply command. You can view the documentation for this [here](https://docs.fastlane.tools/actions/supply/#uploading-an-aab).

After releasing the Android App Bundle to the Google Play store we saw some users experience crashes because of missing resources. We were concerned we might have made a mistake, until we realised it was due to users who were sideloading the incorrect APKs for their device. The Android Developers website has a [helpful list](https://developer.android.com/guide/app-bundle#known_issues) of known issues. You can refer to this list if you run into any issues during the process of releasing an Android App Bundle. If you haven’t yet made the jump to using the bundle we can’t recommend the format enough.
