---
layout: ../../layouts/blog.astro
slug: 'info-2020-jun-12-the-guardians-experience-implementing-sign-in-with-apple-on-android'
headline: 'The Guardian’s experience implementing Sign in with Apple on Android'
date: '2020-06-12'
authors: [Amina Adewusi, Jordan Terry]
standfirst: 'Here we outline some of the technical options available to Android developers.'
image:
  url: 'https://media.guim.co.uk/2ec63e182c25d10f1ef4ccfb2943730c79b4e084/0_0_2133_1280/2133.jpg'
  alt: 'Offering increased privacy, developers have until 30 June 2020 to implement Apple’s new sign-in solution. Photograph: gilaxia/Getty Images'
  credit: 'Photograph: gilaxia/Getty Images'
tags: [Android, Apple, Computing, Mobile phones]
---

What is Sign in with Apple?
---------------------------

In 2019 Apple announced their new sign-in solution, _[Sign in with Apple](https://developer.apple.com/sign-in-with-apple/get-started/)_, which is a requirement for all iOS apps that offer another third party sign-in solution (for example Google or Facebook). The deadline for this requirement is 30 June 2020 for all new apps and app updates submitted to the App Store.

One of the advantages is [enhanced privacy](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/overview/introduction/) as users do not have to share their personal email address with app developers. Apple provides a unique and random email address that automatically relays messages to their personal email address. We take data privacy very seriously at the Guardian and seek to uphold the highest standard of personal data protection. We continue to follow our [privacy stance](https://www.theguardian.com/help/privacy-policy).

To create a consistent sign-in experience for users, [Apple](https://www.theguardian.com/technology/apple) recommends offering their new _Sign in with Apple_ solution across non-Apple platforms and the web.

At the Guardian implementing _Sign in with Apple_ on iOS only was not a choice. Given the architecture of our account management, it was something that we would need to offer across both platforms and the web.

Whilst Apple does offer some documentation for non-Apple platforms, we were unable to find one place that summarised the options available to [Android](https://www.theguardian.com/technology/android) developers seeking to implement _Sign in with Apple_, so we wanted to share our experience.

What are the options available to Android developers?
-----------------------------------------------------

Apple provides a few different options to allow developers to integrate _Sign in with Apple_:

*   a framework for Apple engineers to integrate with iOS, macOS and tvOS
    
*   a Javascript API for web platforms 
    
*   for other platforms another [API](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/incorporating_sign_in_with_apple_into_other_platforms) is provided by Apple to allow the sign in process to open in another web flow.

The best option for Android developers is most likely using the API provided for other platforms. The workflow of this API is fairly simple: a URL will be opened for the user in a web view, allowing them to securely sign in to their Apple account. Once complete, the relevant data will be sent back to the Android app to complete the login process.

For some products the number of users using both Apple and Android devices may be small, so it seems sensible to explore pre-existing options that could reduce development time. Below we explore the other implementation options we have found.

Firebase authentication
-----------------------

[Firebase](https://firebase.google.com/docs/auth/android/apple) provides a _Sign in with Apple_ solution as one of their extensive authentication options. The Firebase team has helpfully summarised the work you might have had to do within their SDK.

If you are already using Firebase authentication in your app, this is an ideal solution. However, as this option is tightly coupled with Firebase it won’t be appropriate if you do not make use of it, or you have your own bespoke registration system.

Third party SDK
---------------

Some helpful Android developers have already attempted to implement a version of Apple’s Other Platforms API and then open sourced their work for other developers to use.

This [library](https://github.com/willowtreeapps/sign-in-with-apple-button-android) has some benefits, but when you need access to personal data from Apple, such as a user’s e-mail or names the data is sent back to you in a POST request. This cannot be handled solely via an Android app and will require a server side application to ingest that information.

We spent some time looking into this library, and whilst it did not quite meet our needs at the Guardian we still think it is useful for understanding how you might want to design your implementation.

After we looked into the options above, we decided that our own bespoke implementation would be the best approach, which we outline in the next section.

How did we implement Sign in with Apple at the Guardian?
--------------------------------------------------------

We implemented Apple’s documentation for [Other Platforms](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/incorporating_sign_in_with_apple_into_other_platforms), which uses the OAuth framework. [Aaron Parecki](https://twitter.com/aaronpk), a Security Architect, gives a great overview of how the Apple OAuth flow works [on the Okta Developer blog](https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple).

When a user clicks “sign in with apple” the sign-in flow is started by opening the authorization URL in a WebView with the required parameters \[1\].


   <figure>
   <img alt="A Sequence Diagram showing how we at the Guardian implemented Sign in with Apple on Android." src="https://i.guim.co.uk/img/media/c7f88bb33324f5395a8ac1e6c2b6d42822089b1a/0_0_4634_1888/master/4634.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1a85899a32499d6c095bc08636ef01e9" loading="lazy" />
   <figcaption>
     A Sequence Diagram showing how we at the Guardian implemented Sign in with Apple on Android.
    <i>Photograph: https://bramp.github.io/js-sequence-diagrams/</i>
    </figcaption>
    </figure>

To create an account at the Guardian we require a name and email address. In order to retrieve this information we use the _scope_ query parameter, which allows us to access this information. We set the _response\_mode_ to be _form\_post,_ as per the documentation: “If you requested any scopes, the value must be form\_post” \[2\]. Apple returns the values of these parameters to the _redirectURI_ in the body of a POST request \[3\].

The Android app uses the [shouldOverrideUrlLoading](https://developer.android.com/reference/android/webkit/WebViewClient?hl=en#shouldOverrideUrlLoading\(android.webkit.WebView,%20android.webkit.WebResourceRequest\)) and [onReceivedHttpError](https://developer.android.com/reference/android/webkit/WebViewClient#onReceivedHttpError\(android.webkit.WebView,%20android.webkit.WebResourceRequest,%20android.webkit.WebResourceResponse\)) functions in a [WebViewClient](https://developer.android.com/reference/android/webkit/WebViewClient) to intercept requests and handle errors within the context of a WebView.

However, the shouldOverrideUrlLoading cannot see the body of a POST request; this means the app cannot handle data provided by Apple on its own.

Instead, our _redirectURI_ goes to a server handled by our identity team so that they can securely receive the response of the _scope_ query parameters.

Once we had established how to pass data back from Apple in the Guardian’s domain, we had to understand how to pass data from the context of an Android WebView into our normal authentication flow.

We decided the best approach would be to encrypt the data on the server side, pass the data out of the WebView via a URL and then pass the (still encrypted) data into our conventional social sign in flows.

This led to a kind of ping-pong game where the identity team encrypts the data, sends it to the Android application \[4\], which then returns the encrypted parameters to the server \[5\]. The Android application is then provided with a Guardian authentication token and the user is signed in \[6\].

Conclusion
----------

There are a few different options for developers seeking to implement _Sign in with Apple_ on Android, including [Apple’s JS option](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple), [Firebase](https://firebase.google.com/docs/auth/android/apple) and this [open-sourced third party SDK](https://github.com/willowtreeapps/sign-in-with-apple-button-android).

For those who choose to implement using Apple’s documentation for Other-Platforms, we hope this article has been helpful in illustrating how you can go about receiving the user’s name and email address from the HTTP body, which is inaccessible from a webview.
