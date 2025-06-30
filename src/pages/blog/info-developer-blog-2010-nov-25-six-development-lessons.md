---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2010-nov-25-six-development-lessons'
headline: 'Six things I''ve learned about web development working at the Guardian'
date: '2010-12-09'
authors: [Matt Andrews]
standfirst: 'Client-side developer Matt Andrews on some of the things he wishes he''d known before'
image:
  url: 'http://static.guim.co.uk/sys-images/Technology/Pix/pictures/2010/12/9/1291897011272/desktop-computer-006.jpg'
  alt: 'desktop computer'
  credit: 'Photograph: fStop / Alamy/Alamy'
tags: [Computing]
---

As a large organisation with an even larger web presence, the Guardian and its technology department have an often challenging task in maintaining and developing one of the world's largest news sites. The sheer size and depth of the codebase can be daunting to newcomers and the range of tools used can pose a challenge for the casual developer.

Thus when I joined the company after two years working as a small, mostly one-man web development "team" for an events/lifestyle magazine, I had a lot to learn.

Although the Guardian has a large technology team, there are many things the Guardian does which can work for much smaller groups too, regardless of the scope of their project or the number of coders in the department. Even solo developers running bedroom projects can benefit from a few of the workflow and coding practices I've picked up since being here.

These tips are by no means exclusive to the Guardian and are common to many fields of software development. Hopefully you'll find some food for thought in this list.

Compartmentalise and play your strengths
----------------------------------------

At the Guardian, we're lucky enough to have several distinct teams managing our development workflow. Designers will put together detailed proofs and mockups, client side developers will turn these into cross-browser HTML/CSS/JS, developers will produce the backend code and product managers will direct the overarching process. Finally, once it's all complete, QAs will test the implementation and make sure it does everything it's supposed to do.

For smaller teams, or our one-man operation, this kind of setup can be a luxury – it certainly was for me. It's still possible, however, to reproduce. If, for example, you typically design your own webpage layouts before coding them up, consider handing part of the process over to someone else. The separation allows you to focus more on accurately implementing what was designed rather than "improving" upon your existing designs as you go along.

Solo developer? Get your friends to be your QAs and usability testers. Point them at a test URL and get them to break it (they'll be great at this). If it can survive a kicking by a less technical end-user, then it's more than ready for release.

Use intelligent version control (but be pragmatic)
--------------------------------------------------

This one probably goes without saying, but I know from my own experience that there are still smaller software houses pumping out releases via the tried and tested technique of uploading files via FTP. With each of your team members having their own local build of the software, there's fewer chances for Dave to break the build with his dodgy Javascript.

This method is equally beneficial for the solo coder too – even if it's just you accessing the source, it'll keep you sane to let Subversion (or similar) keep track of what files you've changed while you do what you do best: code. At the Guardian we use a variety of source control applications to track where we're up to and build branches [for our fortnightly releases](http://www.guardian.co.uk/info/developer-blog/2010/dec/03/1) – SVN for our main site builds and Git for our [microapps, small pieces of portable content](http://www.guardian.co.uk/open-platform/what-is-the-microapp-framework) that slot into our templates. Be appropriate though – not every line of code should require a monolithic version control setup before you can even begin to do anything.

Get inside the semantic web
---------------------------

Working on a modest project or as part of a small team can sometimes leave developers feeling isolated and bored; contributing something back to the web is a nice fix for both these issues. Chances are that no matter what you're building, you can either take advantage of open data from other sources, or open your own data up for use by third parties.

Case in point: the Guardian recently launched its [Content API](http://explorer.content.guardianapis.com/), allowing developers around the world to build apps making use of our archived content. In turn, [we use external APIs in our own products](http://www.guardian.co.uk/help/insideguardian/2010/oct/18/linked-data-guardian-open-platform), helping to contribute to the development of the semantic web. This approach gave me a new perspective on personal projects – you don't have to go all-out with a key-driven, cloud-hosted, RESTful API: even a customisable RSS feed could pave the way for third party apps using your content.

Futureproof your coding
-----------------------

A recent internal presentation revealed to Guardian developers that we have more than 100 templates and more than 500 components that reside on them. A major challenge we face is needing to move quickly – we're a news organisation, after all. This means that developer timescales can be limited and often time constraints mean we can only add new code rather than re-use existing designs.

We're working on making more time for intelligently designed (no, not like that) components which can be extended or added to – our templating system allows us to create a single component that responsively changes layout and styling depending on what "slot" we position it in. This kind of thing is easier than it sounds and allows much more extensibility. Similarly, CSS can be refactored so that your global classes can change depending on variables, rather than adding a new class for every modified style.

More time spent up front thinking about the impact of adding another new feature to maintain can save hours of future development time trying to figure out why you have 800 CSS files and fuzzy IE6 support.

Release early, release often
----------------------------

Something of a cliché in software development, but a useful one. Sitting on a relaunch for months while you perfect a new feature is a waste of time and a missed opportunity. Readers want their sites to feel current and adaptive, and never forget that they don't know your internal roadmaps and production schedule. At the Guardian we roll out new iterations of our site's software every 2 weeks – this keeps things fresh and means our workflow is responsive and evolving.

If you're stuck on a single feature that's eating up your time, push out the ones that are ready before your visitors decide you're outdated. This was one of the biggest changes for me upon joining the Guardian; in my previous role, we'd work on large-scale "rebrands" while users had no idea of the planned changes and were complaining about broken functionality on small parts of the site. Six months later we'd roll out the new version and would have already lost the person who wanted their bug fixing.

Shout about what you're doing
-----------------------------

Get yourself out there. [Talk to other developers about your work](http://www.guardian.co.uk/activate/blog/activate-ushahidi-project-activate), particularly when you've done something cool. Speak at conferences (or at least attend some) if you have something interesting to show off, and take the opportunity to get enthused again about the web and the stuff people are doing with it.

The Guardian [hosts and attends hack days](http://www.guardian.co.uk/technology/video/2010/aug/16/video-open-platform-launch-highlights), conferences and general developer gatherings – by being part of the wider developer community you're helping keep both your work and that of others more interesting.
