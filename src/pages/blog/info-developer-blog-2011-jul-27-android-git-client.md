---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-jul-27-android-git-client'
headline: 'Agit – a Git client for Android'
date: '2011-07-27'
authors: [Roberto Tyley]
standfirst: 'Roberto Tyley describes the process of writing Agit, a new kind of Android app for developers'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/7/26/1311667732339/Agit.Goldrei.460.png'
  alt: 'Agit  - Android Git Client'
  credit: 'Photograph: Michael Goldrei/Public domain'
tags: [Android, Git, Open source, Smartphones, Software]
---

We frequently try experimental stuff at the Guardian, and most developers also have little projects that they work on for fun. Over the course of the past year, I've worked on a monumentally geeky project – creating [Agit](https://market.android.com/details?id=com.madgag.agit), a Git client for Android phones, something that's never been done before.

This was an experiment I did in my own time to combine two cool technologies – [Android](https://www.theguardian.com/technology/android) and Git – and working with them was awesome fun ... and an interesting challenge.

_This blogpost is the first in a short series about the development of Agit and the curious bugs encountered along the way – you can read the next post [here](http://www.guardian.co.uk/info/developer-blog/2011/jul/28/android-zero-byte-killer)._

Incidentally, if you're looking for the Guardian Android app, [it's on its way](http://www.guardian.co.uk/help/insideguardian/2011/jul/11/kindle-ipad-android) – but I didn't write that. I wrote a Git client.

Git?
----

[Git](http://git-scm.com/) is a distributed version control system, and arguably the most important thing Linus Torvalds has ever written. Projects, even open-source projects, used to focus around a central server that was the ultimate point of control – there was no easy way for people to contribute their own ideas without being authorised on that central server. That's changed. Now projects can reach beyond the confines of their isolated little server, and accept contributions at will. This has been a critical change, a quiet revolution in the world of software development, pioneered by the likes of [monotone](http://www.monotone.ca/) and [Darcs](http://darcs.net/), but made massively more popular by Git (and to a lesser extent [Mercurial](http://mercurial.selenic.com/)).

We use Git for all new development at the Guardian and have been publishing our [open-source projects](https://github.com/guardian) with it for quite some time. Git makes it trivial to set-up new code repositories which is perfect for the rapid prototyping and collaboration needed for working on [MicroApps](http://www.guardian.co.uk/open-platform/what-is-the-microapp-framework) with third parties. Our core codebase also recently [transitioned to Git](http://twitter.com/#!/AgitApp/status/85378291455885312) (a major relief for all developers working on it). Overall, even just blistering _speed_ of Git has been a major boon for us.

Git on Android
--------------

The aim with Agit is to provide Git functionality for your phone, and so it allows you to clone and review the entire history of any Git repository while on the move. Editing code on a smartphone isn't going to be easy and so Agit currently focuses on the _read_ aspect of accessing Git – you can use it to follow software projects in a similar way to the way a Twitter client lets you follow people's tweets.

The core Git system is sophisticated piece of software, and the puzzling challenge of getting Git itself to run on Android is described in the next [blogpost in this series](http://www.guardian.co.uk/info/developer-blog/2011/jul/28/android-zero-byte-killer) – the details are too gory to relate even here ... but the story ends happily, with [a patch being accepted](http://code.google.com/p/android/issues/detail?id=11755) into the source code of Android itself.

Animated Diffs
--------------

Using Git means **[diffs](http://en.wikipedia.org/wiki/Diff)**: when a developer needs to see the history of project (typically to track down a bug, or see when a feature was introduced) they want to see the individual changes to each file, to see the file _before_ and _after_ each change. Displaying this information is quite tricky even on a normal screen – in the case of [unified diffs](http://en.wikipedia.org/wiki/Diff#Unified_format) the developer has to interpret these crazy little pluses and minuses at the start of each line to see what's been added and removed.

For Agit I created animated diffs, which are much more fun to play with:

<figure>
                <iframe class="video" src="https://www.youtube-nocookie.com/embed/ra9n_nAzHys#t=54s" title="" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

When viewing the diff for a commit, the user gets a little slider bar they can drag back and forth – transitioning from before to after and back again. It's easier to see where the change occurred, and you can drag the slider back and forth until it's totally clear. This was achieved using Android text [CharacterStyles](http://developer.android.com/reference/android/text/style/CharacterStyle.html) with [custom sizes & alpha](https://github.com/rtyley/agit/blob/agit-parent-1.19/agit/src/main/java/com/madgag/agit/DeltaSpan.java#L47), and works pretty well even on older phones.

SSH
---

[SSH](http://en.wikipedia.org/wiki/Secure_Shell) is an encryption-based protocol used to create secure channels of communication between computers. Usually the connection requires a public-key challenge exchange: when a user connects to a remote server his SSH client will proffer his public key and then use the corresponding private key to sign a random challenge issued by the server.

Git uses SSH to provide secure connections to private repos, so I faced the tricky challenge of supporting it in Agit. This was potentially a substantial task; ideally the user needs a good user-interface on their device to let them import, export, generate, lock and unlock keys - a lot of work to implement well.

However, I didn't want to reinvent the wheel – there's already a great open-source SSH app for Android called "ConnectBot" – and I didn't want users to have to import the same SSH key into more than one app on their phone (that seemed just plain boring for the user). So I borrowed from an idea that's already present in the desktop world; the [ssh-agent](http://en.wikipedia.org/wiki/Ssh-agent). This is a program which holds your unlocked SSH keys, makes them available to other running processes on your computer.

No system like that was in place for Android devices, so I had to create it, defining [a slimmed-down version of the SSH-agent interface](https://github.com/rtyley/madgag-ssh/blob/ssh-parent-1.2/ssh-android/src/main/java/com/madgag/ssh/android/authagent/AndroidAuthAgent.aidl) using Android's Interface Definition Language ([AIDL](http://developer.android.com/guide/developing/tools/aidl.html)) which left the choice of implementation _open to the user_, and let any other permissioned app on the phone to use it to make SSH connections. This means the user can install any app they choose to be the SSH-agent, and any other app can make access it, so long as the user agrees to the warning when they install the app:


   <figure>
   <img alt="User installs Android app that requires access to the user's SSH keys" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/7/26/1311667597882/Permission.Screenshot.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=5ff8037ae2fa799131db7fcebce32abf" loading="lazy" />
   <figcaption>
     The user is warned before allowing an app to use their SSH keys.
    <i>Photograph: Roberto Tyley/guardian.co.uk</i>
    </figcaption>
    </figure>

I patched ConnectBot to create a reference ssh-agent implementation ([available on the Android Market](https://market.android.com/details?id=com.madgag.ssh.agent)) and have a [pull-request](https://github.com/kruton/connectbot/pull/13) to get this change merged back into ConnectBot itself. The protocol is also [listed](http://www.openintents.org/en/node/882) in the [OpenIntents](http://www.openintents.org/) registry (the open database of Android protocols intended to help all Android developers write apps that work more closely together).

Using an SSH-agent style interface like this means that Agit doesn't need to actually manage or even store SSH keys itself, which is pretty cool. You only need to trust one app with your SSH keys – eg, ConnectBot – and all other apps defer to it for signing the cryptographic-challenges required to initiate an SSH session. When I first got all these parts working together I was pretty gobsmacked. Cryptography can feel like a magical process happening in a black box, and all these disparate parts (remote server, git client app & SSH-agent app) coming together to successfully perform an SSH transaction was gratifying; a wonderful symphony of cryptography and inter-process communication.

Open Source
-----------

Though Agit is a paid app, it's also open source under the [GPL v3](http://www.gnu.org/licenses/gpl.html) licence – you can clone the source from [here](https://github.com/rtyley/agit) and build it yourself. I believe it's important to provide people with the source to the software they use. Agit makes extensive use of Open Source ([as does the Guardian](http://www.guardian.co.uk/help/insideguardian/2009/mar/25/sharing-contributing-caching)!) and over the course of its development I've had the opportunity to contribute patches back to several of the projects I've used – I encourage people who use Agit to do the same! I won't pretend Agit is perfect – I'm still improving it – but software gets better, faster, when everyone can see the code.
