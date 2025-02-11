---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-feb-18-how-the-guardian-successfully-moved-domain'
headline: 'How the Guardian successfully moved domain to www.theguardian.com'
date: '2014-02-18'
authors: [Matthew O''Brien]
standfirst: 'Six months on from the domain move to www.theguardian.com the Guardian is still experiencing record traffic. Matthew O’Brien, the software architect behind the domain move, explains how it was achieved with minimal effect on traffic'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/17/1392639567461/245c654e-3043-42c4-afeb-b337ac1a19ba-2060x1236.jpeg'
  alt: 'Beijing Traffic Policeman stands on a podium in the middle of the road directing traffic ca. October 1991 Beijing, China'
  credit: 'Photograph: Peter Guttman/  Peter Guttman/CORBIS'
tags: []
---

It has been six months since the Guardian moved domain from www.guardian.co.uk to [www.theguardian.com](https://www.theguardian.com/uk) and a technical explanation of the project is long overdue. I will leave [the reasons behind the project](https://www.theguardian.com/help/insideguardian/2013/jul/30/the-guardian-dot-com) to our Chief Digital Officer Tanya Cordrey, but I will offer my opinion that moving domain was certainly the right thing to do – especially if we wanted to recognise and engage further with [the 67.4% of unique browsers who are outside the UK](http://www.abc.org.uk/Certificates/18691748.pdf).

The goal
--------

Our goal was simple: “to serve all desktop and mobile traffic on www.theguardian.com and no longer serve any content on www.guardian.co.uk, m.guardian.co.uk or www.guardiannews.com, with as little impact on traffic as possible_”_. This also meant unifying our desktop and mobile sites under one domain. Any work which was not related to achieving this goal was put on a lower priority list until after the launch.

Even with this narrowed scope, the list of changes was enormous. Changes had to be made to our ad server, our analytics tools, third party integrations, syndication, our desktop and mobile sites, our [content API](https://www.theguardian.com/open-platform/content-api-content-search-reference-guide) and its clients, and our Identity and Discussion platforms. We had to consider robots and other consumers of our sites. We even had to change the URLs we published in our newspapers. The prospect was daunting. But despite this massive coordinated effort, the development team wanted to start releasing code into production from day one.

Development and release
-----------------------

I have never enjoyed [big bang launches](http://en.wikipedia.org/wiki/Big_bang_adoption). Experience tells me that software development does not need to be so dramatic or risky. I am not a fan of rollback strategies either. The development and the discussions around rollback strategies can take time and tend to focus teams on edge cases rather than the real goal. They can also make the process of writing code more complex. Instead, I prefer to recognise risks and come up with mitigations to lessen their potential impact. However, I accept that this may not hold true for all software development.

This project certainly had all the hallmarks of a big bang launch. On one hand our stakeholders wanted to launch the new domain for all our products on the same day. On the other hand our development team wanted to test their code in production immediately.

The solution was simple, we would release internally. Access to www.theguardian.com would be denied unless you had a special HTTP header set. This allowed anyone inside or outside the Guardian to immediately start testing the new domain by setting the special header using a browser extension. Our CDN provider [Fastly](http://www.fastly.com) made this HTTP header logic simple to implement because we could quickly write and deploy our own Varnish configuration to their servers.

At this point, however, all the URLs on the site still pointed to www.guardian.co.uk. We attempted to fix this by implementing relative URLs across our site, but a lengthy investigation proved that this would be more difficult than it should have been. Instead, we wrote a filter which detected the HTTP host header. If the host was www.theguardian.com, we would rewrite all the URLs on the site to be www.theguardian.com. If the Host was www.guardian.co.uk we would rewrite all the URLs on the site to be www.guardian.co.uk. This was a simple configuration change that swapped one domain for another, per request.

In parallel, the Mobile team, the Identity team, the Discussion team, the Content API team and the ads team all made sure that their products could support both domains. It was simple for them to test their changes in production too, using our special HTTP header. In fact, the Identity team started laying cookies on www.theguardian.com in advance. This was a nice touch because it meant that visitors would still be logged into the site when we eventually changed domain. We tried to implement this logic with any service that was hosted on our domain that required cookies to be set, e.g. analytics.

Working on a project with so many stakeholders and with such wide-reaching changes could have led to a form of paralysis that stopped the project from getting off the ground. However, by making our releases live immediately and accessible internally, the development team had inverted the traditional flow of pressure. We could continually petition the stakeholders by asking, “Can we make it live now?” rather than the more traditional model of stakeholders asking the development team, “Is it ready yet?”. This was a very healthy state to be in for everyone concerned.

We were constantly releasing code into production well in advance of the domain launch which gave us all a great deal of confidence. In fact, we could have launched at any time but we had yet to address the final part of our goal, the one which mentioned “with as little impact on traffic as possible”.

SEO, robots and referrals
-------------------------

The Guardian site receives a lot of its traffic via referrers. We had to make sure that those referrals continued to the new domain. We attempted to speak with all our major referrers including search engines and social media. We read their official blog posts and implemented their recommendations. We audited our sitemaps and HTML tags. We released any changes we made before the domain move so that we could see their effects in isolation. We improved our page speed ([time to first byte](http://en.wikipedia.org/wiki/Time_To_First_Byte)) by using [Fastly](http://www.fastly.com/)’s CDN. We wrote page crawlers which reported dead links or chained redirects and fixed them. In short, we set about removing as many obstacles to robots crawling our site as possible. We did all of this with a tremendous amount of help and direction from SEO expert [Joost de Valk](https://yoast.com/) and the Guardian’s excellent SEO team.

But in the end we still had no guarantee that these changes would help mitigate any loss of traffic from referrers. The effect of the domain change was still unknown.

Analytics
---------

If you were to walk around the Guardian offices you would see real time graphs and analytics displayed on screens near every bank of desks, from editorial departments to digital development. We have multiple tools that let us know exactly what is happening on our site and we can overlay this data with what happened yesterday, or this time last week, minute by minute.

In addition to these existing analytics tools, we also wrote tools which parsed our log files for robot activity in real time and displayed the results on-screen. In general, robots do not execute JavaScript, which is why we had to resort to parsing logs. This proved to be invaluable to us. If any of our referrers’ robots were acting differently on our new domain we could respond quickly and appropriately.

Launch
------

  
Our first task on launch day was to check the news. We do this all the time anyway, however no-one had the desire to launch something so risky if there was a major news event happening. All of our code was already live and tested and we only had a very small set of steps to complete. We removed the redirect ([302 HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.3)) from www.theguardian.com to www.guardian.co.uk and for a short time both domains coexisted. We did some final checks, then redirected all traffic with a [301 HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.2) from www.guardian.co.uk to www.theguardian.com. We then sat back and watched our graphs as our traffic flowed from the old domain to the new. The technical work was complete.

  
We did see a small percentage dip in traffic which we had anticipated. Over the next few months we worked hard on increasing growth and we still continue to do so. But six months on, we are still experiencing record traffic. Despite the initial short-lived dip in traffic, the project was an overall success and has not interfered with the Guardian’s continual growth.

  
_This blog post was updated on Wednesday 19th February 2014. The change was made to make it clearer about which cookies were being set on the www.theguardian.com._
