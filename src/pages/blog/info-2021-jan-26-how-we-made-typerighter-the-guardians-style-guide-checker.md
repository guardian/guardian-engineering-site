---
layout: ../../layouts/blog.astro
slug: 'info-2021-jan-26-how-we-made-typerighter-the-guardians-style-guide-checker'
headline: 'How we made Typerighter, the Guardian’s style guide checker'
date: '2021-01-26'
authors: [Jonathon Herbert, Sam Hession, Thalia Silver, Justin Rowles]
standfirst: 'Lots of regular expressions, and a timely demonstration by an editorial colleague, led to a two year side-project that eventually ended up in production'
image:
  url: 'https://media.guim.co.uk/3f355fc1b30fb4e9b0b8d1fe199638c4523156c6/22_16_1346_808/1346.jpg'
  alt: 'A dialog showing a spelling correction from ‘Grauniad’ to ‘Guardian’'
  credit: 'Photograph: Jonathon Herbert'
tags: [Typerighter]
---

The [Guardian’s style guide](https://www.theguardian.com/guardian-observer-style-guide-a) was originally published in 1928 as a physical book, and is available to everyone on our website. Over time, it’s grown bigger and more complex, containing guidelines on important topics that we want to get right. Last year, for example, we [updated it](https://www.theguardian.com/environment/2019/may/17/why-the-guardian-is-changing-the-language-it-uses-about-the-environment) to more accurately describe the environmental crisis facing the world. In short, our style guide is ever-expanding, and it changes to reflect our times and values. How do journalists writing and editing content keep up to date?

I’m a software engineer on the Guardian’s Editorial Tools team. Two years ago, the team were introduced to Max Walker, who had been working on an answer to that question. As a subeditor on the Features desk, Max had begun writing [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) – short sequences of characters to search for patterns in text (regex) – to help spot copy that didn’t match parts of the style guide. He’d begun work on them about a year before, and had written a script to apply them to copy as it appeared on our website.

Led across the office by our product manager David Blishen, we peered over Max’s shoulder at the litany of corrections his regexes had picked up. There were lots. Somebody asked Max how many rules he’d written. “Oh”, he said. “About 13,000.”


   <figure>
   <img alt="My god, it’s full of ... regular expressions!" src="https://i.guim.co.uk/img/media/5d6e0435b6daf0ebb799a29f3aa6f9f43db08ba6/0_671_2292_1375/master/2292.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1b2bfed2401845c653d80e17c3b8e9a2" loading="lazy" />
   <figcaption>
     My god, it’s full of ... regular expressions!
    <i>Photograph: MGM/Allstar</i>
    </figcaption>
    </figure>

Digesting the volume of work we’d just seen, we returned to our desks, but not before I’d had a brief chat with Max. I wanted his rules to reach a larger audience. What would it take to apply his rules to journalists’ copy in Composer, the Guardian’s browser-based content management system? And how many mistakes would they spot once they were there?

Apply 13,000 regexes to content with this one weird trick
---------------------------------------------------------

The system we made to answer these questions has four components:

*   A rule management service, to store the list of rules and manage it as it changes over time.
    
*   A rule application service, to check documents against that list of rules and return matched text.
    
*   A client to provide a UI in the browser and interact with the rule application.
    
*   A telemetry service, to let us know how the application is performing, from both a system and a user perspective.

Here’s how they interact:


   <figure>
   <img alt="A diagram showing the infrastructure that makes up the Typerighter service." src="https://i.guim.co.uk/img/media/43f0e01153f60d1c73a73eb1613246c92d16f4f4/47_37_1605_1127/master/1605.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3145d6abf9bdc3c9fbd62970f6af1411" loading="lazy" />
   <figcaption>
     Pre-existing components are white. Components shaded in blue were written for the Typerighter service.
    <i>Photograph: Jonathon Herbert</i>
    </figcaption>
    </figure>

To keep our options open while we were exploring the shape of our data – and to keep things simple while pursuing what was then a passion project – we avoided writing a rule management service entirely. Wincing, we dumped the entire rule list into a Google Sheet. We needn’t have worried. It’s proven to be a great way to get a prototype out quickly. How many freely hosted databases can boast a schemaless format, a robust API, durable storage, and collaborative editing that non-technical stakeholders find easy to use?

The [rule application service](https://github.com/guardian/typerighter) is written in Scala, a [common choice](https://www.theguardian.com/info/developer-blog/2011/apr/18/scala) for Guardian backends. Separating rule management and rule application has helped us to keep each part of the service simple and resilient – ensuring, for example, that high load on the application service won’t affect the responsiveness of the management service, and vice versa.

We kept the API of the service simple. The interface that individual matchers have to fulfil to check text is easy to write. It’s specified in our Matcher trait (source [here](https://github.com/guardian/typerighter/blob/main/apps/checker/app/utils/Matcher.scala)):

```scala
trait Matcher {
  // 
  def check(request: List[TextBlock]): Future[List[RuleMatch]]
  
  // ... a few getters for the Matcher state
}
```

No matter the complexity of the work that goes into managing what text to check and when, it should always be easy to write a matcher. It’s a function that receives the ordered sequence of text fragments that describe a document, and asynchronously passes back information about any matches it has found when they’re ready. It’s up to the rest of the system to figure out what to pass to the matcher, and what to do with the results.

Because we’re not tied to a specific matcher implementation, we’ve been able to use the [LanguageTool](https://github.com/languagetool-org/languagetool) project libraries to enhance some of Max’s regular expressions with natural language processing, and we’re looking forward to incorporating other novel matching techniques in future as we refine our list of rules.


   <figure class="supporting">
   <img alt="An early version of the Typerighter UI." src="https://i.guim.co.uk/img/media/56fcb40cac6ad96de71018ef3731f8df2af5fad7/0_0_742_398/master/742.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=e7ea407c8135c392b2006975b8bed1bf" loading="lazy" />
   <figcaption>
     An early version of the Typerighter UI.
    <i></i>
    </figcaption>
    </figure>

On the client, we [wrote a plugin](https://github.com/guardian/prosemirror-typerighter) for [Prosemirror](https://prosemirror.net/), the framework that powers our document editor, to provide a front-end. Its first UI is written in React, but the plugin API is agnostic about the rendering layer to enable us to present Typerighter differently in different contexts – in headlines, rather than articles, for example. Like the popular state management library, [Redux](https://redux.js.org/), we use a reducer and a pub/sub store to keep the two in sync.

With the core of the system designed and built, we still had one item left on our wishlist, perhaps the most important: a way to keep track of the number of matches Typerighter would find, and discover how many of those matches our subeditors would find useful.

The Guardian already has an excellent department-wide logging service, Central ELK – a large Elasticsearch cluster which provides indexed access to our application logs. We used this to persist the data we receive from the [telemetry service](https://github.com/guardian/editorial-tools-user-telemetry-service) we created. We’ve instrumented our client with this service to learn about our users’ interactions with the tool. We have standard event descriptions for documents, rules and matches, plus user events for UI interactions like accepting suggestions and marking matches as correct.

As well as helping us understand which features are well used, and giving us clues as to why, this data helps us answer interesting questions about our rules. For example, which are noisy, matching many times without offering suggestions? Which are most often accepted when they’re offered? And which are always ignored or dismissed? Visualising this in [Grafana](https://grafana.com/) makes spotting trends and making higher-impact changes easier, and we’re looking forward to taking this further by including telemetry in our rule management service.


   <figure>
   <img alt="A screenshot showing telemetry data for the Typerighter service." src="https://i.guim.co.uk/img/media/6043977d7ede0d028aaf318ef6d1c226c1794f3a/0_0_1544_984/master/1544.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=0cd7a0ace2fc22d434fcc95038829a95" loading="lazy" />
   <figcaption>
     ‘Summary view’ is a feature that we hope to retire. The data backs us up!
    <i>Photograph: Jonathon Herbert</i>
    </figcaption>
    </figure>

By mid-2019, we’d completed the bones of this system. Soon, it sat behind a feature switch in our CMS, Composer, quietly … gathering dust. What we needed now were users.

If we build it, will they come?
-------------------------------

At the end of the year, Max spotted our opportunity: a UK general election was looming, and there were hundreds of candidates. A large number of names that had to be correct – but weren’t worth memorising – seemed like a great candidate for an automated check. We thought this might be enough to save our journalists some time, and give them an insight into what was possible with Typerighter.

As election day approached, we watched the traffic hitting the system rise. Editorial users were taking an interest, and word-of-mouth feedback was good. We also had something topical to demo to our stakeholders. This practical proof-of-concept raised the profile of the tool enough to put it on our [OKR](https://en.wikipedia.org/wiki/OKR) track, and we secured three months of team time to get the system into shape for production use.


   <figure class="supporting">
   <img alt="The Typerighter UI after some OKR polish." src="https://i.guim.co.uk/img/media/6cdff23cd26dfb8be9ccd715c716a64fe821d9c6/0_0_743_397/master/743.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f159384d0519a3e6c16f720a0b5d8c86" loading="lazy" />
   <figcaption>
     The Typerighter UI after some OKR polish, with red, yellow and green rules.
    <i></i>
    </figcaption>
    </figure>

With buy-in from the editorial department, we were able to explore how Typerighter would fit into their workflow. It was clear from early feedback that the interface was producing too much visual noise, confusing users and diverting their attention away from the most significant matches. To address this, we added a traffic light system, splitting matches into three clear categories: red (wrong), orange (worth checking) & green (correct). This allowed us to visually prioritise the most important information, and let users tailor the display to their preference. Working with our enthusiastic editorial test group, we also found ordering matches by these categories to be the most intuitive way to navigate through a document – an intuition backed by our telemetry data.

After a soft launch and a month’s work iterating with our testers, we threw the feature switch and made Typerighter available for all our Composer users in October 2020. Since then, the team has worked enthusiastically to gather feedback, iterate and advocate through newsletters and demos, and usage has steadily grown.

The UI makes it easy to flag a problem with a rule, or capture a suggestion or complaint, in situ, and we receive a steady stream of feedback that’s been instrumental in making the service useful for users. A lot of it concerns rules, and we respond as quickly as we can, either fixing things on the spot or deferring to the style guide committee if something needs to be clarified. The result is a feedback loop, illustrated below, that has the same shape as the architecture diagram we saw at the start:


   <figure>
   <img alt="A picture of three post-it notes showing the life cycle of a Typerighter rule – creation/amendment, application, feedback/telemetry, and back to creation/amendment again." src="https://i.guim.co.uk/img/media/c44a085769120d222464a665ee7ff7b498753f6c/0_0_1442_886/master/1442.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=0355240057a0cf977e2ab8e10a589a32" loading="lazy" />
   <figcaption>
     The virtuous circle of ... stylistic correctness.
    <i>Photograph: Jonathon Herbert</i>
    </figcaption>
    </figure>

Post-launch, we’ve tried to keep power in the hands of our users, rather than automate it away, to make the workings of the tool as transparent as possible. This principle is something we’ve enshrined in our [vision document](https://github.com/guardian/typerighter/blob/main/vision.md) for the project, and it occasionally means deferring what at first seem to be obvious product decisions. For example, providing a quick way to globally apply changes feels like an easy win – but it violates our transparency principle, as the user might not be aware of some of the changes the tool is making. We’ve chosen a conservative approach, but by ensuring that it’s always clear how applying suggestions will affect a document, we aim to preserve an overall trust in the safety of the tool.

More generally, these principles express a commitment we made at the beginning, as an ad-hoc collaboration between our Editorial and Product & Engineering departments. Typerighter aims to help us be consistent with the style guide, but it’ll never be a replacement for actual editorial judgment. Any time it saves is intended to help our busy journalists focus on the other aspects of our content that really matter – the great stories, pictures, headlines and standfirsts that our readers expect. Typerighter’s now catching and correcting many hundreds of styling mistakes a day, and as of January 2021, more than half of the articles we publish receive a Typerighter check.

<figure>
                <iframe class="video" src="https://youtube.com/embed/Yl0nb94N98k" title="Typerighter hard at work on a production article." allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

So, what’s next? We’ve finally outgrown our Google Sheet, and we’ll be migrating away from that to a bespoke rule management service over the next few months – an important part of putting the ‘create/amend rules’ step firmly in editorial hands. And our developers are looking at adding a dictionary matcher to work in tandem with Max’s rules, to catch the typos which our high-speed journalism has [made us famous for.](https://en.wiktionary.org/wiki/Grauniad)

We’re looking forward to what comes next. And if a customisable document checker is something you’d be interested in working on, at the Guardian [we develop in the open](https://www.theguardian.com/info/developer-blog/2014/nov/28/developing-in-the-open) as much as we can, and as a result all of the Typerighter code is [open](https://github.com/guardian/typerighter) [source](https://github.com/guardian/prosemirror-typerighter). We’d be delighted if you joined us.

_Postscript: After several engineers wrote and proofed this blogpost, we ran Typerighter on it, and still found a fair few styling errors – thanks, Max and team! 👏_
