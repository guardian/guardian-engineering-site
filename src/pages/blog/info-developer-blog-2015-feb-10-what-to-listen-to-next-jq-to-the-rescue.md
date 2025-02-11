---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-feb-10-what-to-listen-to-next-jq-to-the-rescue'
headline: 'What to listen to next? jq to the rescue!'
date: '2015-02-10'
authors: [Rupert Bates]
standfirst: 'Search the Guardian for five star music reviews directly from your command-line'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/2/10/1423588025545/12036546815_777c14c432_o-1020x612.jpeg'
  alt: 'Bob Dylan image'
  credit: 'Photograph: CHRIS DRUMM/flickr'
tags: [Computing, Programming]
---

Recently I was looking for some new music to listen to and thought I’d check the Guardian to see what had received good reviews. When I went on to the site though I found it a bit hard to narrow down the reviews to ones I was interested in — albums rather than live reviews, which had received at least 4 stars.

Naturally I turned to the [Content API](http://explorer.content.guardianapis.com/) for help and this also seemed like a good opportunity to learn a tool I’d been interested in for a while: [jq](http://stedolan.github.io/jq/).

Jq, according to their GitHub site, is “a lightweight and flexible command-line JSON processor ... like [sed](http://en.wikipedia.org/wiki/Sed) for JSON”.

I think of it as performing the functions that XPath and XSLT do for XML but for JSON (fortunately the syntax is far less verbose than XSLT). There is a fairly decent [tutorial](http://stedolan.github.io/jq/tutorial/) on the site, but best of all there is an [online tool](https://jqplay.org/) which allows you to try out jq interactively in a browser.

First though we need some JSON to transform, so over to the Content API.

CAPI talk
---------

It is a simple enough task to fetch reviews by adding the tone/reviews tag, and by adding the tone/albumreview tag as well we can exclude live reviews and just return albums (I found that using both tags rather than just tone/albumreview alone gave better results because it filtered out some other non-review type articles).

By also adding fields=starRating into our query, we can return the star rating given in the review. Then we will limit our query to the last month by adding date parameters. This is about as far as we can go with the Content API since it doesn’t support querying by star rating.

Our final query string now looks like this:

[http://content.guardianapis.com/search?api-key=test&show-fields=starRating&page-size=1&tag=tone/albumreview,tone/reviews&from-date=2015-01-03&to-date=2015-02-03](http://content.guardianapis.com/search?api-key=test&show-fields=starRating&page-size=1&tag=tone/albumreview,tone/reviews&from-date=2015-01-03&to-date=2015-02-03)

...and the response looks like this (trimmed to two results for brevity):

```
{
  "response": {
    "status": "ok",
    "userTier": "developer",
    "total": 15895,
    "startIndex": 1,
    "pageSize": 10,
    "currentPage": 1,
    "pages": 1590,
    "orderBy": "newest",
    "results": [
      {
        "webTitle": "Bob Dylan: Shadows in the Night review – pre-rock songs imbued with romantic regret",
        "webPublicationDate": "2015-02-01T08:30:09Z",
        "sectionId": "music",
        "id": "music/2015/feb/01/bob-dylan-shadows-in-night-review-pre-rock-songs-romantic-regret",
        "fields": {
          "starRating": "4"
        },
        "webUrl": "http://www.theguardian.com/music/2015/feb/01/bob-dylan-shadows-in-night-review-pre-rock-songs-romantic-regret",
        "apiUrl": "http://content.guardianapis.com/music/2015/feb/01/bob-dylan-shadows-in-night-review-pre-rock-songs-romantic-regret",
        "sectionName": "Music"
      },
      {
        "webTitle": "Viet Cong: Viet Cong review – ambitious experimental rock, with tunes",
        "webPublicationDate": "2015-01-29T22:30:02Z",
        "sectionId": "music",
        "id": "music/2015/jan/29/viet-cong-viet-cong-review",
        "fields": {
          "starRating": "4"
        },
        "webUrl": "http://www.theguardian.com/music/2015/jan/29/viet-cong-viet-cong-review",
        "apiUrl": "http://content.guardianapis.com/music/2015/jan/29/viet-cong-viet-cong-review",
        "sectionName": "Music"
      }
    ]
  }
}
```

Jq for the music
----------------

Next we need to take this JSON and do something interesting with it. If you recall, we were trying to find albums which received good reviews — ie. those with a star rating of 4 or above. This is where jq comes in as it allows us to take the JSON returned by the Content API and very quickly and easily filter it based on JSON values.

The general idea will be to issue a [curl](http://en.wikipedia.org/wiki/CURL) command to retrieve the JSON and then pipe it to jq to query, transform and analyse it.

As a first step, you can see from the JSON above that there is quite a bit of metadata at the root of the response which we are not really interested in for the purposes of this exercise. Using jq we can quite easily throw all this away and just focus on what we are interested in — the results array.

```
URL="http://content.guardianapis.com/search?api-key=test&show-fields=starRating&page-size=100&tag=tone/albumreview,tone/reviews&from-date=2015-01-03&to-date=2015-02-03"
curl -s $URL | jq '.response.results[]'
```

The output from jq looks like this (again trimmed for brevity):

```
{
  "webTitle": "Beck Goldsmith: Lustre & Curve review – a polite howl of pain",
  "webPublicationDate": "2015-01-08T21:30:19Z",
  "sectionId": "music",
  "id": "music/2015/jan/08/beck-goldsmith-lustre-and-curve-review-polite-howl-of-pain",
  "fields": {
    "starRating": "3"
  },
  "webUrl": "http://www.theguardian.com/music/2015/jan/08/beck-goldsmith-lustre-and-curve-review-polite-howl-of-pain",
  "apiUrl": "http://content.guardianapis.com/music/2015/jan/08/beck-goldsmith-lustre-and-curve-review-polite-howl-of-pain",
  "sectionName": "Music"
}
{
  "webTitle": "Joyce Moreno: Raiz review – breezy, versatile singing and guitar work",
  "webPublicationDate": "2015-01-08T21:15:19Z",
  "sectionId": "music",
  "id": "music/2015/jan/08/joyce-moreno-raiz-review",
  "fields": {
    "starRating": "4"
  },
  "webUrl": "http://www.theguardian.com/music/2015/jan/08/joyce-moreno-raiz-review",
  "apiUrl": "http://content.guardianapis.com/music/2015/jan/08/joyce-moreno-raiz-review",
  "sectionName": "Music"
}
```

Let’s have a look in more detail at what is happening here. Along with the JSON from the Content API which is piped into jq, we are also passing a filter ‘.response.results\[\]’ — this describes a path into our JSON structure. The initial . is the root of the object, then we navigate into the response element and access the elements of the results array using ‘results\[\]’.

This is great because we now have a really flat, clean JSON structure to work with and it is much easier to see what is going on.

The next thing to do is to filter the reviews we’ve returned based on their star rating. Unfortunately the Content API returns the star rating as a string — it would be much nicer if it was a number as we could then search for reviews where the rating is greater than 3 rather than where it is “4” or “5”. Fortunately, an addition to our jq filter will allow us to do just this (from now on I will just show the actual filter we pass to jq rather than the full command):

```
.response.results[]|{webTitle, starRating:(.fields.starRating|tonumber)}
```

Easy pieces
-----------

There are a few things to notice here: firstly we are combining our original path filter which pulls out the results array with a second filter using the pipe operator ‘|’ in the same way we might combine commands in a bash shell. This allows us to easily build up arbitrarily complicated pipelines out of simple component filters.

Also of interest is the second filter we have added, which tells jq to transform our input JSON into a new JSON object. The curly brackets denote the root of the new object, and we are copying the webTitle field over as-is. Then we are creating a starRating field at the top level of the new object (rather than nested inside a fields object) and converting this to a number using the ‘tonumber’ function.

The output then looks like this (note that starRating is now a number):

```
{
  "webTitle": "Bob Dylan: Shadows in the Night review – pre-rock songs imbued with romantic regret",
  "starRating": 4
}
{
  "webTitle": "Arias for Domenico Gizzi review – just an echo of a true castrato",
  "starRating": 3
}
{
  "webTitle": "Liszt: Piano Sonata, Dante Sonata, Petrarch Sonnets review – Angela Hewitt is masterful and compelling",
  "starRating": 4
}
```

All that is now left to do is to select those reviews with a star rating of more than three. This is easily achieved by adding a select filter onto our jq input:

```
.response.results[]|{webTitle, starRating:(.fields.starRating|tonumber)}|select(.starRating > 3)
```

It’s all too much
-----------------

This returned quite a lot of results. To find out exactly how many, we can use the length function. Note that to use length we have to wrap the preceding filters in square brackets to turn their output into an array.

```
[.response.results[]|{webTitle, starRating:(.fields.starRating|tonumber)}|select(.starRating > 3)]|length
```

57 results apparently — rather too many to get through in an afternoon! So let’s just concentrate on the five star reviews — there are only six of them, and here they are:

```
 {
    "webTitle": "Napalm Death: Apex Predator – Easy Meat review – grindcore masters on top form",
    "starRating": 5
  },
  {
    "webTitle": "Mozart: Piano Sonatas K280 and 332; Chopin: 24 Preludes, etc CD review – overflowing with vitality",
    "starRating": 5
  },
  {
    "webTitle": "Bob Dylan: Shadows in the Night review – an unalloyed pleasure",
    "starRating": 5
  },
  {
    "webTitle": "Natalie Prass: Natalie Prass review – spellbinding country-soul",
    "starRating": 5
  },
  {
    "webTitle": "Xavier Sabata: I Dilettanti CD review – brilliant Italian composers give dilettantism a good name",
    "starRating": 5
  },
  {
    "webTitle": "Brahms: Piano Sonata No 2; Variations Op 21 No 1; Intermezzi Op 117, etc CD review – perfectly controlled",
    "starRating": 5
  }
```

So that’s my listening for the afternoon sorted out: a heady mix of classical and Napalm Death, with some Dylan and Natalie Prass thrown in for good measure.

It’s all over now baby blue
---------------------------

I found working with jq a real pleasure once I grasped the basics of chaining filters to select, transform and analyse JSON. JSON is such a central part of so many applications these days that it is great to have such a powerful tool at our disposal. The syntax is beautifully terse — pretty much anything can be accomplished in a one-liner and the concept of mapping and filtering to transform inputs will feel totally natural to anyone with a functional programming background.

Here is my final script for retrieving five star reviews from the Content API. In the final version I’ve added an additional filter to remove any results where the star rating is missing and also included the web url with the output.

```
URL="http://content.guardianapis.com/search?api-key=test&show-fields=starRating&page-size=100&tag=tone/albumreview,tone/reviews&from-date=2015-01-03&to-date=2015-02-03"
curl -s $URL | jq '.response.results[]|select(.fields.starRating != null)|{webTitle, url: .webUrl, starRating: 	 (.fields.starRating|tonumber)}|select(.starRating == 5)'
```
