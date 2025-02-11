---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2010-dec-14-online-information-linked-data'
headline: 'Exploiting open and linked data at Online Information 2010'
date: '2010-12-14'
authors: [Martin Belam]
standfirst: 'Guardian Information Architect Martin Belam spent a couple of days at the Online Information 2010 conference in London, watching sessions on Exploiting open and linked data'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/12/8/1291807719323/john_sheridan_at_online_info.jpg'
  alt: 'John Sheridan talking at Online Information 2010'
  credit: 'Photograph: Martin Belam/guardian.co.uk'
tags: []
---

At the end of November I attended the [Online Information conference](http://www.online-information.co.uk/online2010/conference.html) in London, an annual three-day gathering of information professionals. As part of the Exploiting open and linked data track, my colleague [Peter Martin](http://www.guardian.co.uk/profile/peter-martin) and I were giving a presentation about "[Mapping the Guardian's tags to the web of data](http://www.slideshare.net/currybet/mapping-the-guardians-tags-to-the-web-of-data)".

A good deal of the linked data presentations had a focus on the release of state data – particularly at the local level. The Coalition Government have told all local councils to release information on spending over £500, and the linked data community is hopeful that this will take the form of re-usable datasets rather than simply PDFs. [Richard Wallis](http://twitter.com/RJW) from [Talis](http://www.talis.com/) observed that: "This is difficult because it is new, not because it is technically difficult," and they are [offering to host this data for free for local authorities](http://www.talis.com/localgov/pr/) – provided they use their [triple-store](http://en.wikipedia.org/wiki/Triplestore) and [RDF](http://www.w3.org/RDF/) format.

[Chris Taggart](http://twitter.com/countculture) from [OpenlyLocal.com](http://openlylocal.com/) explained that slow progress had been made on the target to release all of this data by the end of the year. It isn't just about getting financial systems into a state where the data could be exported, it also posed ethical challenges. While councils would be expected to release data on the money they spent on individual consultants, it was less clear whether they should be detailing payments to individual foster parents, for example.

At a national level, [John Sheridan](http://twitter.com/#!/johnlsheridan) gave a fascinating talk about the work at [legislation.gov.uk](http://www.legislation.gov.uk/). Featuring online representations of British Law, [some dating back as far as 1267](http://www.legislation.gov.uk/1267), they have taken a linked data approach.


   <figure>
   <img alt="Screengrab of the 1267 Statute of Marlborough as it appears on legislation.gov.uk" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/8/1291815200934/1267_statute_of_marlborough.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=108a104043a3fa0af805e318cd3cfe55" loading="lazy" />
   <figcaption>
     The 1267 Statute of Marlborough, as it appears on legislation.gov.uk
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Anyone who has ever written software would have recognised some of the similarities between law and code. As well as the words themselves, even the way that legislation is typographically laid out has an impact on how the law may be interpreted. Sheridan's team also have to deal with versioning issues, since Acts are often amended by subsequent legislation, and he described the Statue book as being "forked" now that the devolved powers in national assemblies and parliaments could also alter primary legislation. Their URL schema allows users to append qualifiers like "enacted", "proposed" or specific dates to see into the legislative past and future.

Another talk featuring the output of a national parliament came from Nelleke Aders, talking about the Dutch House of Representatives in the Netherlands. She had been working on a pilot project to make the proceedings of parliament more open and linkable. They were parsing the written records of meetings to get an XML version that extracted from the records who was speaking, and the where, when and what of every debate. They then had some experimental visualisations of MP behaviour – for example, showing who interrupted people the most during a debate, or how active an MP was during a parliamentary session compared to their colleagues.


   <figure>
   <img alt="An 'attaquogram' of a Dutch parliamentary debate" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/12/8/1291828068827/attaquogram.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=1a9542506c99ac9cce238bdd8de0832f" loading="lazy" />
   <figcaption>
     An 'attaquogram', illustrating how many times different Dutch MPs interrupt each other during a debate 
    <i>Photograph: guardian.co.uk</i>
    </figcaption>
    </figure>

Although at the moment this was just a pilot, it looked to have some real promise, and it was notable that the project was being driven by the state itself – unlike something like [TheyWorkForYou.com](http://www.theyworkforyou.com/) in the UK, which was [built by volunteers](http://www.theyworkforyou.com/about/) and people outside of the mainstream political process.

At Guardian News and Media we have been interested in the concept of linked data for some time. We've already made some of our content accessible by [querying our API using persistent external identifiers like an ISBN or a MusicBrainz ID](http://www.guardian.co.uk/open-platform/blog/linked-data-open-platform). With so much activity in this field coming from the state, I think we will inevitably be consuming and publishing more linked data in the future, in order to build the tools that will allow colleagues like [Simon Rogers](http://www.guardian.co.uk/profile/simonrogers) and the [Datablog](http://www.guardian.co.uk/news/datablog) team to dig out stories from the mass of data.
