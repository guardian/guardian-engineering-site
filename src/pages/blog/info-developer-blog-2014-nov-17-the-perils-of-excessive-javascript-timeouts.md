---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-nov-17-the-perils-of-excessive-javascript-timeouts'
headline: 'The perils of excessive JavaScript timeouts'
date: '2014-11-17'
authors: [Unknown]
standfirst: ''
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/13/1415887137356/99d82629-b7ba-4bef-a910-ac16b038b901-1020x931.jpeg'
  alt: 'Timeout'
  credit: 'Photograph: Wikipedia'
tags: [JavaScript]
---

We’ve recently added [presence indicators](https://www.theguardian.com/info/developer-blog/2014/oct/14/websockets-and-angularjs) to our CMS at the Guardian. To do this we used a WebSocket, which was built into [AngularJS](https://angularjs.org/). One of the main issues was understanding the WebSocket [spec](http://www.w3.org/TR/2009/WD-websockets-20091222/) in all its confused glory. The main problem we faced was understanding when exactly the [TCP](http://en.wikipedia.org/wiki/Transmission_Control_Protocol) connection had been dropped. [TCP keepalive](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) works well for networking applications but has some problems in bubbling up to the top layer of the [OSI Model](http://en.wikipedia.org/wiki/OSI_model).

In all our tests, the WebSocket thought it was still open for a certain period of time when the server had long since gone away. It quickly became clear that relying on TCP to handle the lower levels of the connection was not a viable option. To remedy this, the server began sending heartbeats to the client. The client waits for an interval and if it hasn’t heard the timeout for a certain amount of time, it will disconnect and try to reconnect. That’s one timeout. On the reconnect attempt, it issues another timeout - doing an incremental backoff - and tries to reconnect. After three attempts, it gives up and displays an error to the user. That’s two timeouts.

There’s then the issue of no response to an action. For example, the client tells the server it’s entered the document - it expects a response. The client tells the server its only watching the document - it expects a response. Without a response to either of these, the client has to assume it’s failed to inform other users of its presence and needs to break the connection and start again. Thus, all these actions need timeouts. That’s three to four timeouts. This is quickly building up. All these timeouts need to be cancelled and all of them need to have handlers so they can be cancelled. Failing to cancel one of the timeouts or losing track of one of the handlers will result in a series of timeouts endlessly being executed every few seconds or so, ruining the basic functionality of the web application.

This can be tough problem to solve, especially as timeouts are so useful. In fact, for the purposes of our presence indicators, they are indispensable as they keep track of the interactions between the client and server. Debugging them can be hard too. Shoving in a debugger statement is unlikely to help as a different timeout could still be executing while you’re looking at the current call stack. This is similar to debugging multiple threads in [gdb](http://www.delorie.com/gnu/docs/gdb/gdb_25.html) and is a notorious source of pain. Modern alternatives even provide [time-travel debuggers](http://debug.elm-lang.org/) to find these niggling errors.

Ultimately, the simplest solution for our application was to maintain the handlers and cancel the timeouts for as short as time as possible. The snippet of code below illustrates this.

```javascript
function cancelHandler (name) {
    $timeout.cancel(responseHandlers[name]);
    delete responseHandlers[name];
}

function sendMessage(msg, expectedResponse, retries) {
    connection.sendMessage(msg);
    responseHandlers[expectedResponse] = $timeout(retrySendMessage, 4000);

    function retrySendMessage() {
       // try to send the message again if it fails
       ...
    }
}
```

These two functions illustrate how messages are sent and received from the server. A message is sent and immediately the handler is started. If nothing is heard after four seconds, the message will be sent again. Once the message is received, the old handler will be immediately cancelled.

Taking the approach of cancelling handlers as soon as possible eliminates most of the issues we found. Of course, this is not a foolproof method and this article is mostly meant to illustrate the issues of JavaScript timeouts and how they might be solved. Here’s hoping that someone [extends](http://www.cs.ox.ac.uk/ralf.hinze/WG2.8/30/slides/michael.pdf) some [existing](https://cocoon.apache.org/2.0/howto/howto-flow-debugger.html) time-travel debuggers to help with these problems in the future.
