---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-feb-17-compile-to-javascript-languages'
headline: 'Compile-to-JavaScript languages'
date: '2015-02-17'
authors: [Hugo Gibson]
standfirst: ''
image:
  url: 'http://media.guim.co.uk/8d407ba2443005545289bf28ec7986cac94e89ce/90_336_1384_830/1000.jpg'
  alt: 'Graphical representation of binary code'
  credit: 'Photograph: Google'
tags: [JavaScript, Programming]
---

There are a lot of [languages](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS) that compile to JavaScript these days. So many, in fact, it’s impossible to keep track. A new language promising to preserve the JavaScript ecosystem while giving all the benefits of language [X](http://www.scala-js.org/) crops up almost every week. In fact, the rapid emergence of these languages seems to suggest that a replacement (or [enhancement](http://betterjs.org/)) for JavaScript is needed.

These languages aim to satisfy a number of different goals. Some claim to be about making JavaScript more [sane](http://coffeescript.org/) i.e. keeping the dynamic typing and first class functions (arguably the defining features of the languages) while tidying up the pieces that no one uses or wants to use. Others are all about adding types to JavaScript. Some have simply [invented](http://www.typescriptlang.org/) “typed” JavaScript as an alternative. [Others](http://haste-lang.org/) have gone a step further and just tossed JavaScript out [altogether](http://elm-lang.org/). It’s clear that composability and type safety are the most important things in future software development; while JavaScript might be composable, it certainly isn’t type safe.

There is an inherent problem with compiling one language to another: how do you turn one language into another if they are fundamentally different? This is, of course, the domain of compilers. Compilers have been taking nice-looking code and turning it into [Assembly](http://en.wikipedia.org/wiki/Assembly_language) for years. The difference is that, with the exception of looking at the disassembly output, no one really spends much time probing around binary code. Thus compiler vendors are free to do pretty much whatever they want to the target code. For example, they can optimise away pointless loops, trim dead code branches, do all sorts of weird things to variable names and function scoping. With to-JavaScript compilers, this disregard for a programmer’s intentions is not really possible. Certainly, you can change all the variables names and do some obfuscation but doing can mean users can’t effectively debug their code (this is commonly solved by having development and production outputs etc.).

Users of languages that compile to JavaScript also need to have some understanding of JavaScript. The same is not true for users of languages [that](http://www.scala-lang.org/) [target](http://groovy.codehaus.org/) [the](http://clojure.org/) JVM – many Scala developers (myself included) have only cursory knowledge of Java.

So what can JavaScript do to be better? I gave a hint by mentioning the JVM above. It might be that the best thing for JavaScript would be to morph into some kind of bytecode. If there was a standardised bytecode for JavaScript and all browsers, then all these compile-to-JavaScript languages could be more aggressive in their compilation strategies, shedding the hindrance of syntax and getting down to the real work.

[asm.js](http://asmjs.org/) has gone a long way towards making this a reality. There have been some very impressive performance displays using asm. In general, applications harnessing it seem to run at 1.2x-1.5x the [speed](https://hacks.mozilla.org/2013/12/gap-between-asm-js-and-native-performance-gets-even-narrower-with-float32-optimizations/) of native C/C++ applications. This is truly impressive performance – an interpreted language running at 1.2x the speed of C++! Currently, asm is only given full [support](http://techcrunch.com/2013/12/21/mozillas-asm-js-gets-another-step-closer-to-native-performance/) in Firefox and running some of the [examples](https://developer.mozilla.org/en/demos/detail/bananabread) in Chrome highlight this. But should the other browser vendors come to support it natively, there might finally come a standardised JavaScript (sort of) bytecode, which would make these compile-to-JavaScript languages a lot more useful.
