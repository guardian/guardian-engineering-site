---
layout: ../../layouts/blog.astro
slug: 'info-2019-apr-08-harness-web-development-adobe-creative-suite-electron-websockets'
headline: 'Harness web development skills to create better desktop applications'
date: '2019-04-08'
authors: [Sakib Supple]
standfirst: 'Integrating best of breed desktop applications from Adobe Creative Suite with web tools can provide a better experience for creative staff'
image:
  url: 'https://media.guim.co.uk/ebc1340a75feeacbb0d382992ec5530d2fdcd64f/0_0_6418_4279/6418.jpg'
  alt: 'The Guardian newsroom at work on the first edition of the tabloid format'
  credit: 'Photograph: Teri Pengilley/The Guardian'
tags: [Computing, Software]
---

Media organisations that started as print publishers, including the Guardian and Observer, have changed significantly in a short time.

Previously, editorial staff used specialised, professional, desktop software to create and publish news stories and features for print. Example applications include Adobe’s InDesign, InCopy, Photoshop and Illustrator.

Now, staff have to additionally use browser-based tools, typically programmed by teams of web developers, to publish their content to digital platforms. One issue with these tools is that it is difficult to integrate them directly with the desktop applications that editorial staff are already familiar with.

For example it might not be that easy to jump from a print article in an InDesign layout directly to a browser-based tool to publish that article on the web site.

One approach would be to create a single application that integrated desktop applications, and browser-based tools, to allow staff to seamlessly jump from one to the other. If that application was a full-featured desktop application, something familiar to editorial staff, so much the better.

From the software development perspective, it would be most efficient to create this application using existing web development resources.

How do you create desktop applications with web technologies?
-------------------------------------------------------------

Historically, creating desktop applications has meant coding in languages like C/C++, Java, Objective-C; buying extra resource to do this is expensive and seems wasteful. And if you have staff working in both Windows and Macintosh environments, you may need separate development teams to create and maintain applications that are compatible with both operating systems.

The ideal scenario would be to create desktop applications that are based on web technologies so web developers can code them, and that work seamlessly on both Windows and Macintosh platforms.

Above all, these applications must look, feel and behave like standard desktop applications that can interact closely with creative applications like Adobe InDesign.

Enter Electron
--------------

[Electron](https://electronjs.org/) is an open source environment built on Node.js and Chromium – the core technology that powers the Google Chrome browser. This can be used to create desktop applications using web technologies like HTML, Javascript and CSS. Key to Electron’s success is the ability to write great-looking interfaces using standard web technologies, at the same time providing access to the local desktop to create full-featured applications. Electron apps work on Windows, Mac OS X and Linux.

There was a time when open source technology was considered bleeding edge, but this is no longer the case. Also since [popular applications](https://electronjs.org/apps) like Skype and WhatsApp already use Electron, it feels more accepted and mainstream.


   <figure>
   <img alt="The WhatsApp desktop application uses Electron" src="https://i.guim.co.uk/img/media/d1e8147f83fb8864375479caf601b33bad10c672/0_0_4757_3066/master/4757.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=bec09b6386908f6f3c9058a69693d50f" loading="lazy" />
   <figcaption>
     The WhatsApp desktop application uses Electron
    <i>Illustration: Chesnot/Getty Images</i>
    </figcaption>
    </figure>

A benefit of using web technologies in desktop applications is that APIs can be more easily used to gather, or send, data to and from different systems. This characteristic is useful where you want to use a standardised approach to integrate information from legacy and modern systems. This can lead to quicker, more cost-effective development of versatile, full-featured tools that meet the needs of your staff.

That is why we chose Electron as the platform to create our Editorial Production app.

Editorial Production is a collaborative application that brings together workflow information from our main content creation system (the Octopus Editorial System – based on Adobe InDesign, Adobe InCopy and Adobe Photoshop) and browser-based systems for web publishing, picture management and newspaper publishing.


   <figure>
   <img alt="A screen grab of the Editorial Production app" src="https://i.guim.co.uk/img/media/711249097a6a531f18a919b640b6cbdd44f6aa56/0_0_2697_1619/master/2697.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=1da9aca9bb8586f389fa575aeaa3d217" loading="lazy" />
   <figcaption>
     A screen grab of the Editorial Production app
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

This is a full-featured desktop application used by different editorial teams involved in the creative process – subs, editors, picture desk, production staff, designers – to monitor and manage disparate print and digital workflows.

Editorial Production achieves this by using Node.js to create APIs to integrate with multiple systems. With the help of Electron, information from those systems is presented in attractive interfaces developed using technologies like HTML, CSS, AngularJS and Websockets.

The result is something that brings together Adobe InDesign, Adobe InCopy, Adobe Photoshop and browser-based editorial tools, in a format that creative teams enjoy. It gives them timely access to information they need to do their job in a full-featured package on their desktop. Unlike with a browser-based application, it is possible for users to read and open InDesign and InCopy documents direct from the application. By using web communication protocols, such as Websockets, the information shown in the application can be kept up to date in real time.

What does this mean for editorial and production staff?
-------------------------------------------------------

If editorial users have the correct authorisation, they can open and edit InDesign and InCopy documents straight from Editorial Production. While monitoring the print version of an article in the app, they can jump straight to the browser-based web publishing system and continue working there to publish it online.

The application shows the status of images that have been placed in an InDesign layout. Picture desk staff can monitor the status of an image while it is being worked on in Photoshop by the imaging department (to crop, enhance and optimise it for the layout). Picture desk and other editorial users can jump directly to the original image in the browser based picture desk/library application – perhaps to consider what other crops of the print image can be used for digital publishing.

Other groups of users can similarly find information that is relevant to them, but that comes from source applications they do not use themselves, all in a single app. This allows different groups of users to move back and forth between Editorial Production and the more specialised tools they need to do their job, whether those tools are professional desktop applications from the Adobe Creative Suite, or lighter browser-based applications developed in house.

From a technical perspective, all of this is achieved using modern web technologies to integrate legacy systems with classic web applications using an API-based approach. The details of this are beyond the scope of this article, but it’s worth noting that the applications that have been integrated are quite different in their architecture:

*   Off-the-shelf creative applications – Adobe InDesign, InCopy and Photoshop
    
*   Systems developed in-house by separate teams over a period spanning twenty years, coded using anything from C/C++, Java to AngularJS, ReactJS; databases include Oracle, MongoDb and Postgres
    
*   Hosted in on-premise data centres and in the cloud (Amazon Web Services)

The technologies used to bring them together are:

*   Electron, HTML, CSS, AngularJS and Websockets at the front end
    
*   Node.js, ExpressJS, NGINX and Websockets to create API services at the back end
    
*   Some back-end code written in C/C++ for performance reasons and to integrate with legacy systems

Of course the creative staff that use Editorial Production are probably blissfully unaware of these complexities, and simply enjoy the fact that the application helps them do their jobs efficiently and accurately without distracting from their creativity.

And that’s exactly how we like it.
