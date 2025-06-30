---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-jan-27-why-learn-about-algorithms'
headline: 'Why learn about algorithms?'
date: '2015-01-27'
authors: [Hugo Gibson]
standfirst: ''
image:
  url: 'http://media.guim.co.uk/f6785e34c8a4d5e9524b5ed64504789db56534a3/0_0_2000_2436/1642.jpg'
  alt: 'Quicksort algorithm'
  credit: 'Photograph: Wikimedia'
tags: [Computing, Programming]
---

Recently, we’ve been running a skill amnesty. The idea is that people can nominate a few skills they feel they’re lacking in (or not as good at they might hope) and then be matched with the relevant teacher. Classes have included: git, JavaScript, CSS, Python, Comparing Algorithms and more.

I volunteered to teach the Comparing Algorithms class and got asked a challenging first question. The idea of the class is give people a crash course into how to figure out the complexity of a given algorithm. In other words, [Big O notation](http://en.wikipedia.org/wiki/Big_O_notation) and all that fun stuff.

We were looking at search algorithms – simple ones like [linear search](http://en.wikipedia.org/wiki/Linear_search) and [binary search](http://en.wikipedia.org/wiki/Binary_search_algorithm), O(n) vs O(log n) – and someone asked me “how often do you think about these things when you are programming?”. My answer was: “Rarely, if ever”. How often does anybody in their day-to-day programming tasks actually think about these things? I can’t say I’ve gone through a list of numbers and thought about the complexity of my list traversal. I know it’s O(n) but I’m not letting that hold me back on a million integer list.

Almost every reasonable programming language provides fast implementations of every algorithm you can name. If a programming language doesn’t, it’s unlikely anyone will use it. It can take a bit of digging, but you can discover that Python uses a [Timsort](http://en.wikipedia.org/wiki/Timsort), which is just a hybrid of [insertion sort](http://en.wikipedia.org/wiki/Insertion_sort) and [merge sort](http://en.wikipedia.org/wiki/Merge_sort). More digging and we see that JavaScript uses [quicksort](http://en.wikipedia.org/wiki/Quicksort), but might [not be the case](http://blog.mgechev.com/2012/11/24/javascript-sorting-performance-quicksort-v8/). The point is that you shouldn’t really need to worry about what type of sorting algorithm your language of choice uses. Some [clever](http://en.wikipedia.org/wiki/Tony_Hoare) [people](http://en.wikipedia.org/wiki/John_von_Neumann) have already done that for us.

So why bother to learn these things at all? I think the simple answer is in some strange, almost inexplicable way, it helps to know how an algorithm that you probably use every day works under the hood. It helps to know what a [linked list](http://en.wikipedia.org/wiki/Linked_list), a [binary tree](http://en.wikipedia.org/wiki/Binary_tree), and a [heap](http://en.wikipedia.org/wiki/Heap_\(data_structure\)) are, and what such structures might look like in memory. Once you know this information it can be easier to build abstractions out of the programs you’re writing. Nice abstractions lead to nicer code and nicer structure. Programming is as much about moving and transforming data as much as anything else and it’s these algorithms and data structures that do it.

For me, algorithms give you a different way of thinking about computers. They’re elegant, high-level and abstract. You don’t have to worry about semantic and syntactical details. Mastering them, or at least understanding them, can lead to a great understanding about the nature of computers. While you might not endlessly compare sorting algorithms in your head, you’ll certainly appreciate them when you reach for the standard library’s implementation.
