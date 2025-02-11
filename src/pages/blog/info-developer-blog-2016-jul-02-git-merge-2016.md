---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-jul-02-git-merge-2016'
headline: 'Git Merge 2016'
date: '2016-07-02'
authors: [Roberto Tyley]
standfirst: 'A belated report back on the Git Merge 2016 conference, held over two days in April.'
image:
  url: 'https://media.guim.co.uk/4ab73e41835d366dab76c8f2e52addb465fe97be/204_236_4531_2718/4531.jpg'
  alt: 'The stage of Git Merge 2016'
  credit: 'Photograph: Roberto Tyley/The Guardian'
tags: [Computing, Git, Open source, Software]
---

The GitMerge 2016 conference was held in New York over two days in April - the first day was the Git core contributors conference, and the second was open to the general public, taking place on the stage of the off-broadway production of Avenue Q.

Day One: Core Contributors conference
-------------------------------------

The contributors conference was attended by five people from GitHub (including [Peff](http://peff.net/peff/), acting as MC), three each from Google and GitLab, with individual representation from Atlassian, AutoDesk, Bloomberg, Booking.com, and Twitter (all contributors present were male, sadly). The day took an unconference format, with topics suggested on a whiteboard, and discussed with the most popular topics first.

**Big Repos** and their related performance problems were the first topic suggested, which immediately needed a bit of clarification, because there are at least four ways in which a repo can be ‘big’, and they all have their own problems:


   <figure class="supporting">
   <img alt="‘GitHub sees a lot of corner cases’ - a slide from Git Merge 2016" src="https://i.guim.co.uk/img/media/cb292d4ffb8b6db985e33af7164078e21542cf4f/0_847_4788_1293/master/4788.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3c074b3dab498c21c4a9d133701de44c" loading="lazy" />
   <figcaption>
     A slide from Patrick Reynolds’ talk ‘Scaling at GitHub’ - giving examples of some of the ways that repositories can be <em>big</em>
    <i></i>
    </figcaption>
    </figure>

*   _Lots of refs_ (ie branches and tags) - There are at least two scaling problems as the number of refs in a repository grows - the first is that Git can’t read a single ref from a packed ref file without reading the _entire_ packed refs file - for Twitter, this can mean a file of over 100,000 refs - and all of this happening every time you try to tab-complete a branch name! Progress is being made on solving this with the introduction of pluggable ref backends for Git, which will allow the use of a performant key-value store like [LMDB](http://www.mail-archive.com/git%40vger.kernel.org/msg77075.html). The second problem is that the Git protocol doesn’t yet have any way to say, when connecting to a server for a fetch or push, that the client does _not_ want to hear a full list of every single ref the server has to offer...  
    
*   _Large numbers of files_ - doing a checkout of a branch, or even just calling ‘git status’ can be slow if your working directory has more than 10000 files - this is particularly bad on Windows (where NTFS really slows things down). David Turner of Twitter has created a patch for Git using Facebook’s [Watchman](https://facebook.github.io/watchman/) file-watching service that can help by tracking the files in your working directory, making ‘git status’ faster - the work to incorporate this patch into Git is [ongoing](https://github.com/git/git/commit/201bbdcf6a6f69eebd06a453795c854782fd9bd7).
*   _Deep commit histories_ - make ‘git blame’ really slow... the git blame algorithm [is not simple](https://dev.eclipse.org/mhonarc/lists/jgit-dev/msg00949.html), and very CPU intensive at the best of times.
*   _BIG files_ - [Git Large File Storage](https://git-lfs.github.com/) has rapidly become the dominant solution to problem of storing large files in Git since it’s launch last year. Git LFS works pretty well for commercial teams, though open-source projects interested in public participation probably won’t find it a silver-bullet for their needs - someone needs to pay for all that bandwidth! GitHub’s LFS support currently requires every individual participant to purchase a bandwidth allowance.

<figure>
                <iframe class="video" src="https://www.youtube-nocookie.com/embed/4XpnKHJAok8?start=3376&wmode=opaque&feature=oembed&start=3376" title="In 2007 Linus Torvalds described Git’s use of SHA‑1 as purely a ‘consistency check’ with good distribution properties: “It has nothing at all to do with security!”" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

**Switching Git to use a cryptographically-secure hashing function** has been a topic at Git-togethers for at least half a decade - Git uses SHA-1 for it’s hashing function, which works brilliantly for distribution of object ids, and more or less adequately as a checksum for Git history. SHA-1 is a ‘strong’ hash, but has been considered compromised as a _cryptographically secure_ hash for [a long time](https://www.schneier.com/blog/archives/2012/10/when_will_we_se.html).

As far as Git goes, it’s possible to debate whether Git needs a hash that is just ‘strong’, or actually cryptographically secure. The original line taken by Linus Torvalds was that the hash is a convenient guard against data corruption (“what you put in is what you get out”), but that in any case, once you’ve _got_ history, it can’t be _changed_ because every time objects are transferred into your Git repo (with a git fetch or pull) any incoming objects that match a hash you _already_ have will be fully checked bit-by-bit against your existing copy of the object. So no matter how weak the hash is, you can’t change history within an existing copy of a repo. This is a great property, but it’s less useful if you’ve never fetched a copy of the repo before! The weakness of the SHA-1 hash is also unhelpful when you want to cryptographically sign a commit- if you want to certify the commit with all it’s history is trusted and you can’t rely on the integrity of the hash, the signature isn’t secure unless it’s been generated by extracting and processing _all_ commits and files of that history.

Given that, updating Git to use a stronger hash function sounds attractive, but like the attempts [to sunset SHA-1 SSL certificates](https://medium.com/@sleevi_/a-history-of-hard-choices-c1e1cc9bb089), it won’t happen soon. Peff outlined 8 or 9 steps that would have to be undertaken to get Git updated - starting off with the relatively easy step of unifying the code within Git itself that handles object hashes. A new format for extended Git ids would need to be agreed - would everyone just adopt SHA-256, or would the hash name (eg. “sha-256”) become a prefix of the new object id format (as used in Git LFS)? Could new ids sit alongside old? There are parts of the [Git data model](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) where object ids are represented as strings (ie within commit object headers, where you could easily add new optional ‘extended-id’ headers, and others, eg ‘tree’ objects, where they’re taken as raw binary data of precisely 160 bits. This means that ‘baking-in’ the new hash, so that it becomes a first-class citizen of Git, would inevitably break backward compatibility.

Breaking backward compatibility is a problem given the massive installed user-base of Git clients & servers - old Git clients would report new repos as corrupt, and just blow up. As well as core-Git, significant Git libraries like [libgit2](https://libgit2.github.com/) & [JGit](https://eclipse.org/jgit/) would need to be updated. Git hosting services would need to get behind the change - and they would obviously be reluctant to take on the resulting tech-support nightmare of a backward-incompatible change. See also [this discussion](http://thread.gmane.org/gmane.comp.version-control.git/291305) from the Git mailing list archive.

[**submodules**](https://git-scm.com/docs/git-submodule) are a little notorious in the Git world - but Stefan Beller of Google has been working to make them better! A fairly lively discussion around the pain-points of submodules was had, providing plenty of input which was welcomed by Stefan.

**[submitGit](https://github.com/rtyley/submitgit)** and making it easier for people to contribute to Git was a topic following on directly from Git Merge 2015, where several Git developers expressed their dissatisfaction with Git’s current [mailing-list based contribution process](https://github.com/git/git/blob/1eb0545c/Documentation/SubmittingPatches#L120-L464). The mailing list works well for the power-users, but it’s a method of contribution that is completely unfamiliar to the majority of today’s Git users - and these are people who could often have a good perspective on how to improve Git’s usability and documentation! There wasn’t anything like a consensus among Git core contributors to move away from the mailing list approach, but it was suggested that it might be possible to create a bridge that provided an alternative, more friendly way to sending patches to the list.

As a consequence, I developed submitGit, a one-way GitHub Pull Request -> Mailing-List tool and announced it to the mailing list in May 2015 where it was [appreciatively received](http://thread.gmane.org/gmane.comp.version-control.git/269699). I haven’t been able to spend as much time working submitGit as I’d like, and so it still misses features which limit it’s adoption, but it has still had a positive impact. There have been [44 contributors to Git](https://github.com/git/git/graphs/contributors?from=2015-05-22&to=2016-07-01&type=c) over the past year, which makes the 23 users of submitGit a significant cohort. [Pranit Bauva](https://github.com/pranitbauva1997), a student working on Git as his Google Summer of Code project, has used submitGit for _all_ [his patch contributions](https://github.com/git/git/pulls?q=is%3Apr+author%3Apranitbauva1997+is%3Aclosed), after discovering that his internet proxy [blocked the email protocols](http://thread.gmane.org/gmane.comp.version-control.git/288652/focus=288665) necessary to use the standard Git mailing list process.

There was general agreement from those present at Git Merge 2016 that we could proceed with making submitGit a more ‘official’ tool for contribution - and I still need to complete the documentation updates to make that happen...

Day Two: Main conference
------------------------


   <figure class="supporting">
   <img alt="Greg Kroah-Hartman describes the Linux Kernel Development process" src="https://i.guim.co.uk/img/media/71be531c4182a2707ed90de2e5b856a1c0cc74da/33_373_4669_2801/master/4669.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=b40bb44234ab9cf017f27871d19a7e3a" loading="lazy" />
   <figcaption>
     Greg Kroah-Hartman describes the Linux Kernel Development process
    <i></i>
    </figcaption>
    </figure>

[Greg Kroah-Hartman](https://en.wikipedia.org/wiki/Greg_Kroah-Hartman) of the Linux Foundation opened the talks with a charismatic presentation on Linux Kernel Development and how it’s thriving with Git, with an ever accelerating number of commits every day. As someone who was trying to free people from mailing-list based contribution, it was very interesting for me to hear his enthusiastic arguments in favour of it - their global society of experienced devs is well-served by the format and pace expectations of email (slower than IRC, giving non-English speakers the opportunity to take their time, run google-translate, etc, when responding to messages).

Patrick Reynolds gave a very interesting talk on ‘Scaling at GitHub’ - with a large portion of the problem being the need to ensure that unusual or extreme repositories and their users didn’t take down GitHub for everyone else - certain patterns of behaviour can burn substantial CPU time! Many devs, loving GitHub, have sought to use it to store more than just code and make it into a CDN for artifacts too - this [doesn’t always work out](https://github.com/CocoaPods/CocoaPods/issues/4989#issuecomment-193772935)...


   <figure>
   <img alt="In the past the CocoaPods community has experienced very slow fetches and clones, caused by automatic rate limiting by GitHub to ensure stability of their service for other users." src="https://i.guim.co.uk/img/media/b07c31226cd50586090d7eee21756be051892546/13_470_4775_2864/master/4775.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=ac230f7715b0e9e67bb1cdb6fe14e4ee" loading="lazy" />
   <figcaption>
     In the past the CocoaPods community has experienced very slow fetches and clones, caused by automatic rate limiting by GitHub to ensure stability of their service for other users.
    <i>Photograph: Roberto Tyley/The Guardian</i>
    </figcaption>
    </figure>

It was also great to hear more from Tim Pettersen about how Atlassian, GitHub and Microsoft have been collaborating on the open-source Git LFS project - things have come a long way since that surprising coincidence in Paris last year.

Finally, it was nice to see my project [the BFG](https://rtyley.github.io/bfg-repo-cleaner/) being mentioned in so many talks - several times for the ‘convert-to-git-lfs’ support added in [v1.12.5](https://github.com/rtyley/bfg-repo-cleaner/releases/tag/v1.12.5) :

<img src="https://cloud.githubusercontent.com/assets/52038/16536449/a60bdd0a-3fe9-11e6-9c36-ba5142dd6f98.gif" style="width:100%;">

Many thanks to the organisers for a great conference - and to the participants for helping to make Git even better, and more usable!
