---
layout: ../../layouts/blog.astro
slug: 'info-2023-dec-22-large-language-models-and-generative-ai-a-recent-hack-day'
headline: 'Large language models and generative AI: a recent hack day'
date: '2023-12-22'
authors: [Rasha Ardati]
standfirst: 'Developers in the Product and Engineering department came together with colleagues from across the Guardian to explore the potential of LLMs and more'
image:
  url: 'https://media.guim.co.uk/606f5ac0f77c78cd168dd713f386f99b09c2c71f/0_165_5000_3002/5000.jpg'
  alt: 'AI hand reaches towards a human hand as a spark of understanding technology reaches across to humanity'
  credit: 'Photograph: John Williams RF/Alamy'
tags: [Hack day]
---

The discussion of large language models (LLMs) and generative artificial intelligence was everywhere in 2023 – not least in the Guardian’s Product and Engineering department. Hack days are a staple part of the software development culture, so it was no surprise that at this year’s final hackathon, several developers and data scientists focused their attention in this area – covering potential applications in podcasting, search and image generation. And who wouldn’t want a browser extension that assesses the mood of a news article and finds an appropriate music track to enhance your reading experience?

In total, the teams, including colleagues from across the Guardian, produced and presented 24 hacks in the course of the two-day event – some of which took an entirely different turn. These included: a product that spits out cultural recommendations; a dedicated platform for showcasing [Guardian documentaries](https://www.theguardian.com/documentaries); experiments with ChatGPT and Google Bard involving tools like Trello to improve efficiency; and a Guardian-themed generative AI screensaver.

Here are three acts that won an award:


   <figure>
   <img alt="crosswordsplus hack screenshot" src="https://i.guim.co.uk/img/media/988bbb648846d02008d61df0696d36f2a871f605/0_0_1179_2556/master/1179.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=5be71600064ad736b0402b06b27bfed9" loading="lazy" />
   <figcaption>
     crosswordsplus hack screenshot
    <i>Photograph: Dana Dramowiczs/The Guardian</i>
    </figcaption>
    </figure>

**Best** **technical hack: CrosswordsPlus**

Play crosswords with your friends in real time with the Guardian’s [Puzzles and Crosswords app](https://apps.apple.com/gb/app/guardian-puzzles-crosswords/id1487780661) on iOS. Built using SharePlay, a native iOS framework, this hack enabled multiplayer functionality even if the user is not signed-in. Apple takes care of the data transfer and offers end-to-end encryption – you just simply start a session using FaceTime, iMessage or AirDrop.

**Best** **entertaining hack: 5/15s in 515s**

A hack which takes a weekly “5/15” report – through which teams update on their progress – and converts it into an audio podcast that is 515 seconds long. Perfect for any manager who might not otherwise have time to read everything! The hack works by using an OpenAI GPT-3.5 model to summarise each team’s report before converting this into audio using a ext to speech model.


   <figure>
   <img alt="5/15s hack presentation screenshot" src="https://i.guim.co.uk/img/media/71a78c22f50f1b9c0091b6a5f88279a659613135/28_0_960_576/master/960.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=7ed4d7fd1bd4173c51e9c1cbfb7e6773" loading="lazy" />
   <figcaption>
     5/15s hack presentation screenshot
    <i>Illustration: Mahesh Makani/The Guardian</i>
    </figcaption>
    </figure>

**Most Artificially Intelligent hack: Linguini Labelling Method**

Building labelled training datasets is crucial for successful machine learning projects, especially in Natural Language Processing (NLP) – but this process is often laborious and time-consuming. Quite often you need multiple annotators labelling thousands of examples to build a performant model, and ideally you want them to annotate the same examples and to reach a good level of agreement.

The idea for this hack was to leverage the ability of Large Language Models (LLMs) to recognise concepts in text and use them as additional annotators to speed up the process and make it more robust. The proposed pipeline integrates various LLMs alongside human annotators: when both entities agree on a data point, it seamlessly enters the training dataset; if discrepancies arise, a human review is triggered, focusing efforts solely on annotating “difficult” examples, maximising efficiency.


   <figure>
   <img alt="LLM hack presentation screenshot" src="https://i.guim.co.uk/img/media/535cff424c1239be81a4cfa1d014240057054ad1/75_0_3297_1980/master/3297.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=7c277d7305bbd1aceedb507d5d6ee6fa" loading="lazy" />
   <figcaption>
     LLM hack presentation screenshot
    <i>Photograph: AnnaV Vissens/The Guardian</i>
    </figcaption>
    </figure>
