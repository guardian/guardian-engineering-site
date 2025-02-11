---
layout: ../../layouts/blog.astro
slug: 'info-2023-dec-11-making-typerighter-work-harder-engineering-blog'
headline: 'Making Typerighter work harder'
date: '2023-12-11'
authors: [Rhys Mills]
standfirst: 'How we improved Typerighter, the Guardian’s style guide checker, to provide more value for the Guardian and its readers'
image:
  url: 'https://media.guim.co.uk/a52876b3e601b211e2f393634b9ddd64b232ba53/0_133_1139_683/1139.jpg'
  alt: 'A screenshot showing the Collins spellchecker in use. It suggests replacing ''archeological'' with ''archaeological''.'
  credit: 'Illustration: Rhys Mills'
tags: [Typerighter]
---

Minimising typos is important to a newspaper. Publishing messy prose might undermine trust in our overall quality control – why trust our political reporting if we can’t spell Thérèse Coffey’s name? We want to provide accurate information, and typos can mutate meaning – a single letter can transform a fiend to a friend and [a bowl to a bowel](https://www.theguardian.com/media/2021/may/12/guardian-200-typo-negative-best-worst-grauniad-mistakes). Worse, a missing word can turn a holy text into [a wicked one](https://www.theguardian.com/world/2022/may/02/rare-wicked-bible-that-encourages-adultery-discovered-in-new-zealand).

The Guardian is in the business of words, and we’re keen to [avoid](https://www.theguardian.com/media/2021/may/14/from-a-standing-fart-readers-on-their-favourite-grauniad-mistakes) “idiosyncratic” spelling decisions. That’s [why we built Typerighter](https://www.theguardian.com/help/insideguardian/2020/nov/20/introducing-typerighter-making-life-easier-for-journalists-and-stories-better-for-readers), a tool that offers recommendations from our [style guide](https://www.theguardian.com/guardian-observer-style-guide-a) into our content management system – Composer – and highlights errors well before the articles get in front of our readers.

My engineering colleagues have already written about [the construction of Typerighter](https://www.theguardian.com/info/2021/jan/26/how-we-made-typerighter-the-guardians-style-guide-checker). This is the story of Typerighter’s next steps – how we improved it to provide more value for the Guardian and its readers.

Where we left off
-----------------

Until this year, [Typerighter](https://github.com/guardian/typerighter) used a set of “rules” for checking text, created largely by a Guardian subeditor, [Max Walker](https://www.theguardian.com/help/insideguardian/2020/nov/20/introducing-typerighter-making-life-easier-for-journalists-and-stories-better-for-readers), (who wrote [an intro for the tool](https://www.theguardian.com/help/insideguardian/2020/nov/20/introducing-typerighter-making-life-easier-for-journalists-and-stories-better-for-readers) a few years back) and stored in a Google sheet. These rules were ingested by our Typerighter Checker service, a [Scala Play](https://www.playframework.com/) web app which used the [LanguageTool](https://languagetool.org/) library. As writers and editors made changes to text in Composer, Composer would send it to Typerighter, which would spot potential problems and provide suggested corrections.


   <figure>
   <img alt="A diagram showing the structure of Typerighter." src="https://i.guim.co.uk/img/media/107e624ff50c16772b58f4276b03d3ac91d8c1f5/0_0_1472_1045/master/1472.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=25f676da1ae0e985927d4b6b2f101f02" loading="lazy" />
   <figcaption>
     The structure of Typerighter before recent work. Pre-existing components are white. Components shaded in blue were written for the Typerighter service.
    <i>Illustration: Jonathan Herbert</i>
    </figcaption>
    </figure>

Typerighter had two kinds of rule: manually curated [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) – which would search text for regex patterns relating to the Guardian’s style guide – and more complex XML-based LanguageTool rules, usually finding common grammatical errors. So, for example, if a journalist writes _World Health Organisation_, Typerighter will suggest the correct _World Health Organization_. If they started a sentence without a capital letter, Typerighter will suggest adding one.


   <figure>
   <img alt="A screenshot of Typerighter suggesting a correction in Composer." src="https://i.guim.co.uk/img/media/ab5285bea30f0dcb2d6fdad368368cf6b6ce89ca/314_12_1392_835/master/1392.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=96eab1c781b62ea8bb037a892e7e65e0" loading="lazy" />
   <figcaption>
     Typerighter suggests a correction in Composer.
    <i>Illustration: Guardian Design</i>
    </figcaption>
    </figure>

What happened next
------------------

Introducing Typerighter helped us reduce the overall volume of errors in our published content. But some errors still snuck past, [keeping our reader’s editor busy](https://www.theguardian.com/theguardian/series/correctionsandclarifications). Why? For a start, Typerighter wasn’t everywhere it needed to be; most notably, it wasn’t in the editing system for our [live blogs](https://www.theguardian.com/tone/minutebyminute), which have become an increasingly important way of delivering news to our readers. This was a problem because the live blog is written and published virtually in real time – a perfect environment for typos to creep in.

The live blog was still based on our deprecated rich text editor, Scribe, which was incompatible with Typerighter. So we migrated the live blog (and various other rich text editors in Composer) to our favoured rich text editor of today – [ProseMirror](https://prosemirror.net/) – which Typerighter was designed to operate with. Typerighter was almost everywhere we wanted it to be, but a problem remained.

While we could cover mistakes for our style guide, we’d never catch everything – bespoke regex rules were an impractical solution for catching all the possible typos of valid English language words. The Guardian’s “house dictionary”, Collins, which journalists defer to when the style guide doesn’t have a ruling on something, has about 300,000 words, and, when you factor in all the possible misspellings of those words, we would have to search for many millions of variants.

We needed a general-purpose spellchecker, based on the Collins dictionary, to extend Typerighter beyond its existing rules, catching typos through a separate mechanism and making sensible suggestions quickly.

One last hitch
--------------

There was one obstacle to our ambitions in the existing architecture of Typerighter: the Google spreadsheet that served as a home for our rules. Until now, it was mostly fit for purpose – so in the spirit of avoiding premature optimisation, we kept it.

Now, it was time to move on. The sheet was no longer practical – with 13,000 rows it already felt clunky for the journalists who maintained and updated the rules, and adding 300,000 more rows representing the words in the dictionary was out of the question. The spreadsheet was easy to break by accidentally deleting things, there wasn’t a clear audit trail for changes and it wasn’t particularly user-friendly because it contained lots of technical data that editors didn’t need to see.

What architecture would we use? Well, this wasn’t quite a greenfield project, we already had a Typerighter repository where we had a Scala [Play web application](https://www.playframework.com/) – the Checker service. We could choose a new architecture for the Rule Manager, but this would add another set of technologies for Typerighter software developers to learn and master. So we built the Rule Manager as a second Play app within the repository – we had no reason to introduce a new paradigm when Play would fit our needs.

We had an abstraction in place that made it simple to add a new service in place of the Google sheet – the Checker read its rules from a published JSON artefact – and it didn’t matter to the Checker whether it came from the Google Sheet or was produced by our new Rule Manager service.

One addition we _would_ need was somewhere to store our rules, where we could make additions and query existing data in a performant manner. This sounded like a relational database; we went with Postgres, a powerful and flexible database with strong text search options and some use across other Guardian projects, such as Composer.

With a sprinkling of UI magic from our product designer, and making use of React and the ElasticUI interface library (recommended by colleagues in our Investigations & Reporting team), we built the Rule Manager, a modern, user-friendly tool for managing Typerighter’s rules. With a tool powerful enough to manage a dictionary’s worth of rules we could move on to our next phase.


   <figure>
   <img alt="A screenshot of the Rule Manager service in use." src="https://i.guim.co.uk/img/media/11c95484439b8e0997929fbe17b14215fbbc4cdc/0_0_2791_1598/master/2791.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=0404ede4427aad20398c5c65ce92df93" loading="lazy" />
   <figcaption>
     The Rule Manager service in action.
    <i>Illustration: Rhys Mills</i>
    </figcaption>
    </figure>

Building the spellchecker
-------------------------

To build our spellchecker, we first needed a dictionary. We struck a deal with the wonderfully helpful people at Collins to get access to a data representation of the Collins English Dictionary. We then ingested Collins’ list of words into our Rule Manager database, creating a third rule type – the Dictionary Rule. With 10 times the number of rules as before, we quickly encountered new performance problems, and had to tighten up some inefficiencies that we’d previously gotten away with.

With those teething problems resolved, we could use the words to create our spellchecker. We pair the words with their frequencies in the English language, and provide them to a LanguageTool instance, which finds strings that aren’t valid words in its dictionary, and identifies any valid words within an [edit distance](https://en.wikipedia.org/wiki/Edit_distance) of three of those strings, ranking them by word frequency. We plug that LanguageTool instance into the Checker’s existing interface (as a new matcher in our MatcherPool) to provide spellchecking for our users in Composer.

Because subeditors can modify the words recognised by the spellchecker in our Rule Manager, we can add neologisms as they enter the language, or remove words we don’t particularly want it to suggest as valid spellings (for example, the many pejoratives that are valid English words which we wouldn’t want to write in an article).


   <figure>
   <img alt="A diagram of the updated Typerighter architecture, with an added Postgres Database storing rules, the addition of dictionary rules, and a React and ElasticUI Rule Manager client." src="https://i.guim.co.uk/img/media/501c0c5bac2cbb90b8fcd2cbee75b3423adec81b/0_0_1468_1045/master/1468.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=b97fe7d3c6ffe81c7e61ba0651999e4f" loading="lazy" />
   <figcaption>
     Typerighter’s architecture now looked like this (additions in blue).
    <i>Illustration: Rhys Mills & Jonathan Herbert</i>
    </figcaption>
    </figure>

We were now ready to enter testing with a small number of users. Initial results were promising – but we quickly hit a snag. The Guardian publishes content on events from around the world, and our writers regularly use proper nouns that aren’t in our dictionary. The spellchecker would often flag them as typos and usually make poor suggestions – we wanted to ignore words that were likely to be unrecognised but valid names.

Fortunately for us, the Data Science team at the Guardian were way ahead of us, and had already built a very good named entity recognition (NER) model, trained on Guardian content, and a service to interact with it – providing a means to identify real-world objects like names and places. Plugged into that NER service and ignoring entities that it flagged – the Typerighter Collins dictionary was good to go. Composer would have its own spellchecker, built exactly for the Guardian’s needs.

What’s next?
------------

With the Rule Manager in place, and the Collins spellchecker wired in, Typerighter can do an even better job of supporting consistency in the content we produce. That said, there are bound to be some snags. Some problems can be solved by engineers, but many will be solvable by users of the rule manager – journalists who’ll be able to tweak our ruleset themselves.

For now, our core focus as engineers will move on to our other tools, like Composer and the [Grid](https://github.com/guardian/grid) – and trying to figure out new ways to make our colleagues’ lives easier.
