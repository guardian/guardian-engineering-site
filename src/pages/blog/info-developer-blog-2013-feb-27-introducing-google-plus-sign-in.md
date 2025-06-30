---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2013-feb-27-introducing-google-plus-sign-in'
headline: 'Introducing Google+ sign-in'
date: '2013-02-27'
authors: [Adam Fisher]
standfirst: 'Our digital development team talk through the integration with Google+ to allow easy sign-in to the Guardian'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/2/27/1361963416094/googleplussignin.jpg'
  alt: 'Google user? You can now sign in to guardian.co.uk with your account'
  credit: 'Photograph: Adam Fisher/Guardian'
tags: [Google]
---

At the Guardian we've been working hard to make users' experience with our products more personal and engaging. At the core of this is getting users to sign in and over the last year we've been trying to reduce the barriers to signing into the Guardian. The most visible and successful of these changes has been allowing users to sign into the Guardian using their social accounts. [Social sign-in](http://www.guardian.co.uk/global/insideguardian/2012/may/29/social-sign-on-faq) first launched back in May 2012, initially offering Twitter and Facebook integration.

Later on in 2012 we added Google to the list, using their OAuth 2.0 API for web server applications. Now, to coincide with the launch of the new [Google+ Sign-In](https://developers.google.com/+/) functionality, we're making it even easier to sign into the Guardian site with your Google account.

Chief among the user-facing changes, users with compatible [Android devices](http://www.android.com/) will now be given the opportunity to download the [free Guardian app](https://play.google.com/store/apps/details?id=com.guardian) when they sign in with Google. This will help correctly-equipped users to discover this additional way to consume Guardian content. We are also planning some future changes that will bring additional features to our Android app, so watch this space. Additionally, we'll be displaying a "Sign in with Google" message on the top of some Guardian pages to help users discover this new functionality, which is something we've already been doing with Facebook.

The Android app integration is a big step forward but Google's offerings touch on many aspects of our online presence. Because we now use Google+ for sign-in, we will be able to integrate the breadth of Google's services into Guardian pages, for example making better use of Google+ Hangouts in our content. Again, watch this space.

Social sign-in flows like those available on the Guardian can be of great benefit to the user. For the developer though, they can be very tricky to implement. Developers that want to add multiple OAuth-powered sign-in services can, in theory, use the same OAuth code across all the services. In practice, this tends not to be the case. Google and Facebook both provide [OAuth 2](http://oauth.net/) APIs to sign users in, but they differ in their implementations of the specification. For example, [the Google API we were using](https://developers.google.com/accounts/docs/OAuth2#webserver) is very strict with the allowed callback parameters while [Facebook's API](http://developers.facebook.com/docs/concepts/login/) is very strict with the domains you can whitelist during testing. Twitter offer a similar service, but [their API uses OAuth v1.0A](https://dev.twitter.com/docs/auth/oauth), which is an older and much more complex version of the OAuth specification.

With the our new Google+ Sign-In implementation, we sidestep this issue in much the same way as Facebook's JS SDK does. Google's platform does most of the heavy lifting, taking the user through all the necessary steps and providing the access token to us at the end. This approach means that Google have more control over the user experience and that developers integrating their website with Google+ need to duplicate less of Google's functionality. The latter has an added benefit of making the web more secure. Websites trust that the Googles and Facebooks of this world can create secure login flows, since they use them as sign-in providers. By offering this kind of deep integration, platforms offering sign-in services can ensure that more of the flow benefits from their careful attention and that improvements and bug-fixes can be rolled out on their own terms. With these advantages and the [controversy surrounding the OAuth specification](http://hueniverse.com/2012/07/oauth-2-0-and-the-road-to-hell/), perhaps this more integrated approach is the future of these sign-in services?

Give our new Google+ Sign-In option a spin, let us know how you find it, and look out for future developments.
