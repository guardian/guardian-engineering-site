---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-apr-04-shortening-the-goalposts'
headline: 'Shortening the goalposts'
date: '2014-04-04'
authors: [Chris J. Clarke]
standfirst: 'Minimal continuous deployment on Guardian Football'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/4/1396603257904/66e6457b-9655-4e29-b9ee-db108b8f1065-2060x1236.jpeg'
  alt: 'Football dev team is the dream team.'
  credit: 'Photograph: Giuseppe Cacace/AFP/Getty Images'
tags: [Football]
---

Around the middle of January, I moved teams within the Guardian onto our Football product team. We were tasked with creating a new weekend experience while improving some old bug-bears and a responsive design solution.

**We had three areas of focus:**

1.  Making strong use of our data: the Guardian pays [PA](http://www.pressassociation.com/Sport/) for football-related data and we wanted to make sure we were using it to its full potential.
2.  Users' perception of our "liveness": Users thought we were slow. Slower than the BBC, Sky and all the others. How could we improve this?
3.  Doing a better job on mobile: A large proportion of our weekend traffic is on mobile, and not all of our relevant content was visible to that traffic. We needed to update this – and fast.

The setup
---------

We held workshops with the sports editors, ran diary studies and sieved through mountains of data, all to get better ideas of what worked, where our users were going, how they were getting there, and how to keep them there.

We spent two weeks sketching up all the ideas we had from those workshops: one week where any idea was possible, and then a second week refining those ideas, throwing out the unfeasible ones.

I then created [a series of prototypes](http://www.mr-mr.co.uk/guardianNGW/football.html) to prove our interaction ideas were valid. Using a framework of Codekit and Sass I managed to produce a lot in a very short space of time. Depending on the quality, we even put them in front of users. Otherwise our designer designed the hell out of the prototypes, and we would test them in our UX studio.

**What we had going for us**

There was one thing going for us before we started: we had great tone. Users would cite us over competitors for our analysis. So our match reports were heavily frequented as deep dives for the football fanatics.

**We had a lot of quick wins** \- we started with the basics: tables, fixtures and results. All of these pages already existed, so we had clear aims of how we could improve them.

However…
--------

The honeymoon period was soon over. Once we sat and really looked at what had been built previously, we realised things were going to take longer than we thought. This was all with the added challenge of only having February and March to complete the work.

Three weeks passed. It was taking us too long to create features: we needed to change how we were delivering.

We needed a plan.

**Minimal continuous deployment**


   <figure>
   <img alt="The initial plan for releasing sections of pages, cut down to the minimum product needed to release." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/3/25/1395758176443/2a824ba6-ce5e-43c3-aa69-b0e64f8a7ec4-2060x842.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=2096432689cf56574bf4daa1a15714c4" loading="lazy" />
   <figcaption>
     The initial plan for releasing sections of pages, cut down to the minimum product needed to release.
    <i>Photograph: Chris Clarke</i>
    </figcaption>
    </figure>

We took stock again and decided on a key factor: creating basic features meant we weren’t waiting until the design was perfected. We could push partial designs live with only the key features enabled, to see how well they performed. If they improved pages, we could re-visit them in the future with the majority of the basics already built.

In the example below, the option on the left would take a week and a half to produce because of the added complexity of including team badges. The option on the right – without badges – would take a day and a half, improving some of the lack of "liveness" perception with our users in the process.


   <figure>
   <img alt="The option on the left would take a week and a half because of the team badges. The option on the right without badges would take a day and a half." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/3/25/1395758270369/428d7aba-77d5-43ba-ab7b-cd92d081bfaf-1020x160.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=c3b15eeead0dc27d4db2fb689322bb3f" loading="lazy" />
   <figcaption>
     The option on the left would take a week and a half because of the team badges. The option on the right without badges would take a day and a half.
    <i>Photograph: Chris Clarke</i>
    </figcaption>
    </figure>

We pushed live scores on our match pages up without team badges, the team "form" and many other parts, but, crucially, it was live for everyone to see. If there were bugs to fix or improvements to make, it was easy to implement because we were still making constant improvements.


   <figure>
   <img alt="Team badges live in all their glory, two weeks after live scores" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/3/25/1395759654990/1720601f-8dd5-4fd7-8522-b0d0e6806799-2060x1067.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=4c5c4879857e46904fe98f4e1be71041" loading="lazy" />
   <figcaption>
     Team badges live in all their glory, two weeks after live scores
    <i>Photograph: The guardian football</i>
    </figcaption>
    </figure>

Before we got to the minimal deployment plan, we released four updates in February. By March we were releasing nearly every day, sometimes twice.

How we changed our way of working
---------------------------------

1.  We were a small team, so we kept the goals small and finished them often. Then we could test faster and learn quicker.  
    
2.  By working quickly we decided quickly, things flowed better and teams around us wanted to be in the same boat.
3.  To do this, cut your chunks of work into smaller chunks. Keep going to the minimum. If you can see measured improvement then do the rest of the chunks. If not, you’ve only lost a day or two maximum.
4.  Communicating frequently about what we were releasing made us feel truly agile.
5.  Releasing often not only made the team look great internally, but improved pages for our users, too.

What’s next?
------------

We’re looking deeper into mobile: a large portion of our football traffic is on mobile and this increases at the weekend. We want to make sure the mobile experience is equal to that of desktop, but not overwhelming.


   <figure>
   <img alt="Mobile match pages in action" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/3/25/1395762172971/8a099af6-46a9-4c94-b916-afa713e1cac6-2060x1222.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=36a7e7125ded3e8a75c396135e1a7ef5" loading="lazy" />
   <figcaption>
     Mobile match pages in action
    <i>Photograph: chris clarke</i>
    </figcaption>
    </figure>

We’re putting a lot of effort into improving our match pages. We have a lot of rich information that isn’t surfaced and we want to change that. We’re looking into how our users scan our live pages, and how we give them all the content they want – in one instance. One plan is to truncate our minute-by-minute liveblogs, bringing a more complete overview of the game, and surfacing supporting content better (match stats, line-ups, etc).


   <figure>
   <img alt="Truncating the minute-by-minute live blog" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/3/25/1395762374011/efd886b4-e9a9-4076-b41b-c0c4e82f74ce-2060x1236.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=ded57804e471b5b9529a15187278d49b" loading="lazy" />
   <figcaption>
     Truncating the minute-by-minute live blog
    <i>Photograph: chris clarke</i>
    </figcaption>
    </figure>

We’re creating a tool for editors to drop elements into their match reports and live blogs as they’re writing.


   <figure>
   <img alt="Editor tool for publishing a league table" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/3/25/1395762791539/0b1833c8-537a-42fe-8b1f-0f019c197589-2060x844.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=abf936f4e74832fcfbeab3003362c7c3" loading="lazy" />
   <figcaption>
     Editor tool for publishing a league table
    <i>Photograph: chris clarke</i>
    </figcaption>
    </figure>

We’ll also be extending this to player cards, match previews and stats and beyond.


   <figure>
   <img alt="The future planning of football" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/4/4/1396602822132/adf43d58-cc62-4701-9bdd-4cb729a63c30-2060x1236.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=04cdada55da61e840d25e2bc74892341" loading="lazy" />
   <figcaption>
     The future planning of football
    <i>Photograph: Chris Clarke</i>
    </figcaption>
    </figure>

> I can see the carrot at the end of the tunnel (Stuart Pearce)

We're not going to change the world with our updates, but hopefully we're making bold enough steps to make a difference at the Guardian. Roll on continuous deployment from a minimal perspective.
