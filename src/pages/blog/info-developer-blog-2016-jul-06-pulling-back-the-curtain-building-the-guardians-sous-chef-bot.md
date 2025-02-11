---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-jul-06-pulling-back-the-curtain-building-the-guardians-sous-chef-bot'
headline: 'Pulling back the curtain: building the Guardian''s sous chef bot'
date: '2016-07-06'
authors: [Alastair Jardine]
standfirst: ''
image:
  url: 'https://media.guim.co.uk/2b9247b414f6c7928607bde245ed371c4f7fea46/0_129_1200_720/1200.png'
  alt: 'Sous-chef is here to help'
  credit: 'Photograph: The Guardian'
tags: [Chatbots]
---

The Guardian [recently released its first bot](https://www.theguardian.com/technology/2016/jun/09/meet-our-experimental-guardian-sous-chef-facebook-messenger-bot): Sous-chef. It’s designed to help you find recipes from the Guardian’s archive using [chat on Facebook Messenger](http://m.me/guardiansouschef). Here’s what we did, what we learned along the way, and some notes for the future.

First steps
-----------

We initially had two bot ideas we wanted to explore: a football bot and a food bot. The football bot proposal was complex, offering information about the Euros and functionality to send football related notifications to people when we start a live blog.

We tested both concepts by building…nothing. We decided to write a pre-scripted interaction, and test it behind the curtain using a technique called [Wizard of Oz](https://en.wikipedia.org/wiki/Wizard_of_Oz_experiment) testing. We were strict with ourselves, and only responded to users in a way that a ‘dumb’ bot might do.

The team recruited Guardian staffers to test the bots, unbeknown to them it was _us_ behind the chat window. It was fun trying to find answers quickly (copy and paste came in useful here), but asking people’s feedback elicited positive responses, and people were quite forgiving of its stupidity.

We learned that tech-savvy, media people responded well to the bots, but it’s not our target market. We did prove, though, that the bot interaction model is fine. The football bot – whilst interesting and something we hope to look at in the future – was too complex and required third-party integrations. Our focus switched to making the food bot live.

Sous-chef, live!
----------------

The bot was tested in the Guardian’s UX studio, after which we refined copy, sequencing, and flow of messages. We brought in people who we were aiming at: tech savvy, future embracing foodies.

The first public version of Sous-chef was released on Facebook Messenger, which we used to figure out en-masse what people were asking it and where it was failing.

Analysing conversations led us to the conclusion that we couldn’t handle all of the actions within our own app. It needed to handle a _much_ wider range of expressions and responses than could be caught by our own regular expressions. Below is an example of the bot asking a user if it has done a good job:


   <figure>
   <img alt="Sous-chef ‘find me more’ interaction" src="https://i.guim.co.uk/img/media/2494bdbc2cd5eddd79b871a5b46db5c47520dcef/0_0_674_681/master/674.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=02d965146264ad881af3aada48dd7d0a" loading="lazy" />
   <figcaption>
     Sous-chef ‘find me more’ interaction
    <i>Illustration: The Guardian</i>
    </figcaption>
    </figure>

If the user types or clicks “Yes”, we complete the happy path with a suitable quip. If the user types “No” or clicks “No, show me more”, the bot searches for more recipes.

However, in the real world, we were seeing typed responses like:

*   ‘Yeh’
*   ‘Nah’
*   ‘Not good enough’
*   ‘Go away’
*   ‘Yum’
*   ‘no find me more’
*   ‘That’s brilliant I like it’
*   ‘Cheers’

Trying to code responses to each of those would be challenging. Having to change core code to match these expressions is slow and inefficient, and prevents us from moving quickly, so we moved to [wit.ai](https://wit.ai/), which can be trained to handle classes of answers.

What’s next?
------------

One of the questions we’re hoping to answer is how people rate the bot experience. We exploring options for in-bot rating of the experience, along with an A/B testing framework for running multiple experiences alongside each other so we can directly measure improvements to the script.

Side notes
----------

**Measures of success:** What does good look like? Is it attention time? Time to successful resolution of the question? Returning users? All of the above? [Ted Livingstone’s](https://medium.com/@tedlivingston/a-new-metric-for-chat-8ddaef1884e9#.pe3n932x5) piece is a good starting point for chat-based metrics, but doesn’t talk about bot-based interactions.

**Tone of voice:** We’ve spent a bit of time discussing tone of voice. How should a recipe bot ‘talk’ to the user? It was designed with food-related puns initially, which seems fine. But a news bot covering serious topics? That should probably be a bit more serious. Personality will be a big thing: it should reflect your brand.

**Structuring bots:** One bot per service or content vertical (football, food, news etc), or one bot per organisation that can handle it all?

**Mapping conversation flow:** We initially scripted happy path conversations using paper chat bubbles and writing things down, then moving to electronic means to capture the text. It’s hard to do this, especially when there are conditional responses. There _has_ to be a better way of doing this without building it, but I’ve yet to find it.

*   [Chatbot lawyer overturns 160,000 parking tickets in London and New York](https://www.theguardian.com/technology/2016/jun/28/chatbot-ai-lawyer-donotpay-parking-tickets-london-new-york)
