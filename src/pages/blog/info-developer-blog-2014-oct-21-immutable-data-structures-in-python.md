---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-oct-21-immutable-data-structures-in-python'
headline: 'Immutable data structures in Python'
date: '2014-10-21'
authors: [Robert Rees]
standfirst: 'Python uses mutable datastructures by default but as we move to an immutable world, what options do we have for handling data differently?'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/10/20/1413828459357/196079076_ef3d5172dc_o-620x372.jpeg'
  alt: 'A graffiti timelapse of John Cleese''s silly walk'
  credit: 'Photograph: flickr'
tags: [Computing, Programming, Python, Software]
---

[Python](https://www.python.org/)’s default data structures are mutable, which is a sensible design decision in terms of least surprise, but actually understanding the initialisation and state of a mutable structure is hard; especially in a language like Python that freely allows reassignment and executes like a script rather than a compiled language.

Immutable data structures are the answer. Python supports some immutability natively through [named tuples](https://docs.python.org/2/library/collections.html#namedtuple-factory-function-for-tuples-with-named-fields). However these are better replacements for objects rather than data structures like List and Dict.

My recent use case was the preparation of a dictionary that was passed to a [Jinja2](http://jinja.pocoo.org/) template. Using a dictionary structure makes it easy to change the content sent to the template but I don’t want the template to modify the contents as it renders it.

The template data consists of three to four consistent elements and then some variant data that is used in multivariate testing.

Conventionally you can create a new dictionary on each rendering request and then simply mutate the values during the request handling. There’s a subtle issue here, however: any future maintainer has to understand that the declaration of the dictionary **must** occur in the scope of the rendering. Moving the dictionary to a class or module scope will result in a very subtle bug where the variants might appear as they get added to the mutable dictionary in different requests.

With immutable dictionaries I can declare the base values and then create a new immutable dictionary that is guaranteed to have the base values plus whatever I want to add. If the declaration is moved it doesn’t matter as the base values can never change and when the renderer uses the variant data it has to create a new copy as it cannot manipulate the content of the base data.

Sadly Python doesn’t have this functionality in the default libraries so I went looking for an existing implementation. There are a couple to choose from but I wanted a pure Python library as our Python code is deployed almost exclusively on Google Appengine so compilation is not an option.

Being a closet Clojurian, one of the first projects I looked at was [Funktown](https://github.com/zhemao/funktown), a Python port of [Clojure](http://clojure.org)’s data structures. There were two issues: firstly, while I find Clojure’s syntax for interacting with data pretty natural, I know it’s not that intuitive to most mainstream programmers. That’s why [ImmutableJS](https://github.com/facebook/immutable-js), for example, sticks to a more object-based style of interacting with immutable data. Secondly, the project hasn’t been updated in a while. This is not necessarily a problem; once you have ported the code there should not be a need to keep fiddling with it, but I’m not sure I want to take a potentially dead project into production. That’s just my prejudice: I’ll try Funktown in some personal projects first so I feel more comfortable with it.

On the more esoteric side of things there is [DiscoDB](http://discodb.readthedocs.org/en/latest/). This breaks a data storage object out of a general storage engine and has some neat features like query support. Everything is a bit overkill for my use case, though. I know all the structures I want to create in advance and there’s no real dynamic behaviour in my code.

I decided to go with [Pysistence](https://pythonhosted.org/pysistence/), a library that has been in recent development and has a very defined scope. Immutable lists and dictionaries (and a version of Expando objects). Interestingly, it is developed on [BitBucket](https://bitbucket.org/) instead of [GitHub](https://github.com) but the functionality for the dictionaries dealt with exactly my use case. Here’s how the code looks.

```
    base_data_sources = make_dict({
        'business': BusinessDataSource(clientUS),
        'money': USMoneyDataSource(clientUS),
        'technology': TechnologyDataSource(clientUS),
        'sport': SportUSDataSource(clientUS),
        'comment': CommentIsFreeDataSource(clientUS),
        'culture': CultureDataSource(clientUS),
        'top_stories': TopStoriesDataSource(clientUS),
        'video': VideoDataSource(clientUS),
    })

    data_sources = {
        'v1' : base_data_sources,
        'v3' : base_data_sources,
        'v6' : base_data_sources.using(
            most_shared_us = MostSharedDataSource(clientUS)
        ),
    }
```

The code has been in production for the better part of a month now and helped dramatically collapse the code size and complexity in a way that I feel will be simple to maintain.

I suspect there are many more libraries that I am unaware of (or perhaps even immutable support in the core of the language): please share your experiences or suggestions in the comments below.
