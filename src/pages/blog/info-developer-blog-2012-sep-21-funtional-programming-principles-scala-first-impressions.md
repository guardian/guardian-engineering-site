---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2012-sep-21-funtional-programming-principles-scala-first-impressions'
headline: 'Functional Programming Principles in Scala: First Impressions'
date: '2012-09-21'
authors: [Adam Fisher, Lindsey Dew]
standfirst: 'Two of the Guardian''s software developers take a look at the new programming language course offered by Scala creator, Martin Odersky'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/9/21/1348238726096/Functional_Programming_Principles_in_Scala.png'
  alt: 'The official website for Functional Programming Principles in Scala'
  credit: 'Photograph: Matt Andrews/guardian.co.uk'
tags: [Functional programming, Scala]
---

This week we've set ourselves the challenge (along with most of the developers here at the Guardian) of undertaking [Functional Programming Principles in Scala](https://www.coursera.org/course/progfun). [Scala](http://www.scala-lang.org/) is the main programming language that we use at the Guardian, and through studying this course we hope to gain a deeper understanding of the language, learn new features and improve our programming style. The course is devised and delivered by Scala's creator, [Martin Odersky](http://lampwww.epfl.ch/~odersky/) and we're excited by the insights he's sure to reveal.

One of the first things that jumped out at us is how well-organised the course is. A common complaint of Scala is that it can be quite complicated to get the tools up and running before you are ready to begin writing code. Upon entering the portal for the course, however, we found ourselves presented with well laid-out instructions for getting started on each of the major operating systems. Concise written instructions as well as detailed screencasts are available to take you through setting up a working development environment that includes the language, the build tool and an IDE. On top of that, pre-configured downloads of these tools are available if you don't want to get your hands dirty configuring the required plugins manually. For a programmer setting out to learn Scala for the first time, these details mean the course has perhaps already been a worthwhile endeavour, even before the lectures and assignments have started.

We're into the first week now so we've seen the format for the course. Every week, Odersky releases a set of video lectures and perhaps some accompanying reading material that you can consume at your own pace. When you feel ready, there's a homework assignment comprised of a few programming exercises that put into practice the theories and techniques learnt during the week. So far the assignments have been fun and we're already looking forward to having some more problems to tackle next week.

The bulk of the course is the video lectures, which are given clearly and concisely and interspersed very neatly with small optional questions and exercises. Given his rich background in computing, Odersky has a lot of knowledge to share and one of the wonderful things about this course is to be given the opportunity to benefit from his teaching. It's only the first week and we've already learnt some new concepts. Once the course progresses and the content gets more advanced, we'll certainly have broadened our programming skills.

One of the most interesting features of the course design is the assignment submission process, using [SBT](http://www.scala-sbt.org/). The tools come with an SBT plugin which will, with a single command, send your code to their servers where a few minutes later your work gets automatically graded, according to your code's style and functionality. Your assignments page shows a log of all your submissions with a score and feedback, including a useful stack trace of any errors. While such a tool is obviously required for [such a popular course](https://twitter.com/odersky/status/248768435599863808), the flawless implementation delights in its simplicity and makes submitting the assignments a real pleasure.

While it's great that everything is so well set-up to make it easy for beginners to get started, this does mean the downloadable projects come in a slightly non-standard layout. Because we already use Scala here in our day-to-day work we found integrating the projects with our own toolchain (in particular, [IntelliJ](http://www.jetbrains.com/idea/)) a bit tricky. After a bit of tinkering we've made it work, so if like us, you'd rather use IntelliJ to work on the project, then [check out our blog post that takes you through the configuration](http://www.guardian.co.uk/info/developer-blog/2012/sep/21/funtional-programming-principles-scala-setting-up-intellij).

Now that we're up and running with IntelliJ, we're looking forward to getting stuck into Scala. Looking ahead at the syllabus, the next few weeks will involve reasoning about functions and immutable objects, core data structures in Scala and utilising functional techniques such as pattern matching. We might not be leaving our computers for a while...
