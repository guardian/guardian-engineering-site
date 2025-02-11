---
layout: ../../layouts/blog.astro
slug: 'info-2024-feb-09-pinboard-transforming-communication-across-the-newsroom-part-2-of-3'
headline: 'Pinboard: transforming communication across the newsroom (part 2 of 3)'
date: '2024-02-09'
authors: [Tom Richards]
standfirst: 'Pinboard is a discussion and asset sharing tool (or rather tool within other tools) which is gradually transforming how the news room communicate as news stories move through the various phases of the production process'
tags: [Pinboard]
---

_This is part two of three ([part one](https://www.theguardian.com/info/2024/feb/08/pinboard-transforming-communication-across-the-newsroom-part-1-of-3) and [part three](https://www.theguardian.com/info/2024/feb/10/pinboard-transforming-communication-across-the-newsroom-part-3-of-3))._

<figure>
                <iframe class="video" src="https://youtube.com/embed/k2ApXAmUo1E" title="Introducing... Pinboard" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

How does it work?
-----------------

How is it integrated into the tools? Glad you asked!

**Is it a browser extension?**

We already have a couple of internal browser extensions, most notably Teleporter, which is installed on pretty much every Guardian computer and overlays some extra functionality in various places (such as the website and a number of our tools) to help internal users jump around from one thing to another.

So you may think Pinboard is a browser extension. Unfortunately, releasing browser extensions is painful and slow. The process is quite involved, different for different browsers and takes hours/days to propagate to users. So not really suitable, especially while the project was in active development, often with many releases per day.

**Is it a library?**

So you may be thinking, a library which is a dependency of the other tools, we’ve got lots of precedent for that, notably within the tools space we’ve got the relatively modern [“prosemirror-elements](https://github.com/guardian/prosemirror-elements)”, which is a nice TypeScript React library where all the different ‘elements’ which make up articles etc. are implemented (such as text element, image element, video element, tweet element and so on) this library is then used in various places, most notably in Composer’s text editor. The host application (Composer) is written in Angular so needs lots of glue code to bind variables to React. It’s the same story for other tools and even if they are made using React (such as the video tool) they’re unlikely to be the same version etc.

Even with a nice library like this, which uses semantic release, every time you make a change you need to bump the dependency in all the consuming applications. So you need to factor in the build time of the library code, then the release propagation, then the build time of the host applications and then the release time. In the case of the above, that’s a minimum 30-minute round-trip, which wasn’t really suitable for Pinboard.

**So instead, it is its own beast!**


   <figure>
   <img alt="Code snippet from Composer to load Pinboard" src="https://i.guim.co.uk/img/media/f6a13c55435b45bee4ea69a73f42b45f585d42c0/0_0_1672_74/master/1672.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=bcd71a915bb290451a1f7d30bc2d903a" loading="lazy" />
   <figcaption>
     undefined
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

… is the line in _composer.gutools.co.uk_, which:

1.  Is a simple script tag which loads _pinboard.loader.js_ from _pinboard.gutools.co.uk_ (i.e. ‘bootstrapping-lambda’ via an API Gateway). pinboard.loader.js is not a static asset but an endpoint, which generates a small amount of JavaScript on the fly, as such it’s explicitly not cached.
    
2.  Before responding it verifies the user’s panda cookie (shared auth between the tools based on top-level domain, note how pinboard and composer are both subdomains of _gutools.co.uk_) and checks for the pinboard permission, looks up the AppSync connection details/URLs and last generates an auth token for AppSync.
    
3.  The JS it returns essentially instructs the host page to add a further script tag to load, _pinboard.main.\[HASH\].js_ which is the main single bundle for the pinboard app, the contents of which is the same for everyone and has a hash in the name so it can be cached indefinitely.
    
4.  When that script loads it calls _Pinboard.mount_ passing in the connection details and token, which in turn displays the little floating pin blob etc.

Magic!  
So, a very simple integration into the host application (one line) and importantly, **decouples releases of pinboard and the host application**.


   <figure>
   <img alt="An example of the ‘Add to 📌’ button in the Grid" src="https://i.guim.co.uk/img/media/f1d89a196afa3bc0261349d86f1fd4046c29039b/0_0_274_358/master/274.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=089eb6a03f52caedde513cb9133da95a" loading="lazy" />
   <figcaption>
     An example of the ‘Add to 📌’ button in the Grid
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

Now what about those little ‘Add to 📌’ buttons we see in the Grid in the video, which look more deeply integrated into the host tool. They’re also very lightweight in terms of the integration point.


   <figure>
   <img alt="Code snippet from the Grid. Template code showing the data attributes containing details of the image/crop." src="https://i.guim.co.uk/img/media/1cf63a9fb71e25742298fa22605504c3b5c137c1/0_0_1014_256/master/1014.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9fa9ac17fc75edec600e9f1d92097bd4" loading="lazy" />
   <figcaption>
     undefined
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

Here you see the template code in the Grid (which is Angular), an “asset-handle” tag which crucially is meaningless to the host application and doesn’t render anything visual if pinboard isn’t loaded (for example at the BBC who have started using the Grid in recent years) or if pinboard is broken perhaps. That’s it, as far as the Grid is concerned.

So once pinboard is loaded, it runs this code …


   <figure>
   <img alt="Code snippet from Pinboard showing all the functions which find DOM elements on the page (from the host application) and how those are called on changes to the DOM, via MutationObserver." src="https://i.guim.co.uk/img/media/2e4ba5159be89686f4dc8576b555e059f7d21ad5/0_0_1150_714/master/1150.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=92d3b216352babecc539cf09aff2a681" loading="lazy" />
   <figcaption>
     undefined
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

… which finds those asset handles very simply with …


   <figure>
   <img alt="Code snippet from Pinboard showing the simple use of document.querySelectorAll" src="https://i.guim.co.uk/img/media/48a1a08ccecbc249242c067bab849878fbb8ee23/0_0_625_105/master/625.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=fba0e5b81b1d7f45f886fe8d1e1c0059" loading="lazy" />
   <figcaption>
     undefined
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

… and stores them to state. Pinboard then keeps up to date with any changes to the host application (note how I mentioned Grid is written in Angular, which has a different render life cycle than React in Pinboard), it does this using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), a standard DOM API. Once it has references to the DOM nodes of those asset handles, on render it simply iterates through, instantiating some components …


   <figure>
   <img alt="Code snippet from Pinboard showing all the asset handles being mapped to React portals." src="https://i.guim.co.uk/img/media/927caea131e0570917bdb326c1828b45758b461b/0_0_958_368/master/958.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2e154a1a13fbc459779531c4e785cacd" loading="lazy" />
   <figcaption>
     undefined
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

… which are wrapped in [React Portals](https://react.dev/reference/react-dom/createPortal#rendering-to-a-different-part-of-the-dom) …


   <figure>
   <img alt="Code snippet from Pinboard showing the portal component being instantiated." src="https://i.guim.co.uk/img/media/3abad52d6393cf2aa18c967d4e7d565b970036dc/0_0_1120_362/master/1120.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=a554f291b3bcc00c26c046687e4121a8" loading="lazy" />
   <figcaption>
     undefined
    <i>Illustration: Tom Richards</i>
    </figcaption>
    </figure>

… a core but lesser known feature of React which let you take over DOM elements outside the element where the React app is mounted.  
  
Last thing to mention, we use another standard but lesser known bit of the DOM API … [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM). Which essentially lets you sandbox the CSS from the main DOM. Anything visual in pinboard is inside one or more shadow DOMs, to isolate the styles, to avoid the host application messing up pinboard’s styles or vice versa.

**GraphQL (via AWS AppSync)**

GraphQL allows you to abstract over multiple data sources and present a single (and fairly simple) schema to the client. Aside from the types representing the data, you have **queries** (for reading data), **mutations** (for changing data) and **subscriptions** (to hear in real-time about those mutations). The notion of ‘subscriptions’ was pretty key in our decision to use GraphQL/AppSync, given we were making a real-time collaboration application – those subscriptions are essentially websockets under the hood but nicely abstracted for you.

AppSync is AWS’ managed GraphQL so you don’t need to worry about provisioning servers, keeping GraphQL up to date etc. It provides connection to various data sources, via ‘resolvers’. You can use them to connect to all sorts; lambdas, http endpoints, DynamoDB, even RDS. These resolvers have optional request and response mapping, but they’re in a not too friendly proprietary language, so we just use lambdas and simply parse the JSON payload from AppSync in the lambda and reply with some JSON – which is nice and benefits from the shared code etc.  
There are lots of auth options; API keys, AWS Cognito etc. but we just have a custom lambda. In my experience AppSync has been great and you should certainly read up on it and potentially consider it for some projects. Worth noting though, it’s not the cheapest, and although I wouldn’t call it expensive, I probably wouldn’t use it for reader facing things as its pay per request.  
  
_This is part two of three ([part one](https://www.theguardian.com/info/2024/feb/08/pinboard-transforming-communication-across-the-newsroom-part-1-of-3) and [part three](https://www.theguardian.com/info/2024/feb/10/pinboard-transforming-communication-across-the-newsroom-part-3-of-3))._

Credits
-------

Pinboard was built by **[Tom Richards](https://www.theguardian.com/profile/tom-richards)**, **Jenny Graham-Jones**, **[Thalia Silver](https://www.theguardian.com/profile/thalia-silver)**, **Andrew Nowak**, **Phillip Barron** & **Ara Cho** with additional developer contributions from **[Fred O’Brien](https://www.theguardian.com/profile/frederick-o-brien)** & **[Samantha Gottlieb](https://www.theguardian.com/profile/samantha-gottlieb)**. Product design from **Ana Pradas** and product direction from **[Calvin Dickson](https://www.theguardian.com/profile/calvin-dickson)**. All the while supported by the rest of the content production team in the Product & Engineering department. Not forgetting the input/time/effort from countless Guardian journalists, who have helped shape Pinboard.
