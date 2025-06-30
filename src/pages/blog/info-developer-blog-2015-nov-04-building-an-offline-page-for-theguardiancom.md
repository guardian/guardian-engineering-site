---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-nov-04-building-an-offline-page-for-theguardiancom'
headline: 'Building an offline page for theguardian.com'
date: '2015-11-04'
authors: [Oliver Joseph Ash]
standfirst: 'How we used service workers to build a custom offline page for theguardian.com.'
image:
  url: 'http://media.guim.co.uk/3644af9001e6cb1122514564ddcebaa01725c2c6/0_0_832_499/832.jpg'
  alt: 'theguardian.com’s offline page'
  credit: 'Illustration: Oliver Ash'
tags: [Computing, HTML5, Internet, Software, Web 2.0, Web browsers]
---

You’re on a train to work and you open up the Guardian app on your phone. A tunnel surrounds you, but the app still works in very much the same way as it usually would—despite your lack of internet connection, you still get the full experience, only the content shown will be stale. If you tried the same for a website, however, it wouldn’t load at all:


   <figure>
   <img alt="Chrome for Android’s offline page" src="https://i.guim.co.uk/img/media/6ba3b0c53e0ccb83176c865ef193161a3e1562e8/0_0_1080_1100/master/1080.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d3f50b95565f7d15307afb5356af48bd" loading="lazy" />
   <figcaption>
     Chrome for Android’s offline page
    <i>Illustration: Oliver Ash</i>
    </figcaption>
    </figure>

Chrome eases the pain of being offline with its hidden game (press space bar on desktop, tap the dinosaur on mobile). But we can do better.

[Service workers](https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md) allow website authors to intercept all network requests to their websites, which means we can provide rich offline experiences, just like native apps. At the Guardian, we recently released a custom offline experience of our own. When users are offline they will see a Guardian branded page with a simple offline message and, for fun, a crossword to play while they wait for a connection. This blog post is about how we built it, but first, here’s how you can try it out for yourself.

Try it out
----------

You must be running a browser that supports the [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) [API](https://en.wikipedia.org/wiki/Application_programming_interface)s. At the time of writing only Chrome (mobile and desktop) supports both of APIs, but support is coming in Firefox very soon (currently in the nightly build), and [all browsers except Safari have shown enthusiasm](https://jakearchibald.github.io/isserviceworkerready/). Furthermore, service workers can only be registered for websites served over [HTTPS](https://en.wikipedia.org/wiki/HTTPS), which theguardian.com has started to move towards. Thus, we can only offer the offline experience for HTTPS sections of the website. For the time being, we have chosen the [developer blog](https://www.theguardian.com/info/developer-blog) as our testing ground. So, if you’re reading this on [our developer blog](https://www.theguardian.com/info/developer-blog) section of the website, you’re in luck.

Once you’ve visited a page on our [developer blog](https://www.theguardian.com/info/developer-blog) in a supported browser, you’re all set. Disconnect your device from the internet and refresh. If you are unable to try it out for yourself, [take a look at this demo video](https://twitter.com/jaffathecake/status/657207009335508992).

How it works
------------

We can instruct browsers to register our service worker as soon as the user arrives on the page with some simple JavaScript. Support for service workers is currently sparse, so we need to use feature detection to avoid any errors.

```javascript
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js');
}
```

As part of the service worker’s install event, we can use the [new cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to cache the various moving parts of our website, such as [HTML](https://en.wikipedia.org/wiki/HTML), [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets), and [JavaScript](https://en.wikipedia.org/wiki/JavaScript):

```javascript
var staticCacheName = 'static';
var version = 1;

function updateCache() {
    return caches.open(staticCacheName + version)
        .then(function (cache) {
            return cache.addAll([
                '/offline-page.html',
                '/assets/css/main.css',
                '/assets/js/main.js'
            ]);
        });
};

self.addEventListener('install', function (event) {
    event.waitUntil(updateCache());
});
```

Once install has completed, the service worker can listen to and control the fetch event, giving us full control over all future network requests incurred by the website.

```javascript
self.addEventListener('fetch', function (event) {
    event.respondWith(fetch(event.request));
});
```

To give you some idea of the flexibility we have here, we could construct our own response programmatically:

```javascript
self.addEventListener('fetch', function (event) {
    var response = new Response('<h1>Hello, World!</h1>',
        { headers: { 'Content-Type': 'text/html' } });
    event.respondWith(response);
});
```

Or, we could respond with something from the cache if we can find a match for the given request, falling back to the network:

```javascript
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});
```

So how do we use all of this to provide an offline experience?

Firstly, the HTML and resources needed for the offline page are cached by the service worker upon installation. Included in this cache is the [React](https://facebook.github.io/react/) [application](https://github.com/guardian/frontend/tree/dca4d6fbfddd608bed0d628b63f5da763be09c79/static/src/javascripts/es6/projects/common/modules/crosswords) we have developed for [our crossword pages](https://www.theguardian.com/crosswords). Thereafter we intercept all network requests to a web page on theguardian.com, including requests for subresources on those pages. The logic for handling these requests goes something like:

1.  If we detect the incoming request is a navigation to one of our HTML pages, we always want to serve the most up-to-date content, so we attempt to make the request over the network to the server.
    
2.  When we get a response from the server, we can respond with that directly.
    
3.  If the network request throws an error (i.e. failed because the user is offline), we catch this and instead respond with the cached HTML for the offline page.
    
4.  Else, if we detect the request is anything other than HTML, we will lookup the request in the cache.
    
5.  If a cached match is found, we can respond with that directly.
    
6.  Else, we will attempt to make the request over the network to the server.

The resulting code, which uses the [new cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) (as part of the Service Worker API) and [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) (for making network requests), is as follows:

```javascript
var doesRequestAcceptHtml = function (request) {
    return request.headers.get('Accept')
        .split(',')
        .some(function (type) { return type === 'text/html'; });
};

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (doesRequestAcceptHtml(request)) {
        // HTML pages fallback to offline page
        event.respondWith(
            fetch(request)
                .catch(function () {
                    return caches.match('/offline-page.html');
                })
        );
    } else {
        // Default fetch behaviour
        // Cache first for all other requests
        event.respondWith(
            caches.match(request)
                .then(function (response) {
                    return response || fetch(request);
                })
        );
    }
});
```

That’s it! All the code for [theguardian.com is open source on GitHub](https://github.com/guardian/frontend), so you can view the [full version of our service worker script there](https://github.com/guardian/frontend/blob/43c73e57aa9a00dc3555baa51c5d975b0e6b2b66/applications/app/templates/serviceWorker.scala.js), or in production at [https://www.theguardian.com/service-worker.js](https://www.theguardian.com/service-worker.js).

We have good reasons to be excited about these new browser technologies, because they can be used to give websites the same rich offline experiences we have in native apps today. In the future when theguardian.com has completed migration to HTTPS, the offline page will increase in significance and we can make further improvements to the offline experience. Imagine opening theguardian.com on your internet-less commute to work to find content personalised for you, downloaded and cached by the browser ahead of your visit. There is no friction involved in the installation step—unlike native apps which require users to have app store accounts for installation, all that’s needed on the web is to visit the website in question. Service workers can also help improve website load times, as the shell of a website can be cached reliably, just like in native apps.

If you’re interested in learning more about service workers and what’s possible, Matt Gaunt, who is a Developer Advocate for Chrome, has written an [introduction to Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) which goes into more detail.
