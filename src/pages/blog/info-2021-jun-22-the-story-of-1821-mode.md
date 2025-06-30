---
layout: ../../layouts/blog.astro
slug: 'info-2021-jun-22-the-story-of-1821-mode'
headline: 'Old the front page! The story of 1821 Mode'
date: '2021-06-22'
authors: [Frederick O''Brien, Ara Cho, Mario Savarese, Samantha Gottlieb]
standfirst: 'To celebrate the Guardian’s 200th anniversary we turned the theguardian.com network front into its 19th-century ancestor. Here’s how we transformed the hack into reality using a selection of tools, some styling and creative thinking'
image:
  url: 'https://media.guim.co.uk/6b020bdd2e663fe2873115eb29447fea9aa63f62/391_0_13210_7925/13210.jpg'
  alt: 'The Manchester Guardian, first edition, 5 May 1821. Page one'
  credit: 'Photograph: David McCoy/The Guardian'
tags: []
---

In April we participated in our first [Hack Day](https://www.theguardian.com/info/2021/may/17/virtual-hack-day-april-2021). It was a chance for new [software engineering fellows](https://www.theguardian.com/info/series/digital-fellowship-scheme) to get to know each other and make something fun in a no-pressure environment. We settled on the idea of an old-school homepage that paid tribute to the paper’s first print edition, published on 5 May, 1821. We made [1821 mode](https://web.archive.org/web/20210506083228/https://1821-mode.theguardian.com/) – an Easter egg webpage rendering today’s stories in the style of the (then) Manchester Guardian’s first edition.

The first iteration was a [React](https://reactjs.org/docs/create-a-new-react-app.html) app that pulled through stories from the [Guardian Content API](https://open-platform.theguardian.com/) (CAPI). By feeding content into one long column using the [column-count](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count) CSS property, we could imitate the layout of a 19th-century newspaper.

**The hack in real life**

After hack day was over it was a surprise to be asked to implement 1821 mode on the website in celebration of the anniversary. It was possible, provided some of the features in the original hack were scaled back.

Instead of pulling through the latest articles, it would be a custom, unchanging selection that would be linked from the homepage for one week. Furthermore, articles would not have standalone pages – ‘continue reading’ links would take visitors back to the real 2021 mode site. With engineering manager Jon Soul’s guidance, we built the page. The Guardian’s executive editor, reader revenues, [Mark Rice-Oxley](https://www.theguardian.com/profile/mark-rice-oxley) provided the articles on the day and group product manager, Abi Bendall, helped pull it all together.

**Keeping our Content API happy**

A big part of making it work was how it interacted with our Content API. In the original hack whenever someone visited the page it would request articles from our Content API and populate the page. That’s fine for a demo with one user, but what happens when a page gets thousands of views, each one sparking eight Content API calls? Some back of an envelope calculations showed hundreds of thousands, even millions of requests weren’t beyond the realm of possibility.

We wrote a script that requested the chosen articles and stored them in a static file. The app would then make ‘requests’ to that file. That way if the 1821 Mode page had eight stories, only eight Content API requests would be needed for the initial build. Beyond that it wouldn’t be needed at all.

**Styling and ads**

Creating the 1821 mode for real also gave us time to improve its styling and responsiveness. We added media queries so the number of columns would change depending on device size. For desktop it was six, for mobile, two. Font sizes got similar treatment.

The fonts themselves came from [Google Fonts](https://fonts.google.com/) and mostly carried over untouched from the Hack Day design.

*   Story headings: [Eczar](https://fonts.google.com/specimen/Eczar)
    
*   Story copy: [Newsreader](https://fonts.google.com/specimen/Newsreader)
    
*   Small caps: [IM Fell English SC](https://fonts.google.com/specimen/IM+Fell+English+SC)

The font used in the original hack masthead was [UnifrakturCook](https://fonts.google.com/specimen/UnifrakturCook), which was fit for purpose, but for the second version we were provided with a beautiful crisp SVG of the original Manchester Guardian splash as seen on the first edition.

We also updated the pricing. The first edition cost sevenpence. In this version, we created links to the Guardian’s subscription and contributions pages.

All ads in 1821 mode used free-use images found on [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page).


   <figure>
   <img alt="un-edited ads from Wikimedia Commons" src="https://i.guim.co.uk/img/media/4019bc3a5c9c9453beaf3bbfb9130db268ebac27/75_76_1345_962/master/1345.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=6a144e7a71fa045418d74b1e1b15e010" loading="lazy" />
   <figcaption>
     Unedited ads from Wikimedia Commons
    <i>Illustration: Frederick O'Brien/The Guardian</i>
    </figcaption>
    </figure>

After manipulation in the open-source [GIMP photo editor](https://www.gimp.org/), we reduced these to PNG files, with the lines solid black and everything else transparent. That way they could replicate the ink on paper look we needed.


   <figure>
   <img alt="Edited carrossier ad." src="https://i.guim.co.uk/img/media/e4513b2ff95403d8ed9f3d1236238e7615ba81d9/0_9_621_621/master/621.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=6251a874e4a346fb15a88bdf057594fd" loading="lazy" />
   <figcaption>
     Edited carrossier ad.
    <i>Illustration: Frederick O'Brien/The Guardian</i>
    </figcaption>
    </figure>

**Collaboration with editorial**

Of course, all of the above would have been moot without the most important part of any newspaper: its editorial stories. During our kick-off meeting, it was agreed Mark would curate a selection of journalism appropriate for 1821 mode, complete with 19th century headlines, which we could input using a find and replace function in the app.

Mark also knew exactly how many issues of the _Manchester Guardian_ were published, and what edition the 5 May 2021 would be: 54, 337 to be precise. With all these elements in place, we were ready to assemble the page on the morning of the 200th anniversary … or so we thought.

**Ship it**

Putting the page together on the day was relatively straightforward. We never could get the ads to sit just right due to the flexible super column approach. Sometimes the page sat beautifully; other times it didn’t. Still, the ‘full’ page wouldn’t look too out of place in the 1800s:


   <figure>
   <img alt="First edition vs 1821 mode." src="https://i.guim.co.uk/img/media/0aaa86e910c043cf149c0e6818f998907fa30d1d/0_50_1500_900/master/1500.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=dc11d9b4acf4a58a834d0f83a2c1a5ef" loading="lazy" />
   <figcaption>
     First edition vs 1821 mode.
    <i>Illustration: Frederick O'Brien/The Guardian</i>
    </figcaption>
    </figure>

When the time came to publish, it was time to decide where. The original hack had been partially deployed on [Surge](https://surge.sh/), which we struggled to map the official URL to. We had similar issues with [Netflify](https://www.netlify.com/) before eventually settling on an Amazon S3 bucket.


   <figure>
   <img alt="1821 mode treat link guardian homepage" src="https://i.guim.co.uk/img/media/162b63f4faa21b6b74e4aa20953a5d76ff945f72/0_0_1500_450/master/1500.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=b517188a90952aa49b323e274d6976ec" loading="lazy" />
   <figcaption>
     1821 mode treat link guardian homepage.
    <i>Illustration: Frederick O'Brien/The Guardian</i>
    </figcaption>
    </figure>

And that was it! We featured as a treat on the network front and [the author Margaret Atwood even liked it](https://twitter.com/MargaretAtwood/status/1390683375720189954)!

We’d like to thank everyone in product and engineering and editorial who worked with us to bring this project to life. It was an amazing experience and introduction to Guardian culture.
