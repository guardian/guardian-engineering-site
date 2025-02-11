---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-feb-01-email'
headline: 'Sending better emails'
date: '2013-02-01'
authors: [Alastair Jardine]
standfirst: 'Some notes on prototyping the Guardian''s editorial emails and what we learned about their design and user experience'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/2/1/1359730530858/Picture_3.jpg'
  alt: 'Understanding the content patterns in our current emails. They’re scribbles, but with a purpose.'
  credit: 'Photograph: Alastair Jardine/guardian.co.uk'
tags: [Email]
---

Last year at the Guardian we sent over 40 million editorial emails. [The Fiver](http://www.guardian.co.uk/football/series/thefiver), [Guardian Today](http://www.guardian.co.uk/info/email-services), and [Media Briefing](http://www.guardian.co.uk/media/signup/2010/feb/08/1) are amongst our most popular, but we have others from a range of editorial desks. Late last year, a project team started work on refining our email products. As the user experience architect on the project, here's my take on what we did.

Why does our current stock of emails need to change? What issues were we addressing? Our most popular news email is the [Guardian Today](http://www.guardian.co.uk/guardianunlimitedtoday). Before this project, the email was "scraped" from our front page, which isn't optimised for mobile devices by design. Viewing it on a phone is an awful experience, with pinching and zooming the only sensible way of viewing on a mobile device. Not good. From the outset, this project was tasked with producing a mobile-optimised design, as all the trends point towards email being the dominant platform _real soon now_. We're designing for that, as well as supporting desktop – it's still a popular platform, after all.

The project also aimed to increase the number of people opening the emails, and then clicking through onto a Guardian article. We have an advertising supported model, so we need to be mindful of this goal in everything we do.

In order to better design for our users early in the project, we set out to understand how they felt about email in a set of workshops. The workshops were fascinating: we learned _what_ our users thought of the emails they currently received, _when_ they tended to read their mail, and _where_ they read their email. It backed up our assumptions from studying the analytics.


   <figure>
   <img alt="A selection of the emails our users are subscribed to. As with any UX workshop, sticky notes and sharpies were out in force." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/2/1/1359730567484/Picture_1.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=269b4f9c802021ef068a6c0c8cec3370" loading="lazy" />
   <figcaption>
     A selection of the emails our users are subscribed to. As with any UX workshop, sticky notes and Sharpies were out in force.
    <i>Photograph: Alastair Jardine/guardian.co.uk</i>
    </figcaption>
    </figure>

We asked our workshoppers to "design their own email". The task resulted in some fascinating insights:

*   In a daily email, the majority of our users requested a morning delivery containing news-focussed content. Some would like to customise the delivery time.
*   A weekly email should contain cultural and life and style pieces , technology articles and 'best of'. All to be delivered on a Friday afternoon in order to help people to plan their weekends – ideally using a location to provide relevant recommendations.

The results from the workshop suggested that the following sections would perform well in a simplified design: top news stories/editor's picks; most popular for the previous 24 hours; Eyewitness photo of the day; sport; and culture stories.


   <figure>
   <img alt="Analysing the results of our workshop. Sharpies were involved. Obviously. " src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/2/1/1359730592501/Picture_2.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=8aab439533c9f7869f1d93248bdcf980" loading="lazy" />
   <figcaption>
     Analysing the results of our workshop. Sharpies were involved. Obviously. 
    <i>Photograph: Alastair Jardine/guardian.co.uk</i>
    </figcaption>
    </figure>

Working together with Akemi Takagi – the team's visual designer – we established what patterns or content structure our current emails contain. Current patterns include picture + stand first + links, bulleted lists, copy section, large picture et cetera.

Working towards a mobile-optimised design meant we could leverage the excellent work from the new [m.guardian.co.uk](http://m.guardian.co.uk). Akemi ensured that the designs scaled up to desktop-width emails, which is a 600 pixel maximum by convention.

So, how has it gone? We're fans of measuring change, and we sent our first split test email last week: half of the subscribers received the old; the other half the new template. There are two ways we're going to understand the impact. Email we send has a tracking code attached, so we can tell when a link in an email is opened, and when a link has been clicked ([there are some exceptions](http://kb.mailchimp.com/article/how-open-tracking-works)). These codes are immensely helpful to us for understanding how our emails perform in the real world, using a large sample size.

The initial numbers are positive. We've seen a small uptick in click-through rates in the new email, and this is before optimisation based on user feedback – it's encouraging. We received over 140 emails about the change, and the feedback fell into three categories: "give us more content"; "give us the trail text" (the 15-25 word summary below the headline); and "there's too much scrolling".

We're in the process of updating the daily email in response to that feedback. We know what our end result looks like, and we're going to iterate to the 'final' result, making a single change at a time to understand the impact each one has. If a change has a negative impact on traffic back to the site, we have to carefully consider both the effect of the change for users, and also the traffic implications.

Over the next few weeks, we'll be moving more of our emails to the new format, so [take a look at our offerings](http://www.guardian.co.uk/info/email-services), and maybe come on the journey with us. And send us feedback, because we do listen.
