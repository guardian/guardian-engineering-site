---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-feb-25-introducing-wraith-donk'
headline: 'Introducing wraith-donk'
date: '2014-02-25'
authors: [Gideon Goldberg]
standfirst: 'We’ve taken the BBC’s responsive screenshot comparison tool Wraith and put a donk on it!'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/20/1392915799521/fe5f2bbe-069e-4877-9966-d62c001bb0db-1024x768.png'
  alt: 'A Wraith gallery of the Guardian responsive site'
  credit: 'Photograph: Guardian'
tags: []
---

Background
----------

Back in July 2013 the BBC released the command line based screenshot comparison tool [Wraith](https://github.com/BBC-News/wraith). It is a mash-up of a number of existing tools ([ImageMagick](http://www.imagemagick.org/), [PhantomJS](http://phantomjs.org/) with a dash of [Ruby](https://www.ruby-lang.org/)) which makes comparing versions of responsive websites using screenshot comparison techniques a cinch.  
That’s great but in order to integrate it with our developers’ workflow and build pipeline we had to wrap it in something that could be deployable in a Ruby Gem and be accessible by hitting a URL. So we came up with [wraith-donk](https://github.com/guardian/wraith-donk); a simple web server for Wraith. We think the workflow for using it is easy peasy, plus it’s trivial to include in any build pipeline that accepts a URL as a trigger (but currently it’s non-blocking and non-breaking):

Workflow
--------

*   Set up the config file with appropriate values for your website DEV and PROD environments and a mail server to send notifications

In the project.yaml file, first set the target browser and device.

Then set some project paths.

Next, define the breakpoints of your responsive design and your DEV and PROD URLs.

Finally define the level of fuzziness that will trigger a notification email and the email SMTP server that will do the honours.

Here is one we made earlier:

```
#Headless browser option
browser:
  webkit: "phantomjs"
  # gecko: "slimerjs"

device:
  base: firefox
  compare: firefox


#If you want to have multiple snapping files, set the file name here
snap_file: "snap.js"

# Type the name of the directory that shots will be stored in
directory:
  - 'public/frontend'
# Add only 2 domains, key will act as a label
domains:
  prod: "http://www.theguardian.com"
  code: "http://m.code.dev-theguardian.com"


#Type screen widths below, here are a couple of examples
screen_widths:
  - 320
  - 740
  - 980
  - 1300

#Type page URL paths below, here are a couple of examples
paths:
  article: "/politics/2014/feb/13/ministers-two-two?view=mobile"
  liveblog: "/environment/2014/feb/20/are-humans-causing-more-sinkholes?view=mobile" 
  gallery: "/duracell-power-me/gallery/geocaching-in-pictures?view=mobile"


#Amount of fuzz ImageMagick will use
 fuzz: '20%'

#Set the number of days to keep the site spider file
spider_days:
  - 10

#WraithDaemon
wraith_daemon:
  report_location: "http://your-wraith-donk-server:8080"
  notifications:
    enabled: true
    smtp_host: "your.smtp.server"
    to: "notification@example.com"
    from: "notification@example.com"
    subject: "Wraith done"
  port: 7777






```

*   Fire up the server and hit the wraith-donk URL  
    ....make a cup of tea...
*   If there is a significant difference between DEV and PROD environments, wraith-donk will write you an email to let you know and provide a link to the results gallery which you can peruse at your leisure


   <figure>
   <img alt="A notification email from wraith-donk" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/2/24/1393242514324/da7d898b-3909-4b0a-8c9b-35ff513da885-bestSizeAvailable.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=be13e57ec6f100e9b37f495147e514de" loading="lazy" />
   <figcaption>
     A notification email from wraith-donk
    <i>Photograph: Guardian</i>
    </figcaption>
    </figure>

Wraith-Donk, I mean seriously, what does that even mean?
--------------------------------------------------------

There is a [musical genre](http://www.vice.com/en_uk/read/put-a-donk-518-v16n2) based on the theory that any song can be improved with the addition of a Donk, this is [defined by Urban Dictionary](http://www.urbandictionary.com/define.php?term=put%20a%20donk%20on%20it&defid=3362031) thus:

> to add a repeating ‘donk’, or ‘clunk’ sound (onomatopoeic) to a piece of music when writing or remixing it, typically on the offbeat,characteristic of bassline/scouse house/niche & NRG.

The _Blackout Crew_ came up with a song to illustrate this called: ‘Put a Donk on it’

<figure>
                <iframe class="video" src="https://www.youtube-nocookie.com/embed/ckMvj1piK58?wmode=opaque&feature=oembed" title="Blackout Crew - Put A Donk On It" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

So we believe that just as any dance tune can be improved with a bangin’ donk, any Wraith implementation can be improved with the addition of wraith-donk.  
_  
Credits: Development on wraith-donk was done primarily by [Márton  
(meza) Mészáros](https://twitter.com/vsbmeza) and Rex Cooper working with the Next Gen Web team. The name was my idea..._

_Updated 24th March 2014 to reflect the fact that 'Put A Donk On It' [did not originate](http://www.vice.com/en_uk/read/put-a-donk-518-v16n2) in the film Le Donk & Scor-zay-zee._
