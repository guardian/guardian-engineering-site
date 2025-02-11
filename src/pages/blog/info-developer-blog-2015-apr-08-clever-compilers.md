---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-apr-08-clever-compilers'
headline: 'Clever Compilers'
date: '2015-04-08'
authors: [Hugo Gibson]
standfirst: 'Compilers are getting more and more sophisticated. Maybe one day they’ll be able to write their own code.'
image:
  url: 'http://media.guim.co.uk/8d407ba2443005545289bf28ec7986cac94e89ce/0_0_1600_960/1000.jpg'
  alt: 'A binary vortex'
  credit: 'Photograph: A binary vortex/Google'
tags: [Computing, Programming]
---

The future of compilers looks more and more spooky interesting. A recent spate of intelligent compilers are going to change the way programmers interact with computers. They’re going to take away a lot of the complexity of modern software development.

Two major issues of software engineering of the past two decades or so (probably even longer than that, actually) are: concurrency/parallelism and security. With the multicore revolution, programmers are [required](http://www.gotw.ca/publications/concurrency-ddj.htm) to understand concurrency to be able to speed up their code by making use of multiple cores. Concurrency, however, is difficult and many people struggle with understanding it.

What’s the difference between concurrency and parallelism? What is [Amdahl’s law](http://en.wikipedia.org/wiki/Amdahl%27s_law)? How does concurrency affect a program? How does parallelism affect a program?

Do you know what a side-channel attack is? How could you defend against it? What’s the difference between a power-monitoring attack and a timing attack? What’s a covert channel?

The point of both these sets of questions is that security, concurrency and parallelism are hard subjects. Both require a certain level of expertise to understand.

A new wave of compilers are starting to make serious inroads in eliminating concurrency issues and security issues. [Parallelising](http://en.wikipedia.org/wiki/Automatic_parallelization) compilers have come a long way in recent years. They work in a variety of ways, the most common being the compilers that identify portions of code with deterministic invariants (i.e. pure loops, code with no I/O) and compile this code to use multiple threads. The main problem for these compilers is finding a way to parallelise non-deterministic code. But even this could be coming [closer](http://research.microsoft.com/pubs/131698/IWMSE-keynote.pdf) to reality.

Compilers optimising for security flaws have made giant leaps recently. One such method uses dynamic control flow diversity to mitigate the effects of [side-channel attacks](http://www.ics.uci.edu/~perl/ndss15_sidechannels.pdf). Dynamic control flow diversity alters the [call graph](http://en.wikipedia.org/wiki/Call_graph) generated at compile-time while the program is running so the attacker cannot learn enough about a program to crack it. The interesting thing about this approach is that it makes heavy use of LLVM to perform JIT call graph randomisation, meaning it avoids the issues involved in distributing randomised software – randomising at compile time creates a different binary which cannot be distributed as the same version of a piece of software.

The relationship between compilers and engineers is a love/hate one. Some programmers believe that what they write should be what gets executed. Others love the compiler for all the behind-the-scenes optimisations it makes. I’d send the former [here](https://mitpress.mit.edu/sicp/front/node3.html). Compilers are meant to eliminate heavy lifting and free the programmer to do whatever they want, rather than getting bogged down in Assembly-level details.

As compilers get more and more sophisticated, it doesn’t seem too much of a stretch for compilers that rewrite code they know is broken to become mainstream. Facebook have [shown](https://github.com/facebook/pfff) the power of traditional compiler techniques applied to a dynamic language and this seems to be becoming the [norm](https://github.com/facebook/flow).

The original idea behind LISP was to create a programming language for A.I. that could enable programs to write themselves. It failed. But could this new generation of intelligent compilers put that dream on the horizon?
