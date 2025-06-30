---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2010-dec-23-microapps-widgets'
headline: 'Microapps and the Art of Widget Maintenance'
date: '2010-12-23'
authors: [Dan Catt]
standfirst: 'The rather strange practice of killing your own servers by pointing Guardian traffic at them, and how not to let that happen ... otherwise known as what I learnt about caching in a very short space of time'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/12/3/1291394449240/00-this-bit.jpg'
  alt: 'MicroApp over here!'
  credit: 'Photograph: guardian.co.uk'
tags: [Apps, Computing, Internet]
---

A few weeks ago we rolled out a small update to the website, with luck you didn't notice. Up there is the screenshot, I've added a subtle label to help too!

The bit the arrow's pointing to I'll call the **Widget** for simplicity's sake. It looks pretty much the same as the last one but now with the added Zeitgeist tab instead of the Comments tab of old. We haven't gotten rid of comments, we're just fiddling with them a bit and once all that's sorted they'll come back into the Widget.

So far, so good, so what's the difference? Well, it's about our new(ish)-way-of-doing-stuff called Microapps. Microapps allow us to place content from _other sites_ into our page ... but not in an iframe/javascript hacky type way, it's part of our [Open Platform](http://www.guardian.co.uk/open-platform). You can read [more about microapps over here](http://www.guardian.co.uk/open-platform/what-is-the-microapp-framework). Of course to make sure it all works, we've been testing it with our own content first.

Anatomy of a Microapp
---------------------

For a microapp to appear on the page you need to have somewhere for it to appear, rather like this ...


   <figure>
   <img alt="Widget Blank this time" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/3/1291392974252/02-this-bit-again.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=cb4fb027446c255ff2206686d6a24799" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

The template for this page, a "section front" page, has been told to expect a microapp component to appear in that space. Should things go horribly wrong and the Microapp breaks – which of course it won't, hahahahah – then the space collapses down as though nothing had happened and everything else just carries on as normal.

Now for the smart part – where does the information for the microapp come from? Well, _anywhere_!

Should **you** have something particularly newsy that you think should appear on pages on the Guardian, then just get in touch, go through several meetings, sign some papers, a few more meetings that probably involve lawyers ... and if everyone by the end of that agrees it's all a good idea then you set up your server ready to serve the content to appear on the page and it's ready to go.

It'd probably look like this, in an iconic representation anyway ...


   <figure>
   <img alt="Sad Server :(" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/3/1291393006478/03-sad.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=1444eddd0ca00b77f6ef2b643fc0ac15" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

The Guardian gets lots and lots and lots of page views each second, sending all those request to your server (or whatever the target server happens to be) would probably be bad for at least two reasons.

*   The page load times on the Guardian would be dependant on the remote server
*   It'd probably kill the remote server.

[Cache-Headers](http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html)

_fresh_


   <figure>
   <img alt="Happy Server :)" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/3/1291393066432/04-happy.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=5e3db7806a33cdd1769b79b830871481" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

This allows the owner of the remote server to control just how fast we kill it instead. Then the fine dance around _freshness_ can start. There's no point caching information for two hours at a time, if the data to display is supposed to be updated every five minutes for example. But maybe you can get away with caching "real-time" information for 30 seconds if it stops your server falling over.

Back to our case study
----------------------

Right, so we have the Zeitgeist. You can read all about how that works over here: [Behind the curtains of Zeitgeist, the Open Platform, APIs and Google App Engine](http://www.guardian.co.uk/open-platform/blog/behind-the-curtains-of-zeitgeist). But in short, it tracks what stories are "hot", but in a slightly different way to "Most Viewed", in that it's tracking conversations happening around the internet and not just the raw numbers.

This is all done using [Google's AppEngine](http://code.google.com/appengine/), a service from Google that allows you to host code in "the cloud". The theory being that it can scale up as needed and shouldn't die ... which is nice.

So how did that work out for the Zeitgeist? Well, we started by turning the new widget on for all _article_ pages. Which get a huge amount of traffic, here's the graph showing what happened to the server...


   <figure>
   <img alt="Caching, you're going it wrong!" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/3/1291393096924/05-hits.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=ac3099813bb100b04f91b13e0f3a8be0" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Over on the left you can see the calm before the storm, the nearly flat line is the widget sat on the staging server, just before deploying it. The first, relatively tiny peak, not that one, the one just before it, at just under 0.200 request/second is everything getting loaded into the microapp cache.

The "Ooops", is because there were extra sections in the Guardian that the Zeitgeist didn't have information about, such as [Guardian Extra](http://www.guardian.co.uk/extra). When the page was asking for the "Top Viewed" in the Extras section the backend didn't have any information and returned an error (for various dull technical reasons that was a conscious decision). Because the microapp cache doesn't cache the error, the backend was being asked for data each time someone visited the extras section.

With a quick fix rolled out everything calmed down a tick ... also just under 1 request per second isn't exactly panic-stations _anyway_ which means the microapp cache is basically doing its job.

However, I was still seeing these _spikes_ every 15 minutes. Because the Guardian is visited constantly, each section (News, Music, Books, Sport etc) is always being loaded by someone somewhere, the pages were always going into cache and expiring from cache at the same time. So every 15 minutes everything would fall out of the microapp cache which would ask for all of them at the same time.

Here's an improvement...


   <figure>
   <img alt="O Hai Caching" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/3/1291393144646/06-graph.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=c37e59c075d33fe6de5ccd6d6c72cd69" loading="lazy" />
   <figcaption>
     undefined
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

... after leaving the code long enough to produce a nice looking graph ... I mean, you don't want to fix these thing _too soon_ if there's a good chance they'll make good image for blog posts later ;) ... I then set a separate staggered cache time for each section of the site.

At the right hand side of the graph you can see where the Cache spikes start to go out of sync, until further to the right everything looks nice and calm ... rather like gentle ocean waves.

The wrap up
-----------

Right, so, in short, the Guardian's new(ish) microapp framework and microapp cache allows us to put content developed by third parties onto the site. Because when each page asks for the microapp content it passes over its own context the microapp can serve different content based on the current section and so on.

This is all part of the Guardian [mutualisation](http://www.guardian.co.uk/media/2010/jan/25/cudlipp-lecture-alan-rusbridger) plans, to not only allow our content to spread out across the web (via our APIs), but also to allow other peoples content to show up on our site. Preferably without killing their servers though.

And if you do end up creating content to appear on these pages, then the microapp cache is your friend, but you'll still need to do some thinking and planning on your end to make the most out of it.
