---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-dec-29-content-editable-selections-and-immutability'
headline: 'Problems with Selection and Range objects'
date: '2014-12-29'
authors: [Hugo Gibson]
standfirst: ''
image:
  url: 'http://media.guim.co.uk/fa1a9f573df0df82e8bd45fc9d9c8bf20a488a3a/0_0_610_612/498.jpg'
  alt: 'Image on immutable and mutable trees'
  credit: 'Photograph: Wikimedia'
tags: [Programming]
---

Maintaing [Scribe](https://github.com/guardian/scribe) for use inside of our internal CMS, results in having to fight with unwieldy browser inconsistencies and issues with immutability vs mutability.

Scribe is a simple wrapper on top of [Content Editable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable), which is meant to normalise many of the browser inconsistencies that arise in using the specification.

In order to do this, Scribe patches many of the [document.execCommand](https://developer.mozilla.org/en-US/docs/Web/API/document.execCommand) functions by wrapping them in Scribe-defined functions. Once the function has been wrapped, Scribe manipulates the document selection to determine where fragments of HTML should be inserted (if any fragments need to be inserted at all).

The best way to illustrate this is to look at the many examples in the Scribe repository. A lot of them rely on obtaining the selection from the Scribe element, doing something with this selection, and then restoring the selection in its original location in the document. Thus Scribe provides the ability to clone and manipulate a browser selection at will. This is incredibly useful for manipulating content inside of the editable container, but can introduce a number of irritating bugs that are hard to track down.

The bugs arise (almost inevitably) from the lack of immutability in the document selection.

Currently the code that manipulates the selection markers looks as follows (truncated for simplicity - see the full [selection API](https://github.com/guardian/scribe/blob/master/src/api/selection.js) for more)

```javascript
var range = this.range;
      if(!range) { return; }


var startMarker = document.createElement('em');
startMarker.classList.add('scribe-marker');
var endMarker = document.createElement('em');
endMarker.classList.add('scribe-marker');

// End marker
var rangeEnd = this.range.cloneRange();
rangeEnd.collapse(false);
rangeEnd.insertNode(endMarker);

// manipulate the range here

this.selection.removeAllRanges();
this.selection.addRange(this.range);
```

Astute readers will have noticed an inherent problem here. We clone the range to avoid any problems with mutating it, then we remove all ranges on the current selection and put our cloned range back into the DOM. Thus the clone is completely lost. The selection and range are manipulated and altered by Scribe. But how else could this piece of functionality be implemented?

The [selection](http://www.w3.org/TR/selection-api/) and the [range](http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html) specification are currently in draft. There are a lot of issues surrounding them. Notably, how do you clone and replace the range without disrupting the existing selection?

Dealing with this problem caused a lot of issues recently in our [Noting plugin](https://github.com/guardian/scribe-plugin-noting). Noting uses a [virtual DOM](https://github.com/Matt-Esch/vdom) to allow fast manipulation of the cloned range and apply custom logic to the elements within the range.

It’s difficult to come up with an obvious solution to this problem without saying that everything should just be immutable. DOM elements are essentially just mappings to C++ objects and are therefore subject to all the issues with mutation in C++. This is why libraries like Virtual DOM are so appealing. They allow you to perform DOM mutations outside of the actual DOM and then simply apply a patch from your virtualised DOM to the real DOM.

Selection and Range issues do not go away by using the latest [new language](http://www.scala-js.org/) that compiles to JavaScript. Instead the problem is hidden behind [FFI](http://en.wikipedia.org/wiki/Foreign_function_interface) calls. The problem seems to be that JavaScript developers want to use functional programming techniques like laziness and immutability but have to interface with a DOM specification that is based on mutation. It seems that while many programming languages are embracing functional techniques, the DOM spec and JavaScript are happily lagging behind, hence the need for libraries like Virtual DOM.

JavaScript is a practical language and the DOM is a practical specification. Practicality in the world of web programming seems to come in the form of mutability; Selection and Range are no exception.
