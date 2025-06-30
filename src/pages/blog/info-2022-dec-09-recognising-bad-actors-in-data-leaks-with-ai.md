---
layout: ../../layouts/blog.astro
slug: 'info-2022-dec-09-recognising-bad-actors-in-data-leaks-with-ai'
headline: 'Recognising ‘bad actors’ in data leaks with AI'
date: '2022-12-09'
authors: [Luis Flores, Michel Schammel, Anna Vissens]
standfirst: 'How the Guardian has been working with partners to use AI to help investigative journalists find persons of interest in large data sets'
image:
  url: 'https://media.guim.co.uk/1cbead729a093e65a3976f0b985942c2ceac066a/0_0_3936_2362/3936.jpg'
  alt: 'A person using a laptop'
  credit: 'Photograph: Dominic Lipinski/PA'
tags: []
---

For the [2022 JournalismAI fellowship](https://www.lse.ac.uk/media-and-communications/polis/JournalismAI/Fellowship-Programme), the Guardian teamed up with Daily Maverick and Follow the Money with a shared aim to uncover ‘bad actors’ hidden in extensive digital corpora, of which whistleblower leaks have become the most emblematic example.

Investigative journalism involves large data dumps and a lot of manual work. Our aim in this project was to build a pipeline powered by AI to automatically surface and organise people of interest from data leaks. This would make uncovering “bad actors” quicker and easier, and lead to exclusive stories.

Handling, investigating, and visualising large quantities of data invariably involves several steps — from obtaining the data, to using multiple tools to search for entities (people or organisations) in this data and finding the connections between them. In our experience, one of the big challenges newsrooms face in this process is matching the entities they are able to extract from large datasets — using Natural Language Processing (NLP) — to real world people, places and things. For instance, linking multiple individuals with political interests sharing the same surname to the right person is often a far from trivial task.

Entity linking pipeline
-----------------------

The aim of the project was to train an entity linker, a model which disambiguates entities mentioned in text (‘Document’ in the diagram below) by linking them to unique identifiers. This requires a database (Knowledge base), as well as a function to generate plausible candidates from that database, and a machine learning model to pick the right candidate using the local context of the mention.


   <figure>
   <img alt="An end-to-end entity linking pipeline" src="https://i.guim.co.uk/img/media/29035295d0557d19fb3cc21b1adab43c69e135b4/0_0_1010_504/master/1010.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=8a2c113dcccb5776de14cc2bebc6abbf" loading="lazy" />
   <figcaption>
     An end-to-end entity linking pipeline; a model which disambiguates entities mentioned in text
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

Named entity recognition (NER) is the process of locating and classifying named entities mentioned in text into predefined categories, such as person, organisation, or location.

Once we extract mentions of personal names in text, the entity linker should be able to identify the right candidate for the mention and provide a link back to the knowledge base.

To train our prototype we decided to use a set of articles from the Guardian newsroom. This had several advantages, including that it was readily accessible via [the Guardian’s content API](https://open-platform.theguardian.com/), and contained a wide range of well-known entities to develop and validate our approach.

At the same time, we wanted the project to reflect the real-life challenges faced by investigative journalists and for the model to work with less well-known entities. So we decided, instead of using a common approach in this field using WikiData, to combine two databases - [LittleSis](https://littlesis.org/) and [Open Sanctions](https://www.opensanctions.org/), containing information on people of interest.

Training the model
------------------

To train the entity linker model we needed to create a training dataset consisting of a large number of examples where different names mentioned in text were linked to the corresponding correct identifiers in the database.

We used two tools created by Explosion, a software company specialising in NLP tools: spaCy, an open-source library for advanced NLP, and Prodigy, an annotation tool for quick and efficient labelling of training data.

As with all [NLP projects involving labelling](https://www.theguardian.com/info/2021/nov/25/talking-sense-using-machine-learning-to-understand-quotes) by multiple annotators, we started by writing a clear and concise guide. By writing these instructions we tried to improve consistency between annotators who might take a slightly different approach to the task. We even created a decision tree chart (shown below) so the annotators would understand the context in the same way.

The guide also included some edge cases we encountered and discussed during our group annotation sessions, which shaped the guide nicely and helped us align our approach to the task.


   <figure>
   <img alt="The annotation decision tree" src="https://i.guim.co.uk/img/media/9903b8ba3a402623f5dc3e063eb2de52186bfe58/0_0_512_277/master/512.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=646c065a3dd287a1e082803903a85225" loading="lazy" />
   <figcaption>
     The annotation decision tree
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

Overall, the team annotated more than 4,000 examples linking mentions in text to entries in the database, and these efforts successfully led to a functioning prototype of an entity linker model.

Based on our preliminary analysis, the model’s performance on a validation dataset was acceptable but it was clear that it did not reflect real-life scenarios well. For example, the model struggled to reliably disambiguate single name mentions.

Challenges
----------

Creating a training dataset for an entity linking task proved extremely challenging. Having decided to merge two databases to form our knowledge base, we were faced with resolving issues such as inconsistent formatting, duplicate entities, and contradictory or outdated descriptions. We thus had to invest a considerable amount of time in cleaning the databases.

In order to surface the right candidates for each annotation we had to create an algorithm to filter and refine the entries in the knowledge base. In the end, we used a combined metric of fuzzy string matching and shared vocabulary between the text containing the mention and the knowledge base descriptions.

Despite our best efforts, it became clear that our training dataset did not contain enough examples of mentions for which multiple candidates shared the same name (such as Adam Smith, the renowned philosopher and economist, vs a character on a popular TV show or the name of an institution) but these were a crucial type of example we needed to allow the model to learn as intended. There were also very few examples of mentions consisting of a single name, which are particularly hard to disambiguate, so the model did not learn to deal with this.

Although the team annotated a large number of examples, not all of these annotations could be used to train the model as many of them needed more context to find a match.

Much more training data was needed to show the model enough examples to learn from. On average one annotator could go through 100 examples an hour, from those roughly only half would end up in the training dataset. It means that we needed one annotator to work non-stop for nearly 6 weeks to collect 10,000 useful examples.

When it came to training, we also faced another challenge. Candidates often had similar context, for example, relating to politics, which made it difficult for the model to discriminate between candidates, especially if the paragraph they were mentioned in only contained generic words relating to politics.

What’s next?
------------

Despite the many challenges we faced, some of which are not yet fully resolved, the lessons we have learnt from this project have been invaluable. We now have a much better understanding of the advantages and limitations of entity linking, some of which are transferable across the suite of tools and techniques we typically rely on. These will no doubt be extremely useful in future projects.

Once we have a robust entity linking model which performs well in more challenging tasks we can extend it to other entities such as organisations. Eventually this model could be used to disambiguate entities which could auto-generate graphs of the relationships between persons, organisations and other entities we find in large document collections.

The foundational and exploratory work we have done together over the last few months has highlighted the exceptionally high standards of accuracy which tools used by investigative journalists must meet. It’s a challenging task, but one we continue fruitfully developing with our work and upcoming JournalismAI initiatives.

_This project is part of the [2022 JournalismAI Fellowship Programme](https://www.lse.ac.uk/media-and-communications/polis/JournalismAI/Fellowship-Programme). The Fellowship brought together 46 journalists and technologists from across the world to collaboratively explore innovative solutions to improve journalism via the use of AI technologies. You can explore all the Fellowship projects [at this link](https://www.lse.ac.uk/media-and-communications/polis/JournalismAI/Fellowship-Programme)._

_[JournalismAI](https://www.lse.ac.uk/media-and-communications/polis/JournalismAI) is a project of [Polis](https://www.lse.ac.uk/media-and-communications/polis) – the journalism think-tank at the London School of Economics and Political Science – and it’s sponsored by the [Google News Initiative](https://newsinitiative.withgoogle.com/). If you want to know more about the Fellowship and the other JournalismAI activities, [sign up for the newsletter](https://mailchi.mp/lse.ac.uk/journalismai) or get in touch with the team via [hello@journalismai.info](mailto:hello@journalismai.info)_
