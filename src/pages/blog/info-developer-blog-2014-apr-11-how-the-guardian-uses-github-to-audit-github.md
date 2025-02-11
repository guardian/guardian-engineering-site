---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-apr-11-how-the-guardian-uses-github-to-audit-github'
headline: 'How the Guardian uses GitHub to audit GitHub'
date: '2014-04-11'
authors: [Roberto Tyley]
standfirst: 'How the Guardian wrote gu:who : a tool to help manage GitHub organisation membership'
image:
  url: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397224069290/f50dc9c4-c1e1-471f-864c-1aa8e87390f1-620x372.jpeg'
  alt: 'Guess Who? Demystifying GitHub organisation membership'
  credit: 'Photograph: Bethany Khan (https://www.flickr.com/photos/bethanykhan/4466733616)/Flickr'
tags: [Computing, Data and computer security, Git, Software]
---

We’ve nearly 200 people in our [four year old GitHub organisation](https://github.com/guardian): employees, contractors, third party suppliers, continuous integration bots, and… and... and people are starting to wonder:

*   Who are all these people?
    
*   Seriously, who are all these people in our GitHub organisation?
    
*   Why aren’t they using 2FA? Are they _insane_?
    
*   How do I even get in contact with them?
    
*   What bad things will happen if I just delete their account?

More than most, the Guardian is aware of what happens when you allow [a large number of people access to your private data](https://www.theguardian.com/world/series/the-snowden-files) – only the people who legitimately _need_ access should have it, but managing that in an organisation which is large, busy and distributed is a major hassle. Many accounts are completely unidentifiable – just a short, cryptic username with no avatar or other distinguishing features – so establishing who’s even responsible for clearing them up is just impossible.

We’d like to enforce some order. But we’re devs. So we’d rather not have spreadsheets-of-crap, Windows Active Directory, LDAP or, if truth be told, anything we have to actively remember to think about, because our jobs are _actually_ about delivering business value on [much more interesting projects](https://github.com/guardian/frontend).

Consequently, let’s build a bot to audit the membership of our GitHub organisation. But let’s do away with a backing store, because with a little thought _GitHub_ can be our backing store - and let’s build only the most minimal interface, because GitHub can be our interface too. This means people using our bot need to learn _absolutely nothing_ to use it – they’re devs, and they already know how to use these tools – they already know how to use GitHub.

_gu:who?_
---------

_gu:who_ is the bot we built, open source under the Apache V2 licence, and this is how it works:

*   You hit an endpoint on the _gu:who_ bot, supplying a GitHub API key.
    
*   _gu:who_ checks all users in your organisation, and raises a [GitHub issue](https://github.com/gu-who-demo-org/people/issues/3) for anyone who doesn’t meet the basic security requirements. Each issue is assigned to the relevant user, ensuring they are immediately notified – through GitHub – that they have an issue they need to sort out.
    
*   You review the GitHub issues, which are all labelled so you can immediately see which problems affect which user, and how many problems of each type there are.
    
*   Rinse, repeat. _gu:who_ will update issues with comments as users fix problems, and close them too as users satisfy all requirements. If users don’t fix their problems, it’ll give them a warning and, eventually, remove them from your organisation automatically.

Using GitHub issues makes it easy for everyone to understand what’s going on, and for people to see who amongst their colleagues might need to be given a nudge to move them along.


   <figure>
   <img alt="Issues produced by gu:who" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/4/12/1397298275838/38fc0f27-be94-410d-afaf-a3c75801a4d3-620x372.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=71f65ac108d34c97f69160a513fdcba9" loading="lazy" />
   <figcaption>
     Issues produced by gu:who. Photograph: Roberto Tyley/The Guardian
    <i>Photograph: Roberto Tyley/The Guardian</i>
    </figcaption>
    </figure>

These are the simple security requirements _gu:who_ enforces on each account in order to help make your code more secure:

*   **Two-factor authentication** [enabled](https://help.github.com/articles/about-two-factor-authentication)
    
*   a **full name** in their [GitHub profile](https://github.com/settings/profile), helping you identify users you can’t identify by username alone
    
*   **Sponsor** – a more senior member of staff willing to vouch for the validity of the user’s membership in the organisation

That last one is interesting because of the way it’s expressed. The senior member of staff adds the user to a [users.txt](https://github.com/gu-who-demo-org/people/blob/master/users.txt) file in a dedicated GitHub repo, _[taking responsibility via git-blame](https://github.com/gu-who-demo-org/people/blame/master/users.txt)_ for the user being in the organisation. This ensures there’s always someone to go to when membership for a dodgy account is in doubt.

The dedicated GitHub repo is called, by convention, ‘people’, and is also the repository where _gu:who_ raises issues against users – all users in the organisation are able to see it, but we’d recommend you ensure it’s a private repo, as it will contain a full list of all the security vulnerable users in your organisation.

How does this compare to what GitHub’s already got?
---------------------------------------------------

For “Owners” of GitHub organisations, GitHub’s team-based tools are pretty good, and discretely display the 2FA status of users. They don’t have any way of enforcing that users must maintain their profile to a certain standard (eg, the full name, or defined avatar), and as far as ‘where-did-that-user-come-from’, the Organisation “Security History” page gives a one month history that probably won’t extend far enough back to understand where problematic users came from:


   <figure>
   <img alt="GitHub's security page for organisations" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/4/11/1397223788748/b63143e3-b4be-4526-84d0-08a583e521f4-620x304.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=b705f7fee5b2307b9eaa5a33df92d4ed" loading="lazy" />
   <figcaption>
     GitHub’s security page for organisations Photograph: Roberto Tyley/Guardian
    <i>Photograph: Roberto Tyley/Guardian</i>
    </figcaption>
    </figure>

These tools don’t really do anything to encourage people to solve their own problems, which _gu:who_ is quite good at doing.

Clearly, it could be difficult for GitHub to implement Organisation rules that embody exactly what every different organisation in the world needs, but it looks like there’s probably room for improvement.

Remaining questions for _gu:who_
--------------------------------

Do you bother with two-factor-auth for CI bots? Who would hold responsibility for the phone required to authenticate these accounts over a long time period? In the end, we decided that for members of the “bots” team, we would just waive that requirement.

There’s also the problem of attempting to automatically detect when someone has left the company. Could we use periodic sponsor review? Perhaps whitelist people who’ve recently had a pull request accepted?

Try it yourself
---------------

You can try _gu:who_ out on your own GitHub organisation: grab the source code, [install sbt](http://www.scala-sbt.org/release/docs/Getting-Started/Setup.html#installing-sbt) and run _gu:who_ yourself:

```bash
$ git clone https://github.com/guardian/gu-who.git
$ cd gu-who
$ sbt start
Loading /usr/share/sbt/bin/sbt-launch-lib.bash
[info] Loading project definition from /home/roberto/development/gu-who/project
[info] Set current project to gu-who (in build file:/home/roberto/development/gu-who/)
(Starting server. Type Ctrl+D to exit logs, the server will remain in background)
Play server process ID is 17861
[info] play - Application started (Prod)
[info] play - Listening for HTTP on /0:0:0:0:0:0:0:0:9000
```

It’s still a little rough around the edges, and given that the code is covered by the Apache V2 licence this statement very much applies:

> Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

...but we’d love you to try it out and give us feedback. In any case, for us:

The results
-----------

*   We’ve now got **98%** two-factor auth enabled across all accounts in our organisation (up from 54% a month ago)
    
*   We can see who is responsible for adding every user account to the organisation simply by looking at GitHub’s “blame” view of our users.txt file.
    
*   Everyone has a full name set in their profile, so you don’t have to guess who @njsev, @kpwrt, @bizzle52, or... anyone else... is.
    
*   Half-a-dozen accounts which we’d previously forgotten to remove from the GitHub organisation... finally were.

_The [gu:who](https://github.com/guardian/gu-who) bot was created by [Roberto Tyley](https://www.theguardian.com/profile/roberto-tyley) and [Lindsey Dew](https://www.theguardian.com/profile/lindsey-dew) at The Guardian. If you’re interested in Git and Security you may also be interested in [The BFG](https://rtyley.github.io/bfg-repo-cleaner/), a simpler, [faster](http://youtu.be/Ir4IHzPhJuI) alternative to git-filter-branch for cleansing bad data out of your Git repository - ie passwords, credentials & other private or unwanted data._
