---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2017-may-25-how-we-integrated-off-platform-at-the-guardian'
headline: 'How we integrated off-platform at the Guardian'
date: '2017-05-25'
authors: [Mariot Chauvin]
standfirst: 'Discover how we adapted our editorial and analytics tools to better understand our audience and the potential of new publishing platforms. '
image:
  url: 'https://media.guim.co.uk/624a831fa8596a895af6972d53fb0f6425bd9386/0_0_1500_991/1500.jpg'
  alt: 'Map of tech giants war'
  credit: 'Illustration: David Parkins/Duncan Hull -  https://flic.kr/p/dzausz'
tags: [Amazon, Apple, Digital media, Facebook, Google, Media, Newspapers, Podcasting, Social media, WhatsApp, X]
---

What is the next digital platform? While news organisations [have transformed to digital first](https://www.theguardian.com/media/2011/jun/16/guardian-observer-digital-first-strategy), software [continues to eat the world](https://techcrunch.com/2016/06/07/software-is-eating-the-world-5-years-later/) and new technology platforms appear quickly, vying to become the new mainstream media.

The platforms on which users read content, or are notified that new content is available, are called “off-platform”, in opposition to news organisations own websites, referred as “on-platform”.

At the Guardian, thanks to our digital content management architecture, where **the content structure is separated from its presentation**, we have been able to quickly integrate our content and cross-publish it to new platforms launched by [technology giants](https://www.theguardian.com/commentisfree/2017/apr/01/brexit-britain-respond-tech-giants-civic-role-google-apple-facebook-amazon-eu) such as [Google AMP](https://www.theguardian.com/membership/2016/feb/24/todays-release-of-accelerated-mobile-pages-amp) **,** [Apple News](https://www.theguardian.com/media/2015/oct/22/apple-news-uk-newspapers-ios-91), [Facebook Instant Articles](https://mumbrella.com.au/facebook-launches-instant-articles-feature-with-buzzfeed-and-the-guardian-among-first-partners-293605), or [Amazon Echo](https://www.theguardian.com/help/insideguardian/2016/sep/28/introducing-the-guardian-skill-for-alexa).

This ability to deliver fast has allowed us to run extensive trials on those platforms to assess how they fit with our editorial and commercial objectives.

However publishing is only one part of the integration. We have also provided new features in editorial and analytics tools to support new platforms and social media.

Twitter and Facebook social sharing cards preview
-------------------------------------------------

  
Twitter and [Facebook](https://www.theguardian.com/technology/facebook) are driving a significant number of potential readers to our website, but the virality of an article on those social networks is dependant on the quality of the sharing card. Adding the ability to preview how article cards will look before publication has enabled writers to improve the image and associated description.


   <figure>
   <img alt="Screenshot of social sharing guardian preview tool" src="https://i.guim.co.uk/img/media/5014e069a0b9f6fe77d8ecedfd5851fce0fe0415/0_0_1903_2364/master/1903.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=19320efc01d5794e6dbd28f07991ff27" loading="lazy" />
   <figcaption>
     Screenshot of social sharing guardian preview tool
    <i>Illustration: Mariot Chauvin</i>
    </figcaption>
    </figure>

Facebook instant articles preview
---------------------------------

Facebook Instant Articles are rendered a bit differently than articles on our website, so again being able to preview how the content will look like has allowed content writers to optimise the content for both platforms, therefore we added this ability in our preview tool.


   <figure>
   <img alt="Screenshot of Facebook Instant Article preview" src="https://i.guim.co.uk/img/media/1b857981d0cb586996cac7936b74b52bafc06385/0_0_814_741/master/814.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=09456e7990e831b913486f4ce2d1cfad" loading="lazy" />
   <figcaption>
     Screenshot of Facebook Instant Article preview
    <i>Illustration: Mariot Chauvin</i>
    </figcaption>
    </figure>

iOS Spotlight search referrer
-----------------------------

Before Apple News was launched [iOS Spotlight search](http://www.tomsguide.com/us/ios-spotlight-search,review-3093.html) was driving a significant numbers of our audience to our platform but they were not correctly identified and so was reported as unknown in our [in house analytics platform named Ophan](https://thenextweb.com/media/2015/04/13/how-the-guardians-ophan-analytics-engine-helps-editors-make-better-decisions/).

Diving into HTTP headers and query parameters we did find a way to reliably identify it as a referrer, and that has changed the organisation view of off-platform impact. As far as we know Ophan is the only analytics tools that is correctly identifying this platform.


   <figure>
   <img alt="Screenshot of Ophan - the guardian analytics platform showing referrers" src="https://i.guim.co.uk/img/media/ec9458c65cc2ab20bf79f789fbfed88334f36f25/0_0_1068_362/master/1068.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=337f9905e5e9989431123fd381fdaff6" loading="lazy" />
   <figcaption>
     Screenshot of Ophan - the guardian analytics platform showing referrers
    <i>Photograph: Mariot Chauvin</i>
    </figcaption>
    </figure>

WhatsApp & WeChat referrers
---------------------------

  
People tend to overestimate the impact of sharing platforms such as [WhatsApp](https://www.whatsapp.com/) on the number of page views, but the best way to way to prove it is to correctly identify the page views coming from them. This is exactly what we did. Interestingly some pieces of content are shared extensively on a specific platform. The [South China sea case](https://www.theguardian.com//world/2016/jul/12/philippines-wins-south-china-sea-case-against-china) enabled us to find a way to identify correctly [WeChat](https://wx.qq.com/).


   <figure>
   <img alt="Screenshot of Ophan - Guardian analytic tools showing what is being read on WeChat" src="https://i.guim.co.uk/img/media/ed13022b9e1c8645606902bfca774bbb4cede9c1/0_0_1776_1526/master/1776.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=74d29840fedc1921189cd921fc33d0b6" loading="lazy" />
   <figcaption>
     Screenshot of Ophan - the guardian analytic tools showing what is being read on WeChat
    <i>Photograph: Mariot Chauvin</i>
    </figcaption>
    </figure>

Apple News & Amazon Echo
------------------------

Apple news presented a specific challenge as it was not possible to add our custom tracking into this platform. We therefore had to use a dramatically limited API provided by apple, enabling us to only add pageviews every 6 minutes, losing a lot of useful metrics such as the reading time or the location of the reader.


   <figure>
   <img alt="Screenshot of Ophan - the guardian analytics platform showing top 20 with referrers" src="https://i.guim.co.uk/img/media/dd143be42c06ca87b9eb51ad8f4751b09385c8d5/0_0_974_1085/master/974.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=45edf97ec50690b0b37c6ca4326d81f0" loading="lazy" />
   <figcaption>
     Screenshot of Ophan - the guardian analytics platform showing top 20 with referrers
    <i>Photograph: Mariot Chauvin</i>
    </figcaption>
    </figure>

Integration of [Amazon](https://www.theguardian.com/technology/amazon) Echo is fairly limited but it has enabled us to discover which section of our website this audience was most interested in and the time at which listeners were using device.

Podcasts analytics
------------------

  
Podcasts are published through RSS which is a distributed platform, enabling any client or application understanding this format to retrieve and read podcasts. Therefore you can’t rely on Apple provided analytics to have a comprehensive view of your downloads and subscriptions

To get proper analytics you need some control in your distribution platform, usually a [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN).

Because our [excellent CDN](https://www.fastly.com/) is a developer non-hostile technical platform you can adapt, we have been able to stream raw downloads logs and analyse them in real time them to better understand our audio audience.

We have extended Ophan to display the downloads analytics for all of our podcasts.


   <figure>
   <img alt="Screenshot of Ophan - the guardian analytics platform showing podcast downloads" src="https://i.guim.co.uk/img/media/eb3425c21c83e3f524528f7f71183a221d8737fd/0_0_2424_1228/master/2424.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=cd3405314c423ec956c0d200d33a62f4" loading="lazy" />
   <figcaption>
     Screenshot of Ophan - the guardian analytics platform showing podcast downloads
    <i>Photograph: Mariot Chauvin</i>
    </figcaption>
    </figure>

For a podcast or for an episode, one can breakdown downloads by country and by platform (web and mobile apps).


   <figure>
   <img alt="Screenshot of Ophan - the guardian analytics platform showing podcast episode downloads breakdown" src="https://i.guim.co.uk/img/media/c476307d328b0307c0878e067efe98a7c209685b/0_0_1706_718/master/1706.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=2176787701090b2d7369dde53ae676b3" loading="lazy" />
   <figcaption>
     Screenshot of Ophan - the guardian analytics platform showing podcast episode downloads breakdown
    <i>Photograph: Mariot Chauvin</i>
    </figcaption>
    </figure>

As with Amazon Echo, we think The Guardian is the only news organisation to have integrated audio analytics into their main real-time analytics tool allowing us to better understand how reading and listening audiences are interconnected.
