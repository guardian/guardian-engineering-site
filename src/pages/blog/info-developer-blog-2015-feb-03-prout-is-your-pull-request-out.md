---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-feb-03-prout-is-your-pull-request-out'
headline: 'Prout: is your pull request out?'
date: '2015-02-03'
authors: [Roberto Tyley]
standfirst: 'How do you know your pull request is on production?'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/1/29/1422571327127/832d8df0-1d8c-49e8-b380-1f9122a8b84b-620x80.png'
  alt: 'Seen on PROD (merged by @rtyley 7 minutes and 4 seconds ago). Please check your changes!'
  credit: 'Illustration: Roberto Tyley'
tags: [Cloud computing, Computing, Open source, Software]
---

[Guardian Membership](https://membership.theguardian.com/) has been continuously deploying since we started the project back in May 2014. _[Prout](https://github.com/guardian/prout)_ arose to help with a problematic area of this wonderful setup:

Anything can break. If you’re building a site, the site can break. If you’re building a site with continuous deployment, the site can break, but the continuous deployment pipeline can break too. If either of these things have any value, then you care when they break.


   <figure>
   <img alt="A fireball erupts across Interstate 77 from a pipeline explosion. The gas company failed to conduct inspections or tests that might have revealed weaknesses in the massive pipeline." src="https://i.guim.co.uk/img/media/c98c273057f7863257ae392e757f862594ca4171/0_452_2998_1800/2000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=54abd84fa162cf88dc0650ed1837c28f" loading="lazy" />
   <figcaption>
     A fireball erupts across Interstate 77 from a pipeline explosion. The gas company failed to conduct inspections or tests that might have revealed weaknesses in the massive pipeline.
    <i>Photograph: West Virginia State Police/AP</i>
    </figcaption>
    </figure>

One cause of _site_ breakage is shiny new features, which is why it’s good discipline for a developer to check their changes in production as soon as they’re deployed. The continuous deployment pipeline itself can fail for so many reasons _(the CI server can die, the deployment tool ([RiffRaff](https://www.theguardian.com/info/developer-blog/2015/jan/05/delivering-continuous-delivery-continuously#img-2), for us) can forget to poll for new builds, the AWS auto-scaling group can end up in a bad state requiring manual intervention, the CDN can spontaneously decide to serve only stale content… and so on)_ - you can monitor lots of different things, but the unknown, the unexpected, can fall between the cracks.

We wanted a single check that would span the whole pipeline - from merged pull request to running site - and, as a side-benefit, be agnostic about everything inbetween, because there’s no reason why _your_ pipeline should be anything like _our_ pipeline (CI, deployment tools, hosting providers - those differ even for teams within the Guardian).


   <figure>
   <img alt="Prout spans the continuous delivery pipeline from merged pull request to production deployment. Your army of mad zombie robotic squirrel scientists are not it’s concern, you might want to keep an eye on them." src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/2/2/1422904197220/0f5ec394-8d85-4463-9fd1-d395937b0cdf-2060x1236.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=16f9b8a427e3271b3ed91c97ff251380" loading="lazy" />
   <figcaption>
     Prout spans the continuous delivery pipeline from merged pull request to production deployment. Your army of mad zombie robotic squirrel scientists are not it’s concern, you might want to keep an eye on them.
    <i>Illustration: Roberto Tyley</i>
    </figcaption>
    </figure>

Prout only requires that you use GitHub pull requests, and that you expose the **Git commit id** of your build on your deployed site - a URL that Prout can hit. Prout only cares about the commit id, and definitely _doesn’t_ care about build numbers. So for instance, if you look at the source of [https://membership.theguardian.com/](https://membership.theguardian.com/), you’ll see something like this near the bottom of the page:

> <!-- build-commit-id: 9ae9a6f4083c67abc1636057025ac060cbe04ab4 -->

Whenever you merge a pull request, Prout will hit your site and read that commit id - which tells it unambiguously what version of your software is being served to your users as of that moment. It also clones your GitHub repo, and compares your merged pull request with the history of the commit that’s currently on the site. From that, it can tell whether the site has your pull request or not.


   <figure>
   <img alt="Establishing what's been deployed by looking at Git history" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/2/1/1422825420619/0b7edec5-d1e6-46b9-a3cc-f94d8cfeaa37-1020x612.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=a5edd73683a0db52b177432d7e35056d" loading="lazy" />
   <figcaption>
     Establishing what’s been deployed by looking at Git history. Prout walks the Git repository’s commit graph to see which pull requests are live. <strong>Live</strong> pull requests are the ones in the <em>history</em> of the build-commit that’s reported by the live production site.
    <i>Illustration: Roberto Tyley</i>
    </figcaption>
    </figure>

As soon as Prout sees that the site is running a version that _includes_ your pull request, it’ll update the pull request with a message like this:


   <figure>
   <img alt="Seen on PROD (merged by @rtyley 7 minutes and 9 seconds ago). Please check your changes!" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/1/29/1422555227966/68cf2915-81fd-4799-a27b-82ca048eac80-620x80.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=ea088b91f5997297ccd2c3a71083cf3a" loading="lazy" />
   <figcaption>
     A pull request makes it successfully on to production
    <i>Illustration: Roberto Tyley</i>
    </figcaption>
    </figure>

That “merged 7 minutes and 9 seconds ago” is kind of interesting - the total transit time required by your pipeline to get a code change in front of users. You’d obviously like to keep it as low as possible, and know if it’s getting too long. If your pull request doesn’t show up promptly, then something’s going wrong - and Prout will make a point of letting you know:


   <figure>
   <img alt="Overdue on PROD (merged by @rtyley 15 minutes and 2 seconds ago). What's gone wrong?" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/1/29/1422555565815/d7cbdb44-97de-4b22-8142-de9225e3d6e6-620x79.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=6f7a0f05008619f36b6d75b34e39c311" loading="lazy" />
   <figcaption>
     A merged pull request has not yet made it it to production... time to investigate
    <i>Illustration: Roberto Tyley</i>
    </figcaption>
    </figure>

You can also get a great overview of what’s _been_ deployed and what’s _about_ to be deployed, just by looking at the labels in the GitHub [closed pull requests](https://github.com/guardian/membership-frontend/pulls?q=is%3Apr+is%3Aclosed) view:


   <figure>
   <img alt="Merged pull requests, labelled according to deployment status" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/2/2/1422915209602/90f78d60-85c8-4686-99b8-7f834fe3bcca-bestSizeAvailable.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=be36e0ffe004a4f47d29ce42d9c3076a" loading="lazy" />
   <figcaption>
     Merged pull requests, labelled according to deployment status
    <i>Illustration: Roberto Tyley</i>
    </figcaption>
    </figure>

How do you configure Prout?
---------------------------

Place a _.prout.json_ file in any folder in your repository you want to get monitored:

```javascript
{
  "checkpoints": {
    "PROD": {
      "url": "https://membership.theguardian.com/",
      "overdue": "15M"
    }
  }
}
```

Whenever changes from a pull request touch files anywhere within that folder, the Prout configuration will fire, and Prout will update the pull request accordingly. More details are in the project [README](https://github.com/guardian/prout#add-config-file).

Slack integration
-----------------

Not everyone at the Guardian with a stake in the software we write (for instance, the in-house users of [Ophan](https://www.theguardian.com/info/developer-blog/2012/jul/20/discovery-week-day-five#block-5009896258f90c7116d835fa)) has a GitHub account, but it’s still good for them to know about the features and fixes we release - so Prout supports hooking into [Slack](https://slack.com/), to let us communicate when those features are ready to try out.

The way we let Prout know the Slack webhook URL is a hack. Slack webhooks are ‘private’ because they contain a unique code that allows you to post any message you want to that room. For a public repo like [guardian/membership-frontend](https://github.com/guardian/membership-frontend), how would you configure the Slack webhook for Prout without publicising the URL? The answer is [a little abuse](https://github.com/guardian/prout/pull/11) of an admin-only feature of GitHub repos - [repository webhooks](https://developer.github.com/webhooks/creating/). You can store URLs in there, and only admin-enabled users can see them. Store a Slack webhook URL in your repository’s webhooks, and Prout will pick it up, posting a Slack message every time a pull request is successfully deployed.

Run your own Prout!
-------------------

If this stuff sounds good to you, and you want to run your own instance of Prout against your own projects, you’ll want to create a dedicated GitHub account and [access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) that can comment and set labels on those repositories. You can quickly deploy your own instance of Prout with Heroku (that’s not essential, just convenient. You may well want to run Prout on your own infrastructure):

<a target="_blank" href="https://heroku.com/deploy?template=https://github.com/guardian/prout"><img src="https://www.herokucdn.com/deploy/button.png" alt="Deploy" style="max-width:100%;"></a>

Prout, like _[gu:who](https://www.theguardian.com/info/developer-blog/2014/apr/11/how-the-guardian-uses-github-to-audit-github)_, uses GitHub as the user interface, and supplies minimal UI itself. Try it out and give us your feedback!
