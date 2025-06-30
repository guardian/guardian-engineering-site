---
layout: ../../layouts/blog.astro
slug: 'info-2022-mar-25-react-islands-on-theguardiancom'
headline: 'React islands on theguardian.com'
date: '2022-03-25'
authors: [Oliver Lloyd]
standfirst: 'We first started adding the islands pattern to the Guardian’s website in 2019. It’s now 2022 and the benefits are not what we expected.'
image:
  url: 'https://media.guim.co.uk/4c1e31f56cab0d4bc8b665200bc8bcd894eb612b/0_2_1172_703/1172.jpg'
  alt: 'A React component implementing the islands pattern on theguardian.com'
  credit: 'Photograph: GNM'
tags: [React]
---

The first pull request \[PR\] to implement React islands on theguardian.com was opened in 2019 when our [migration to React](https://www.theguardian.com/info/2019/apr/04/revisiting-the-rendering-tier) had barely started. Today, our new React rendering platform, [Dotcom Rendering \[DCR\]](https://github.com/guardian/dotcom-rendering/), serves 100% of all article content and we’re now working on our third island implementation.

React islands is the name for [the pattern](https://www.patterns.dev/posts/islands-architecture/) where, instead of hydrating the whole page (taking the static HTML the server gives to the browser and making it interactive), you target small, isolated sections making just those interactive, leaving the rest of the page as it was. This is a good approach for two reasons - our pages are mostly static and require only the occasional embed or API call using JavaScript, and because it reduces the amount of JavaScript that needs to be downloaded by browsers.


   <figure class="supporting">
   <img alt="Illustration showing the islands pattern on theguardian.com" src="https://i.guim.co.uk/img/media/4d9ed479119a84b0dc57f2734e63b510c9c843f8/68_63_735_912/master/735.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2ba91681cb359e103646e6261c47a17b" loading="lazy" />
   <figcaption>
     Illustration showing the islands pattern on theguardian.com
    <i></i>
    </figcaption>
    </figure>

This approach not only means less JavaScript is downloaded but it also means less time is spent by the browser evaluating this JavaScript. Reducing these two things has the effect of making the experience of reading the Guardian snappier, especially on slower connections or less powerful devices.

There is no standard way to implement this pattern. Frameworks such as [Eleventy](https://www.11ty.dev/), [Marko](https://markojs.com/) and [Astro](https://astro.build/) offer various APIs but none of them met our use case so we built our own custom solution, three times over.

The [first attempt at islands](https://github.com/guardian/dotcom-rendering/pull/445) contained a lot of ideas that we eventually ended up using but chose not to implement.

The [second attempt](https://github.com/guardian/dotcom-rendering/pull/1182) was implemented - a year later after the migration had gained more momentum justifying a re-architecture - but it had flaws. Adding new islands was complex, needing edits in multiple locations, and it was easy to write code that caused bugs in other parts of the page. The solution did work in the sense that it achieved the aims of reducing JavaScript but we quickly started to see code changes reintroduce unused JavaScript meaning any gains we had made were being lost. Nobody meant for this to happen; it was the platform that made it hard to do the right thing.

With the [third and current attempt](https://github.com/guardian/dotcom-rendering/pull/3629) we took the things we’d learnt and decided to focus on developer experience. We still wanted to reduce the bundle size, improving performance for our readers, but we realised that if we made doing this easy and intuitive then we’d help prevent future regressions. Our new implementation gives developers guard rails to help them fall into the [pit of success](https://docs.microsoft.com/en-us/archive/blogs/brada/the-pit-of-success).

Another benefit we did not expect was how each island could be made a self contained world with only local state. By removing shared global state we greatly simplified our client side logic making the codebase easier to understand and maintain. In situations where state is held in a cookie, such as signed in status, we simply have different islands repeat the same cookie read. Reading a cookie is not an expensive operation and the duplication of code is a small price to pay for the simplification of the architecture.

The other area we had to consider when removing global state was data fetching. As an example, different parts of the page need access to the user’s profile but when we put each of these different sections into islands then they both needed to make the same fetch request independently. This meant we risked making the same network request twice on each page load, doubling our traffic to this endpoint. When you consider we measure our page views in the billions, even with caching, this was a problem.

Luckily, we were already using SWR, the [data fetching library from Vercel](https://swr.vercel.app/), and this library has request deduplication built in. If any part of the page makes a second, identical fetch request to one already made, SWR will automatically serve the response from the first request to both.


   <figure class="supporting">
   <img alt="And example of the Island component in use on theguardian.com" src="https://i.guim.co.uk/img/media/e0a28110e42bed473e18739adab4427af0e95aa4/0_20_616_370/master/616.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=e137fc14430abbd1a5e3cd9d61c606ae" loading="lazy" />
   <figcaption>
     And example of the Island component in use on theguardian.com
    <i></i>
    </figcaption>
    </figure>

Making server rendered react code interactive on the client is simply a matter of wrapping it in an <Island> component. A script runs on the client looking for these tags and deals with the complexity of downloading the code and hydrating it. This complexity still exists, but it is abstracted away from the developers working on our platform.

We also offer the ability to defer when client side scripts run. This means the JavaScript for content might only be downloaded and run when the browser is idle or perhaps only when the content becomes visible. All of which creates a better experience for our readers.

We’re still in the middle of migrating to this new Islands pattern but in addition to a steady improvement in our performance metrics we’re getting feedback from other teams saying how the pattern makes sense to them. Hopefully in the next three years the developer experience will remain positive and we’ll continue to only send readers the JavaScript they need and nothing more.

_**Development of digital products is central to the Guardian. You could be building the products that showcase our progressive and independent journalism, crafting the tools that journalists use to write their stories, developing the services that allow those stories to be distributed across the globe, or safeguarding our financial future.**_

_**If you’re interested in joining our Product and Engineering department, please visit the [Guardian News & Media careers page](https://workforus.theguardian.com/index.php/careers/product-engineering/).**_
