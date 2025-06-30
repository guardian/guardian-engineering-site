---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-mar-18-robustium-improving-robustness-in-automation-testing'
headline: 'Robustium - improving robustness in automation testing'
date: '2014-03-18'
authors: [Neal Madlani]
standfirst: 'One of the Guardian’s QA testing team talks about making your automated tests more robust'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/3/18/1395141357230/4e62eff1-8386-4fb7-afbe-aa3e3ac33293-bestSizeAvailable.png'
  alt: 'Robustium - To makes ones automation tests robustly awesome'
  credit: 'Photograph: Neal Madlani/The Guardian'
tags: [Software, Testing]
---

Okay, so I may have just made up the name “Robustium”. It’s not [bamboo furniture](http://robustium.com/) that I’m on about, but keeping up with the “-ium” trend that seems to follow every new addition to [Selenium](http://docs.seleniumhq.org/).

As more and more people become fluent in automation, a natural progression that I’ve heard and read people discuss is how to make your tests more robust. Here at the Guardian, two of my colleagues have already written blog posts around the topic: [Jonathan Hare-Winton](https://www.theguardian.com/profile/jonathan-hare-winton) wrote about [robust tests with UIAutomator](https://www.theguardian.com/info/developer-blog/2013/jul/31/robust-testing-uiautomator-android), a good place to get some more tips. Gideon Goldberg wrote about [effective use of selectors in Selenium Webdriver](https://www.theguardian.com/info/developer-blog/2012/nov/19/effective-selectors-selenium-webdriver) to make sure your selectors are up to scratch.

Here, I plan to further the discussion by pulling together some thoughts from a few testing events I’ve attended recently. The aim is to give you a tool belt of techniques you can use if you find that your tests are running but occasionally failing, and then running for a bit but then failing for longer.

At this point you’re probably going through one of two experiences: your developers are shouting at you for failing their builds, and your project manager thinks you’re releasing broken code because your tests are failing. If it’s not the latter, then you’ve probably spent an age working on a beautiful automation design pattern but because your tests are failing, you can’t bring yourself to push them up to git – and your boss has been wondering what you’ve been doing for the past few weeks... alright, months.

Basic debugging and test retries
--------------------------------

During early automation test scripting, it’s common to have some tests that pass only once every few runs. This could be caused by a number of factors but I’ve found it’s usually down to elements on the page loading in different orders. This is one of my most common pet peeves, especially when the tests run fine on your local environment but fail on the build agent – this makes debugging more time-consuming. If you’ve already got a log message on every other line of code and increasing wait times just isn’t working, try to SSH into the build agent and watch the tests run (I’ve used [X-Ming](http://sourceforge.net/projects/xming/) in the past).

If you’re still reading you’re likely already on your third coffee of the morning. At this point, I’d try to make my local environment as similar to the build agent as possible by running the same software and possibly throttling bandwidth or under-clocking my box. If all of the above just isn’t working for you and you are _this_ close to adding @Ignore to the test, one suggestion talked about at the London Selenium meetup was [having your test retry itself if it failed up to three times](http://stackoverflow.com/questions/8295100/how-to-re-run-failed-junit-tests-immediately/8301639#8301639). Granted, this could end up increasing test run times, but could be a quick fix for now until you get the time to debug the cause properly. Just to be clear, I only recommend you do this until you achieve a degree of stability in your tests. Having your tests pass by brute force can lead to false positives, too, which could hide an underlying bug.

Failing... or ignoring?
-----------------------

In a continuous integration setup, consider if the tests you have running should actually fail the build and stop the integration process. If you’re over around 20-30% test coverage, it’s likely you have some tests that aren’t considered so important that they’re show-stoppers. In this instance, you can investigate after the build goes out and retrospectively fix the issue. Holding up the build process is sometimes a worse consequence than a test which covers some obscure feature that your colleagues/mates love, but the usage stats just don’t hold up.


   <figure>
   <img alt="Attendees at SDET" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/3/17/1395081341665/67232561-1666-48cd-bc79-bdb35970b34e-bestSizeAvailable.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4c3bbdbb49534820a75b9ed5e8bc1f68" loading="lazy" />
   <figcaption>
     A previous gathering at SDET Photograph: /meetup.com Taken by: Kostas Mamalis
    <i>Photograph: meetup.com</i>
    </figcaption>
    </figure>

Custom stack-trace messaging
----------------------------

At a recent talk by [Hasanein Khafaji](https://github.com/hasanein) and [David Moloney](https://github.com/another-dave), I heard these guys had created their page object models each with a description e.g. “Search box”, “homepage”, etc. The interesting bit comes when they were able to chain the descriptions together and throw in a bit of natural language to make the [stack-trace messaging](http://stackoverflow.com/questions/12568340/add-custom-message-to-thrown-exception-while-maintaining-stack-trace-in-java) more useful for others to debug, e.g. “the _search box_ on the _homepage_ cannot be found”. This is very useful for people new to the automation game, unfamiliar with your tests, or simply those who find stack traces eternally baffling.

Throwing custom exceptions
--------------------------

justDucky, KeepItHttps... what’s that? You don’t know what I’m talking about? A little like hearing your young cousin speak the latest slang, to me [exceptions](http://en.wikipedia.org/wiki/Exception_handling) can be just as (un)revealing. At another talk (I forget which one – contact me if it was yours!), they talked about the pains of seeing your tests succumb to the dreaded NullPointerExceptions and IllegalStateExceptions, to name just a few. By creating a class that [extends from the Exception class](http://stackoverflow.com/questions/3776327/how-to-define-custom-exception-class-in-java-the-easiest-way), you can write your own custom exceptions to give yourself (or whoever’s running your tests) some more information to be able to debug them.

Pre-test checks (system readiness)
----------------------------------

[Hasanein Khafaji](https://github.com/hasanein) and [David Moloney](https://github.com/another-dave) found the people around them that had visibility of their tests lost confidence in the tests and found them flaky. After a bit of poking around, they found their tests weren’t the problem but in fact it was the environment which was intermittently unready. Short of writing in a mega Thread.sleep to wait for the environment to be available, they created a separate set of tests which they called a “pre-flight” check. They ran this test suite before their integration tests – the tests would check that the moving parts that their tests depend on (the mocks, APIs etc.) were in fact returning happy statuses. This pre-flight check would be very quick as it only needs to check HTTP statuses, and the integration tests would only run if these test passed.

Isolate and re-write
--------------------

Simon Stewart from Facebook spoke at SIGIST about how individual components testing during end-to-end tests could fail. This would cause the whole test suite to fail. Simon said in such a situation he would write a smaller test which checks the failing component in isolation before the end-to-end tests ran. It would be more obvious that a problem was prevalent instead of going into the log of the end-to-end test and spending time working out what failed.

Using tags to great effect
--------------------------

[Gideon Goldberg](https://www.theguardian.com/profile/gideon-goldberg) suggests tagging your tests in a way that describes their run frequency. Using tags such as @criticalpath or @fullregression means you can then target these tests on your build server, maybe running @criticalpath after every build and @fullregression once per day. Don’t forget you can add multiple tags to each test.  
  
This is by no means an exhaustive list – please feel free to join in on the discussion and add suggestions in the comments section below.  
  
**References:** SDET March 2014, London Selenium Meetup February 2014, SIGIST March 2014.
