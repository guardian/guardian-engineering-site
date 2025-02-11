---
layout: ../../layouts/blog.astro
slug: 'info-2022-feb-22-turning-the-tables-on-accessibility'
headline: 'Turning the tables on accessibility'
date: '2022-02-22'
authors: [Lucy Monie Hall]
standfirst: 'A lesson on how to present data for all types of audiences'
image:
  url: 'https://media.guim.co.uk/d78687d7d151c7f80d10f7c5aa7b364aae4ad444/0_264_4104_2462/4104.jpg'
  alt: 'Digital Tech Time on Accessibility Awareness: A member of the Guardian Accessibility Working group stands at a lectern, presenting a slide deck. The screen shows a diagram demonstrating the types of Accessibility requirements'
  credit: 'Photograph: Maria-Livia Chiorean/The Guardian'
tags: [Accessibility]
---

I work as a client-side developer at the Guardian, and until recently I was a member of the Subscriptions team. The focus of my team was to encourage readers to support us through digital subscriptions.

At the Guardian we believe in keeping quality journalism free and open for all. This means we need to highlight clearly to our readers why supporting us through a digital subscription is a good thing to do and present the benefits to them.


   <figure>
   <img alt="Why your support matters screenshot" src="https://i.guim.co.uk/img/media/10cd9570a0f69904efeab840651cbc2f1c964416/0_0_936_137/master/936.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=2ef22f081afe43aae3fd16e08f6e2edc" loading="lazy" />
   <figcaption>
     Why your support matters screenshot
    <i>Illustration: Lucy Monie-Hall/The Guardian</i>
    </figcaption>
    </figure>

Through user experience research we tested ways to explain the benefits of a digital subscription and narrowed down the best ideas. We then tested those ideas alongside our own assumptions using A/B tests.

One idea that resonated most with our research participants was a comparison table. A comparison table allows readers to scan a series of product options, and tell them at a glance what they include. Something a bit like the table below, which compares the features of a series of products offered by Shopify:


   <figure>
   <img alt="Shopify prices screenshot" src="https://i.guim.co.uk/img/media/bc3fe8d133a9ae25e841be5b3bc1537439f241f2/0_55_1328_912/master/1328.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=708a29d7a18cfaced7b3fc0b28cf6298" loading="lazy" />
   <figcaption>
     Shopify prices screenshot
    <i>Illustration: Lucy Monie-Hall/The Guardian</i>
    </figcaption>
    </figure>

I was the developer to pick up the task of making the comparison table component for an A/B test. The component felt well within my skill set – a UI component with non-dynamic contents – so I figured building it would be a cinch. I worked quickly, relying on tools in my comfort zone, like flexbox. In my mind, tables were deprecated (spoiler: they’re not), so I shunned them in favour of a list, thinking to myself that from a screen reader’s perspective, the content was pretty much a list.


   <figure>
   <img alt="Your subscription at a glance screenshot" src="https://i.guim.co.uk/img/media/fcb6a7e2becfe1611b5ac333d552ad2dd76dae54/0_0_997_583/master/997.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=142cae6d2b969555fefb890b61722bed" loading="lazy" />
   <figcaption>
     Your subscription at a glance screenshot
    <i>Illustration: Lucy Monie-Hall/The Guardian</i>
    </figcaption>
    </figure>

My first inflection point was when I opened the page in Safari – one of my early confidence checks to ensure my code works in the browsers we support. Sure enough, it was broken. I sighed, figuring that flexbox was the likely issue. I decided it was time to be brave, and opened the CSS grid cheat sheet that I had bookmarked. Implementing CSS grid-columns turned out to be simple. It just worked.

It was at around this point that I started wondering about accessible tables best practice, and after reading [ally-101](https://a11y-101.com/development/tables), I realised that tables are not in fact deprecated – not at all. If you are trying to make a data table, this is definitely the correct semantic HTML to use. So I sheepishly removed <ul> and replaced it with <table> and swapped <li> for <tr>. As the article suggested, I used scope=”column” and scope=”row” to demarcate column and row headings, and I added a [visually hidden](https://www.a11yproject.com/posts/2013-01-11-how-to-hide-content/) <caption> to explain the purpose of the table more fully to screen-reader users.

After making these modifications, I switched over to Safari again and fired up VoiceOver. I navigated through the page headings, and then used the command for VoiceOver to read out the content. To my disquiet, VoiceOver skipped from the heading before my table to the heading after it. It was as if the table wasn’t there. I Googled it and tried a number of different things before finally adding role=”presentation”, and hey presto, VoiceOver deigned to read it out.

I feel the need to apologise in advance, as what I am about to say will make some readers cringe.

My thinking was that because a table is an inherently visual element, that I needed to think about how to best express the content of the table for a screen reader. I overrode the table data with [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) and [aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden), which read out the content of the table as a list. I then put my code on our staging site so people could try out the element with a screen reader and posted it on our accessibility channel asking for feedback.

Luckily, the feedback was as swift as it was unfavourable. One of my colleagues wrote _“I’m not massively keen on…giving screen reader users a very different kind of content, or a different impression about what’s really on the page…I don’t think we should be taking away the default tools that screen readers give for users to navigate tables how they prefer”_. She noted that I had effectively hidden the table’s “tableness” by adding role=”presentation” to the <table> HTML. She also pointed out that screen-reader users may be partially sighted, and might be confused by the conflicting experiences presented in my example.

A bit crestfallen, I returned to my code, and carefully stripped out all of the aria-hidden=”true” and most instances of aria-label. I added a visually hidden column header called ‘benefits’ for the row header column. I also brushed up on my knowledge of [keyboard commands to navigate a table](https://support.apple.com/en-gb/guide/voiceover/vo27958/mac). I removed role=”presentation” from the table element but, try as I might, I could not get VoiceOver to read the table contents.

I referred the problem back to my colleague who had provided the feedback. I figured that it would be worth her having a try with it, as the problem might just be my slightly rubbish screen-reader skills. I also sent her the link to [ally-101](https://a11y-101.com/development/tables) to explain the table HTML. A short while later she came back to me. She noticed that, at the bottom of [ally-101](https://a11y-101.com/development/tables) there was a ‘don’t do it’ section that I had missed. She said: _“It’s CSS grid. If you take out ‘display: grid’…the table works fine and all the rows and columns are picked up”_. So my final error in this litany was failing to read the instructions.

Shortly after this, I finally merged in the code and the A/B test went live. Aside from the reader and product learnings from the test, I gained some fundamental knowledge about accessibility from the experience of creating this component. It was a good reminder that however straightforward the component might seem, it’s always worth pre-planning for accessibility. This would allow an upfront conversation with the designer to discuss if there may be potential compromises to the design. More importantly, I learned a fundamental tenet of accessibility: don’t create a separate or different experience for disabled people. It leads to segregation, and to confusing content that’s hard for people to use.

**Learnings in summary**

*   Don’t retro-fit accessibility: think about how to make your code accessible up front.
    
*   If you’re trying to make a data table, use <table>. It’s not deprecated, it’s just the wrong tool for page layout.
    
*   If you use <table> don’t use display: flex and don’t use display: grid. These will break the semantics of the table.
    
*   This is the big one: [](https://sheribyrnehaber.medium.com/accessibility-separate-but-equal-is-never-ok-e6e97d893d11)**[don’t create a separate or different experience for people using assistive technology](https://sheribyrnehaber.medium.com/accessibility-separate-but-equal-is-never-ok-e6e97d893d11)**. People using screen readers can navigate and understand tables if we provide the correct HTML, attributes, and labels.
    
*   Read the instructions.

_**Development of digital products is central to the Guardian. You could be building the products that showcase our progressive and independent journalism, crafting the tools that journalists use to write their stories, developing the services that allow those stories to be distributed across the globe, or safeguarding our financial future.**_

_**If you’re interested in joining our product and engineering team, please visit the [Guardian News & Media careers page](https://workforus.theguardian.com/).**_
