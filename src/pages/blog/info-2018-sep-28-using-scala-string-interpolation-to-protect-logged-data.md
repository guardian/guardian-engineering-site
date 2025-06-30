---
layout: ../../layouts/blog.astro
slug: 'info-2018-sep-28-using-scala-string-interpolation-to-protect-logged-data'
headline: 'Using Scala string interpolation to protect logged data'
date: '2018-09-28'
authors: [John Duffell, Jacob Winch]
standfirst: 'If you want to debug your code, you need comprehensive logging. But when you want to reuse the logs for alerting, how do you protect data from access by the alerting system? '
image:
  url: 'https://media.guim.co.uk/69547e1fd28ced43efe282b954541c2d57eacd37/0_109_3126_1875/3126.jpg'
  alt: 'A destroyed hard disk previously containing sensitive data'
  credit: 'Photograph: Nicole Lacourse/The Guardian'
tags: [Scala]
---

Taking care of data
-------------------

It’s amazing how much personal data travels inside a running web app. This could include names, email addresses and even home addresses or anything entered into a website. These apps, which are designed, written and maintained by humans, fail for many reasons. Since we know that our applications will sometimes fail, we need ways to debug them.

Application logs are important for analysing specific reported or known problems. Clearly, an application log without any personal data would not provide much useful analysis as it would be very generic. Fortunately, our application logs are fully encrypted, access is controlled, and we have fine-grained control over where data is stored and how long we keep it for. This means we can temporarily store personal data for legitimate use.

Also essential to improve quality is a monitoring system that groups related errors together and sends alerts if necessary. However, third-party error aggregation tools often offer less control and, more generally, we do not want to store personal data in additional systems unless absolutely necessary. Under [GDPR](https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/), we will have a duty to consider the need to store personal data even more carefully.

Our existing setup
------------------

At the moment we capture the same exceptions and error messages for application logs and monitoring. This presents a problem because exceptions usually originate from unexpected circumstances, so it is easy to save personal data when an exception is caught. Similarly, a seemingly innocuous log statement - for example, logging an HTTP response body when a parsing failure occurs, can often contain personal or sensitive data.

Although we don’t want adding logging and alerting to be onerous, we want to be certain that we are not sending personal data to third-party systems. Since most of our server side code is written in Scala, we can use the type system to help us to avoid making this mistake.

A technical solution in Scala
-----------------------------

In our code we usually insert data into a string and pass directly to the error logger. This results in a string which is written to the application logs as well as a monitoring system (in our case this is Sentry). To avoid leaking personal data, the code must remember which parts of a string relate to the program, and which relate to the data being processed at the time of an error. Once we have this information, we can be more selective about where to send each error.

We can illustrate this with a simple code example:

First, we introduce some data that we want to hide

```
val danger = "YIKES!"
val secret = "hui840"
```

In Scala, a string can be interpolated with ‘s’.

```
val autoInterpolated = s"problem occurred $danger, id: $secret"

=> autoInterpolated: String = problem occurred YIKES!, id: hui840
```

Despite appearances this syntax is not actually a string. In fact, under the covers Scala converts the string to a StringContext and calls its method ‘s’

```
val manualInterpolated =
  StringContext(
    "problem occurred ", ", id: ", ""
  ).s(
    danger, secret
  )
```

See [https://docs.scala-lang.org/overviews/core/string-interpolation.html](https://docs.scala-lang.org/overviews/core/string-interpolation.html) for more information on string interpolation.

The fact that interpolation is just calling a method on StringContext is an important aspect of interpolation, and we took advantage of this. We can implement an implicit class taking a StringContext and implement our own method that returns a case class instead of a string.

```
case class Scrubbed(danger: String, safe: String) {
  override val toString = safe
}

implicit class Scrubber(val sc: StringContext) extends AnyVal {

  def scrub(args: Any*): Scrubbed = {
    Scrubbed(
      sc.s(args: _*),
      sc.s(args.map(_ => "*****"): _*)
    )
  }

}
```

Now we can generate a log message using the ‘scrub’ prefix, instead of standard string interpolation.

```
val scrubbed = scrub"problem occurred $danger, id: $secret"

=> scrubbed: Scrubbed = problem occurred *****, id: *****
```

We can then use this souped-up object to decide what is safe to send to which system.

```
val safeLogLine = scrubbed.safe
val secretLogLine = scrubbed.danger

safeLogLine: String = problem occurred *****, id: *****
secretLogLine: String = problem occurred YIKES!, id: hui840

```

To extend this idea, we can define a custom logger which only accepts our Scrubbed case class, and routes the anonymised and private messages to the right system. This prevents anyone working on the project from passing in ‘unsafe’ strings at compile time, and helps us to avoid inadvertently sending personal data to a third-party system.

Here is an example of where we are using it in production on one of our [public projects](https://github.com/guardian/support-frontend/blob/5197baa756d75bcf024b3c647a57adcddb494e17/app/monitoring/Logging.scala#L19).

Final thoughts
--------------

Of course like any system, it is not perfect, merely good enough for now. A lot of data inserted into strings is not actually private in any way, for example whether an environment is PROD or DEV. Exceptions are currently treated as unsafe, however the stack trace at least should be safe. In future we could have a way of helping the compiler prove whether or not interpolated strings are safe, perhaps by using typeclasses or other implicits.

Until then, we will get benefits from the current implementation until it becomes a limitation. Let us know what you think in the comments or on twitter.
