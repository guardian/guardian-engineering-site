---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-sep-09-parsing-json-with-scheme'
headline: 'Parsing JSON with Scheme'
date: '2014-09-09'
authors: [Hugo Gibson]
standfirst: 'Parsing JSON with Scheme can be much simpler and more efficient than parsing with more commonly-used scripting languages.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/8/5/1407256103272/a811a15b-8bf6-4811-9109-ea3b963e177b-460x458.png'
  alt: 'Lambda'
  credit: 'Photograph: http://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Lambda-logo.svg/482px-Lambda-logo.svg.png'
tags: [Computing, Programming]
---

Recently, we needed to get a list of all pieces of embedded content from our [Mongo](http://www.mongodb.org/) database. The query we wanted to run would fetch all articles which have “standard” embeds (tweets, videos, etc) and a “custom” embed, and should ignore all photo and text blocks. While Mongo is a good datastore, its schemaless design means it’s not great at running these types of complex queries. The simplest way to find this sort of data was to fetch all the articles from our database and then parse the returned JSON.

Since Scala is our main development language and we’re big on functional programming, it seemed more appropriate (and fun!) to use [Scheme](http://en.wikipedia.org/wiki/Scheme_\(programming_language\)).

Parsing JSON could certainly be done in any other language. Python, Ruby or even Perl would have been just as valid a choice as Scheme. The JSON file was just over 300mb, though, and the initial Python script I wrote couldn’t load this file into memory. At this point, I probably should have investigated why this failed, but I wasted no time in firing up my Scheme REPL and letting the fun begin.

For my parsing, I used [Chicken Scheme](http://www.call-cc.org/) on OS X. In a similar approach to [SBCL](http://www.sbcl.org/) (and others), Chicken Scheme compiles to C code and then compiles all the way down to native code from there, which is useful for the extra speed boost. It also makes Scheme more portable, because you can just distribute object code to compatible systems. Chicken Scheme comes with an easy-to-use module system similar to Python [Eggs](http://peak.telecommunity.com/DevCenter/PythonEggs), so similar, in fact, they’re called Chicken Egg. Grabbing and downloading an Egg as is easy as using [QuickLisp](http://www.quicklisp.org/) for Common Lisp.

To do the actual parsing, I downloaded the Egg [Medea](http://wiki.call-cc.org/eggref/4/medea). Medea is a very good parser that lets you override the default parser so you can parse everything as a list rather than as a list or a vector. Of course, you could just make your own recursive descent parser with [parser combinators](http://en.wikipedia.org/wiki/Parser_combinator) and use that to parse the JSON yourself.

In Scheme, most things are lists. Basically, this means Scheme is indifferent about the underlying data: XML, JSON, YAML – it can all be represented as a list. This deceptively simple way of representing data makes processing complex data structures very easy.

Thinking about JSON structures as lists actually simplifies their representation. A JSON structure is just a tree structure with properties and any tree structure can be represented as a list. In fact, a lot of data structures can be built out of lists.

For example, consider the following JSON object:

```javascript
{
    "result" : {
       "reallyinteresting": ["more", "interesting", "stuff"]
     }
}
```

This would be represented as the following list in Scheme (depending on which parsing library you use):

```text
(result (reallyinteresting ((more interesting stuff))))
```

This is the point most people get a bit scared. But there’s no need to be! They’re just parentheses. This is just a list. To get the head of the list, we can use “car”. To get the tail of the list, we can use “cdr”. So basically, using car and cdr, you can descend a list and get every element imaginable.

This type of list traversal can get messy, though. What if we wanted to get “interesting” out of the list? In its current state we would have to do (car (cdr (cdr (cdr list)))) to get the element. This is hardly pretty. Fans of [SICP](http://mitpress.mit.edu/sicp/) will have noticed the easiest way to solve this problem is to abstract it. Doing so might give us a function “get-nested-object” that removes a nested JSON object – in this case “reallyinteresting”. From there we could write a function “get-item-at-n” to read element _n_ of a list. Following the abstraction principal, it’s trivial to define a few domain-specific functions to get the relevant values from our data list.

Scheme is like a simpler, tidier Python. It has all the benefits of dynamic typing (and the drawbacks) and removes a lot of the bloat that comes with Python – of course this is an entirely subjective opinion.

It could be argued that using Python is much easier for a simpler task like this. Rather than having to define a set of functions that take heads of tails of heads of lists etc. we could just access the properties by name on the parsed Python dictionary.

So accessing “reallyinteresting” is as simple as:

```text
reallyinteresting = parsed_json["result"]["reallyinteresting"]
```

This is certainly more straightforward than trying to understand the nightmarish car/cdr from above. What happens if the received JSON changes format, though? The whole Python implementation needs to be rewritten to accommodate this. You could create some global variables or config values for the name of the fields but you still need to update these and it might make for some difficult to maintain and ugly-looking code. The Scheme version is completely indifferent. The get-nested-object function gets the inner object and that’s it. It doesn’t care what the name of the JSON field is; as far as it’s concerned it’s just the cdr of a list. Essentially using Scheme for this seemingly trivial task has actually given us a pretty generic JSON parser. Abstract a few more functions and it’s trivial to take this simple idea and apply it to whatever JSON structure you feel like. What’s more, there are no macros in sight.

So what was the alternative to Scheme? The alternative was Python or Ruby or any other scripting language _de jour_, which would have been less fun and less interesting.
