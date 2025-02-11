---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-nov-10-on-the-ambitious-but-bumpy-road-to-angularjs-20'
headline: 'On the ambitious but bumpy road to AngularJS 2.0'
date: '2014-11-10'
authors: [Sébastien Cevey]
standfirst: 'Guardian senior developer Séb Cevey summarises and shares his views on Rob Eisenberg’s thorough overview and rationale of the design of the upcoming 2.0 version of the popular web application framework.'
image:
  url: 'http://media.guim.co.uk/4dc8b07addd72b97880a1d06359df6a7350b2bea/278_211_2655_1593/2000.jpg'
  alt: 'Vintage car climbing a steep rocky road'
  credit: 'Photograph: Owen Humphreys/PA'
tags: [Computing, Programming]
---

When the [AngularJS](https://angularjs.org/) team announced their plans for a complete rewrite for the new 2.0 version of the popular JavaScript framework – with no intention to provide a smooth upgrade path – reactions weren’t exactly all supportive.

In [a new article published last week](http://eisenbergeffect.bluespire.com/all-about-angular-2-0/), core team member Rob Eisenberg shares his insights and opinions on the controversial changes. In spite of being biased as an AngularJS developer, he does raise some interesting criticisms and limitations of the proposed design.

The result is not all roses and, as with all AngularJS 2.0 discussions, the arguments remain rather more conceptual than concrete, since only prototypes of the various pieces exist so far but no working whole. There are still debates happening on the new design, and the team has issued calls for feedback on their [design documents](https://drive.google.com/drive/u/1/#folders/0B7Ovm8bUYiUDR29iSkEyMk5pVUk).

The article is as exhaustive as it is long, but don’t let that deter you – it is well worth a read to contrast with a lot of the impulsive reactions of opinionated bloggers to the breaking-change announcement.

It was of particular interest to us Guardian developers who work on the editorial tools, as AngularJS has been our main framework of choice to develop rich web applications.

The main architectural change seems to be to align with and adopt upcoming web standards, in particular the upcoming ES6 version of JavaScript and Web Components. An important step, as these technologies are well positioned to form the new baseline for the web in the coming years.

ES6
---

Using ES6, or in fact [a superset of ES6](https://docs.google.com/presentation/d/1hr2IM-8G-0RzpB-WY8pLHvxqNggKPzUO0KvEv1IKPws/mobilepresent) called [AtScript](https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/preview?sle=true) that also includes optional typing and annotations, makes a lot of sense. While the final ES6 specification is expected to be finalised in the coming months, more and more developers have already adopted it via the use of transpilers like [Traceur](https://github.com/google/traceur-compiler) or [6to5](https://github.com/sebmck/6to5).

On top of the [new richer syntax and semantics](https://github.com/lukehoban/es6features), ES6 also finally brings [modules](http://www.2ality.com/2014/09/es6-modules-final.html) as first-class citizens to the language (unlike runtime solutions like AMD or CommonJS), and the new version of AngularJS plans to replace its custom module system with standard ES6 modules, which makes a lot of sense.

In our experience on projects at the Guardian, mixing AngularJS modules and AMD or ES6 modules has always been fiddly and awkward. We’ve also grown quite fond of all the niceties of ES6 in several of our new projects (using [Traceur](https://github.com/google/traceur-compiler) and [SystemJS](https://github.com/systemjs/systemjs)/[jspm](http://jspm.io/)), so we very much welcome that move.

To prove the old adage that great minds think alike, the [EmberJS 2.0 roadmap](https://github.com/emberjs/rfcs/pull/15) also flags ES6 modules as becoming first-class parts of their framework.

It’s also worth noting that the typing aspects of AtScript are syntax-compatible with other typing efforts like TypeScript or Facebook Flow (see [Alex Rauschmayer’s overview of typing in JavaScript](http://www.2ality.com/2014/10/typed-javascript.html) for more details). Hopefully these parallel efforts are just an initial step towards reification of typing into the ECMAScript spec in the near future.

Web Components
--------------

AngularJS directives always felt like some sort of proto-Web Components, but it was less obvious how they would actually end up mapping onto the specs that form the basis of [Web Components](http://webcomponents.org/). AngularJS 2.0 makes it a more natural fit, while providing a familiar framework to define them. The dependency injection and other features of AngularJS provide a richer basis to build larger applications than, say, Polymer, which would still be useful for smaller self-contained components.

It seems particularly useful that alongside custom elements (aka _Component Directives_), they have kept the ability to mix-in a behaviour into an existing element (using a _Decorator Directive_). In our experience using Polymer Web Components, we sometimes wished for a way to bring in some functionality without having to wrap everything into a new element or subclass an existing one (think mixins vs composition or inheritance).

The often confusing [_ngTransclude_](https://docs.angularjs.org/api/ng/directive/ngTransclude) is also advantageously replaced by the new concept of _Template Directive_, which reads more clearly.

The _[$scope](https://docs.angularjs.org/guide/scope)_ is going away as well. It was useful in earlier versions of the framework, but as things grew it often became a source of invisible coupling (pseudo global singleton, with inheritance!) or confusion due to the nature of its prototypal inheritance, which led to the recommended hack of “[always having a dot in the models on your scope](https://www.youtube.com/watch?feature=player_detailpage&v=ZhfUv0spHCY#t=1758s)”. The controllerAs syntax introduced in version 1.2 seemed like a cleaner approach, so it’s good to see it become the default.

The AngularJS devs have also resisted the temptation to make it a more prescriptive framework (like [EmberJS](http://emberjs.com/) for instance). Some may prefer the security of stricter guiding principles, many others have always found it to be an asset of AngularJS. In fact, AngularJS 2.0 looks more aligned with [React](http://facebook.github.io/react/) than ever, especially as the fate of two-way binding is unsure, although AngularJS 2.0 will retain more of a separation between controller code and template markup than its Facebook alternative.

Final thoughts
--------------

The article makes some valid and insightful criticisms of some of the design decisions and associated limitations of AngularJS 2.0. We shall see how they will resolve (or join in the discussion, as the author encourages us to do!).

It’s hard not to wonder whether there could have been a softer, more gradual route that would not have broken backwards compatibility as abruptly. The author alludes to ways how this could be achieved. Meanwhile, the [extended maintenance schedule for AngularJS 1.3](https://docs.google.com/document/d/1dZdq2L8EkzimgvU93ypLF9GJpdzD2jjm08Zal6sfxMQ/edit?hl=en-GB&forcehl=1) and planned backport of upcoming features like the new Router may also soothe the pain for some.

On the plus side, the vision seems to be a forward-looking one and aligned with where the Web is (or might likely be) going, and failing such a repositioning, one would have rightly questioned how long before old-AngularJS is replaced by a more native alternative.
