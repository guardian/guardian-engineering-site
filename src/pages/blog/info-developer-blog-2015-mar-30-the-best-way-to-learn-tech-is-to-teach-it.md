---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-mar-30-the-best-way-to-learn-tech-is-to-teach-it'
headline: 'The best way to learn tech is to teach it'
date: '2015-03-30'
authors: [Robert Rees]
standfirst: 'You may think you understand a topic but its not until you are having to explain it to someone who doesn’t understand your made up terminology and rules of thumb that you realise what you really know and what you just pretend to understand.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/2/9/1423489172989/6242015734_f2523a1d1e_o-2060x1236.jpeg'
  alt: 'Our in-house training focuses on peer to peer learning'
  credit: 'Photograph: flickr'
tags: [Computing, Programming]
---

Last year [one of my colleagues](https://www.theguardian.com/profile/matt-andrews) sent round an email announcing a Skills Amnesty. A chance to confess that you didn’t really understand how shell scripts work, or what it means to skew your CSS transform or why you have to use triple equals in JavaScript.

People were free to submit topics anonymously and then once we had the topics people volunteered to run training sessions that anyone could attend. Hugo Gibson has already [written about his algorithms class](https://www.theguardian.com/info/developer-blog/2015/jan/27/why-learn-about-algorithms).

I was surprised to find that a few people had put down [Python](https://www.python.org/) as something they wanted to learn about and volunteered to give some lessons. I had been a bit surprised that people wanted to learn about it given that most Guardian developers’ preferred language is [Scala](http://www.scala-lang.org/). The missing element turned out to be data science and the use of scripting for data munging and the use of libraries like [NumPy](http://www.numpy.org/).

Putting together an introduction to Python
------------------------------------------

I have never taught Python before, I have always been more of a student, therefore I looked around for a few models that I could use to shape the course. A whole language with a lot of history was an intimidating challenge to present and also ran the risk of overwhelming the students.

At the initial meeting with those interested in the course we decided that the lessons would be based around Python 2.7 and that it would use a test-driven approach with unit tests illustrating the talk and whiteboard work.

I used [Dive into Python](http://www.diveintopython3.net/) and [Learn Python the Hard Way](http://learnpythonthehardway.org/book/) to form the basis of what I was going to talk about and to shape what beginners might need to know. The final list of topics runs as follows:

*   Datatypes: strings, numbers, tuples, lists, dictionaries and sets  
    
*   Comprehensions  
    
*   Functions, including modules and import syntax  
    
*   Classes and named tuples  
    
*   Reflection  
    
*   Regular expressions

On top of this there will also be some special sessions on file IO, library usage, web frameworks, web scraping and APIs.

You can see [the repository that I use for the lessons](https://github.com/rrees/learning-python) on GitHub and I plan to open source it once I have run through it completely with the first students.

Discovering the answers
-----------------------

Having got a rough idea of the topics writing the tests to illustrate the behaviour of the various data types and syntax turned out to be really hard. I discovered that there is a whole lot of Python I do not really use in my own programming.

For example: what happens when you divide one by two (you get zero)? What happens when you put lambda into the projection of a list comprehension (you get a list of anonymous functions)? What order do decorators get executed in? What happens to an existing instance of an object when you redefine the class it substantiates?

Sometimes I would anticipate things and have a test already written to show how something worked but part of the fun of working with an interactive language like Python is that often we could just dive into the shell during the session and find out what would happen together.

Doing the lessons has turned out to be a great learning experience for me as well. I now know the _set literal_ syntax, but only after I wrote entirely wrong syntax on a whiteboard. I also now know that _pass_ behaves differently depending on where you put it, it is a function and a class all in one! I know a _lot_ more about how Python provides object-orientation.

I have had to really think about what I think makes for good Python programming and have tried to distil that insight into a few pieces of advice and some illustrations in code.

You rarely think formally about your skills and knowledge in this way. Your colleagues also challenge you to explain why one approach is better than others so you cannot simply jazz-hands your way through. If something is good then you should be able to explain why it is better than the alternatives that other people might have used or seen in other codebases.

I am looking forward to finishing my teaching and being able to attend some of the other classes but I have already had to improve what I thought I already knew. Teaching has provided a friendly but sceptical audience and through their questions a valuable way to learn and get better.

My advice for Python programmers
--------------------------------

*   Functions are better tools for abstracting functionality than classes  
    
*   Immutable data structures like tuples are easier to work with and avoid problems like writing values when you meant to read  
    
*   Comprehensions are amazing, they do not mutate their input and they are usually fast and memory-efficient  
    
*   Always use the module namespace for your own code, use the alias syntax to improve readability if you need to

Convenient lies
---------------

Here are a couple of things that I wish were true, but which I had to admit were false during the lessons:

*   Python does not support multiple-inheritance  
    
*   You have to name everything you want to import (_import \*_ does not exist!)
*   Class members are private, honest

Great discoveries
-----------------

Of course sometimes you think things are worse than they are and the truth is a lot better than you had hoped:

*   You cannot set arbitrary attributes on collection datatypes  
    
*   Generator functions can be used in comprehensions and they work just like iterators  
    
*   The dictionary comprehension is available in Python 2.7
*   I finally understand [raw strings](https://docs.python.org/2/reference/lexical_analysis.html) and what they are used for
