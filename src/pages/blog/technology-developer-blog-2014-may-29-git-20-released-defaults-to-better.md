---
layout: ../../layouts/blog.astro
slug: 'technology-developer-blog-2014-may-29-git-20-released-defaults-to-better'
headline: 'Git 2.0 released - defaults to ''better'''
date: '2014-05-29'
authors: [Roberto Tyley]
standfirst: ''
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/5/29/1401402387197/6e6b0916-fe6c-4c46-8da6-0b47aba014eb-620x259.png'
  alt: 'One of logos for Git, the distributed version control software.'
  credit: 'Photograph: git-scm.com'
tags: [Computing, Git, Open source, Software]
---

We're big fans of Git here at the Guardian, using it as our primary version control system (can you believe, we were once accused of hyperbole for calling Git "...the most important thing Linus Torvalds has ever done" in a [blog post](https://www.theguardian.com/info/developer-blog/2011/jul/27/android-git-client), only 3 years ago), so we were chuffed to see that the 2.0 release has [now been made](http://git-blame.blogspot.co.uk/2014/05/git-20.html).

If you've been staying current with Git, you might not notice the subtle differences, but the defaults are now much friendlier to first time users - users who may well be using Git in a fairly simple 'centralised server' way.

For instance, if you execute this little command:

> git push

\-in older versions of Git, that would have (by default) pushed **all** branches on your local copy to the remote server, so long as they had exactly matching names - and that might well have been more branches than you were expecting to send, especially if some of them were unfinished and not ready to be seen by other people. The new behaviour, in Git 2.0, restricts this to just the _current_ branch, and it must be pushing to the same remote branch you'd be getting updates from if you did a 'pull'. So only one branch gets sent- and it's the one you'd expect.

This is just one example of improved behaviour- and if you'd like to see more of the interesting changes that have come down with Git 2.0, we encourage you to check out the [Release Notes](https://github.com/git/git/blob/master/Documentation/RelNotes/2.0.0.txt). Congratulations to Junio Hamano (Maintainer of Git) and the rest of the Git development team on clocking up a major milestone in the development of a very significant piece of software.
