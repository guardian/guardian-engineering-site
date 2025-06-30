---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2011-aug-02-music-album-pages'
headline: 'Introducing the Guardian''s new music album pages'
date: '2011-08-02'
authors: [Lisa van Gelder]
standfirst: 'The launch of our album pages, which pull in linked data from around the internet, allow users to create their own reviews'
image:
  url: 'http://static.guim.co.uk/sys-images/Music/Pix/pictures/2011/2/17/1297948053642/SXSW-2011--005.jpg'
  alt: 'SXSW 2011 '
  credit: 'Photograph: PR/Linda Nylind/Mark Sink/Kristen Hatgi/PR/Guardian/PR'
tags: [Culture, Music]
---

On Tuesday we launched our new album pages on guardian.co.uk. Just like our artist pages, they take a Musicbrainz ID and pull in linked data from various sources around the internet, including Musicbrainz.org, Last.fm and Amazon.

As our own critics have only reviewed a fraction of the albums out there, we've also made it possible for readers to create their own reviews to help other readers find new music. Or you can build up a list of your favourite albums of all time and share it with your friends.

**How to find them**  
For the moment the easiest way to find album pages is to navigate to them from an artist. Go to an artist page, eg [http://www.guardian.co.uk/music/beyonce](http://www.guardian.co.uk/music/beyonce) and you will see a carousel of all the albums they have released.

You can also use the Musicbrainz ID from [musicbrainz.org](http://musicbrainz.org). eg [6f8e8119-de1b-39f0-85ca-b5252cb9211d](http://musicbrainz.org/release-group/6f8e8119-de1b-39f0-85ca-b5252cb9211d) is the ID for "I Am... Sasha Fierce" by Beyoncé. Take the ID and add it to our album url: [6f8e8119-de1b-39f0-85ca-b5252cb9211d](http://www.guardian.co.uk/music/album/6f8e8119-de1b-39f0-85ca-b5252cb9211d)

**How we built them**  
There are millions of albums out there and downloading the details for all of them would take a long time. So we've created our pages to be generated on demand. The first time anyone clicks on an album page we get its details from Musicbrainz and pull in further information from our content API, Last.fm and Amazon. This information is cached for further use. This means we only store information for albums that people are interested in.

We're currently in the middle of a big tagging operation to add Musicbrainz ids to all of our reviews so that we can pull back the correct reviews for an album automatically. Until that is complete we are doing a search of our content API to find reviews for an album based by name. This works brilliantly for artists and albums with unique names but falls down when you get a band named "Example".

**Album data**  
The data for albums is more complicated than for artists as one album may have many releases and all of them have their own separate IDs. To simplify things, we have chosen to use the release group ID from Musicbrainz.org as the ID for our album pages, which is the ID of all the releases. This means you'll see all the reviews for an album on the same page rather than having them spread out over individual editions.

There is some data that is unique to a release however, such as the track listing and the album cover image, and we have had to decide which release to use for an album. Our current logic uses the first UK release if there is one or otherwise the first release.
