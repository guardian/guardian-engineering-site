---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-18-what-we-learnt-from-our-mistakes-in-2016'
headline: 'What we learnt from our mistakes in 2016'
date: '2016-12-18'
authors: [Gareth Trufitt]
standfirst: 'In 2016 a few things went wrong when building theGuardian.com. Lets take a look at some of the slip-ups and what we learnt from them so you can avoid our mistakes'
image:
  url: 'https://media.guim.co.uk/0e93e4a94887da1d528313fdb117a3ebb35ad9a5/151_0_2379_1428/2379.jpg'
  alt: 'The Guardian website after breaking in Safari'
  credit: 'Photograph: The Guardian'
tags: [Advent developer blog 2016]
---

[Moving fast shouldn’t mean breaking things](https://www.explainxkcd.com/wiki/index.php/1428:_Move_Fast_and_Break_Things), but [Facebook’s old mantra](https://www.cnet.com/uk/news/zuckerberg-move-fast-and-break-things-isnt-how-we-operate-anymore/) often reflects the realities of a rapidly evolving codebase and infrastructure. The Guardian’s development culture is designed to allow us to move quickly, deploy a dozen times a day and get statistically-significant A/B test results within hours.

Sometimes, though, that leads to the odd slip up.

In this post I’ll lay bare just a few of the mistakes we made and more importantly, the lessons learnt and remediation we took to avoid the problems in the future.

The liberal voice goes back in time
-----------------------------------

The internal reports were quick to arrive. Old features were appearing and new ones disappearing. Components were reverting themselves to old designs. The ‘something broke’ siren starts blaring (not really).

At the time, we deployed using a CLI called the ‘goo tool’ which took an optional build number to deploy to production. It deployed the suite of applications that make up the Guardian website, which at the time was not possible through [Riff Raff, the Guardian’s deployment tool](https://github.com/guardian/riff-raff).

**What happened?**

We had made the straightforward mistake of running the ‘deploy to production’ command with an incorrect build number, and deployed a build that was about a month old. This meant the site was using old CSS and JS, features from the last month disappeared and, in some cases, a mis-match of model’s data sources began to cause errors.

**Lessons**

**Display the current status of a tool clearly and warn a user if they’re about to do something dangerous.**

A short term fix was deployed to the goo tool to warn a user that they were trying to deploy an old build. The longer-term fix has recently gone out to Riff Raff to allow developers to deploy ‘groups’ – removing the need to deploy via goo tool and giving clearer feedback on previous deployments.

Documentation as configuration
------------------------------

It started with every developer’s favourite category of bugfix – CSS layout. The headlines were displaying one character a line in older Safari versions, making for a somewhat frustrating reading experience for some users.

The Guardian website uses [autoprefixer](https://github.com/postcss/autoprefixer) to apply prefixes based on a [browserslist](https://github.com/ai/browserslist#config-file) in the root of the project. The browserslist file looks like this:


   <figure>
   <img alt="Browserslist file, contains 'browsers that come under modern' - including Firefox >= 26, Explorer >= 10, Safari >= 5, Chrome >= 36, iOS >= 5, Android >= 2, BlackBerry >= 6, ExplorerMobile >= 7, > 2% in US, > 2% in AU, > 2% in GB" src="https://i.guim.co.uk/img/media/fa20225bae12a8687f629219b87ea5a3f56b45d1/0_1_1014_608/master/1014.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d5bd17bff967233d20103e5f8c055dad" loading="lazy" />
   <figcaption>
     The Guardian’s browserslist file
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

**What happened?**

At a slight loss as to why this was happening, we reviewed the day’s PRs – eventually discovering that the browserslist file had been removed. This meant Safari was no longer getting the prefixed flexbox styles.

The file was removed because it was mistakenly deemed a duplication of existing browser support documentation and diligently deleted in an attempt to keep the house tidy.

**Lessons**

Sometimes configuration files needs to look like configuration. More accurately, configuration files should attempt to follow consistent standard approaches. For example, it may have been clearer that browserslist was configuration if it was dotfile.

In our case, we [moved the browser support config](https://github.com/guardian/frontend/pull/14022) into the file that used it which made it more contextual and less ‘magic’. In the future, we may have multiple build plugins that require this standard browser support format, in which case we would review the browserslist format, adding clearer commenting about what it does and possibly pre-push checks to ensure it still exists.

// Test even the smallest changes
---------------------------------

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/AMPhtml">@AMPhtml</a> <a href="https://twitter.com/guardian">@guardian</a> Tut Tut- &#39;TODO&#39; comments in a live environment <a href="https://t.co/eg1gxN3kW9">pic.twitter.com/eg1gxN3kW9</a></p>&mdash; rohit (@romiem) <a href="https://twitter.com/romiem/status/779217954105942016">September 23, 2016</a></blockquote>


  
**What happened?**

We made a change to an analytics file but forgot to check the AMP pages to see if the comment that was added had caused any issues. It then showed up as plain text at the top of all AMP pages.

**Lessons**

**Linting:** Following this whoopsie we investigated the feasibility of running linting over our Twirl files (Play framework’s templating system). Added to the ‘// TODO’ list.

**Visual regression testing:** We’ve now implemented the initial work of spinning up instances with our PR builds and [built a simple screenshot tool](https://github.com/guardian/frontend/pull/15217) that will allow us to provide a simple visual check on all PRs. In the future, this will enable more in-depth visual regression testing or running screenshots on the pages affected by specific template changes.

**Finally, remember to always check your work:** No matter how small your change you’re probably breaking something somewhere...

Curtail the serve stale
-----------------------

“The cache will save us” we said as we began to investigate the cause of a sudden ramp up in 500 errors. And it did... until an attempt to fix a knock-on issue ended up hard-purging the CDN cache bearing our 500 errors to the world.


   <figure class="supporting">
   <img alt="The Guardian 500 error page" src="https://i.guim.co.uk/img/media/0d39508784becb914ee0a8a24153f3fde3591ced/0_68_1924_1154/master/1924.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=dab80335fdc1e5d3de88db9039f99363" loading="lazy" />
   <figcaption>
     The Guardian 500 error page
    <i></i>
    </figcaption>
    </figure>

**What happened?**

We had deployed something that was causing a 500 in the backend but because our CDN is setup to serve stale content when the origin servers return an error, readers were none-the-wiser to the problems at that point.

Unfortunately, because this looked like a cache problem to a support team, there was an attempt to de-cache the homepage. They used an internal tool to force the homepage to show the latest content by clearing the cache.

The cache-clear tool, at the time, did not check origin before de-caching a page but immediately removed the page from the CDN, meaning that we could no-longer serve stale content and began serving users 500 errors.

**Lessons**

The root cause of this issue was our deployment process not deploying an application that was required to be in sync with another application.The fix was to always ensure they’re deployed together.

However, there were a number of other lessons around our processes and tools:

*   **Communicate quickly and clearly.** Both developers and the support team were not forthcoming enough with communicating that there was an issue. We have email lists and slack channels in place and now everyone understands who needs to know and how to notify them as soon as an issue is identified.
*   **Have a way to check the uncached page.** Make sure support teams can check a page directly on the origin server without the CDN in between.
*   **Make sure your tools aren’t too powerful.** We’ve updated the cache-clear tool to check the origin server before allowing the removal of a page from the cache and to give the user more information about the health of the page.

Keep calm and learn your lesson
-------------------------------

Sometimes it can feel apocalyptic when things go wrong but the majority of these issues go unnoticed by our users.

The Guardian website is stateless, allowing heavy caching on our CDN. We ensure we have robust client-side code and use [exception catching wrappers](https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/utils/robust.js) to failsafe our javascript bootstraps. We report JS errors to sentry and back-end errors to cloudwatch and pagerduty which notifies us quickly of problems. Engineers receive emails from the website feedback form directly in our inbox, users can contact our fantastic user help team and internal users can rely on our equally fantastic central production team to direct problems where they need to go.

All the above ensure that when things do go wrong we know and can fix them before most of our readers notice a problem. Each thing that breaks is something that can improve the robustness of our tools, processes and infrastructure.

All in all, we too aspire to Facebook’s new mantra: “Move Fast With Stable Infra”.
