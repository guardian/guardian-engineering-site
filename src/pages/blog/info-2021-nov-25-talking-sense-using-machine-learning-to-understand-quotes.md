---
layout: ../../layouts/blog.astro
slug: 'info-2021-nov-25-talking-sense-using-machine-learning-to-understand-quotes'
headline: 'Talking sense: using machine learning to understand quotes'
date: '2021-11-25'
authors: [Alice Morris, Michel Schammel, Anna Vissens]
standfirst: 'The Guardian’s data scientists have been working with other newsrooms on a global project to think about AI and journalism. Here they explain how they have been teaching a machine to understand what a quote is'
image:
  url: 'https://media.guim.co.uk/67f98e4dedc0ff5866a826a2894bf5f5e4aabef3/0_166_5886_3531/5886.jpg'
  alt: 'Microphones at a press conference'
  credit: 'Photograph: Jacques Witt/SIPA/REX/Shutterstock'
tags: [ML]
---

For the last six months, we have been part of the 2021 [JournalismAI Collab Challenges](https://blogs.lse.ac.uk/polis/2021/03/23/journalismai-collab-challenges/), a project connecting global newsrooms to understand how artificial intelligence can improve journalism. Our particular challenge was to answer this question:

_“How might we use modular journalism and AI to assemble new storytelling formats and reach_ _underserved audiences?”_

Participating newsrooms were organised into teams to define the challenges they would work on, imagine potential solutions, and turn them into prototypes. Our team included newsrooms from across Europe, Africa and the Middle East. Although we all attract different audiences, produce different types of content and have different business models, we share some of the same fundamental challenges.

Modules were defined as fragments of a story that live independently, can be repurposed, or even be replaced by another fragment. Based on this definition, quotes strongly qualify as a module.

There are a number of good reasons for using AI to identify quotes, from creating new content from them to tracking shifting opinions on the same subject over time, and fact checking. Another interesting use case is revealing hidden insights about our journalism. Who are our sources? How diverse are they? How often do we quote the same people or organisations? Do we give the same exposure to different gender and ethnic groups?

What is a quote?
----------------

The Guardian joined forces with Agence France-Presse (AFP) to work on a machine learning solution to accurately extract quotes from news articles and match them with the right source.

Existing solutions did not work that well on our content. The models struggled to recognise quotes that did not match a classic pattern such as:

_They admitted: “The model was trained on a limited number of quotation styles.”_

Some models were returning too many false positives and identifying generic statements as quotes. For example:

_The government announced on Thursday that the means-tested support families receive with their care would not be counted towards the £85,000 total, meaning those with relatively modest assets could still see themselves paying that amount in full._

Co-referencing, the process of establishing the source of a quote by finding the correct reference in the text, was also an issue, especially when the source’s name was mentioned several sentences or even paragraphs before the quote itself.

Our previous attempts to solve this problem using regular expressions (sequences of characters that specify a search pattern) stumbled over words that content creators decided to put in quotation marks to indicate non-standard English terms (such as “woke”). We wanted to see if we could teach a machine to understand the difference between these two speech constructs. There was also an extra benefit in trying the machine learning approach as we could better mitigate typos resulting in mismatching or missing quotation marks or sources quoted inside another quote.

First, we needed a clear definition of a quote. We decided to use the [Wikipedia](https://en.wikipedia.org/wiki/Quotation) definition as our starting point:

_“A quotation is the repetition of a sentence, phrase, or passage from speech or text that someone has said or written. In oral speech, it is the representation of an utterance (ie of something that a speaker actually said) that is introduced by a quotative marker, such as a verb of saying. For example: John said:_ _‘I saw Mary today.’_ _Quotations in oral speech are also signalled by special prosody in addition to quotative markers. In written text, quotations are signalled by quotation marks.”_

Following this definition we made a design decision to clearly separate paraphrases and quotes and focus our efforts on identifying text in quotation marks only.

Deep learning to the rescue
---------------------------

To train a model to identify quotes in text we used two tools created by [Explosion](https://explosion.ai/about). [Spacy](https://spacy.io/) is one of the leading open-source libraries for advanced natural language processing using deep neural networks. [Prodigy](https://prodi.gy/) is an annotation tool that provides an easy-to-use web interface for quick and efficient labelling of training data.

Together with our AFP colleagues we manually annotated more than 800 news articles with three entities: _content_ (the quote, in quotation marks), _source_ (the speaker, which might be a person, an organisation, etc), and _cue_ (usually a verb phrase, indicating the act of speech or expression).


   <figure>
   <img alt="Prodigy screengrab" src="https://i.guim.co.uk/img/media/d1e87fe47d7e1fd50e6625a4004b2d68b4f76a4d/0_12_1999_1200/master/1999.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=b76694da17d60602880f1bce3f0e8205" loading="lazy" />
   <figcaption>
     Annotation tool Prodigy’s UI with three labels for source, content and cue.
    <i>Photograph: Prodigy</i>
    </figcaption>
    </figure>

Stick to the style guide, please!
---------------------------------

Before rolling up our sleeves we needed to create a very clear and concise guide for annotating our data. To minimise noise and uncertainty in the training dataset we had to make sure that multiple annotators would understand the task in the same way.

[The Guardian’s style guide](https://www.theguardian.com/guardian-observer-style-guide-q) offers an overview of how writers should quote sources. It was a good starting point and we found it very useful. However, we discovered that many quotes in our content deviated significantly from the suggested rules in this guide.

From the first model based on regular expressions we inherited a long list of different quotation styles and constructs. Initially, we counted 12 different ways journalists include quotes in their writing but we added many more during the annotation process.

_“If only all quotes were like this,” we moaned._

The last item in this long list of different constructs was this one:

_The annotator got annoyed and said: “When we thought we had listed all the quote styles we found this …” she said._ 🙇

You can find the complete list in our public GitHub [here](https://github.com/JournalismAI-2021-Quotes/quote-extraction/blob/main/annotation_rules/Quote%20annotation%20guide.pdf).

Michaëla Cancela-Kieffer, AFP deputy news editor for editorial projects, says: “I like the idea that AI forces us to deconstruct our habits and understand how we do things, and what steps we take before telling the model what the rules are. By doing that we can sometimes identify necessary changes and improve our original ‘real life’ processes. That is why this type of experiment could also lead to changes in our style guide.”

Human learning and machine learning
-----------------------------------

The main challenge in building the training dataset was navigating the ambiguity of different journalistic styles. For several days, we discussed dozens of cases where it was difficult to make the right choice.

How should we treat song lyrics or poems? What about messages on placards? What if someone quotes their thoughts, something that has not been said aloud?

The first batch of our annotations turned out to be quite noisy and inconsistent but we were getting better and better with each iteration.

Collectively we experienced the same teaching process we were putting our model through. The more examples we looked at, the better we became at recognising different cases. Yet the question remained – if it is difficult for a human to make these decisions, can we teach a machine to cope with this task?

The results looked promising, especially for the _content_ entity. The model managed to identify all three entities (_content_, _source_, _cue_) correctly in 89% of cases. Considering each entity separately, _content_ scored the highest (93%) followed by _cue_ (86%) and _source_ (84%).

Interestingly, we achieved these results by discarding the very first annotations we made, indicating that we became much better and aligned between each other as we continued annotating more examples.

The difference between the three entities is not surprising. The _content_ entity is encompassed in quotation marks, thus punctuation is a strong signal for matching this entity type. However, not every phrase in quotation marks is a quote – quotation marks are also used for other stylistic choices, adding noise to the entity extraction task. From our preliminary analysis, it looks like our model has learned to distinguish between genuine quotes and words in quotes indicating either non-standard terms or stylistic choices.

To evaluate our model, we used the strictest way of measuring the performance of named entity recognition, namely each predicted entity needs to match exactly (from start to end) with respect to the annotated data. Even in cases where the model is getting it wrong, we often find that it managed to partially match the entity. This is especially true for _source_ entities.

What’s next?
------------

Moving forward we need to build a robust coreference resolution system. We would like to explore deep learning options to help us with this mission.

Another challenge will be to identify meaningful quotes – content that is worth storing for future references. We are confident that a combination of machine learning, existing metadata about articles, and additional information extracted from _sources_ and _content_ might give us a strong signal for classifying quotes.

Another application would be a user interface for discovering quotes. This would enable journalists to surface previous quotes quickly in order to check them against current statements or to enrich their articles.

“This could lead to a user-facing tool with multiple applications. The data generated by that search could in return inform the newsroom about users’ interests,” says Cancela-Kieffer.


   <figure>
   <img alt="QuoteMachine screengrab" src="https://i.guim.co.uk/img/media/17ad09fdd4b0d1e4cb8b8452d5403d03d50bc7f3/87_28_1788_1073/master/1788.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=f7222262e4d6911df625cee7a8bb63d2" loading="lazy" />
   <figcaption>
     A prototype of QuoteMachine, a user-facing tool built by AFP’s Arnaud Pichon and Fred Bourgeais.
    <i>Photograph: QuoteMachine</i>
    </figcaption>
    </figure>

Chris Moran, the head of editorial innovation at the Guardian, says: “We’re committed to thinking about AI and automation through a journalistic lens, and will be experimenting as much as we can to find the really positive ways we can apply it and avoid the pitfalls.”

Attempting to identify and extract quotes from news articles using ML may seem arcane to some. But the potential benefits to readers, journalists and editors could be considerable – from making sure we are giving a platform to those who are often under-represented, to building products and formats that tell the whole story, rather than defaulting to a simple “he said, she said” formula.

Watch this space, we hope to update you on our progress soon.

_This project is part of the [2021 JournalismAI Collab Challenges](https://blogs.lse.ac.uk/polis/2021/03/23/journalismai-collab-challenges/), a global initiative that brings together media organisations to explore innovative solutions to improve journalism via the use of AI technologies. It was developed as part of the EMEA cohort of the Collab Challenges that focused on modular journalism with the support of [BBC News Labs](https://bbcnewslabs.co.uk/) and [Clwstwr](https://clwstwr.org.uk/)._

_[JournalismAI](https://www.lse.ac.uk/media-and-communications/polis/JournalismAI) is a project of [Polis](https://www.lse.ac.uk/media-and-communications/polis) – the journalism thinktank at the London School of Economics and Political Science – and it’s sponsored by the [Google News Initiative](https://newsinitiative.withgoogle.com/). If you want to know more about the Collab Challenges and other JournalismAI activities, [sign up for the newsletter](https://mailchi.mp/lse.ac.uk/journalismai) or get in touch with the team via [hello@journalismai.info](mailto:hello@journalismai.info)_
