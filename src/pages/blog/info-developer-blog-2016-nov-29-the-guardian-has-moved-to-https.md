---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-nov-29-the-guardian-has-moved-to-https'
headline: 'The Guardian has moved to HTTPS🔒'
date: '2016-11-29'
authors: [Mariot Chauvin, Huma Islam]
standfirst: 'Discover why and how the Guardian has moved to HTTPS, the secure version of the web protocol that helps to protect user privacy'
image:
  url: 'https://media.guim.co.uk/2078dce15650e3a846bbfbb944cc5175ba1dfa0f/0_227_5760_3456/5760.jpg'
  alt: 'Drawn lock in front of java code screenshot'
  credit: 'Photograph: Yuri Samoilov'
tags: [Media, Privacy & the media, SEO, Web browsers]
---

Our content has now been served over [HTTPS](https://en.wikipedia.org/wiki/HTTPS) for two months and we thought it was time to share some of the reasons, processes and challenges behind the project.

The reasons for our move
------------------------

  
**Privacy**

By using HTTPS, internet service providers (ISPs) [are not able to track](https://utcc.utoronto.ca/~cks/space/blog/web/ISPsAreThreats) the pages our readers are accessing. It means we protect the privacy of our readers when accessing content that may disclose political opinions, faith, sexual orientation or any information that may be used against them. It matches our core values. We believe that protecting our visitors is good internet citizenship.

**Security**

Once on HTTPS, we prevent malicious third parties from inserting code into our site, or tracking what our visitors are doing.

**SEO**

It also gives us other benefits such as a potential increase in search results. For the reasons mentioned above Google [has announced that it will favour https content](https://webmasters.googleblog.com/2015/12/indexing-https-pages-by-default.html). It is also helping us decipher traffic from secure and ‘unknown’ referrers.

**Content authoring and integrity**

By switching to HTTPS, browsers will ensure that the content displayed is actually published by the Guardian. Without HTTPS someone between the browser and our website could maliciously display other content or alter our content.

**New features**

It allows us to take advantage of emerging technologies, such as [service workers](https://www.theguardian.com/info/developer-blog/2016/aug/19/how-we-made-the-riorun-progressive-web-app), web notifications, ‘add to homescreen’ prompts and offline web pages. This is critical to developing relationships with audiences who are either unable to, or choose not to download the app, such as the majority of audiences in South America or India.

**Revenues**

Network and internet providers will not be able [to inject ads](http://arstechnica.com/tech-policy/2014/09/why-comcasts-javascript-ad-injections-threaten-security-net-neutrality/) and profit from the Guardian’s content without the Guardian being reimbursed.

Why has this taken so long?
---------------------------

**Editorial challenges**

We had several specific challenges in front of us:

*   avoiding negative audience and revenue impacts

For a long time [ad agencies and ad exchange networks have not adopted HTTPS](https://rrees.me/2014/04/27/why-dont-online-publishers-use-https/), jeopardising revenues of any free mainstream website willing to switch to HTTPS. Despite [Google’s willingness and actions on this subject](https://security.googleblog.com/2015/04/ads-take-step-towards-https-everywhere.html) there was a risk of having a negative impact we could not afford.

*   continuing to allow embeds to be inserted in articles

Our articles often contain various external components such as YouTube videos or tweets. For each of them we had to find a way to embed them securely or another solution if the providers did not support HTTPS.

*   keeping our older interactives working

[Interactive content](https://www.theguardian.com/interactive) is created differently to our standard articles with a lot of variation in technologies used over the years and without HTTPS being a concern at the time.

**Approach & techniques**

The migration was such a big change that it was not possible to highlight all the problems at the beginning of the project, nor find a solution on paper for each of them. We had to work iteratively and solve these issues as they arose.

To overcome those challenges rather than draw a big plan we decided to [defeat in detail](https://en.wikipedia.org/wiki/Defeat_in_detail):

*   Migrate one small audience section to HTTPS
*   Identify the problems and track them
*   Fix the problems that need to be fixed before the next section migration


   <figure>
   <img alt="Evolution of The Guardian HTTPS traffic" src="https://i.guim.co.uk/img/media/e1b8bfd3c3bb237bf2e7d09cab286926846ecd47/0_0_2164_1094/master/2164.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=9725745565973e877fa1e40b38873f3e" loading="lazy" />
   <figcaption>
     Evolution of The Guardian HTTPS traffic
    <i>Illustration: GNM</i>
    </figcaption>
    </figure>

One advantage of this strategy is that it enabled us to detect real problems rather than discussing hypothetical ones and improve our confidence step by step.

We have complemented this approach with 3 techniques:

*   Monitoring

We closely monitored audience numbers, revenues, [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) warnings and errors after each section migration.

*   Decoupling backends and frontend migrations

We migrated our backend systems before the frontend. Our [content API](http://open-platform.theguardian.com/documentation/) was returning HTTPS links for all content ahead of time and we updated our internal tools and integrations to support the new scheme at an early stage. By doing this we ensured that any problems we found as part of a section migration to HTTPS were limited to the website itself and could be identified quickly.

*   Usage of early adopters

We added the ability for users to enable the entire website to HTTPS. We offered this ability to readers willing to report issues and [encouraged our engineers to enable this feature](https://en.wikipedia.org/wiki/Eating_your_own_dog_food). We enabled us to discover several issues before they were seen by end users. At the same time we ensured that our journalists were shown this secure version of the site when previewing content. This allowed us to capture any further unknown issues and find solutions to problems early on.

How did we technically migrate?
-------------------------------

  
**Conditional redirection to HTTPS**

To enable a migration per section we have leveraged the capability of our [CDN provider](https://www.fastly.com/) to write easily and apply very fast redirection rules based on the path of the request (our path contains the section of an article).

We used this, not the [upgrade-insecure-requests](https://www.w3.org/TR/upgrade-insecure-requests/#upgrade_insecure_requests) option for two reasons. Most importantly, this feature was (and is currently still) not [supported by enough browsers](http://caniuse.com/#feat=upgradeinsecurerequests). Secondly the specification is [quite complex](http://stackoverflow.com/questions/31950470/what-is-the-upgrade-insecure-requests-http-header) and [interaction with HSTS](https://www.w3.org/TR/upgrade-insecure-requests/#hsts) was not crystal clear to us and HSTS was our final goal. This meant that, sadly, the _upgrade-insecure-requests_ feature was not useful to us in practice.

**[Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) with report only**

[This feature](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) has enabled us to log all mixed mode warning and errors and analyse them later. Passive content was still displayed, so minimising impact for the end users. We switched to _block_ only recently when we were confident there would be almost no impact.

**Rewriting of old content**

To migrate historic interactive content we wrote a simple script to update a predefined list of urls to HTTPS. We migrated most of the interactive archive using this tool before enabling HTTPS on them.

**HSTS header**

The [HTTP Strict-Transport-Security response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) lets a web site inform the browser that it should never load the site using HTTP and should automatically convert all attempts to access the site using HTTP to HTTPS requests instead. It is intended to protect against [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) such as [SSL stripping](http://www.blackhat.com/presentations/bh-dc-09/Marlinspike/BlackHat-DC-09-Marlinspike-Defeating-SSL.pdf).

We added this header at the very end of the migration after all sections were redirected to HTTPS, which meant we were extremely confident that adding the header would not have any negative impact.

**Removal of short urls**

Before [Twitter stopped counting url characters](https://blog.twitter.com/2016/doing-more-with-140-characters) and [forced all urls to be shortened by its own service](https://support.twitter.com/articles/109623) short urls had a utility. This is no longer the case. Our short url implementation also had a negative impact on latency as it was forcing the browser to perform three redirects. This is [clearly something you want to avoid with HTTPS](https://www.keycdn.com/blog/https-performance-overhead/), so we simply [decided to stop using them](https://github.com/guardian/frontend/pull/13568).

Acknowledgements
----------------

  
This outcome is the result of great collaboration between our editorial, commercial and digital departments. We would like to thank every individual that has been involved in this work and will leave the final word to David:

> **When I uttered the words “what are the challenges of making our website wholly https?” back in 2013 I knew that things were not straightforward. I could only have guessed at the actual complexity. At least everybody agreed it was actually a good thing we should aim to do with the Snowden revelations at the time, but this was not like setting up a site from scratch. The benefits of moving to HTTPS and ultimately HSTS were understood. Extending users extra privacy from monitoring and engendering trust from authenticity of the site are all not only good security practice but elements of building a better relationship with your consumers. The other contributors to this blog will explain far more eloquently then me, but essentially we have almost built from scratch by migrating hosting and CMS components all in the past 3 years. The site you see now is triumph of design and effort. Well done to all involved.**
> 
> David Boxall, Head of Information Security at Guardian News & Media
