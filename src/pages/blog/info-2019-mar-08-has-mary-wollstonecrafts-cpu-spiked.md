---
layout: ../../layouts/blog.astro
slug: 'info-2019-mar-08-has-mary-wollstonecrafts-cpu-spiked'
headline: 'Has Mary Wollstonecraft''s CPU spiked?'
date: '2019-10-25'
authors: [Amy Hughes, Roberto Tyley]
standfirst: 'We need lots of feminists. No seriously, we need lots of feminists, or our Elasticsearch cluster will fall over'
image:
  url: 'https://media.guim.co.uk/5a275ae9541cb3918d7537db3faad5d70d3d7b4a/0_115_4930_2959/4930.jpg'
  alt: 'Up to one thousand people attended the march entitled ‘Together for Women’s Safety’ in Bucharest showing their solidarity with the women who have been victims of violence.'
  credit: 'Photograph: Robert Ghement/EPA'
tags: [Computing, Elasticsearch, International Women''s Day]
---

We use the Elasticsearch database, and older versions of this came with a [naming policy](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/setup-configuration.html#node-name) for nodes that, entirely unintentionally, was not wonderfully inclusive. The name for each node would be chosen at random from a list of [3000 Marvel comic-book characters](https://github.com/elastic/elasticsearch/blob/v2.4.1/core/src/main/resources/config/names.txt). For some of us on the team it wasn’t obvious what the names represented, perpetuating the perception that in the field of computing, the knowledge of [boy’s club](https://www.theguardian.com/world/2018/mar/17/sexual-harassment-silicon-valley-emily-chang-brotopia-interview) arcana distinguishes who’s ‘in’. The gender bias in the [predominantly male](https://fivethirtyeight.com/features/women-in-comic-books/) list of characters (where gender representation is also [strongly skewed](https://pudding.cool/2017/07/comics/)) also undermined inclusivity on our team while we were working with these systems – we can have whatever names we want, why wouldn’t we chose names that spoke better to the team as whole?

We took the opportunity to redress the balance in gender representation by replacing the naming of our nodes with a much better list - a list of feminists.

We need _lots_ of feminists
---------------------------

Due to the [birthday paradox](https://en.wikipedia.org/wiki/Birthday_problem) you need a surprisingly long list of names to avoid clashes when names are chosen at random - with 18 nodes picking at random from a list of 100 names, [there’s an 80% chance two nodes will get the same name](https://www.wolframalpha.com/input/?i=birthday+problem&assumption=%22FSelect%22+-%3E+%7B%7B%22BirthdayProblem%22%7D,+%22dflt%22%7D&assumption=%7B%22F%22,+%22BirthdayProblem%22,+%22n%22%7D+-%3E%2218%22&assumption=%7B%22F%22,+%22BirthdayProblem%22,+%22pbds%22%7D+-%3E%22100%22&assumption=%7B%22C%22,+%22birthday+problem%22%7D+-%3E+%7B%22Formula%22,+%22dflt%22%7D) - which you do not want! - so we were looking for a list of _thousands_ of feminists.

Finding a list online that large was tricky. Googling found several articles with relatively short lists of feminists (fewer than 30 or so), and even Wikipedia’s main [List of feminists](https://en.wikipedia.org/wiki/List_of_feminists) only has a few hundred entries - nowhere near enough. Looking closer at Wikipedia, it _does_ manage to list more feminists - but inconveniently, they’re listed as sub-categories of Wikipedia’s category of [Feminists by nationality](https://en.wikipedia.org/wiki/Category:Feminists_by_nationality). To get the full list of all feminists Wikipedia knows about, we needed to visit - and scrape - over a hundred different Wikipedia category pages; [Hungarian feminists](https://en.wikipedia.org/wiki/Category:Hungarian_feminists), [Rwandan feminists](https://en.wikipedia.org/wiki/Category:Rwandan_feminists), [Peruvian feminists](https://en.wikipedia.org/wiki/Category:Peruvian_feminists), etc.

Scraping information off a variety of Wikipedia pages is a bit of a slog, but thankfully, someone has already done the work of turning Wikipedia into a database - it’s [DBpedia](https://wiki.dbpedia.org/)! DBPedia can be queried using [SPARQL](https://en.wikipedia.org/wiki/SPARQL), and there’s a simple web-UI to do that here: [https://dbpedia.org/sparql](https://dbpedia.org/sparql).

After a bit of mucking around, we managed to craft our first SPARQL query that could join together the _Feminists\_by\_nationality_ category with its many sub-categories to get the resulting list of people:

```text
SELECT ?personName where {
 ?person a foaf:Person .
 ?person foaf:name ?personName .
 FILTER (
  EXISTS {
     ?person dct:subject ?femNatCat .
     ?femNatCat skos:broader dbc:Feminists_by_nationality
  }
 )
}
```

The first part is saying ‘getting me a list of people’, with the second part in the filter requiring that each person is the ‘subject’ of a category that declares it can be ‘broadened’ to the _Feminists\_by\_nationality_ category - it took a while to work that all out by trial and error, but when we did, we got a list of 1700 names!

That wasn’t quite enough though, so we broadened the query to include [Women’s rights activists](https://en.wikipedia.org/wiki/List_of_women%27s_rights_activists) (which Wikipedia again categorises by nationality) and [Women scientists](https://en.wikipedia.org/wiki/Category:Women_scientists_by_century) (categorised by century, for some reason):

```text
SELECT ?personName where {
 ?person a foaf:Person .
 ?person foaf:name ?personName .
 FILTER (
  EXISTS {
     ?person dct:subject ?femNatCat .
     ?femNatCat skos:broader dbc:Feminists_by_nationality
  } || EXISTS {
    ?person a yago:WikicatFeminists
  } || EXISTS {
    ?person dct:subject ?actCat .
    ?actCat skos:broader "dbc:Women's_rights_activists_by_nationality"
  } || EXISTS {
    ?person dct:subject ?sciCat .
    ?sciCat skos:broader dbc:Women_scientists_by_century
  }
 )
}
```

That yielded 3192 names! Good enough to get started with - but we would always appreciate more feminists, so if you spot someone in Wikipedia who meets the definition of a feminist, but hasn’t been correctly categorised as such, please take the chance to correct that!

Once we have the list of names, as each Elasticsearch server starts up it runs a script that downloads them from S3, normalises the text with _iconv_ and _sed_ (to ensure the names are [valid hostnames](https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames)) and selects a _$FRIENDLY\_HOSTNAME_ at random to be the name of the box. There are a few steps to actually _setting_ the name of the box:

*   _echo $FRIENDLY\_HOSTNAME > /etc/hostname_ to make this the permanent hostname of the box, in case a restart occurs - note that doesn’t affect the _current_ hostname, so...
    
*   _hostname $FRIENDLY\_HOSTNAME_ to make this the _current_ hostname of the box (that’s only a temporary setting, so would be lost after restart).
    
*   _echo “127.0.1.1 $FRIENDLY\_HOSTNAME” >> /etc/hosts_ to [prevent sudo warnings](https://askubuntu.com/q/59458/17211)
    
*   Push _$FRIENDLY\_HOSTNAME_ to be the Name tag of the box - so that it displays in AWS’s UI for managing EC2.

We also [updated our status-app](https://github.com/guardian/status-app/pull/63) so that we could click through to the Wikipedia entry for each name, so we could learn more about the names we encountered.


   <figure>
   <img alt="Angela Davis, right, sits in court with her attorneys John Abt and Margaret Burnham, left, Dec. 24, 1970 in San Rafael. Ms. Davis faces kidnap, murder and conspiracy charges as a result of an August shoot out in which a Marin County Superior Court judge and three others were slain. (AP Photo)" src="https://i.guim.co.uk/img/media/ebcb6915f546acf3c68eae5251a08b4100a0928a/0_196_3000_1800/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4384771f5e010b36f92282954094da1f" loading="lazy" />
   <figcaption>
     Angela Davis, who one of our nodes was named after.
    <i>Photograph: AP</i>
    </figcaption>
    </figure>

Since the change we’ve now welcomed [Angela Davis](https://en.wikipedia.org/wiki/Angela_Davis), [Hannah Arendt](https://en.wikipedia.org/wiki/Hannah_Arendt) and Guardian contributor [Lesley Abdela](https://en.wikipedia.org/wiki/Lesley_Abdela) to the cluster among others. We’ve clicked through to learn that the [most beautiful theorem in physics](https://en.wikipedia.org/wiki/Noether%27s_theorem) was proven by female mathematician [Emmy Noether](https://en.wikipedia.org/wiki/Emmy_Noether). And we no longer have to ask our colleagues to “connect to [Demolition Man](https://github.com/elastic/elasticsearch/blob/v2.4.1/core/src/main/resources/config/names.txt#L705)”. The change is subtle, but important for making us feel we all belong here. It’s worth spending time to change things about your workplace that exclude others, even if they might seem inconsequential to you.

_It’s worth noting that Elasticsearch changed their node-naming in 2016, doing away with the Marvel naming and relying on auto-generated-identifiers instead, so versions after Elasticsearch 2.4 don’t have this problem. We’ve since upgraded, but we’ve kept our naming strategy._
