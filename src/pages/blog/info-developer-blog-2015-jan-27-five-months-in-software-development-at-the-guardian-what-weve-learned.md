---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-jan-27-five-months-in-software-development-at-the-guardian-what-weve-learned'
headline: 'Five months in software development at the Guardian - what we’ve learned'
date: '2015-01-27'
authors: [Alessandro Ludovici, Josh Holder, Philip McMahon]
standfirst: 'Three of the Guardian’s graduates reflect on what they have learnt so far'
image:
  url: 'http://media.guim.co.uk/3896a74d318eb17920d655f8ca0bb71b8c871ec8/0_0_4665_2799/2000.jpg'
  alt: 'The current crop of Guardian graduates give their insight into working here.'
  credit: 'Photograph: Josh Holder'
tags: [Programming, Work & careers]
---

As the first graduates on the Guardian’s brand new graduate scheme, none of us were quite sure what to expect. We all came from different educational backgrounds and even different parts of the world.

**Josh**: I came from a fairly non-traditional background, having studied Mechanical Engineering and edited my student newspaper [Redbrick](http://redbrick.me). I first got a taste of working here when my student newspaper’s website that I developed won ‘website of the year’ at the [Guardian Student Media Awards](https://www.theguardian.com/media/studentmediaawards) and I spent a week here on work experience. I have been working on the Guardian’s new responsive website since I joined.

**Phil:** I studied Computer Science, with a year abroad in France. I got pretty excited when I saw the graduate scheme being advertised last year - I’d been a Guardian reader for a long time and was aware of some of the interesting things their developers had been doing. Five months in, I’m still very enthusiastic. Great things about working here have included learning [Scala](http://www.scala-lang.org/) (and attending [Scala eXchange](https://skillsmatter.com/conferences/1948-scala-exchange-2014)), working on the [Content API](http://open-platform.theguardian.com/) (horizontally scalable, using Elasticsearch and Amazon Web Services) and being able to sit in on editorial meetings.

**Alessandro**: I came from Italy where I got my degree in Telecommunication Engineering. After that, I moved to Barcelona where I did my PhD in Telematics Engineering, which was about the [Internet Of Things](http://en.wikipedia.org/wiki/Internet_of_Things). It was during my PhD that I became interested in software development and decided to start a career in this field. I joined the Guardian after a one-year experience in a startup where I worked as an Android developer. In my first few months here I have been working on the Guardian’s editorial tools.

What we have learned
--------------------

After spending five months in our development teams, here are a few things that we would like to share.

**Software development: it’s all about the team.** If you think software development is a solitary job, where human interaction is absent, then you’re wrong. Everything is about teamwork, learning and improving your skills - it’s a matter of how well your team works together. Every decision is discussed and taken together in an open approach. Your code is peer reviewed and, even as a new starter, you too are encouraged to review code - no matter how much experience you have. Pair programming is also a symptom that your team is healthy and a great opportunity for you to learn from senior members of the team.

**Functional programming is great.** We write a lot of Scala at the Guardian, a language which is not often taught in computer science or software engineering degrees. Functional programming might be covered, but perhaps not always [taken very seriously](http://xkcd.com/1312/). It can be a little onerous to start a new job in a programming language very different from what you’ve used before, but contributing to an existing project with experienced developers available to answer questions and review code is a great way to learn a language. You don’t have to spend long developing in Scala to become a functional programming convert - the syntax is familiar to a Java developer, but so much more concise and readable.

<blockquote class='pullstring'>It’s almost impossible to be objective about the product you’re building eight hours a day</blockquote>

**There’s no substitute for real user testing.** It’s almost impossible to be objective about the product you’re building eight hours a day, so the sooner you can get your product in front of real users, the better. User testing can be instrumental to confirming your longstanding thoughts on your project, but your testers will often challenge your design decisions in galvanising ways that you just couldn’t get internally. The Guardian has a UX lab where we regularly test our designs with groups of users, with their feedback fed back to the entire team.

**Data knows best.** When working on a large project it’s crucial to establish a baseline against which you can measure the effect of your changes. That way you can set up dashboards to alert you when your error rates increase, measure the performance of navigational components and see if users are discovering your new feature. This large swathe of real-time data empowers developers by giving them more information about their platform.

**Always write and run your unit tests.** It’s often heard that the one truth about software development is that the only bug-free code has zero lines. The bad news is that they’re right, so it’s important to minimise the risk of bugs and avoid breaking existing functionality when writing your code. The good news is that you have [unit tests](http://en.wikipedia.org/wiki/Unit_testing) to help you with this task. If there’s one thing I have learnt so far, and that I will keep for the rest of my career, is that tests are your friends. It’s better you take care of them as you would do with your code.

**Debugging and detective work.** Debugging a problem in a system made up of several applications (often with several running instances of each application) isn’t always easy. Problems can occur across multiple applications, and there’s almost never logging in place exactly where you need it. It’s important to be able to make use of the information that is available to diagnose an issue, and try to include logging in the most useful places when writing code. Pre-production environments are good, being able to run a system locally is even better, making testing and debugging much faster.

**Agile development is cool.** The most stressful part of any job is dealing with deadlines. These are often established at the beginning of a project and not updated to take into account unforeseen complexity. Here at the Guardian we adopt an Agile development methodology. Agile minimises deadline pain and gives more attention to complexity rather than time. Agile also increases visibility and openness. Every team has a board full of cards showing the work in progress that everyone can see. You have a daily stand-up to talk about your progress blockers, achievements and even to cry for help.

**Autonomy comes with a learning curve.** Most teams at the Guardian are responsible for their full stack, with an AWS account under their control. Developers therefore need to be able to manage the EC2 instances the applications they’re working on run from, and be ready to troubleshoot any issues. For someone relatively new to AWS, the number of different services can be overwhelming - Cloudformation, Autoscaling Groups, Load Balancers, Notification Topics, S3 buckets... and each service has its own parameters determining behaviour and which users have access to it. Getting to grips with all the infrastructure that the code you write will run on is a challenge, but worth it in the long run.

**Invest the time to write clean, reusable code.** In the whirlwind of a product launch, there is always a temptation to let code reusability take a backseat to actually shipping a sparkling new feature out to the world, but don’t let it. Investing the extra time initially will save you and your fellow developers hours of pain when it comes to maintaining and building on your code. On theguardian.com we use [Sass](http://sass-lang.com/), a CSS pre-processor which lets developers use many features not natively available in CSS, such as variables and functions. This allows us to package up reusable chunks of CSS into helpers called mixins. We have a host of Sass mixins that automatically include the vendor-prefixes for CSS3 features such as transitions and box shadows, leaving our pre-compiled code much more readable and maintainable. As a new developer to the project, the number of in-house mixins increased the project’s learning curve, but by the four week mark they started to become second nature and many are now staples in my personal projects too.

_The Guardian is looking for graduate developers to start in September 2015. You can apply [here](https://gnm.taleo.net/careersection/ex/jobdetail.ftl?job=KIN0000CO), or leave a comment with any questions you may have._
