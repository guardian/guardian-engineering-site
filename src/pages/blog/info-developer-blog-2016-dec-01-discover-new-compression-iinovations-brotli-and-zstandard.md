---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-01-discover-new-compression-iinovations-brotli-and-zstandard'
headline: 'Discover new compression innovations Brotli and Zstandard'
date: '2016-12-01'
authors: [Mariot Chauvin]
standfirst: 'Brotli and Zstandard are two recent lossless compression algorithms. Discover more about them and how The Guardian is using them in production. '
image:
  url: 'https://media.guim.co.uk/6ede56d85ef9343b64cb49ca7aa6c36c350c85c8/0_187_2233_2791/2233.jpg'
  alt: 'Mathematician Claude E. Shannon, inventor of information theory (Photo by Alfred Eisenstaedt/Time &amp; Life Pictures/Getty Images)'
  credit: 'Photograph: Alfred Eisenstaedt/Time Life Pictures/Getty Images'
tags: [Advent developer blog 2016, Mathematics]
---

In 1948, [Claude Shannon](https://en.wikipedia.org/wiki/Claude_Shannon) published an [extraordinary article](http://ieeexplore.ieee.org/document/6773024/?reload=true&arnumber=6773024), defining for the first time a mathematical model of information and determining the maximum information quantity that can be transferred over a channel, now called [the shannon limit](https://news.mit.edu/2010/explained-shannon-0115), and the limits to possible [lossless data compression](https://en.wikipedia.org/wiki/Lossless_compression).

Since, engineers have been trying to approach such limits dealing with two other practical factors the speed to compress and the speed to uncompress data.

This article will present two quite recent algorithms and how you can already benefit by using them.

Zstandard
---------

  
[Zstandard](http://www.zstd.net) is both a new compression algorithm and a [reference implementation](https://github.com/facebook/zstd) which has been designed to be extremely performant with modern hardware. It is a general-purpose compression for a variety of data types.

While usually algorithm trades-off either compression ratio, compression speed, or decompression speed, Zstandard is designed to be good at all 3!

Compared to [zlib](https://en.wikipedia.org/wiki/Zlib) (wrapper and de facto standard implementation of [the deflate algorithm](https://en.wikipedia.org/wiki/DEFLATE)), which tries to balance compression ratio and speed:

*   At the same compression ratio, it compresses ~3-5x faster  
    
*   At the same compression ratio, it decompresses ~2-3x faster  
    
*   At the same compression speed, it compresses to 10-15 percent smaller files

Zstandard achieve this performance thanks to [several design decisions](https://code.facebook.com/posts/1658392934479273/smaller-and-faster-data-compression-with-zstandard):

*   an increased memory window to 1MB with no limit (deflate only allows 32 KB)  
    
*   a format designed for parallel execution
*   a format compatible with [branchless algorithms](https://hbfs.wordpress.com/2008/08/05/branchless-equivalents-of-simple-functions/)
*   a [new entropy encoder](http://fastcompression.blogspot.co.uk/2013/12/finite-state-entropy-new-breed-of.html) based on [Asymmetric Numeric Systems (ASN)](https://en.wikipedia.org/wiki/Asymmetric_Numeral_Systems)

At the Guardian we are now using ZStandard instead of zlib (using the [java JNI binding](https://github.com/luben/zstd-jni)) for compressing articles in our most critical component, the publication pipeline!

Brotli
------

  
[Brotli](https://github.com/google/brotli) is a general purpose lossless compression algorithm, that has been recently [been standardised](https://tools.ietf.org/html/rfc7932) as an [http compression](https://en.wikipedia.org/wiki/HTTP_compression) encoding. Brotli has been [developed by google](https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html), and has the following characteristics:

*   sliding window between 1KB and 16MB
*   a static dictionary with around 13,500 words or syllables in 6 languages and common phrases in HTML and JavaScript
*   121 transforms to combines entries in the dictionary
*   A [huffman based entropy encoder](https://en.wikipedia.org/wiki/Huffman_coding)

Brotli trades-off compression speed for decompression speed and a slightly improved compression ratio.

Compared to [gzip](https://en.wikipedia.org/wiki/Gzip) (thin [wrapper around zlib](https://blogs.msdn.microsoft.com/ieinternals/2014/10/21/compressing-the-web/), if you are confused [this is expected](https://stackoverflow.com/a/1579506)), it [decompresses about 20% faster](https://blogs.akamai.com/2016/02/understanding-brotlis-potential.html), at the same compression ratio.

Although brotli uses a less efficient entropy encoder than Zstandard, it is already [implemented and available](http://caniuse.com/#feat=brotli) in Google Chrome, Mozilla Firefox, Opera and ([support is in development in Microsoft Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/brotlicompresseddataformat/))


   <figure>
   <img alt="Support of brotli by web browsers on 28-11-2016" src="https://i.guim.co.uk/img/media/a352ff25cf7bc73a85eafe362e6b618c0318f541/0_0_1826_630/master/1826.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=d1999cbcdbfd2b67afb4283731e295a7" loading="lazy" />
   <figcaption>
     Support of brotli by web browsers on 28-11-2016
    <i>Illustration: caniuse.com</i>
    </figcaption>
    </figure>

Support has as well started to be added in web client and servers:

*   [curl](https://daniel.haxx.se/blog/2015/09/30/libbrotli-is-brotli-in-lib-form/)
*   [apache](https://www.slightfuture.com/webdev/httpd-mod-brotli)
*   [nginx](https://github.com/google/ngx_brotli)
*   [IIS](https://www.iis.net/downloads/community/2016/03/iis-brotli)

At the Guardian we are using the [play framework](https://www.playframework.com/) which provide [a built-in gzip filter](https://www.playframework.com/documentation/2.5.x/GzipEncoding) but not yet a brotli one, so I decided to [write it](https://github.com/guardian/play-brotli-filter).

Google’s brotli repository [doesn’t yet provide a reference java implementation](https://github.com/google/brotli/issues/428), however you can use [jbrotli, a JNI binding](https://github.com/MeteoGroup/jbrotli).

CDNs have recently improved their support as well:

*   Fastly ([through custom VCL](https://community.fastly.com/t/brotli-compression-support/578/10)) - no compression on the fly yet
*   [KeyCDN](https://www.keycdn.com/support/brotli-compression/) - no compresssion on the fly yet
*   [CDN77](https://www.cdn77.com/brotli) - [compression on the fly](https://client.cdn77.com/support/knowledgebase/cdn-resource/which-formats-are-you-compressing)
*   MaxCDN ([coming soon](https://www.maxcdn.com/one/visual-glossary/brotli/)) - no compression on the fly yet

At the Guardian we have been successfully using the [playframework brotli filter](https://github.com/guardian/play-brotli-filter) on an internal tool and plan to apply it soon to our main [frontend](https://github.com/guardian/frontend).
