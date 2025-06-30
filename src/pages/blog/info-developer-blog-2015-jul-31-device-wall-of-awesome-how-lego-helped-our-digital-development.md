---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-jul-31-device-wall-of-awesome-how-lego-helped-our-digital-development'
headline: 'Device wall of awesome: how Lego helped our digital development'
date: '2015-07-31'
authors: [Helene Sears, Jonathan Hare-Winton, Piers Jones,  Scott Painter , Michael-McNamara]
standfirst: 'How we found a way to justify playing with Lego at work.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/7/23/1437668775450/ab083090-ac4e-4f34-ad4d-e785f923e271-2060x1236.jpeg'
  alt: 'The device wall is made of Lego'
  credit: 'Photograph: Helene Sears'
tags: [Lego, Testing]
---

We are privileged to work at the Guardian in central London. Obsessed with technology, most of us have the latest iPhones or Android mobiles and are accustomed to solid data connections or WiFi throughout the city - but crucially that isn’t the case for our audience at large. Under the editorial pressures of deadlines and our mentality of regularly shipping features it is easy to forget that our worldwide readers are depending on a huge range of devices, browsers and connections.

On a recent high traffic day our site was visited on a whopping 7,061 different types of mobile devices, on 1,360 different browser types and versions in 241 countries. That is a huge technical challenge to accommodate, but it is also a shift in mentality. We want the Guardian site and apps to be a brilliant experience regardless of device or location.

Impressed by the open source [Google device wall](http://www.petelepage.com/blog/2014/07/devlab/), we wanted to use this technology to create a device wall that would be easy and fun for testing our content on lots of different devices. Our recent Guardian Hack Day seemed like the perfect opportunity to make it happen.

Lego at work
------------


   <figure class="supporting">
   <img alt="Lego store" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/23/1437669066209/f3f57eb1-3f72-4438-b530-c2d06f86f02e-1020x612.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=eab9a70c770a69fba50672c41ecb96d3" loading="lazy" />
   <figcaption>
     A trip to the lego store to get the required materials
    <i></i>
    </figcaption>
    </figure>

We knew we wanted to create a wall, what we did not want to do is build something out of 2x4s and plaster board - aside from being a lot of work it would be too permanent in our world of ever changing devices. Cue Lego.

For a mere £12 you can visit your local Lego store and fill a plastic cup with Lego of your choice. That, plus a few baseplates and a £7 cork board from Rymans and we were good to go.

On the day of the hack we secured the devices to the board with remarkable ease. We were concerned about the weight of the devices but found Lego was more than up for the challenge. Best of all, as we changed our minds about which devices to use, re-configuring the wall was easy.


   <figure>
   <img alt="Device wall" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/23/1437669301391/de000e1f-0341-4cf3-a10f-3868357ddc7f-2060x1236.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=c00d7eb9fdc6918eb343ee45f240b660" loading="lazy" />
   <figcaption>
     The final device wall
    <i>Photograph: Helene Sears</i>
    </figcaption>
    </figure>

**How we made the wall work technically**

Firstly, we wanted to see if it was possible to fire off a URL from a single point and launch it on multiple devices simultaneously, which would allow us to speedily view content over a variety of devices. We dived in and made a quick proof of concept that solely worked for Android devices using a simple shell script that iterates through all the devices detected by [ADB](http://developer.android.com/tools/help/adb.html) then fires off a browser intent. This meant that as far as the code was concerned we had a working device wall, albeit only for Android devices, within 30 minutes of the hack day starting.

But that definitely wasn’t enough, so as mentioned above we made use of a great [open source device wall implementation](https://github.com/GoogleChrome/MiniMobileDeviceLab) that Google developed for their I/O conference in San Francisco this year, meaning that after a bit of setup and tweaking we had a full device wall capable of supporting Android, iOS and Windows devices. This works by having a backend service hosted on [Firebase](https://www.firebase.com/), that listens for URLs, then pushes them to the devices. For iOS and Windows devices, a listener app is installed locally on the device which waits for URLs to be issued by the backend, and then opens them in a webview. For Android devices, each device is wired into a lightweight node.js server, which receives the URLs and sends them to the devices using the same ADB approach that we used in our initial prototype.

For demo purposes we used a web front end to enter live URLs, but the system is flexible enough for us to integrate our internal, unpublished articles and features.


   <figure>
   <img alt="The team holding the board" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/23/1437669391449/ea6b8e81-99c1-4bda-b850-2a61b1d3e1dc-2060x1236.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=71226963cabd705839b82c86464e47e0" loading="lazy" />
   <figcaption>
     The team holding the device wall
    <i>Photograph: Helene Sears</i>
    </figcaption>
    </figure>

What next?
----------

Since the hack day we have been designing ways of making this wall a reality around the Guardian office. Phase one is to have the board enclosed in a case and secured to the tops of the the lockers located throughout the building. The system would be scalable and any team that needed one could order one. Lockable doors on the case would enable easy access to the devices as needed. For the hack day we ran the node server on a laptop, however, as suggested by Google, a [Raspberry Pi 2](https://www.theguardian.com/technology/2015/feb/02/raspberry-pi-2-support-free-windows-10) will be more than capable of running node and ADB, and we can attach it to the back of the board to cut down on wires and footprint.

For developers, the implementation we are using also offers the possibility to run the page you are viewing through services like [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) and [Web Page Test](http://www.webpagetest.org/) so that you can check performance at the same time as viewing the content of the page. In addition, there are very powerful performance testing tools available in the developer toolkits on both Chrome and Safari. The potential for the device wall to allow us to use these tools to test performance across different pieces of hardware at the same time is a possibility we are keen to explore further.

Phase two is a showcase wall, something that could live in the breakout areas for anyone walking past.

Ultimately the aim of the device wall is to provide Guardian staff who are responsible for the Digital content with a fun and simple way of viewing their work on a multitude of different device sizes and types. Our hope is that by creating an easy to use, modular system we can make testing simpler for design and editorial, in addition to allowing the Digital Development team the opportunity to test new features on a wider scale and therefore ensuring that we continue to provide a brilliant digital experience.

The device wall has proved to be a hugely fun project and one that will hopefully continue to expand and encourage further testing in the future - plus, having a tub or two of Lego at the office can never be a bad thing.
