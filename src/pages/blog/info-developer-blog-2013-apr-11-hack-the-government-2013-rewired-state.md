---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-apr-11-hack-the-government-2013-rewired-state'
headline: 'The Guardian attends Hack the Government 2013 with Rewired State'
date: '2013-04-11'
authors: [Lindsey Dew, Max Harlow, Jenny Sivapalan]
standfirst: 'Some of the Guardian’s software development team attend the annual event exploring government data and creative uses of technology'
image:
  url: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/4/11/1365689310738/rws.jpg'
  alt: 'A crowd of people ready to start Hack the Government 2013 with Rewired State'
  credit: 'Photograph: Rewired State'
tags: [Data journalism, Government data]
---

Last Saturday was the fifth national “[Hack the Government Day](http://rewiredstate.org/hacks/national-hack-the-government-2013)”, organised by [Rewired State](http://rewiredstate.org/). The idea is to bring together civic-minded technologists to create prototypes, visualise trends and develop ideas that make sense of the huge amount of government data that gets published. Three of us from the Guardian’s software development team went down to see what we could do to code a better country.

Much of what is produced by the government is brought together by [data.gov.uk](http://data.gov.uk/), which has over 9,000 data sets from all central government departments, as well as other public sector bodies and local authorities. This was the starting point for our hack.

<hr>
              <hgroup>
              <h4>What is hack the government?</h3>
              <small>The idea is to bring together civic-minded technologists to create 
prototypes, visualise trends and develop ideas that make sense of the 
huge amount of government data that gets published. Three of us from the
 Guardian's software development team went down to see what we could do 
to code a better country.</small>
            </hgroup>
            <hr>
    

Our first challenge was coming up with a good idea that could be produced within the space of a few hours. To do this, you really need to know what specific information is available – and with such a gigantic amount being published, just understanding what could be used is a challenge in itself.

Once we found some data we wanted to use, our next hurdle was to get this data into a format that our application could process. While the government’s open data efforts have led to a huge amount of data becoming available, there currently seems to be little consistency in the format in which it gets published. Our team, like others that day, spent much of our time trawling through spreadsheets and PDFs trying to find interesting data that could be used quickly.

A further difficulty comes in trying to compare datasets. For example, we ran into difficulties matching hospitals in a borough against spending data for the same region. For this to work, you need the datasets to contain matching IDs and cover the same time period. When looking at recent data, some of our ideal comparison datasets just weren’t available yet.

These are known problems and tools are being developed to help alleviate some of the difficulties. In our hack, we used [MapIt](http://mapit.mysociety.org/) to resolve postcodes to [GSS IDs](http://en.wikipedia.org/wiki/ONS_coding_system#List_of_codes_introduced_in_2011), which are widely-used within government datasets to identify geopolitical entities (as we found out when looking through spending reports).

Not straying too far from home, we ended up using data published by the Guardian’s own [Datablog](http://www.guardian.co.uk/news/datablog), which often contain tables and Google Docs spreadsheets that can easily be exported to a CSV, which we then [translated into JSON](https://github.com/darwin/csv2json) for our application to use.

Despite our last-minute success in getting a working hack together, we failed to submit our idea in time to present (top tip for next time – follow the rules!). However, we were very interested to see how other people got on. Everyone was given three minutes to present their hacks.

[Hacks](http://hacks.rewiredstate.org/events/nhtg-13) ranged from fun ([Whack-an-MP](http://hacks.rewiredstate.org/events/nhtg-13/whack-an-mp), based on the game Whack-a-Mole, where least-engaged MPs were easier to hit) to the more poignant ([Hospi-Cats](http://hacks.rewiredstate.org/events/nhtg-13/hospi-cats), which visualised how many hospitals are due to close or have closed via pictures of unhappy cats). An [impressive and heavily data-crunched hack](http://hacks.rewiredstate.org/events/nhtg-13/hillsborough-unlocked) translated thousands of Hillsborough documents and created a search index. Our favourite hacks included [Don’t Eat There](http://hacks.rewiredstate.org/events/nhtg-13/dont-eat-there) which combined the [Food Standard Agency](http://www.food.gov.uk/), [Foursquare](https://foursquare.com/) and [Twilio](http://www.twilio.com/) to notify the user to not eat at a restaurant if it is terrible. We also appreciated the [Universirator](http://hacks.rewiredstate.org/events/nhtg-13/universirator), which linked university courses and starting salaries upon leaving – a useful guide for those going to university next year!

Lessons learnt which we will take away for next time:

*   Submit your hack in time
    
*   Research your data -- know what’s available and how easy it is to process
    
*   Don’t upgrade from Scala 2.9.2 to 2.10 ten minutes before you present
    
*   Tweet the right hashtag
    
*   The Guardian’s data store is really good for hacks

Thanks to Rewired State for organising the event – and for all the free food. We all had a lot of fun, and though we’re pretty sure our hack won’t irreparably damage the coalition and fix the economy, we’ll try again next year…
