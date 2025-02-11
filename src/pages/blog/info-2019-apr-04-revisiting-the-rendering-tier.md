---
layout: ../../layouts/blog.astro
slug: 'info-2019-apr-04-revisiting-the-rendering-tier'
headline: 'Revisiting the rendering tier'
date: '2019-04-04'
authors: [Alex Sanders]
standfirst: 'From 62,783 lines of Sass to CSS-in-JS. Introducing the new server rendering layer for theguardian.com'
image:
  url: 'https://media.guim.co.uk/cefa091c09fbfe19dc3f19d0c3a53da592846779/0_0_3500_2386/3500.jpg'
  alt: 'A road leading into the distance in some mountains.'
  credit: 'Photograph: Arnd Wiegmann/Reuters'
tags: [CSS]
---

The 2019 incarnation of [theguardian.com](https://www.theguardian.com/uk) began life around six years ago, starting out as an m-dot and gradually scaling up both its breakpoints and page views until it rendered the entire site.

At the time of writing, it has gone from 0 to 62,783 lines of Sass. That Sass generates tens of thousands of rules that are intended to describe a maintainable set of responses to business and design problems.

Individually, they represent half a decade’s considered decisions made by skilful and dedicated engineers.

In sum, though, they present a precarious, teetering, maintenance nightmare.

In what way? For one, it is significantly easier to add new CSS than to edit or delete it.

Secondly, it has become unclear how you should approach making edits.

Some of our selectors are utilities that describe presentation (e.g. _.hide-on-mobile_) and others describe features (e.g. _.facia-card_). When a new feature is introduced that derives its visual style from an existing feature, there are multiple approaches you could copy from: for example should you reuse existing rules or should you duplicate them?

Both approaches are in the code base, and both have their drawbacks.

If you reuse something, you will end up having to override parts of it to capture any differences and be bound to any (potentially unwitting) updates to the original.

If you duplicate something, you will not inherit any updates to the original that you _did_ want, and the page becomes heavier: it takes longer and costs the reader more to download, the render tree takes longer to generate and the CSSOM takes up more memory.

You could extract the commonalities into new utility selectors, but then suppose someone else needs to borrow aspects of the look for an unrelated new feature and they decide to duplicate one of the previous two instances, to keep their feature safe from unrelated updates. When the original feature needs a design tweak, all three are out of sync, and the second is also now (probably) broken.

At this point, you are certain that whatever you do, you cannot delete any of it, because no one can really understand how everything interrelates. In order to avoid breaking anything, you would need to know all features on the site, how they _should_ look and how they _will_ look following your change.

You _do_ know, however, that if you add some new rules, guarded by their BEM selectors, you (probably) will not break anything and nothing will break you, so that becomes the easiest thing to do.

This is pretty much where we are now.

To compound this, as the CSS has become more and more thorny, the appetite for features and experiment across the Guardian has grown. These are largely managed by teams devoted to quarter-length OKRs who need to iterate rapidly and safely.

A complex system of styling that ultimately is only safe if you add to it cannot sustain this. It leads to poor performance on our readers devices, which ultimately devalues both their reading experience and the journalism, and is unpleasant to develop.

So what now?
------------

To address this, and avoid ending up back here in a few years time, we need to understand how we got here in the first place.

When it was conceived, the existing site was built by around ten developers using state of the art tooling and techniques (one developer was even dedicated to maintaining an internal CSS framework and took a special interest in changes that made use of it).

As engineering focus shifted from creating a website to iterating aspects of it, the number of people touching the code and the breadth of their changes swelled. It is no longer feasible for one person to act as gatekeeper. With six years of developer turnover, it has also become harder and harder to understand the context of your change in the wider codebase: what can you do? what have other people done? what should you do?

As time goes by, these questions become harder and harder to answer, and the reason for that is their answers are based on _conventions_.

The problem with Convention
---------------------------

Systems that try to contain complexity over long periods of time by convention will inevitably tend toward entropy, because one significant characteristic of convention is that it is trivially simple to break one.

You do not even need to be malicious. A convention is not [a line in the sand](https://github.com/guardian/frontend#core-development-principles-lines-in-the-sand). You can have a very good case for breaking or stretching one, but once a convention is no longer fully observed, subsequent cases for breaking or stretching it are automatically stronger, because the convention is already weakened. The more this happens, the weaker it gets.

In our case, the conventions that were in place to encourage simplicity became hazy. For example, our Sass is meant to follow to BEM, but in instances where the design requirements would create too many selectors, it defaults back to the cascade.

At the same time, any edits are assumed to be sympathetic to performance, because that has long been another convention. But an OKR team dedicated to moving a revenue metric might reasonably justify privileging conversions over page speed or longer-term development, especially if the feature is short-lived or the trade-off is small.

The consequence of our reliance on convention to manage this is that our Sass has become too hard to work with, and CSS too big to send down the wire.

What could we do?
-----------------

We could deal with the Sass by being stricter about our adherence to BEM, effectively working in a hyper-modular style, implementing extremely strict coupling of selectors to DOM elements i.e. thinking in components. This would mean you could be sure that your edits affected only the elements you knew your selectors targeted, and you could also know that if you deleted a template you could delete the relevant Sass.

This would resolve maintainability at the expense of performance: the amount of duplication and number of selectors would rocket.

Around the time we first started looking at this, atomic CSS frameworks started to appear. Approaches like Yahoo’s [Atomic CSS](https://acss.io/) and Adam Morse’s [Tachyons](https://tachyons.io/) mean you can be sure the CSS you ship to your user will be very, very small, almost as small as it could possibly be.

Since they require you to style elements themselves, rather than create rules that apply to elements, they make maintenance much easier too. Presentation is directly coupled to content – if you update or delete a template, nothing else is affected. In the case of Atomic CSS, unused declarations will not even be generated.

Both these approaches were very appealing, but very hard for us to adopt with our existing stack. Our HTML is generated by Twirl templates in Play, which is written in Scala. This means Atomic CSS, which manages your templates with Node, would be very difficult to install.

At the same time, the Scala in Play is compiled to Java binaries. While this means Play is very fast in production, editing a template in development requires some recompilation before you can see the change, often taking up to ten seconds. Using a system like Tachyons, which requires you to style your elements directly using the class attribute, would be incredibly slow for us.

Both of these would also require a total rewrite of our templates, and the imposition of a new development style. If we could find a way to apply the thinking in the atomic approaches to a hyper-modular style of writing Sass, we could retain the familiarity of the stack while fixing the problems.

False start
-----------

Looking through our various stylesheets and thinking about the atomic approach, it occurred to us that all of our shipping CSS must be reducible to a set of unique declarations.

If we could have recreated the site by replacing our Sass with a set of pre-existing functional classes (Tachyons-style), then we ought to be able to modify the Atomic CSS approach such that we could keep our existing Sass, rewrite it in part to _require_ duplication (and so make edits safe) but analyse the resulting stylesheets and selector usage during the production build process to reduce that duplication to single-use utility classes?

In development we could just serve an enormous stylesheet, meaning no Scala recompilation and keeping the existing live Sass recompilation and dev tools pipeline.

Then in production, we ought to be able to ‘atomise’ our CSS to unique instances of declarations during compilation, build a map from the original rules to the unique ones, and use that in the Twirl templates at the point we write out the class attribute.

We created an [‘atomised CSS’ postcss plugin](https://sndrs.github.io/atomised-css-repl) that would take a normal stylesheet and return an atomised one, and a method for using that map in the Twirl templates, and for a while shipped [a tiny instance of it](https://github.com/guardian/frontend/pull/13549) in production.

It was designed so that any selectors which could not be atomised (anything which is not a single class, basically) would pass straight through, so _in theory_ we should have been able to add it without making any changes to the Sass, getting the benefits where immediately possible and being to able to gradually remove all the more complex selectors till everything was atomised.

The ‘in theory’ bit was the scary part! This technique meant _completely_ re-writing the stylesheet long after the last developer had touched the source code. In order to ship that with confidence, we would need to write a test suite that compared the effects of the original to the atomised stylesheets, on a DOM that captured a control and variant for each possible path in the original. That is not an impossible task, but at the point we started to write that, we really had to ask ourselves if this was the smartest approach!

CSS in JS
---------

We knew these problems were already being solved, by more and smarter people, in JavaScript land, but we were still working with a model where the DOM, CSS and JS all exist autonomously. At no point in their lifecycles is either aware of the other. The DOM is the source of truth when it comes to the content (everything is server-rendered) but the intentions expressed in the CSS and JS are only realised if _their_ assumptions about the DOM are correct.

That is, in this way of working, the DOM, CSS and JS all interoperate entirely by _contract_. Which is to say, an acknowledgement that the humans who write the code will maintain certain conventions:

*   the DOM must provide hooks for the JS, which must encounter a DOM it understands
    
*   the JS might patch the DOM to reflect a new state, but that needs to be in a way that the CSS can style
    
*   the CSS must be able to accommodate whatever DOM it encounters

As we saw earlier, this means updates to the site need to understand the technical context of each edit, not just how they resolve a domain problem.

In turn, this makes updates more complicated to complete and increases the likelihood of bugs going to production.

More importantly for us, since the processes which generate our CSS and HTML understand nothing about each other, any optimisations like isolating critical CSS are at best error-prone and at worst impossible.

The beauty of the work being done on the various CSS-in-JS frameworks is that the JS takes over managing the DOM _and_ the CSS on both the client and the server.

It is a completely different way of thinking: instead of writing code for the _browser_ to interpret, you write code that tells your _framework_ how you want things to look behave, and _it_ takes care of generating the code for the browser for you.

In this way of working, the codebase starts to become a more human-oriented description of how you want to solve domain problems, not a browser-oriented one. By abstracting browser-level code away, it becomes easier for a developer to do the right thing rather than the wrong thing. The architecture, and our performance and maintainability requirements, are managed by the framework, not the engineer.

So that is what we are doing. After a lot of trialing we have settled (for now at least) on [moving our rendering tier to React and Emotion](https://github.com/guardian/dotcom-rendering). This will doubtless generate a _new_ set of challenges, but we expect that they should at least solve the set we have right now.

There are other blog posts to be written on how we settled on these two; how we will fit it into the stack; and how we’ve progressed since we started this project.
