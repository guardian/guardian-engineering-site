---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-oct-14-websockets-and-angularjs'
headline: 'Websockets and AngularJS'
date: '2014-10-14'
authors: [Unknown]
standfirst: 'Making Angular and WebSockets play nice'
tags: [Computing, Programming]
---

As part of our internal CMS, we’ve been adding presence indicators to documents to stop people from treading on other people’s toes. A presence indicator is basically just a little circle with someone’s initials in it. They’re simple and visually obvious so people know when they might be about to overwrite someone else’s changes. A white circle is the current user; a purple circle is any other user. You can hover over a person’s circle to see their full name - a lot of people have the same initials at the Guardian!


   <figure>
   <img alt="Presence indicators" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/10/8/1412759991187/e50076f4-1a16-419f-8746-81500a7b9e07-1020x100.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=ae8fbd885ccf115f10b6c0b4ca93db29" loading="lazy" />
   <figcaption>
     Presence indicators in use in the Guardian’s internal CMS.
    <i>Photograph: The Guardian</i>
    </figcaption>
    </figure>

When a user arrives in the document, a request is sent to the server to inform other users of the new arrival. Every other person in the document is then sent an event, informing them of the change, and their UI is updated accordingly (think Google Docs but different). This whole process doesn’t really fit within the Angular $digest cycle and REST backend style of development.

AngularJS works particularly nicely with a REST API. While it’s meant to be mostly indifferent, it works particularly well when backed by such an API. A quick glance at the [docs](https://docs.angularjs.org/tutorial/step_11) and you can see it’s meant to be. This is great. But, doesn’t quite offer the right level of realtime control for our presence indicators.

The easiest way to implement this was to use a WebSocket. We tried using Server Sent events but this required the server to poll the client every few seconds to see if anything had changed. A fully duplex WebSocket means the client can update the server and vice verse in real time.

As it stands, there is no Angular-sanctioned plugin for easy WebSocket integration. There are plenty of other plugins around but Angular makes it so easy to do this sort of thing, we decided to roll our own. To do this, I first separated out the connection logic from the actual processing logic. No one wants to have to think about the status of a connection while managing endless callbacks. Instead the connection service exposed a single function to register callbacks (shown below).

```javascript
function setupMessaging(fn) {
    connection.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    fn(msg);
  };
}
```

Using this directly in controllers would have inevitably led to headaches. Which controller registered which callback? Why do the controllers need to interact with what is essentially the raw transport layer? And on and on ... So another service holds the enviable role of interacting with the connection.

This service (let’s call it _indicator-service_), exposes a simple function register which controllers can use to register on a socket event. This is shown here:

```javascript
function register(action, fn) {
    registeredListeners.push(action);
    $rootScope.$on(action, function (event, data) {
        $rootScope.$apply(function () {
            fn(data);
        });
    });
}
```

This code binds a function to an event emitted by the $rootScope. The catch is that only the indicator-service emits these events. So, in a [paradoxical language-game](http://postmoderntherapies.com/word.html), it only inhabits its own universe. This solipsism keeps our scope listeners clean and contained. The other alternative to this is to bind the listeners in the controllers and then broadcast the event down to the child controllers - which would have been messy.

Savvy readers will have noticed that the above could end up with multiple listeners being bound to a single event. This would result in the handler for a connection opening, for example, being executed twice. Thus, the final function for easy WebSocket handling is shown below:

```javascript
function closeConnection() {
   destroyListeners();
   connection.endConnection();
}

function destroyListeners() {
    registeredListeners.forEach(function (value) {
        $rootScope.$$listeners[value] = [];
    });
    registeredListeners = [];
}
```

This performs a final cleanup of our event handlers before closing the WebSocket. It is called when the connection is closed manually or when an error is thrown.

I hope I’ve demonstrated one way to handle WebSockets cleanly in Angular. There are, of course, [many](https://github.com/gdi2290/angular-websocket) [other](http://blog.pusher.com/making-angular-js-realtime-with-pusher/) [ways](http://clintberry.com/2013/angular-js-websocket-service/) to do it.
