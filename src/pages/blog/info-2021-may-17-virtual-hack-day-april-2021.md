---
layout: ../../layouts/blog.astro
slug: 'info-2021-may-17-virtual-hack-day-april-2021'
headline: 'Virtual Hack Day April 2021'
date: '2021-05-17'
authors: [Rasha Ardati]
standfirst: 'In April, colleagues from across product and engineering, as well as other parts of the organisation, came together for another exciting remote hack day'
image:
  url: 'https://media.guim.co.uk/96a003162d7a66b9be621de3b88f37c66936dce4/0_0_5000_3000/5000.jpg'
  alt: 'The Guardian website in 1821 mode. '
  credit: 'Photograph: The Guardian'
tags: [Hack day]
---

For our second virtual hack day of 2021, we went back to our classic format: a free-for-all with a side theme of ‘try something new’. This was left to personal interpretation; whether it was trying a new programming language, attempting a new way of working or taking a different approach to a concept.

We produced and presented 27 amazing hacks over the two-day event. These included: a new internal tool for creating Recipe Atoms, which contain all the information about a recipe in a way that is easy for computers to understand; helping new readers orient themselves more easily in fast-moving live events; a Chrome extension that adds an individual’s gender pronouns into Google Chat; and helping our users to better find accessibility resources.

Here is a selection of our best concepts and designs from the day:

**Best Conceptual Hack: 1821 mode**

Taking the Guardian back to its roots, 1821 Mode celebrated the paper’s 200th birthday by giving 21st century content a 19th-century look. The hack pulled through stories from the Content API and built a homepage styled to look like the first edition of the (then) Manchester Guardian, complete with language filters and old-time ads for household essentials like Mennen’s Toilet Powder.

**Best Technical Hack: eyegaze browser**

People who need to browse the internet via eyegaze (eg. due to a mobility-limiting disability) currently tend to require expensive hardware, so a free software-only option could be useful. The ‘eyegaze-browser’ extension adds an interface to Chrome allowing the user to navigate websites using eyegaze tracking via their normal webcam (leaning very heavily on the [WebGazer library](https://webgazer.cs.brown.edu/)). The extension is a very rough-around-the edges proof-of-concept, but it worked just about well enough for a demo where a user could navigate the Guardian via eye movements.


   <figure>
   <img alt="Eyegaze browser screenshot" src="https://i.guim.co.uk/img/media/ffddcb4f178a26d716a8e5252b106ae14e19e668/36_0_1977_1186/master/1977.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=09295610282b1d41e464724b08fc7647" loading="lazy" />
   <figcaption>
     Eyegaze browser screenshot
    <i>Photograph: Rasha Ardati/The Guardian</i>
    </figcaption>
    </figure>

**Most Entertaining: key result 4**

Working from home, in the seat by the door, this hacker had increasingly become obliged to his cat’s whims. This finally prompted the question, “is my cat my real boss?” Thus, he set off on a quest, partly inspired by not wanting to pay £30 a month to ask Google whether it can see your cat.

A very elaborate way of saying this hack was a motion sensor on a wifi cam. When it sees movement, it uses Google vision to see, in this instance, a cat, and then messages the owner.

The idea itself used this hacker’s very own very grumpy cat of course as the subject and getting it to work was more of a case of cutting down false positives. The bit that was the most challenging was motion detection. A lot of the moving parts for this hack were thankfully ready made out of the box, thanks to the amazing [OpenCV](https://github.com/opencv/opencv) motion detection library.


   <figure>
   <img alt="The boss cat" src="https://i.guim.co.uk/img/media/203e1559c5faf08acaaea018656726168049cc98/0_153_2043_1227/master/2043.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4cd54aa5aa9bbf0c1873522d8aff1c21" loading="lazy" />
   <figcaption>
     The boss cat
    <i>Photograph: Alex Ware/The Guardian</i>
    </figcaption>
    </figure>

And finally, our captain, Chief Product Officer Caspar Llewellyn- Smith reflects on the day:

_There is never any expectation that anything that teams work on during a hack day at the Guardian should be fully built and shipped, although ever since our first hack day in 2008, we’ve seen some huge real-world successes (for instance, [Ophan](https://thenextweb.com/news/how-the-guardians-ophan-analytics-engine-helps-editors-make-better-decisions), our in-house real-time analytics tool, was born out of a hack day in 2011). But one hack from our recent hack day went live within a couple of weeks – because a real deadline was involved, albeit one 200 years in the making._

_It’s been said that the Product and Engineering department at the Guardian operates as a startup within a company that’s almost 200 years old – and now we’ve reached that milestone, with our 200th anniversary falling on 5 May. Our hack day that preceded that date wasn’t tied to the anniversary – in fact, the theme we gave it was ‘try something new’! Over two dozen hacks resulted, covering everything from a way to introduce spoiler alerts to Guardian TV reviews and match reports to ways in which we can use machine learning to make our journalism and products more accessible to those with disabilities. There was a really cool hack involving members of our data science team that sought to identity the sentiment expressed by the headlines we write f0r our stories, which could help our advertising teams, while another made it easier to get a feel for our magazine Guardian Weekly when browsing our subscription offers._

_One team did however choose to focus on the Guardian’s anniversary – and created a way to read the frontpage of the website in the style and look of 1821. Everyone at the hack day loved it, and so did the editor-in-chief, so when the big day came, the teams ensured that what had been a hack [became real](https://1821-mode.theguardian.com/). It was especially pleasing that the team responsible for the hack was made up of the latest intake of [Fellows](https://www.theguardian.com/info/2020/nov/27/guardian-software-engineering-fellowship-2021-apply-now) to the Product and Engineering department, aspirant developers who are new to the Guardian who we hope we can train and develop to help secure our future._

As always, we would like to extend a well-deserved congratulations to all the winners, as well as a huge thank you to everyone who participated and the many people behind the scenes who help make our hack days happen.

Till next time!
