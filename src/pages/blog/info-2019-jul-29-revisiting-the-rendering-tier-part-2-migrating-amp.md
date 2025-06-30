---
layout: ../../layouts/blog.astro
slug: 'info-2019-jul-29-revisiting-the-rendering-tier-part-2-migrating-amp'
headline: 'Revisiting the rendering tier part 2: migrating AMP'
date: '2019-07-29'
authors: [Nicolas Long]
standfirst: 'An update on our new server-side rendering layer: migrating AMP.'
image:
  url: 'https://media.guim.co.uk/bf23496a795617fe9d2b8578f153e841c5a9a494/0_0_1345_807/1345.jpg'
  alt: 'Wide screenshot of a Guardian AMP liveblog'
  credit: 'Photograph: Nicolas Long/The Guardian'
tags: []
---

A short while ago, we wrote about [revisiting the rendering tier](https://amp.theguardian.com/info/2019/apr/04/revisiting-the-rendering-tier) of our website. Our immediate aims were to improve developer experience around CSS and templating, and also site performance for users, as [we know](https://wpostats.com/) this is crucial for engagement.

I’m pleased to announce that we’ve hit a significant milestone on this journey – migrating our [AMP](https://amp.dev/) website to our new rendering tier.

If you’re using Google search on a mobile device it’s likely you’ll already be hitting our AMP site without realising it. This happens on Google’s own domain. But you can also easily view AMP pages directly by swapping out ‘www’ for ‘amp’ in a Guardian URL. Eg.

[https://](https://amp.theguardian.com/politics/live/2019/jun/13/conservative-leadership-tory-mps-start-voting-for-new-leader-live-news)**[amp](https://amp.theguardian.com/politics/live/2019/jun/13/conservative-leadership-tory-mps-start-voting-for-new-leader-live-news)**[.theguardian.com/politics/live/2019/jun/13/conservative-leadership-tory-mps-start-voting-for-new-leader-live-news](https://amp.theguardian.com/politics/live/2019/jun/13/conservative-leadership-tory-mps-start-voting-for-new-leader-live-news)

Note that we don’t have an AMP equivalent for all our content though, so this won’t work for every page on the site.

AMP is not without controversy, but it was a good candidate for early migration to our new tech stack for a few reasons:

*   It is much simpler than our main site
    
*   It represents less traffic and is lower risk than our regular articles, but it is still a very significant traffic driver, enabling immediate learnings and benefits
    
*   It represented a nice opportunity to split out and simplify our AMP code and regular code; previously the two were hopelessly entangled

On the flip side, AMP is not a perfect test case:

*   AMP does not allow custom Javascript, so it didn’t help us directly with learnings on how to implement client-side behaviour in our new stack
    
*   Our AMP site changes less often than our regular site, so the developer experience benefits are smaller
    
*   User benefits are smaller as many do not use AMP and also some of our content is not supported on AMP

Nonetheless, we’ve learnt a lot through this milestone. And splitting out our AMP code has improved developer experience both on AMP and crucially on the existing site codebase as well. Many of the technical choices within AMP, made to help ensure performance, are likely to inform how we model our new regular site.

As an aside here, there is a temptation with AMP to start with an existing codebase and start branching to handle the various AMP restrictions and requirements. This was the approach taken for our own initial version of AMP. For a simple site, this is fine, but it doesn’t scale well as it rests on a false assumption about AMP – that is it merely a _slightly_ different but essentially the same version of your site. In reality, AMP is quite unique in its requirements, whether that be restrictions on HTML/CSS, the entire client-side model, or anything else. Unless you have a strict business requirement for visual parity between your AMP and regular site – and why would you commit yourself to such a rigid proposition? – splitting the codebases is probably the best approach here.

We’re now working on migrating our regular (non-AMP) site, and we’ll be sharing mechanisms to opt-in to early tests of this in the near future.

If you’d like to be kept up to date or become an early tester of our new article version, or if you have specific feedback on our approach, there are a few ways you can get involved:

*   Interact with us on our public repo [https://github.com/guardian/dotcom-rendering/](https://github.com/guardian/dotcom-rendering/) (issues/comments, fixes, stars, and so on)
    
*   Contact us by [Google Group](https://groups.google.com/d/forum/guardian-web-beta-group)
    
*   Leave comments on this article(!) – although we usually only keep discussions open for a few days so depending on when you’re reading, this may not be possible

We are also very much interested in learning about alternative approaches or similar solutions, whether that be case studies/blog posts, or in-person team catch-ups (we’re based in London which probably determines feasibility of the latter) so don’t hesitate to get in touch as we’d love to hear from you.
