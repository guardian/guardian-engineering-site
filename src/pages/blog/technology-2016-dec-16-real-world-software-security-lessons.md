---
layout: ../../layouts/blog.astro
slug: 'technology-2016-dec-16-real-world-software-security-lessons'
headline: 'Real-world software security lessons'
date: '2016-12-16'
authors: [Adam Fisher]
standfirst: 'Can common-sense and our real-world intuition show us how to write secure software?'
image:
  url: 'https://media.guim.co.uk/c4b3b6ed5ac063c29c2d0fe42591f789eeac3893/0_47_640_384/640.jpg'
  alt: 'Securely bridging the gap between software and the real world.'
  credit: 'Photograph: Alamy'
tags: [Advent developer blog 2016, Security]
---

> It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.
> 
> During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armoured space station with enough power to destroy an entire planet.
> 
> Now, the Empire’s development team, on their third straight night without sleep, try to understand how this security breach happened.

Creating secure software is one of the huge challenges of the modern age. Software security is generally considered an advanced topic but I believe there are important lessons we can learn from how people secure things in the real world. By considering well-understood real-world situations and thinking about how those lessons apply to our software, we can often stumble upon security best practices.

With that in mind, to get some ideas about where the Empire might have gone wrong let’s take a look at what the Rebellion have been doing to keep their organisation secure.

The Rebellion
-------------

Consider a group of Rebels, plotting to overthrow an Empire. They no doubt know that passwords are dangerous, so they use a new password for every meeting. Knowing yesterday’s password won’t get you into the meeting today! This means by the time an Imperial agent has got hold of the password it will very likely be too late. It will change the next day and the agent will need to start again to get hold of tomorrow’s password.

Perhaps these Rebels are particularly cautious and they decide that they will also only let people into the meeting if someone can vouch for them. This means that the agent now needs to get hold of the day’s password at the same time as they are able to convince someone else to let them in. It’s now significantly harder for a stranger to intrude on the Rebels’ meetings, great news if they expect ‘sensitive’ conversations to take place!

The Rebels know it’s a good idea to keep track of who’s been at meetings and who it was that vouched for each attendee. This means if a meeting ever is compromised they’re able to very quickly work out who it was, and who was involved.

They might even go a step further and arrange their rebellion in “cells” and limit what each cell knows. This means if an imperial agent does make it into a meeting it won’t compromise the entire Rebellion, just the people in the room and the things that group discuss.

These all seem like obvious ways for the Rebels to protect their meetings. If you were designing a process for protecting your own Rebellion you’d probably come up with something very similar. These are approaches that we’ve read about in books, seen in films and are, to some extent, ‘common sense’.

It seems to be working well for them, so what lessons can we now apply to our software?

Rotate
------

By changing their password for every meeting, the Rebels are enforcing excellent key rotation policies by using keys that automatically expire. Regularly rotating keys is a very important part of maintaining secure systems because it ensures that the window of opportunity for an attacker is small. Practicing regular rotation also has a host of side-benefits, for example keys are unlikely to be stored directly in the source code, or live for long periods on developer machines because this would cause a lot of hassle every time the keys are rotated. The best way to enforce this is to follow the Rebellion’s lead and use temporary credentials, that expire after a short time.

**Lesson:** Keys and passwords should have a limited lifetime

Authorise
---------

The Rebels’ system of vouching for attendees is a way of authorising who can be at the meeting and authorisation is an important part of any secure system.

If we’re regularly rotating keys then we’ll obviously need to be able to provide replacement keys when they change. This naturally leads to the question of “how do we make sure my system/user is allowed a new key?” The Rebels achieve this by vouching and we can take a similar approach when designing our applications.

For users, you might achieve this by asking them to log into something to prove who they are. This could mean getting the user to log into a trusted identity provider (like an SSO service or a user’s Google account). For other software services you might (for example) use knowledge about your infrastructure to identify the system. Once you know who they are, you know how much you can trust them. You can now authorise a new key with the required permissions, or deny the request as appropriate.

**Lesson:** Authorise the acquisition of new keys

Track
-----

Keeping track of who attends meetings and who vouches for those attendees means that the Rebels can monitor and audit their attendees. Naturally, these are both very important to the security of our software. Monitoring means we can see the health of our system in real time, detecting or blocking unusual behaviour that might warn of an attack. By storing these records we’re able to look back at the audit trail to analyse problems after they have happened.

Tracking key usage is always important but we get extra utility if we’re also using short-lived keys and authorising replacements when they expire. The log generated by the authorisation service is a great place to get an overview of which people or services had access to a given resource at a given time.

**Lesson:** Track authorisations and key usage

Scope
-----

Finally, splitting the Rebellion up into cells means that the impact of a breach is limited to a small part of the organisation. This also applies to the complex systems we must build to serve the digital age. One way to achieve this is to restrict the permissions assigned to keys and users, often referred to as scoping. Using minimal permissions doesn’t impact how the application works, but limits the damage an attacker can do.

When keys are fleeting it’s much easier to ask for small permissions because you can always change it later if you find what’s there isn’t enough. A good audit trail helps here too, because it makes it easy to see what permissions you are actually using.

**Lesson:** Tightly scope permissions on passwords and keys

By looking at how the Rebels run their meetings we’ve come up with a few ideas for how we might improve the security of our software. Not only are these all individually great techniques, the synergy between them makes the system considerably more secure than it would be if we only applied one or two of the lessons in isolation.

**S**cope, **T**rack, **A**uthorise, **R**otate.

Next time you build a new application, remember the lessons of the Rebels and their STAR wars.

In conclusion
-------------

When you’re designing a software application, perhaps ask yourself how you would secure it if it were a physical item. It’s likely you’ll come up with some great suggestions, drawing on the millennia of experience humans have in the field. All that remains is to come up with ways of applying those real-world techniques to your own software development.

We can learn one final lesson from the demise of the Empire. After a security breach led to the destruction of the Death Star they struck back, doubled down on security, and made a concerted effort to stamp out the Rebellion. However, we see that before long they had slipped back into bad habits. Habits that cost them dearly...

<figure>
                <iframe class="video" src="https://www.youtube-nocookie.com/embed/4HJ-Y8YTo8Q?start=12&wmode=opaque&feature=oembed&start=12" title="It’s an older code sir, but it checks out" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>
