---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-jun-07-10-things-we-learned-making-firestorm'
headline: '10 things we learned during the making of Firestorm'
date: '2013-06-07'
authors: [Jonathan Richards]
standfirst: 'What comes out of a 3-month-long project involving journalists, designers, and developers across two countries, spanning five editorial desks? Well, lots of lessons. Here''s our top 10.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/5/31/1369980288727/a63c5cb8-7f0c-4f2f-97a9-0449d56a4379-460x276.png'
  alt: 'Firestorm'
  credit: 'Photograph: Guardian'
tags: [Bushfires]
---

1\. Don't let your assets terrorise you
---------------------------------------

In a rich media piece like [Firestorm](www.guardian.co.uk/world/interactive/2013/may/26/firestorm-bushfire-dunalley-holmes-family) – we had 25 scenes set across 6 chapters – there are a lot of assets to manage. The assets have different types (text / video / pictures / graphics), with different challenges on the web (compression, encoding), and they're created - and then used by - different teams (multimedia, picture desk, writers, developers). And, of course, they change all the time. ('I'm just going to upload a new version of the jetty video - is that ok?' etc.) All this can lead to a very complicated set of processes, and it's worth spending a bit of time streamlining this workflow, so that it is transparent to those who need to understand it, and robust. In our case, we realised quite late in the piece that our workflow had dependencies on particular people and processes, and had those people been absent, or those processes broken down, we would have had significant problems. Being aware of those things early, and getting on top of them, is important.


   <figure>
   <img alt="firestorm 1" src="https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/6/7/1370613482075/firestorm1.gif" loading="lazy" />
   <figcaption>
     The Firestorm team make final tweaks to the interactive before launch
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

2\. Doing video on the web is (still) hard
------------------------------------------

We were lucky not to be supporting older browsers with Firestorm, but there still things that made it difficult to deliver a consistent experience across browsers and platforms when it came to HTML5 video. Make sure you have a good workflow in place to create (and recreate) the various encodings - [mp4](http://en.wikipedia.org/wiki/MPEG-4_Part_14), [webm](http://en.wikipedia.org/wiki/WebM), and [ogg](http://en.wikipedia.org/wiki/Ogg) - you'll need for things to work across browser. You also need to give some consideration to bandwidth. Tests we were conducting in multiple geographies suggested the bit-rate we could expect in some places (Australia!) was as low as 1Mbps. We ended up settling on creating three different resolutions for each of the encodings - so 9 versions in total for each video - and we built a custom, JS-based, bandwidth detection test to decide which resolution to serve to a particular client. (It worked pretty well, but we could have done with more time to test it thoroughly.) Finally, be prepared for different operating systems to throw up quirks. In iOS, for instance, there are special challenges auto-playing background media.

3\. Be willing to drop features (and say no)
--------------------------------------------

It's easy to get carried away with 'Wouldn't it be great if...' conversations. What's not great is to find that, when it comes time to launch your 'many-featured' interactive, certain core features don't work. In the 2-3 weeks before launch, as early versions of the interactive began to circulate, we had daily 10am 'chats' to assess feedback and go over new requests that had come in. It's important to be reasonable about - but also firm with - such requests. Editors love asking for more. The trickier - but arguably more important - skill is to know how to take things away. In an interactive context, you're constantly treading a line between being responsive to editorial needs and understanding what is realistic in a given time frame. Make sure the features you end up with are those that are most important to the creative vision, but also which function well and are properly tested.


   <figure>
   <img alt="firestorm 3" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/6/7/1370613414440/firestorm3.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=121704795b245b28c49252f6ed792167" loading="lazy" />
   <figcaption>
     The Firestorm team make final tweaks to the interactive before launch
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

4\. Understand the limits of prototypes
---------------------------------------

Prototypes are a great way of experimenting with and sharing a vision in the early stages of a project. Be careful about using them to second-guess editorial content, though. We developed about 8 or 10 different prototypes in the early stages of the project - all variations on / evolutions of a theme. In hindsight, we didn't need that many. They're a useful way to convey a vision to an editor, but you risk getting distracted by some aspect of design which, when the actual data comes in, turns out to be less important. Some of the early development work could perhaps have been more usefully focused on building a proper workflow for our assets, which would become enormously fiddly later on.

5\. Try to break your design
----------------------------

Firestorm is a linear experience, and one of the key aspects of design was to work out how the user would move through it - what we came to call the 'advance mechanic'. The hope was that we could keep this mechanic consistent throughout. After trying out many options, we eventually settled on an approach that would allow a user to scroll through a series of scenes organised into chapters, but there were still lots of questions to answer: how was a user prompted to advance to the next screen? Was it possible to scroll within scenes as well as between them? What did the transitions feel like? Did transitions differ depending on the media type within a scene? As the design evolved, we realised that a useful approach was to simulate every possible constellation of scenes, and ask: did the design break? Was it always possible to advance in an intuitive, elegant way? At first, the design broke all the time. (For instance, the advance prompt originally only appeared on arriving at 'scene bottom', but that became a problem for non-scrolling scene types like A-roll video.) Bit by bit, however, we refined the design so that it could handle every type and sequence of media assets in a way that felt consistent.


   <figure>
   <img alt="firestorm 2" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/6/7/1370613413715/firestorm2.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=909a8ad9eaaf807d762e58578ace5592" loading="lazy" />
   <figcaption>
     The Firestorm team make final tweaks to the interactive before launch
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

6\. Sit together
----------------

It's difficult to overestimate the importance of physical proximity. We had a reasonably large project team - a designer, two editors, two multimedia producers, a writer, and a handful of developers. For the most part we sat together, but the multimedia team were in a separate studio, and it would have been great to have them closer. The benefit of a co-located team is that there's a constant audience on which to try things out, get feedback, iterate and improve - no matter whether you're talking about a point of UX, a video edit, or a headline. It's that 'mini-cycle', repeated many times over, that is at the core of a lot of successful pieces.

7\. Take an editor to a user testing session
--------------------------------------------

It's an amazing, humbling and strangely empowering thing.

8\. Have a single editorial stakeholder
---------------------------------------

Editors are busy folk. They can also change their mind. And when a project spans multiple departments - each with its own editors - it can start to get pulled in different directions. It's really handy, early on, to nominate a single editorial point of contact for a project. By all means gather feedback from different quarters throughout, but have one person you can go to who is the arbiter: who ultimately takes decisions and approves the direction the project takes.

9\. Be aware of the enemy within
--------------------------------

The Guardian, like most organisations, has security in place to protect its internal networks from attack. An unexpected consequence of this security setup for us was that, on machines on this network, the browser's ability to play media became very unreliable, which in turn made debugging very difficult. At one stage, we received the helpful suggestion: 'Have you thought about going to a local Starbucks and using wifi to do this?', at which point we knew we were in trouble. Be prepared to overcome obstacles in places you didn't expect them.

10\. Think of sound as part of web design
-----------------------------------------

Those with publishing backgrounds tend to think of the layout of text and images and, more recently, interactivity, as core aspects of design. One of the things we realised soon after our reporting team arrived back from Tasmania was that, if the piece was to be atmospheric and transportative (which we hoped it would be), sound would play a big part. We were fortunate that one of our editors, Fran Panetta, had radio experience, so we were able to pull together a series of soundscapes. Ideally, however, we would have coordinated earlier, so that sound could have been recorded properly as part of filming. As a result, we spent a lot of time - more than we might have liked - splitting videos into visual and sound components, finessing levels, and creating loops.
