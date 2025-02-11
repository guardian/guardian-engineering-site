---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-mar-17-articles-dont-write-themselves-or-do-they'
headline: 'Articles don''t write themselves... or do they?'
date: '2014-03-17'
authors: [Will Franklin]
standfirst: 'How one developer took on the challenge of automating journalism with an article-generating robot'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/3/17/1395060974737/120d69ba-a76d-46dc-8aa6-e75bd14594c3-bestSizeAvailable.png'
  alt: 'Auto-generating articles'
  credit: 'Photograph: Guardian'
tags: [Robots]
---

There’s nothing particularly new about the idea of automatically writing articles. Indeed, in areas such as finance, where there is an abundance of structured data, several companies claim to generate “human-friendly” market reports. A couple of weeks ago, a journalist at the Guardian asked how hard could it really be, so I thought I’d give it a go. What follows is an explanation of how it was done – you might also be interested in reading [Leila’s write up](https://www.theguardian.com/media/shortcuts/2014/mar/16/could-robots-be-journalist-of-future) about robot journalism.

I used the Guardian’s [Content API](https://www.theguardian.com/open-platform) to trawl our articles for commonly-used words and phrases on a given subject and tagged potentially interesting results using [NLTK](http://www.nltk.org/). This meant that I could filter out things like auxiliary verbs, while keeping interesting words such as proper nouns, which were likely to be a person or place of relevance.

To turn the list of words into a paragraph I drew inspiration from [SCIgen](http://pdos.csail.mit.edu/scigen/), a tool famous for generating fake scientific papers. It uses a [context-free grammar](http://en.wikipedia.org/wiki/Context-free_grammar), which essentially contains a set of rules with gaps which can be filled by other rules. Now there’s a terrible explanation if ever I’ve seen one. Here’s an example:

> SENTENCE This is a GAP. Hello NAME.  
> GAP gap  
> NAME World  
> NAME someone

The first word on each line is the name of the rule. By expanding the rule SENTENCE, we can generate the following:

> This is a gap. Hello World  
> This is a gap. Hello someone

The idea was to create a set of sentences with gaps for certain types of words. For example, where NNP is a proper noun, RB is an adverb and VB is a verb, the following could make a reasonable sounding sentence:

> SENTENCE NNP was last seen RB VB with NNP

The [source code for my final solution is public on GitHub](https://github.com/wpf500/guarbot). In particular, the rules used are [here](https://github.com/wpf500/guarbot/blob/master/app/rules/base.rules). Here is what GUARBOT’s feelings are on quinoa:

> The crime-ridden family of quinoa has taken US by storm this month. According to Peru, New York has confirmed that quinoa is more story than anything else they’ve ever seen. Quotes from top Yotam Ottolenghi eaters suggest that “crop” is currently clear top, possibly more than ground black pepper. Experts say both Salt and University need to traditionally grow to strengthen a common solution. Finally, it is worth slightly rattling that this article was peeled until it made sense.

The results certainly aren’t going to put anyone out of a job. The problem is that GUARBOT doesn’t understand what it is using to fill gaps. While it will create (mostly) grammatically correct articles, it seldom results in a compelling read. If it could determine what context to use words in, then that would at least be a step in the right direction.

Maybe we really do still need journalists, maybe articles really don’t write themselves... but realistically, it seems difficult to draw any conclusions from a badly researched, hastily coded and all round incomplete investigation. It was fun though.
