---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-mar-20-inside-the-guardians-cms-meet-scribe-an-extensible-rich-text-editor'
headline: 'Inside the Guardian’s CMS: meet Scribe, an extensible rich text editor'
date: '2014-03-20'
authors: [Oliver Joseph Ash]
standfirst: 'The team behind the Guardian’s digital content management system talk about how and why they built and open sourced Scribe.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/3/20/1395316648574/dd9f20c7-7b48-4e76-8dcd-32865bc82864-2060x1236.png'
  alt: 'Composer, the Guardian’s CMS, built on top of Scribe.'
  credit: 'Photograph: Oliver Joseph Ash'
tags: [HTML5, Open source, Scribe, Software, Web 2.0]
---

As part of the Guardian’s new digital content management system, Composer, we needed a rich text editor to enable our journalists to write rich content. More than that, we needed a rich text editor we could extend, to provide our journalists with an elegant interface for producing and formatting rich content. Unhappy with existing solutions, we built and open sourced [Scribe](http://guardian.github.io/scribe), our own rich text editor. But how and why did we build it?

contentEditable
---------------

Our first option was to use [contentEditable](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.contentEditable), a simple property available on all HTML elements that was designed to enable [“web developers to build rich text editors”](http://blog.whatwg.org/the-road-to-html-5-contenteditable). You can place the contentEditable attribute on any element to make its contents editable.

The problem with contentEditable is its ambiguity due to the lack of standards. For example, what markup is generated when you press ENTER right _here_? Let’s look at some examples.

```html
<div contenteditable></div>
```

When the user presses ENTER to insert a new line, notice that the browser inserts a <div> element.

```html
<div contenteditable>
  <div><br></div>
  <div><br></div>
</div>
```

This makes some sense, because a new line can be represented in HTML using a block element, and that’s exactly what the <div> element is. We can’t count on this behaviour, however, because it has not been defined in a standard — though much of this sort of information has been reverse-engineered to a point where today we have [cross-browser consistency for most basic operations](https://developer.mozilla.org/en/docs/Rich-Text_Editing_in_Mozilla#Executing_Commands). In any case — and regardless of browser support — the <div> element is not how we want to represent paragraphs of text in our content. The correct, semantic equivalent of a new line would of course be the <p> element — the HTML element that defines a paragraph of text.

Another issue is that the HTML produced when copying from a web page in a browser contains lots of inline styling and metadata that we don’t need. A common workflow for journalists here at the Guardian is to write the content from their word processor of choice and then copy and paste it into Composer. Take a look at what’s on my computer’s clipboard after copying from a simple Google Doc that contains nothing but the word “foo”, using Google Chrome:

```html
<meta charset='utf-8'><b style="font-weight:normal;" id="docs-internal-guid-a59a
3075-c16d-7804-733d-505a2d883bb9"><p dir="ltr" style="line-height:1.15;margin-to
p:0pt;margin-bottom:0pt;"><span style="font-size:15px;font-family:Arial;color:#0
00000;background-color:transparent;font-weight:normal;font-style:normal;font-var
iant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;">
foo</span></p></b><br class="Apple-interchange-newline">
```

By default, contentEditable allows any HTML to be pasted into it. It suffices to say that most of this HTML is junk (to us). All we really need is <p>foo</p>.

Where contentEditable falls short, we need to call on JavaScript to modify the behaviour of contentEditable. For example, we can script the browser to “produce a new <p> element when ENTER is pressed, and place the caret inside of it.” This is only the beginning, however, as many edge cases are revealed when you introduce formatting operations for things like bulleted lists, quotes, or inline styling (bold, italic, strikethrough). Alas, this is no simple task.

Existing Solutions
------------------

There are several popular existing solutions, such as [TinyMCE](http://www.tinymce.com/), [CKEditor](http://ckeditor.com/), [ZenPen](https://github.com/tholman/zenpen), [Medium.js](https://github.com/jakiestfu/Medium.js), [Redactor](http://imperavi.com/redactor/), and [wysihtml5](https://github.com/xing/wysihtml5). TinyMCE proved itself the most reliable for producing the sane, semantic markup we required, which is why we initially picked it for our digital CMS. Its reliability is unsurprising given that it is the rich text editor of choice for WordPress.

The problem with all of these off-the-shelf solutions is their lack of extensibility. TinyMCE, for example, does an excellent job of producing the right markup, but much of the user interface for the editor is kept privately within the library, which made it difficult to augment the user experience we desired. Quite quickly we needed to fork the library to make these changes, which amounted to some huge tech debt given the size of the library we were forking (30,000+ lines of code). The nature of our web app meant that sometimes there could be several TinyMCE instances in the DOM at once, which led to some serious performance issues. At the opposite end of the spectrum, more minimalist solutions such as [ZenPen](https://github.com/tholman/zenpen) or [Medium.js](https://github.com/jakiestfu/Medium.js) appear promising on the surface, but most do not deal with any of the aforementioned problems around ensuring semantic markup, sanitising markup coming into the editor, or extensibility.

Introducing Scribe
------------------

What we needed was a library that only patched browser inconsistencies in contentEditable and, on top of that, ensured semantic markup — a very thin layer on top of contentEditable. That’s why we built [Scribe](https://github.com/guardian/scribe).

Scribe exposes a simple, browser-agnostic, low-level framework to manage and extend interactions with contentEditable. It doesn’t try to do too much else, so you can easily augment your own rich text editing experience on top of it. It adheres to standardised APIs, which translates into good browser support for recent versions of most major browsers ([tested in Firefox and Chrome](https://travis-ci.org/guardian/scribe)).

Scribe Plugins
--------------

One of the great things about Scribe is its extensibility. A plugin is simply a function that receives Scribe as an argument:

```javascript
function myPlugin(scribe) {}
```

A consumer can then use your plugin with the scribe.use method:

```javascript
scribe.use(myPlugin);
```

Plugins may package whatever functionality you desire, and you are completely free to use native APIs to do so. Scribe imposes no constraints — it’s just plain old JavaScript. Optionally, you may take advantage of [several helper methods provided by the Scribe API](https://github.com/guardian/scribe).

For a complete example, check out our [toolbar plugin](https://github.com/guardian/scribe/blob/573bad7f5207d1d264cf0d37985c9ba7d599a100/src/plugins/scribe-plugin-toolbar.js). You can take a look at the [project’s README.md file on GitHub](https://github.com/guardian/scribe) for a list of plugins we’ve already created, such as [this plugin for defining keyboard shortcuts](https://github.com/guardian/scribe-plugin-keyboard-shortcuts) or [this plugin for transforming ASCII quotes into curly quotes](https://github.com/guardian/scribe-plugin-curly-quotes) as the user types (as demonstrated by the quotes in this very article).

As we were developing Scribe, we [painstakingly documented all of the browser inconsistencies along with an isolated case for each](https://github.com/guardian/scribe/blob/master/BROWSERINCONSISTENCIES.md). The next step will be to communicate with the various browser vendors to hopefully establish more standards for contentEditable. Simultaneously as more browsers implement the standardised APIs, there is no reason why Scribe cannot one day work across the entire web platform. In the meantime, I’m hoping to see the community come forward with polyfills for the [various](https://developer.mozilla.org/en-US/docs/Web/API/Selection) [APIs](https://developer.mozilla.org/en-US/docs/Web/API/Range) where older browsers fall short.

If you’re in need of a rich text editor then we would love for you to try out Scribe. It’s a great starting place for building your own rich text editing experience, as you won’t have to deal with any of the pains introduced by contentEditable. [Please let us know if you have any issues](https://github.com/guardian/scribe/issues).
