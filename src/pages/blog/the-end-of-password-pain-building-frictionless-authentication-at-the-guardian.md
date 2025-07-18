---
layout: ../../layouts/blog.astro
slug: 'the-end-of-password-pain-building-frictionless-authentication-at-the-guardian'
headline: 'The end of password pain: building frictionless authentication at the Guardian'
date: '2025-07-18'
authors: [Mahesh Makani]
standfirst: "How the Guardian's Identity and Trust team eliminated password friction and improved security by implementing one-time passcodes, leading to 82% of readers now using passwordless authentication"
image:
  url: '/images/blog/passwordless-header.jpg'
  alt: 'A photograph of a person holding a phone with the Guardian app open, showing the sign-in screen.'
  credit: 'Photograph: Mahesh Makani'
tags: [Identity, Security, Authentication]
---

The Guardian is always better when you’re signed in. Benefits include the ability to comment on articles or subscribe to any of our newsletters (which cover subjects and themes in more depth) and readers on the app have access to My Guardian, where you can see stories on topics you’ve chosen to follow and stories from your favourite writers. It’s also helpful for us. Signing in allows us to learn about the usage of our digital products from signed in readers. This data helps us generate more revenue, by, among other things, enabling us to improve what we offer to our readers and subscribers, which is used to support the Guardian’s independent journalism.

If you support the Guardian, either through a subscription or regular payment or have made a recent contribution, signing in also means you will no longer see frequent messages asking you to support our journalism. For subscribers, signing in is how you get access to your paid-for features, such as ad-free browsing.

The Identity and Trust team, part of the Product and Engineering department at the Guardian, build and maintain the platform that readers use to sign in to the Guardian, and protect access to over 13 million readers’ data. Recently we’ve continued work to modernise our identity platform, further improve security around reader data, and enhance the reader experience when it comes to trusting the Guardian with their data.

The team provides unified authentication journeys across all Guardian websites and mobile apps, which all use our secure, web-based identity portal at [https://profile.theguardian.com](https://profile.theguardian.com). Our readers can sign in, create an account, reset their password or delete their account through here. Using a single portal across all our applications significantly reduces the effort and development time required to integrate sign-in into new apps, like the [Feast app](https://www.theguardian.com/help/insideguardian/2024/apr/17/introducing-the-feast-app). It also reduces the engineering effort for new sign-in features and security updates, which is key for features like passwordless, where all apps will automatically receive it, for free, without the need for other teams to integrate it later. It also guarantees privacy and safety as our journeys were designed and developed using penetration tests and security reviews.

Our aim was to improve the number of readers completing the account creation process, and for us to maintain the same number of readers continuing to authenticate after removing password authentication as the default option. This blog post covers how we’ve now removed the need for readers to have a password, and improved their authentication experience along the way.

To protect access to reader data, we have to secure the way that a reader accesses, and gives us access to, their personal information. The classic model to do this is to use a password to prove your identity. However the use of passwords is the greatest friction and security risk for our readers. The [2024 Verizon DIBR](https://www.verizon.com/business/resources/T35e/reports/2024-dbir-data-breach-investigations-report.pdf) report found that for data breaches in web applications, 77% of attackers gain access via hacking with the use of stolen credentials, usually an email and password combination, while 21% of attacks used brute force, usually from easily guessable passwords.

When a reader creates a Guardian account using the traditional email and password method, as opposed to Sign in with Google or Sign in with Apple, we have to verify that they own their email address. This verification of ownership is an important security measure, and protects both our readers and the Guardian. The simplest way to verify ownership is to send an email to the person’s nominated email address. If they do own the email address, they’ll be able to follow the email’s instructions. Part of this process involves the reader selecting a password after verification.

By analysing our reader creation journeys, we found that the need to choose a password prevents around 20% of readers from creating an account via the traditional email and password method, making it a significant point of friction in the account creation process. Tangentially, this can cause problems, where the reader might end up signed in on another device or browser rather than the one they were trying to use if they clicked on the link on another device These issues prevent our readers from accessing our products in scenarios where account creation is mandatory. Furthermore, the majority of identity-related complaints to our User Help and Customer Experience teams revolve around passwords.

We’ve responded to this by now making passwords optional when it comes to sign in and account creation. Instead, by default, we now ask the reader to verify their identity by asking them to submit a short-lived one-time use password (OTP), sometimes called a “passcode”, sent to their email inbox as part of our sign in, account creation, and password reset journeys. Using passcodes also eliminated the need to send readers a link for verification purposes, which improves the user experience in those scenarios too.

## Account creation - why we decided to use codes instead of links

While not related to security specifically, we used to ensure that for account creation, a new reader would type in their email address and we would send a verification link to that email in order for them to verify their account, set a password, and get signed in.

However we found for some readers this was a huge cause of frustration, and was affecting account creation completion rates. The common issues we found readers encountering were:

- **Readers accessing their email on a different device**

  After starting the account creation process on one device, they would have to complete account creation on another, and then sign in again on the original device.

- **Around 20% of readers were ending up signed in on theguardian.com in their device browser and not in our news app**

  When creating an account via one of our apps, we can’t always guarantee that the verification link will take the reader back to the app. This is because deep links can be overridden by device settings across both iOS and Android. It meant that high proportions of readers were ending up signed-in on theguardian.com in their device browser, rather than in the app, which was particularly excruciating for the new Feast app. This was mitigated by using an [app specific completion page](https://github.com/guardian/gateway/pull/2580) asking the reader to go back to the app and sign in again, but this wasn’t ideal.

- **17% of readers never clicked the verification link**

  Despite entering their email and being sent a verification link, a proportion of readers would never end up clicking the link and verifying their account. Our hypothesis being that there wasn’t an explicit call to action after the email was sent.

The common thread between all of these issues was the use of an email link the user had to click on. Our solution was to verify their identity by emailing them a 6-digit one-time passcode (OTP) instead. This would solve all three issues:

- **Readers accessing their email on a different device**

  A reader is able to retrieve the OTP from their email inbox, and type it into the device they were creating an account from. This prevents the reader from first verifying their account on another device, and then having to sign in again on the original device, as now the verification and sign in happens all on the original device.

- **Around 20% of readers were ending up signed in on theguardian.com in their device browser and not on our news app**

  Using an OTP removes the need to use an application deeplink. As the reader has to enter the code in the same device/browser context from where they requested it, they get signed into the application they were initially trying to access.

- **17% of readers never clicked the verification link**

  By having an explicit reader input to continue, by having to enter a passcode, we believe this drives more readers to complete verification.

At this point after verification, we would still require the reader to set a password, at least until passcodes were implemented for sign in, after which it would become possible to make the password requirement optional.

<figure>
    <img alt="The create account flow demonstrating account verification with a passcode and setting a password." src="/images/blog/passwordless-create-account-flow.gif" loading="lazy" />
    <figcaption>
        The create account flow demonstrating account verification with a passcode and setting a password.
        <i>Illustration: Mahesh Makani</i>
    </figcaption>
</figure>

However this introduced a small regression in our security posture and user experience. While new readers going through the create account flow got a passcode for verification, existing readers who accidentally went through the create account flow (ie readers who do not know they already had a Guardian account), were still receiving an email saying they already had an account and links to either reset their password or sign in, causing a mismatched user experience. It also meant we accidentally introduced a way of identifying if a given email address had a Guardian account or not, called “[account enumeration](https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account#summary)”. If a given attacker is able to find out if an account exists or not, this could potentially make it easier for the attacker to use previously stolen or leaked credentials. This can be solved by also giving existing readers the same user experience as new readers, which would make it difficult to tell if a given account exists or not. The solution to this is discussed later in the “remaining journeys” section.

Adding email verification via passcode to account creation reduced the number of readers failing to verify their account and setting a password from 17% to 11%, which corresponds to ~35% increase in verified readers.

## Password reset

Once passcodes had been implemented for account creation, we moved on to the other main area where links were causing an issue, the password reset journeys. The same problems mentioned there also apply here.

A user will request a password reset when they are unable to remember their password for sign in with email and password. The approach we took for implementing passcodes for password reset was similar to that we used for account creation.

The main consideration this time was to make sure the reader would get the same experience regardless of whether they had an account or not. For readers who have an account, we generate an OTP for password reset and send it to their email, and we show the page to input the code. For readers who don’t have an account, but accidentally end up in this flow, we don’t generate an OTP or create an account, but we still do show the page to input the code, despite not having sent them one. This helps prevent the account enumeration issue mentioned in the previous section. We try to guide readers where possible, for example with specific messaging saying that if a reader does not receive an email, they likely do not have an account, with a call to action to create an account. In the future we may consider sending an email to the reader saying that they do not have an account in order to further improve the reader experience.

<figure>
    <img alt="The reset password flow demonstrating email verification using a passcode and setting a new password." src="/images/blog/passwordless-reset-password-flow.gif" loading="lazy" />
    <figcaption>
        The reset password flow demonstrating email verification using a passcode and setting a new password.
        <i>Illustration: Mahesh Makani</i>
    </figcaption>
</figure>

After release we monitored that 20% more readers were successfully setting or resetting their password compared to the use of password reset links.

The next step was to start performing authentication with passcodes, and build towards a passwordless future.

## Sign in

Implementing sign in with passcode proved relatively straightforward due to the framework laid out while building the account creation and password reset journeys with passcodes. In the same way we did for reset password, we show the same journey to readers who have accounts attempting to sign in with passcodes, as to readers who don’t have an account that accidentally go through this flow.

The biggest challenge we encountered while implementing this was how to present the user experience of sign in via a passcode. Up until this point the default authentication mechanism was presented via a form which asked the reader to input an email address and their password in order to sign in.

Since we wanted readers to prioritise sign in with passcode, we decided to make this option the default. The reader would enter their email address, and we’d send them a passcode to their email to sign in with. On the passcode input page we also included a link for readers who would prefer to sign in with a password instead. To gain user feedback for this journey we launched this for a percentage of our readers who were signing in.

While we noticed that overall sign in numbers remained consistent when we launched sign in with passcodes, we did get some user feedback saying that they did not like how the "sign in with password" option was only available after getting the one time code sent to their email. Other readers thought they could input a password into the passcode field box and sign in with a password directly.

<figure>
    <img alt="Demonstrating sign in flow with a passcode" src="/images/blog/passwordless-sign-in.gif" loading="lazy" />
    <figcaption>
        Demonstrating sign in flow with a passcode
        <i>Illustration: Mahesh Makani</i>
    </figcaption>
</figure>

Working with our UX team, we made some minor adjustments to the sign in flow. A "sign in with a password instead" link to the sign in landing page, below the “sign in with passcode” option. This allowed readers who preferred to sign in with a password to do that at the first step of the authentication journey, rather than after being sent an OTP, while still retaining sign in with passcodes as the default option.

When we rolled this out to our entire reader audience, we noticed no drop in the number of readers completing the sign in process while improving our security posture and protecting access to our readers’ data. Overall we found that around 56% of readers are now using passcodes to sign in, and 26% are using sign in with Google or Apple, the remaining 18% of readers still choose to sign in with passwords. That means that 82% of our readers are now using a form of passwordless authentication to sign in to the Guardian, a drastic change from before the introduction of passcodes where about 75% of readers would use passwords to sign in.

## Remaining journeys

The final reader journey where we had to implement authentication using passcodes was for existing readers attempting to create a new account. Up until this point these readers would get an email saying their account already exists with options to reset their password or a link to the sign in page. This also led to the account enumeration problem mentioned earlier.

Now in this scenario, where we detect that an existing reader has gone through the create account journey, we send them a passcode using the same implementation as for sign in, and have the user experience behave like it’s a new account. Once the user verifies the passcode, we show a new page explaining that they already have a Guardian account under that email address, are now signed in, and can access the Guardian. This has helped improve the experience and completion rate for readers who end up in this flow.

We also made further improvements we made to authentication using passcode flows following user feedback. This included adding a timer to our “send again” functionality so that readers would have to wait before being able to send a new passcode, which helped to alleviate issues where mail delivery was slightly slower, and the reader would immediately request a new code, thus rendering the original code invalid. Additionally, The code input form was also updated to auto submit the passcode on paste, or when the reader typed the sixth digit. This sped up time to completion as the reader would no longer have to manually submit the code.

## Making passwords optional

Our final step was to remove the need for the reader to set a password on account creation, thus making all new accounts passwordless! Once the user verifies their account with a passcode, they're signed in! This eliminated the friction we noticed where the need to choose a password prevents around 20% of readers from creating an account. This has only recently been released and we’re monitoring the impact of this change, with early indications suggesting that these remaining readers are now successfully finishing account creation.

This means that some reader accounts will not have a password at all, increasing the security of those accounts as they can no longer be part of a leaked credential or brute force attack using passwords. Readers can still opt into creating a password for their account through the password reset journeys, but we encourage them to use passwordless authentication where possible.

<figure>
    <img alt="The create account flow with account verification using a passcode, with no need to set a password during the process." src="/images/blog/passwordless-no-password.gif" loading="lazy" />
    <figcaption>
        The create account flow with account verification using a passcode, with no need to set a password during the process.
        <i>Illustration: Mahesh Makani</i>
    </figcaption>
</figure>

## The future

According to the [National Cyber Security Centre’s report](https://www.ncsc.gov.uk/report/impact-of-ai-on-cyber-threat#section_3) on the near-term impact of Artificial intelligence (AI) on cyber threats, “[AI] will almost certainly increase the volume and heighten the impact of cyber attacks over the next two years.” The world is moving towards passwordless fast because it represents a significant improvement to user and business security. The Guardian remains ahead of the curve in protecting our readers and their personal data from malicious threat actors, who have been made more effective through advances in AI.

Passwords represent the biggest weakness in account security, and this is why Google and Apple are leading consumers to a passwordless future. We’re also investigating the possibility of implementing multi-factor authentication (MFA), and/or [FIDO standard passkeys](https://fidoalliance.org/passkeys/) to further improve our security posture. The groundwork for both has been laid out during our work on implementing passcodes. Readers can still choose or use a password, but we will encourage them towards passwordless gradually.

## Further reading

At the Guardian we embrace [developing in the open](https://www.theguardian.com/info/developer-blog/2014/nov/28/developing-in-the-open). This means much of our Identity codebase is open to view. The [Gateway](https://github.com/guardian/gateway) project is the frontend for reader identity at the Guardian, and is where much of the work mentioned in this blog post has been implemented. For those who want to delve further into the technical documentation, implementation and code, you can do so for [passcodes](https://github.com/guardian/gateway/blob/44a9052d5d693ceed03156c2fb4f14212b0b3896/docs/okta/idx/README.md), [sign in](https://github.com/guardian/gateway/blob/44a9052d5d693ceed03156c2fb4f14212b0b3896/docs/okta/idx/sign-in-idx.md), [create account](https://github.com/guardian/gateway/blob/44a9052d5d693ceed03156c2fb4f14212b0b3896/docs/okta/idx/create-account-idx.md), and [reset password](https://github.com/guardian/gateway/blob/44a9052d5d693ceed03156c2fb4f14212b0b3896/docs/okta/idx/reset-password-idx.md).
