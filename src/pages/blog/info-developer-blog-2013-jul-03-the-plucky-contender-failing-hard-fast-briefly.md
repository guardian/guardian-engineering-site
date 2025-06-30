---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-jul-03-the-plucky-contender-failing-hard-fast-briefly'
headline: 'The Plucky Contender: on failing hard, fast and briefly'
date: '2013-07-03'
authors: [Cantlin Ashrowan]
standfirst: 'Some lessons learned by the Guardian''s software team on building (and fixing) digital systems quickly and confidently'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/7/3/1372862509864/concierge.jpg'
  alt: 'The bleeding-edge monitoring dashboard for a service we''re working on called "concierge". Ten minutes to write, one second to parse'
  credit: 'Photograph: Cantlin Ashrowan/guardian.co.uk'
tags: []
---

Yesterday I caved. I bought a [Lockitron](http://lockitron.com/). This is gadget mania gone mad. Friends, I don’t even have a compatible door I can attach it to. _I am going to have to buy a whole new friggin’ door for this thing_.

Their order process was borked when I tried to buy mine. My intelligent approach to this was to go for it again – _this time with gusto_. So now I had two useless accounts and no idea if I’d just authorized multiple payments for the same thing which in any case would probably never be dispatched.

“Email support”, they tell me. Yeah, right. As if that ever works. If I’m lucky it’s unmonitored. If not, fruitless discourse with a semiliterate drone and their service script. Whoopee.

That was yesterday. Today my accounts have been merged, my order is on track and my payment situation has been sorted.

The moral of this story?

Be a Plucky Contender
---------------------

Plucky contenders take their blows, they fall over, they get back up, and take a bow.

When we create software, most of us sink a good deal of time into making sure it works. Then we sink a whole bunch more time into making sure it doesn’t break. We write the good path, then the bad path, then a few hundred zany alt-universe paths that we know the terrifying few will invariably seek out.

I watched a presentation last week by our technical architects here at the Guardian. To paraphrase [Graham Tackley](http://www.guardian.co.uk/profile/graham-tackley): “I have been responsible during my tenure for writing an extraordinary amount of code aimed at making sure what I was writing could never, ever break. Now? I write the minimum code I need and I focus my energy on time to fix.”

Time-to-fix
-----------

The most glowing, self-worth-fattening praise you will ever get from anyone is the praise you get from someone after you fix a problem they had with your thing. You can do it customer service, and you can do it with code.

And: if you roll that fix out within an hour of them having that problem? Even if it was critical? _Even if it stopped them doing their job?_ They will go batshit crazy for you. They have lived all their lives in a world where “fixing the software” is something thought about in terms of yearly roadmaps and quarterly release cycles. [Agile](http://en.wikipedia.org/wiki/Agile_software_development) can and does blow people’s minds every day, and never more so than by optimising time-to-fix.

Of course, bad user experiences make unhappy users. But bad user experiences that become good customer service experiences make people so stupidly happy that they are going to go out and tell everyone they know how jaw-droppingly awesome you are.

Drink up the ugly
-----------------

To be able to break, you need a reasonable conversion rate between things breaking and you knowing about them.

You can’t fix what you haven’t noticed. We spend a lot of time [creating monitoring dashboards of all types](http://www.guardian.co.uk/info/developer-blog/2012/oct/04/winning-the-metrics-battle) for our software projects, but in spite of them it can be a surprisingly tricky thing to work out exactly _when_ our thing should be considered broken, and how we should be informed of that.

Probably you have an alerting system. The problem with alerting systems is that they almost invariably send way too many alerts. It’s something to do with the people who write alerting systems. Critical alerts, major alerts, minor alerts, alerts with their phasers set to stun, alerts who had a little bit too much to drink yesterday and aren’t quite sure who they are or where they came from. The list goes on.

Avoid saturation: choose one thing. Or less than three. Care about them a lot. Have clear states and know when they change.

Be your product’s biggest user
------------------------------

There’s a gigantic bucket of things that can go wrong that you’ll probably never get notified about, no matter how great your monitoring, alerting and test coverage.

Being the biggest user of your thing is the best thing you can do to to catch these. Your level of attention to detail is naturally high. And hey, you might even work out whether your thing is that great anyway.

Then, lose the fear
-------------------

Shipping code is _scary_. Deploys are _scary_. Users are _nasty_.

But if you can fix fast, you lose a lot of the inherent risk of shipping. Fast time to fix means fast deploys. Fast deploys mean fast rollbacks.

In summary:

**Fast time to notice + fast time to ship = fast time to fix**

**Fast time to fix = more deploys, calmer developers, happier users**

_This blogpost was originally posted on [Medium](https://medium.com/what-i-learned-building/4e1dad8e03d3)._
