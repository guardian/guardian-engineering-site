---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2010-dec-07-everlasting-permalink'
headline: 'The everlasting permalink'
date: '2010-12-08'
authors: [Roberto Tyley]
standfirst: 'Doing our bit for web-archaeology – as we migrate to a new commenting platform, what happens to the broken links?'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2010/12/8/1291804969897/Redirection-006.jpg'
  alt: 'Redirection'
  credit: 'Photograph: OJO Images / Rex Features/OJO Images/Rex Features'
tags: []
---

I was wondering yesterday if anyone ever used the fancy redirector I wrote for old Pluck comment links when [we moved to our in-house commenting system](http://www.guardian.co.uk/help/insideguardian/2010/oct/08/commenting-changes).

The redirector is just a small piece of Javascript that sits on the page and automatically redirects old links to our new urls. Our aim at the Guardian is to have permanent, predictable URLs for all of our content – the redirector takes the idea a little further, transcending the awful evil of machine-generated identifiers for comments (which inevitably change as you migrate from one commenting platform to another), and making sure you actually get taken to the right part of the page itself: _the comment you were originally looking for_. Unfortunately, if you have Javascript turned off, you won't get taken to the right comment, but you'll still be taken to the right page.

I checked our logs, and found that the redirector gets used about a hundred times a day. This is one of the old Pluck comment identifiers that a user hit us with:

> bf8dee3b-3f31-4b55-bbf6-888f901e5205

[Googling it](http://www.google.co.uk/search?q=link:guardian.co.uk+bf8dee3b-3f31-4b55-bbf6-888f901e5205), it turns out that it's on this Wikipedia page for [The IT Crowd](http://en.wikipedia.org/wiki/The_IT_Crowd) as reference 18:

> On July 30, 2010, Linehan confirmed that a US version of the show is back on, with possible changes due to negative reactions.

This is the link given in the Wikipedia article:

[http://www.guardian.co.uk/tv-and-radio/tvandradioblog/2010/jul/30/the-it-crowd-graham-linehan?showallcomments=true#CommentKey:bf8dee3b-3f31-4b55-bbf6-888f901e5205](http://www.guardian.co.uk/tv-and-radio/tvandradioblog/2010/jul/30/the-it-crowd-graham-linehan?showallcomments=true#CommentKey:bf8dee3b-3f31-4b55-bbf6-888f901e5205)

If you click it, you are automatically redirected (by our magic comment redirector) to a comment by the great man himself, Graham Linehan – the show's creator! And what you see there is him _generating_ that news, on our site, as a commenter:


   <figure>
   <img alt="Graham Linehan comments on our site" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/7/1291740536679/GrahamLin.Highlighted.2.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=0538431927a173bfece99608d7a5e320" loading="lazy" />
   <figcaption>
     Graham's comment confirming the US IT Crowd will be hug – and learning – free
    <i>Photograph: Roberto Tyley/guardian.co.uk</i>
    </figcaption>
    </figure>

...which makes me glad we haven't thrown that information away!
