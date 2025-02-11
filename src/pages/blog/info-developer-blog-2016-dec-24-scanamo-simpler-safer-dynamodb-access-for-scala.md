---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-24-scanamo-simpler-safer-dynamodb-access-for-scala'
headline: 'Scanamo: simpler, safer DynamoDB access for Scala'
date: '2016-12-24'
authors: [Phil Wills]
standfirst: 'DynamoDB provides a completely managed key-value store with some querying capabilities, but AWS’s Java client from Scala can be cumbersome and error-prone. The Guardian’s open-source library, Scanamo, provides a simpler alternative that reduces the scope for runtime errors.'
image:
  url: 'https://media.guim.co.uk/830551a37110f1ba3fb0c568743202238ecfd57c/0_0_2048_1229/2048.jpg'
  alt: 'A supermassive black hole in the core of galaxy named MCG 6-30-15. Scientists for the first time have seen energy being extracted from a black hole. Like an electric dynamo, this black hole spins and pumps energy out through cable-like magnetic field lines into the chaotic gas whipping around it, making the gas - already infernally hot from the sheer force of crushing gravity - even hotter.'
  credit: 'Photograph: -/EPA'
tags: [AWS, Advent developer blog 2016, DynamoDB, Scala]
---

As we’ve [talked about before](https://aws.amazon.com/solutions/case-studies/guardian/), we use Amazon Web Services (AWS) heavily at the Guardian. In order to make our applications as simple as possible to manage and deploy, we try to keep them stateless, but there’s normally some state which needs to go somewhere. One convenient option is [DynamoDB](https://aws.amazon.com/dynamodb/). It’s a completely managed service, which avoids the complexities of running a distributed data store and is cheap for small workloads. For these reasons we’ve used it a lot over the past few years, but using it has often been quite painful. The APIs are cumbersome and make it very easy to make mistakes which are only found when attempting to actually use the service.

Last year, I gave [a talk at Scala Exchange](https://skillsmatter.com/skillscasts/6832-what-are-typeclasses-and-why-you-should-care) about the [type class pattern](https://www.theguardian.com/info/developer-blog/2016/dec/22/parental-advisory-implicit-content) in Scala, using writing to and reading from DynamoDB as an example. This seemed a compelling enough use case to develop from examples into a open-source library, [Scanamo](https://guardian.github.io/scanamo/). It wraps around the Java client provided by AWS removing much of the boilerplate and noise from the interface and preventing the construction of many categories of invalid requests.

The difference can be highlighted with an example. The following is a fairly simple example of a query using the AWS Java client from Scala:

```scala
val querySpec = new QuerySpec()
  .withKeyConditionExpression(
    “year = :yyyy and begins_with(title, :letter)“)
  .withValueMap(Map[String, AnyRef](
    “:yyyy” -> Int.box(1992), “:letter” -> “L”).asJava) 
for (item <- movieTable.query(querySpec).asScala.toList) yield
  Movie(
    item.getNumber(“year”).intValue(), item.getString(“title”),
    item.getList[String](“actors”)
  )
```

compared to the equivalent with Scanamo:

```scala
Scanamo.exec(client)(
  movieTable.query(‘year -> 1992 and (‘title beginsWith “L”))
)
```

The difference is even more stark if you’re writing and reading more complex structures to and from Dynamo.

Another important difference is that whilst the Scanamo example will work, the one based on the Java client will actually fail when you try to run it because ‘year’ is one of the [many words](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html) which are reserved in DynamoDB’s query expression language. In order to actually get it working, you need something like

```scala
val querySpec = new QuerySpec()
  .withKeyConditionExpression(
    “#yr = :yyyy and begins_with(title, :letter)“)
  .withNameMap(Map(“#yr” -> “year”).asJava)
  .withValueMap(Map[String, AnyRef](
    “:yyyy” -> Int.box(1992), “:letter” -> “L”).asJava) 
for (item <- table.query(querySpec).asScala.toList) yield 
  Movie(
    item.getNumber(“year”).intValue(), item.getString(“title”),
    item.getList[String](“actors”)
  )
```

The Dynamo API has many such incidental complexities which can trip you up and Scanamo attempts to hide these from the user, or at least make them fail at compile time instead of runtime.

Scanamo doesn’t support everything that’s possible via the Java client, though it’s getting increasingly close. It’s also more likely to change significantly over time, but it’s already useful enough to be used by many teams at the Guardian and some outside.

There have already been a number of great contributions from the community outside the Guardian and we’d welcome more, so if you’re interested, please open an issue or pull request on [Github](https://github.com/guardian/scanamo), or join the [Gitter channel](https://gitter.im/guardian/scanamo).
