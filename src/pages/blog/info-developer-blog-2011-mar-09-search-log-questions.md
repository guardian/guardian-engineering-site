---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-mar-09-search-log-questions'
headline: 'Questions in search of an answer'
date: '2011-03-09'
authors: [Martin Belam]
standfirst: '''What is Twitter?'', ''When will 2012 university league tables be available?'' and ''Who is the highest paid footballer in the world 2011?'' are just some of the questions guardian.co.uk users have asked us in the past month when using our site search.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/2/22/1298393392588/search_questions_460.jpg'
  alt: 'A screengrab of The Guardian''s web analytics tool'
  credit: 'Photograph: guardian.co.uk'
tags: []
---

Every week on a Friday I send out an email to the Technology Development team listing some of the questions that have been directly asked of guardian.co.uk via our site search.

I have a custom report in [our Omniture web analytics tools](http://www.guardian.co.uk/info/developer-blog/2011/feb/14/performance-and-tracking) that specifically lists searches that start with phrases like "how do", "why is" and "when will". The questions asked vary from those to do with the newspaper, like "How do I get a story in your paper?" or "How do I contact a journalist from the Guardian?", to the practical, like "How do we stop our stairs creaking?" to the very difficult to answer, like "What is the point of surrealism?".

Although search terms expressed as a direct question make up a tiny fraction of the searches we see on the site, they represent a persistent behaviour that I've observed when [delving into search logs over the past 10 years](http://www.currybet.net/cbet_blog/2003/03/a-day-in-the-life-of-bbci-sear-5.php). We usually see around 3,000 direct questions a month. There is a reason why we might see more questions than you'd generally expect. Some of those asked of us are clearly people looking for the online version of something that has appeared in [Notes and Queries](http://www.guardian.co.uk/theguardian/series/notes-and-queries) in the printed edition.

As it happens, we don't actually always serve these queries very well. Search technologies usually have a list of "[stop words](http://en.wikipedia.org/wiki/Stop_words)" that are considered so common as to be meaningless, for example "the", "a" or "he". We currently strip our stop words out at the point where we compile the index of our content, rather than at the point of query execution, meaning that many of the words used in questions have nothing to match to in our search database.

It isn't just our own site search where we see direct questions though. My colleague Andrew Lepki in our Research & Customer Insight department put together a report for me which looks at questions that have been asked on web search engines which have lead to clickthroughs onto the Guardian site. Slightly disturbingly, one of the most popular questions on Google that we seem to answer is "What does human taste like?", thanks to a [Martin Robbins](http://www.guardian.co.uk/profile/martin-robbins) Lay Scientist article entitled "[What does human meat taste like?](http://www.guardian.co.uk/science/the-lay-scientist/2010/sep/05/human-meat-taste-cannibal)".

And yes, I'm aware of the theory that by observing something you change its behaviour. I'm sure that our developers have been putting in deliberately funny questions into search in the hope of turning up in my weekly email – and I suspect that you might do that now as well.

_If you'd like to find out more about the usage of site search on guardian.co.uk, in 2010 I wrote an Inside Guardian.co.uk blog post about "[The long tail of search](http://www.guardian.co.uk/help/insideguardian/2010/jan/21/search-long-tail)"_.
