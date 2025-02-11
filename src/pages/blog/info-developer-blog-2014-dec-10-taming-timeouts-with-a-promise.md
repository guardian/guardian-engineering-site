---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-dec-10-taming-timeouts-with-a-promise'
headline: 'Taming timeouts with a Promise'
date: '2014-12-10'
authors: [Paul Roberts]
standfirst: 'Some notes from the Guardian’s software development team on experimenting with different ways of handling timeouts in JavaScript'
image:
  url: 'http://media.guim.co.uk/28ba0f0aeeed511dd6817f6e525ac4a7383a8e24/0_814_1361_818/1000.jpg'
  alt: 'Countdown'
  credit: 'Photograph: Wilfredo Lee/AP'
tags: [Computing, JavaScript, Programming]
---

After reading a colleague’s [post](https://www.theguardian.com/info/developer-blog/2014/nov/17/the-perils-of-excessive-javascript-timeouts) regarding JavaScript timeouts and their unwieldiness, I started to think a little bit about some of the other experimental ways that we have tried to solve some of these same problems. One of the things that was highlighted in the above mentioned post was that you end up with a [Tribble](http://en.wikipedia.org/wiki/Tribble)\-style growth of timeouts which you then have to maintain and cancel. While working on a project which depended on these little beasties, we toyed with the idea of taking advantage of [ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). With these data structures you can return data that is associated with an asynchronous computation, and resolve or reject it when that asynchronous procedure completes or fails. In ES6’s implementation they seem to have the useful property that once they are marked as resolved, calling the failure trigger will have no effect (that is to say, in the following code, only the success callback will be executed):

```javascript
(new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log("successfully resolving");
        resolve();
    }, 1000);
    setTimeout(function() {
        console.log("rejecting the promise");
        reject();
    }, 2000);
})).then(function () {
    console.log("Promise succeeded");
}, function () {
    console.log("Promise failed");
});
```

Which results in the following on the console:

```text
> "successfully resolving"
> "Promise succeeded"
> "rejecting the promise
```

Which means that we don’t have to cancel the timeout, because if it is attached to a promise object, and the timeout is triggered after the successful event has already occurred, it will be silently ignored.

In addition, promises can be chained, which means that if when the promise is marked as complete (either successfully or as a failure) another promise is passed in as the value of completion, then this new promise effectively replaces the original one and its result will be passed seamlessly to any code that is waiting on the original promise. The upshot of this is that if you want to repeat the original action with a new (and potentially different) timeout, you can do so by intercepting the failure of the original promise, trying again, and then returning this new promise. If the new promise succeeds (that is, the second attempt to perform the action succeeded within the time limit), this will filter its way up to the top and result in a successful resolution of the original promise.

```javascript
var toplevel = (new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log("successfully resolving");
        resolve();
    }, 5000);
    setTimeout(function() {
        console.log("first timeout, rejecting the promise");
        reject();
    }, 2000);
})).catch(function() {
    console.log("timed out ... retrying");
    /* at this point, we have timed out, try again and return a new promise which will take over the old one if it fails */
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
        setTimeout(reject, 4000);
    });
});
toplevel.then(function () {
    console.log("[SUCCESS] Toplevel Promise succeeded");
}, function () {
    console.log("[FAIL] Toplevel Promise failed");
});
```

If the success criteria is eventually reached after a retry, then the success code in the top-level promise will still get executed as a duplicate. That code is still ‘live’, but as long as all it does is resolve the promise, then this won’t have any effect (as that top-level promise has already rejected and replaced with the retry promise).

I think this possibly has some potential for simplifying the lifecycle of timeouts, but it’s a trade-off because the resulting code is arguably very difficult to decipher.
