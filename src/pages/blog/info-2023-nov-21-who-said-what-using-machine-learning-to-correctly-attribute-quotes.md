---
layout: ../../layouts/blog.astro
slug: 'info-2023-nov-21-who-said-what-using-machine-learning-to-correctly-attribute-quotes'
headline: 'Who said what: using machine learning to correctly attribute quotes'
date: '2023-11-21'
authors: [Michel Schammel, Alice Morris, Anna Vissens, Paul Nathan, Alicja Polanska, Tara Tahseen]
standfirst: 'Today’s blog does not come to you from any developer in product and engineering but from our talented colleagues in data and insight'
image:
  url: 'https://media.guim.co.uk/0eacbae957f479928c88ce133ce6ad29ba596e5a/1356_0_4163_2500/4163.jpg'
  alt: 'Innovating Horizontal Concept'
  credit: 'Photograph: DrAfter123/Getty Images'
tags: [ML]
---

Here, the Guardian’s data scientists share how they have teamed up with PhD students from University College London to train a machine learning model to accurately attribute quotes. Below the two teams explain how they’ve been teaching a machine to understand “who said what?”

Michel, Anna, Alice – The Guardian
----------------------------------

**Why do we care so much about quotes?**

As we discussed in [Talking sense: using machine learning to understand quotes](https://www.theguardian.com/info/2021/nov/25/talking-sense-using-machine-learning-to-understand-quotes), there are many good reasons for identifying quotes. Quotes enable direct transmission of information from a source, capturing precisely the intended sentiment and meaning. They are not only a vital piece of accurate reporting but can also bring a story to life. The information extracted from them can be used for fact checking and allow us to gain insights into public views. For instance, accurately attributed quotes can be used for tracking shifting opinions on the same subject over time, or to explore those opinions as a function of identity, e.g. gender or race. Having a comprehensive set of quotes and their sources is thus a rich data asset that can be used to explore demographic and socioeconomic trends and shifts.

We had already used AI to help with accurate quote extraction from the Guardian’s extensive archive, and thought it could help us again for the next step of accurate **quote attribution**. This time, we turned to students from **UCL’s Centre for Doctoral Training in Data Intensive Science**. As part of their PhD programme that involves working on industry projects, we asked these students to explore deep learning options that could help with quote attribution. In particular, they looked at machine learning tools to perform a method known as **coreference resolution**.

Tara, Alicja, Paul – UCL
------------------------

**What is coreference resolution?**

In everyday language, when we mention the same entity multiple times, we tend to use different expressions to refer to it. The task of **coreference resolution** is to group together all mentions in a piece of text which refer back to the same entity. We call the original entity the **antecedent** and subsequent mentions, **anaphora**. In the simple example below:

> **Sarah** enjoys a nice **cup of tea** in the morning. **She** likes **it** with milk.

**Sarah** is the antecedent for the anaphoric mention ‘**She**’. The antecedent or the mention or both can also be a group of words rather than a single one. So, in the example there is another group consisting of the phrase **cup of tea** and the word **it** as coreferring entities.

**Why is coreference resolution so hard?**

You might think grouping together mentions of the same entity is a trivial task in machine learning, however, there are many layers of complexity to this problem. The task requires linking ambiguous anaphora (e.g. _“she”_ or _“the former First Lady”_) to an unambiguous antecedent (e.g. _“Michelle Obama”_) which may be many sentences, or even paragraphs, prior to the occurrence of the quote in question. Depending on the writing style, there may be many other _entities_ interwoven into the text that don’t refer to any mentions _of interest._ Together with the complication of mentions, potentially being several words long, makes this task even more difficult.

In addition, sentiment conveyed through language is highly sensitive to the choice of words we employ. For example, look how the antecedent of the word they shifts in the following sentences because of the change in verb following it:

_The city councilmen refused the demonstrators a permit because they **feared** violence._

_The city councilmen refused the demonstrators a permit because they **advocated** violence._

(These two subtly different sentences are actually part of the [Winograd schema](https://en.wikipedia.org/wiki/Winograd_schema_challenge) challenge, a recognized test of machine intelligence, which was proposed as an extension of [the Turing Test](https://en.wikipedia.org/wiki/Turing_test), a test to show whether or not a computer is capable of thinking like a human being.)

The example shows us that grammar alone cannot be relied on to solve this task; comprehending the semantics is essential. This means that rules-based methods cannot (without prohibitive difficulty) be devised to perfectly address this task. This is what prompted us to look into using machine learning to tackle the problem of coreference resolution.

**Artificial Intelligence to the rescue**

A typical machine learning heuristic for coreference resolution would follow steps like these:

*   Extract a series of mentions which relate to real-world entities
    
*   For each mention, compute a set of features
    
*   Based on those features, find the most likely antecedent for each mention

The AI workhorse to carry out those steps is a _language model_. In essence, a language model is a _probability distribution_ over a sequence of words. Many of you have probably come across [OpenAI’s ChatGPT,](https://chat.openai.com/auth/login) which is powered by a large language model.

In order to analyse language and make predictions, language models create and use _word embeddings_. Word embeddings are essentially mappings of words to points in a semantic space, where words with similar meaning are placed close together. For example, the location of the points corresponding to ‘cat’ and ‘lion’ would be closer together than the points corresponding to ‘cat’ and ‘piano’.

Identical words with different meanings (\[river\] bank vs bank \[financial institution\], for example) are used in different contexts and will thus occupy different locations in the semantic space. This distinction is crucial in more sophisticated examples, such as the Winograd Schema. These embeddings are the features mentioned in the recipe above.

Language models use word embeddings to represent a set of text as numbers, which encapsulate contextual meaning. We can use this numeric representation to conduct analytical tasks; in our case, coreference resolution. We show the language model lots of labelled examples (see later) which, in conjunction with the word embeddings, train the model to identify coreferent mentions when it is shown text it hasn’t seen before, based on the meaning of that text.


   <figure>
   <img alt="An example of word embedding space with semantic relationships between words" src="https://i.guim.co.uk/img/media/8222c06bb6a9167a460df9ebb02f14ad212407ef/0_0_1951_1029/master/1951.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=c169feb92f819bf02dcf1df6f46e123a" loading="lazy" />
   <figcaption>
     An example of word embedding space with semantic relationships between words
    <i>Illustration: Samy Zafrany/www.samyzaf.com</i>
    </figcaption>
    </figure>

For this task, we chose language models built by ExplosionAI as they fitted well with the Guardian’s current data science pipeline. To use them, however, they needed to be properly trained, and to do that we needed the right data.

**Training the model using labelled data**

An AI model can be taught by presenting it with numerous labelled examples illustrating the task we would like it to complete. In our case, this involved first manually labelling over a hundred Guardian articles, drawing links between ambiguous mentions/anaphora and their antecedent.

Though this may not seem the most glamorous task, the performance of any model is bottlenecked by the quality of the data it is given, and hence the data-labelling stage is crucial to the value of the final product. Due to the complex nature of language and the resulting subjectivity of the labelling, there were many intricacies to this task which required a rule set to be devised to standardise the data across human annotators. So, a _lot_ of time was spent with Anna, Michel and Alice on this stage of the project; and we were all thankful when it was complete!


   <figure>
   <img alt="An example of the annotation process – creating the coreference relationships" src="https://i.guim.co.uk/img/media/9a7c3b4aab1595ffbb826abee8e548f0678ce0a6/0_0_1498_1620/master/1498.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=03fa16ab1d7d31c14236fa7c46f05e7a" loading="lazy" />
   <figcaption>
     An example of the annotation process – creating the coreference relationships
    <i>Illustration: Michel Schammel/The Guardian</i>
    </figcaption>
    </figure>

Although tremendously information rich and time-consuming to produce, one hundred annotated articles was still insufficient to fully capture the variability of language that a chosen model would encounter. So, to maximise the utility of our small dataset, we chose three off-the-shelf language models, namely [Coreferee](https://github.com/msg-systems/coreferee), [Spacy’s coreference](https://spacy.io/api/coref) model and [FastCoref](https://arxiv.org/abs/2209.04280) that have already been trained on hundreds of thousands of generic examples. Then we ‘fine-tuned’ them to adapt to our specific requirements by using our annotated data.

This approach enabled us to produce models that achieved greater precision on the Guardian-specific data compared with using the models straight out of the box.

These models should allow matching of quotes with sources from Guardian articles on a highly automated basis with a greater precision than ever before. The next step is to run a large-scale test on the Guardian archive and to see what journalistic questions this approach can help us answer.
