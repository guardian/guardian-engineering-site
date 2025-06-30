---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-feb-07-qa-testing-for-the-guardians-content-api'
headline: 'QA testing for the Guardian''s Content API'
date: '2014-02-07'
authors: [Troy Harris]
standfirst: 'One of the Guardian''s software testers shares his experience helping build a product with no user-facing front-end and the tools that helped him do it'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/7/1391791351461/757a67f7-8c5b-44c7-a4a3-6aa7fbceef4a-2060x1236.jpeg'
  alt: 'Kibana batman chart performance testing.'
  credit: 'Photograph: Troy Harris/The Guardian'
tags: [Software, Testing]
---

I've just finished working with the Guardian's [Content API](https://www.theguardian.com/open-platform) team as the sole software tester and would like to share my experience over the last eight or so months there. The Content API team has been busily working away at a transition from [SOLR](http://lucene.apache.org/solr/) to [Elasticsearch](http://www.elasticsearch.org/) as the supporting open source search platform. V2, as it has been aptly labelled, is currently being tuned and tweaked against the Guardian's maturing [responsive site](https://github.com/guardian/frontend).

The responsive site is currently in a [beta phase](https://www.theguardian.com/uk?view=mobile) and is abuzz with daily releases going on at the desk banks behind me – [Grant Klopper](https://www.theguardian.com/profile/grant-klopper), [Matt Chadburn](https://www.theguardian.com/profile/matt-chadburn), [Patrick Hamann](https://www.theguardian.com/profile/patrick-hamann) and their [star team](https://github.com/guardian/frontend/graphs/contributors) are developing an amazing product. In that codebase, it takes a single switch to move between v1 and v2 of our API – this has allowed us a simple fallback while debugging performance and stability issues. This type of simplicity is rife throughout applications here at the Guardian, allowing everyone to focus on features and worry less about deployments.

Working alongside backend developers and their products can be a challenging role for a tester. The applications are usually technically complex and allow for a tester to fall back onto a shallow dive into a feature, if they haven't completely grasped the concept. As a tester, you should realise that testing isn't always about the application: the developer interaction is just as critical. This simply means you should talk to your developers; sit with them and actively listen to what they have created; go through some examples; question their reasoning – and listen for any uncertainty. This is the joy of [Agile testing](http://en.wikipedia.org/wiki/Agile_testing) and being part of a project's evolution.

<blockquote class="twitter-tweet"><p>Testing isn&#39;t always about the application, the interaction is just as critical. <a href="https://twitter.com/search?q=%23hugyourdevs&amp;src=hash">#hugyourdevs</a></p>&mdash; Troy Harris (@TroyHarrisOz) <a href="https://twitter.com/TroyHarrisOz/statuses/421982354484101120">January 11, 2014</a></blockquote>


Back in January I tweeted the above message. Yearning for the satisfaction of finding a solution can sometimes lead your team and other supporting teams on a longer journey than required. In this case, creating a Kibana template for the new application, sharing the dashboard, and sitting down with the external developer shone the required light onto the issue which was resolved before our API developer ran off to Mexico for some sun.

In any project, you acquire new skills and ideas on what is the right and wrong way to test. A quick test retrospective is a great way to clarify these thoughts.

Lessons learned & tips and tricks
---------------------------------

*   **[Kibana log analyzer](http://www.elasticsearch.org/overview/kibana/) –** You really want this. A whole new article could be written around the benefits of Kibana.
*   **Mimic your developer environments** – Stop using Windows plus VirtualBox and move to Linux.  
    
*   **Github pull requests** – read developer discussions to gain insights on potential issue hotspots.  
    
*   **Developer in test** – find your testing ally to help develop and support your automation efforts.  
    
*   **Organise a "Chaos Day"** – Test your stack's resilience and help prepare for failure response.
*   **Learn the language** – If you come from an English-speaking background and move somewhere that uses [Bahasa](http://en.wikipedia.org/wiki/Bahasa), start learning Bahasa: you'll earn respect and friendship. In this team's case, the language is [Scala](http://www.scala-lang.org/).
*   **Tests are not separate projects** – If your integration test fails, your build should fail.

Working with great teams will push your testing abilities, and the challenges when moving to new teams become: "how do I complement the existing skill set?" and "how do I add value without slowing productivity?".

See you at future standups, Team [Soulmates](https://soulmates.theguardian.com/).
