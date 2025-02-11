---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-may-28-changing-the-guardians-pairing-test'
headline: 'Changing the Guardian''s pairing test'
date: '2014-05-28'
authors: [Robert Rees, Developer Manager]
standfirst: 'Pairing interviews are an invaluable way of assessing candidates and we are constantly trying to refine and improve the process'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/5/22/1400754986741/8673945271_88e26faaea_o-2060x1236.jpeg'
  alt: 'Programmers paring together'
  credit: 'Photograph: hackNY.org/flickr'
tags: [Computing, Software]
---

When new engineers apply to join the Guardian as a general software engineer, part of the interview process is a pairing test. In a pairing test, the candidate works with one of the engineers here at the Guardian on a conventional programming problem.

The pair work together as a normal pair would to solve the problem and create a small piece of working software. Pairing interviews are often the fairest way to assess what people care about in the software they create and how they approach solving problems. They are certainly more straightforward than "trivia questions" on a particular language or abstract whiteboard problems.

Originally our pairing tests were done entirely in Java and we often expected candidates to have a working knowledge of Java prior to joining. However, once we made the switch to [Scala](http://www.scala-lang.org/), continuing to do the pairing test in Java did not seem to make a lot of sense so we started to encourage candidates to try to take the test in Scala, and then finally made the test language default to Scala.

This had some advantages: we understood who was willing to give something new a go and we could compare candidates' solutions easily. But while our primary development language is Scala, increasingly (by lines of code) we are creating more products in JavaScript. So should we allow developers to tackle the problem in JavaScript?

A general email to our developers led to a discussion with a smaller interested group of engineers about what we should do to move the pairing test along. One of the key points that was made was that people felt we did not want to be discussing aspects of a unfamiliar language's syntax with candidates, but would prefer to focus on the reasons why a candidate takes a particular approach to the problem and how they choose to structure their solution.

From that discussion, we decided that we're going to start to allow candidates to do the pairing interview in the language of their choice. We would still prefer if candidates used our core languages of Scala, Python and JavaScript but if Haskell, Clojure, Ruby or Go are more your bag, then feel free.

We will try and match pairs based on who knows something about the language the candidate wants to use, but if we can't do that then we would expect the candidate to explain how the language works to their partner – exactly as if they were teaching a colleague the language.

We are constantly looking at how we can best recruit new software developers and as our development practices change, we also need to keep evolving our recruitment process alongside it. If you are interested in [joining the Digital Development team](https://gnm.taleo.net/careersection/ex/jobdetail.ftl?job=KIN00002J) at the Guardian then please apply and perhaps we will be pairing with you soon!
