---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2012-oct-02-facebook-london-hack-2012'
headline: 'Facebook''s London Hack 2012: hacking Guardian commenting'
date: '2012-10-02'
authors: [Lindsey Dew, James Gorrie]
standfirst: 'Two of our developers visit Facebook''s new London offices for a marathon hack day'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2012/10/1/1349089229083/68760_10151048448101714_941739731_n.jpg'
  alt: 'A presentation taking place during Facebook''s London Hack 2012 event'
  credit: 'Photograph: James Gorrie/guardian.co.uk'
tags: [Facebook]
---

On Friday 21st September we had our first visit to the newly-opened [London Facebook Office](https://www.facebook.com/notes/facebook-engineering/announcing-facebook-engineering-in-london/10150973192418920) for [London Hack 2012](https://www.facebook.com/groups/londonhack2012). Facebook has a strong culture of 'hacking' and once a month, employees are given 24 hours to spend developing a new app. Successful ideas, which were prototyped at a hack day, include the Like button and Timeline.

The theme of the day was 'distribution' via the [Open Graph API](http://developers.facebook.com/docs/reference/api/). By positing user 'actions' (such as read, share, like, ate etc) to the Open Graph (OG), this information can be shared across the Facebook platform via the newsfeed and posting to users' friends. As usage of the app increases, the graph can also be used to build intelligence about a users' personal preferences and recent activities, enabling Facebook to provide a more personalised user experience. Used effectively, this can develop a powerful two-way loop between the user and the app.

To fully explore how Open Graph can be used, we were given presentations from other services including [Deezer](http://www.deezer.com/en/), a music streaming service, [Pusher](http://pusher.com/), a notifications service for real-time application features, and [Twilio](http://www.twilio.com/), an API for sending and receiving text messages and voicemails.

Twilio demonstrated just how easy it is to use their API with a live demonstration. After [Syd Lawrence](http://sydlawrence.com/), developer evangelist at Twilio, jotted down a couple of lines of code, the audience were invited to text in a phone number. Within a few seconds there were a stream of these messages printed out to the terminal. Moments later we were all called back and [Rickrolled](http://www.youtube.com/watch?v=dQw4w9WgXcQ). With tools explained, we were ready to hack.


   <figure>
   <img alt="The new offices before the day began: all set to hack." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/10/1/1349089286925/403355_10152111777145582_255416373_n.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1916a33a3866911b0ff24dcd71e43b92" loading="lazy" />
   <figcaption>
     The new offices before the day began: all set to hack.
    <i>Photograph: Facebook/guardian.co.uk</i>
    </figcaption>
    </figure>

What we did strayed a little from the given themes, moving more in the direction of correlating Facebook and the Guardian's information. Currently we use Guardian Discussion (our commenting platform) on guardian.co.uk and Facebook Comments for any debate on [our Facebook Canvas app](https://apps.facebook.com/theguardian/). Instead of working with these existing apps, though, we decided to play with Twilio – the text and voice messaging service with a sleek and simple API to plug into your web and mobile apps – to see how we could use it to offer new ways for users to interact with the news.

Signing up and getting our phones synced was all there was to it. We connected our newly-created aggregated comment system to their API, and there we had it. Voicemail and text message comments.

While this in itself didn't seem obviously useful, it did surface the challenge of serving news, and any content surrounding it (i.e. comments), to people who aren't able to be – or choose not to be – connected to the internet 24/7.

This could be useful for both the creation or consumption of news: posting to a liveblog from an area that has little or no data coverage; getting a text from someone who has mentioned a new shop opening just down the road. For simple messages and notifications, Twilio is brilliant due to its immediacy of receipt and straightforward implementation. Roll on Twilio hack day.


   <figure>
   <img alt="Presentations in progress during the hack day" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/10/1/1349089328204/427780_10152113698000582_948509432_n.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=97837ffca632b3402fa52f3759493a60" loading="lazy" />
   <figcaption>
     Presentations in progress during the hack day
    <i>Photograph: Facebook/guardian.co.uk</i>
    </figcaption>
    </figure>

After seven hours of intensive hacking, 32 teams stepped up to demo their hacks. Some of the highlights included [Squirrel Spotter](http://www.squirrelspotter.com/) by [Simon Willison](https://twitter.com/simonw), an app that allows you to report any squirrel sightings via text message straight to your Facebook wall, where all your friends will be notified of your observation.

Winner of the best game category was [SpeedTypr](https://apps.facebook.com/speedtypr/) by [Christoph Burgdorfer](https://twitter.com/cburgdorfer), where the objective was to correctly name as many as your Facebook friends in a short time frame (more challenging than it sounds – our first attempts gave us a score of five and three. And finally, no longer must we suffer pangs of guilt for forgetting to call home: [Mum! I'm Alive](http://morenafiore.com/shadow/index.php) by [Morena Fiore](http://morenafiore.com/) offers a service to automatically send a reassuring text a loved one with your latest Facebook check-ins and activities.

A big thanks to [Facebook](https://www.theguardian.com/technology/facebook) for putting on this event. We really enjoyed mashing up some APIs that we would never have thought to have used and it was inspiring seeing so many imaginative hacks, making use of the new features of the Open Graph and other APIs. Canvas apps are no longer enough – you need to tap deeper into the complexities of the social web to get the best for you and your users.
