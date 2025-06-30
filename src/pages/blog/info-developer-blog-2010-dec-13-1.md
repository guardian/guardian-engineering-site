---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2010-dec-13-1'
headline: 'New ''British soldiers killed in Afghanistan'' interactive with Javascript'
date: '2010-12-13'
authors: [Steve Uprichard, Martin Hearn]
standfirst: 'We''ve built a new interactive detailing the the British soldiers who have lost their lives in Afghanistan'
tags: []
---


   <figure>
   <img alt="afghanistan interactive" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/11/29/1291044219130/db_afghanistan_interactive.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=889979fd13f0cef39cca749e46f3ee2a" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

  
We've built a new interactive detailing the [British soldiers who have lost their lives in Afghanistan](http://www.guardian.co.uk/world/interactive/2010/dec/06/afghanistan). This was originally planned to be included in [Release 102](http://www.guardian.co.uk/info/developer-blog/2010/dec/03/1) but was unfortunately launched a little too late to be covered in the original blog entry.

Previously, a similar Flash-based application was launched but here we have recreated it using JavaScript and HTML for a couple of different reasons.

The original Flash version fetched data from an XML document. The updating process was fairly long-winded, requiring a developer to update the XML then upload it along with new images. Now, journalists can update a public Google Spreadsheet and use existing editor tools to upload appropriate images. They then publish the spreadsheet and the application fetches a JSON object from the spreadsheet's Atom feed on page load, resulting in live updates with no involvement from anyone on the development team.


   <figure>
   <img alt="Picture of spreadsheet" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/11/29/1291049882334/db_spreadsheet.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e7433bbce6b1b9e7944266fe2d01ec06" loading="lazy" />
   <figcaption>
     An example of the Google Spreadsheet data
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

As has been well documented, Apple refuses to support Flash in its mobile devices, citing issues with memory leaks and stability. An ever increasing number of Guardian users access content with mobile devices so, in an attempt to reach these users, some of the less complex interactives are being ported from Flash into HTML. The new version displays on Apple mobile devices and is currently undergoing further optimisation for all touchscreen devices to support touch events such as swipe and to use CSS media queries to allow different layouts with portrait and landscape orientations.


   <figure>
   <img alt="afghanistan interactive ipad" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/7/1291738366206/ipad_afghanistan.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3fed8e3c9e0212c34a164ca8f4a4b1e6" loading="lazy" />
   <figcaption>
     The interactive works on the iPad too
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

The JavaScript used is fairly straightforward; get data from the Atom feed and parse it to create the markup. We have a JavaScript carousel object which controls the pagination and use lazy loading to display the full size image of the soldiers to try and cut down on the number of initial HTTP requests. The jQuery autocomplete plugin is used for the client side search but required a bit of adaptation for our needs here – mainly because the search functionality doesn't use a submit button. Some further work is required here to better support touch devices.


   <figure>
   <img alt="afghanistan interactive search" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/11/29/1291044424441/db_afghanistan_interactive_2.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=847b817f7a82d6f9130b165bce00cba2" loading="lazy" />
   <figcaption>
     An example of client side searching
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

As with all Guardian content, the interactive works in all our supported browsers with a few minor concessions for visuals and performance in older versions of Internet Explorer.
