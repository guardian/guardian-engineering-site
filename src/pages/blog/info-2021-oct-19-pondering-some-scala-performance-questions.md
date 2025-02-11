---
layout: ../../layouts/blog.astro
slug: 'info-2021-oct-19-pondering-some-scala-performance-questions'
headline: 'Pondering some Scala performance questions'
date: '2021-10-19'
authors: [Paul Roberts]
standfirst: 'The Scala compiler is a fascinating tool which powers a large proportion of the Guardian’s infrastructure. But sometimes the work that it does can seem somewhat mysterious. Guardian Scala developer Paul Roberts explores in detail one aspect of this mystery and looks at how understanding it can help us write code more effectively'
image:
  url: 'https://media.guim.co.uk/d63a145b88fe56a67d0b0d0a5b4f33799c3687e8/0_150_4500_2700/4500.jpg'
  alt: 'Man repairing racing car'
  credit: 'Photograph: Paulo Maria/LiveMedia/REX/Shutterstock'
tags: [Scala]
---

Scala is the programming language which underpins many of the most important tools which allow the Guardian to deliver its journalism. And when compared to other languages, Scala has a lot of wonderful tools for making your code simpler. However, sometimes this is achieved by hiding a lot of the complexity. Usually this is a good thing – it’s the compiler writer’s problem and we have the luxury of just being able to ignore it and get on with what we are trying to do. But occasionally it can actually influence the way our code is running and as a result, present us with surprises.

To have something to work with, I began playing around with solutions to [Project Euler problem 39](https://projecteuler.net/problem=39) (spoilers for problems after 100 are discouraged but this one is OK).

> If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.
> 
> {20,48,52}, {24,45,51}, {30,40,50}
> 
> For which value of p ≤ 1000, is the number of solutions maximised?

We want to find the combinations of three numbers which are valid lengths for the sides of a right-angled triangle and which add up in turn to each number (perimeter) under 1,000. The final answer will be the perimeter which has the greatest number of these triplets.

There are almost certainly plenty of better ways to solve this problem than those discussed below – we are just using a naive brute-force approach – but the topic at hand is the relative performance of different Scala coding styles, and so it serves very well to illustrate this point.

We could start by writing a function that finds the valid triplets for a given perimeter p. An initial instinct might be to reach for a for() loop.

```scala
object ExampleScala {
  def calc(p: Int) = {
    var result = 0
    for {
      a <- 3 to p
      b <- 1 until ((p - a) / 2)
      c = p - (a + b)
    } if (b * b + c * c == a * a) result += 1
    result
  }
}
```

Running this in the Scala REPL (the interactive coding environment) does indeed give us the solution:

```text
scala> timed((3 to 1000).maxBy(ExampleScala.calc _))
took 1240123372ns (1240ms)
val res1: Int = 840
```

but we can see that it takes roughly 1.3 seconds (for the definition of timed(), which is very simple, you can see [this gist](https://gist.github.com/paulmr/2d2f3acf4e7033fe7e65e8114324b2c2)).

If you are at home in a language like Java or C, you might have assumed that this code was roughly equivalent to this Java snippet:

```java
public class ExampleJava {
  public static int calc(int p) {
    int result = 0;
    for (int a = 3; a <= p; a++) {
      for (int b = 1; b <= ((p - a) / 2); b++) {
        int c = p - (a + b);
        if (b * b + c * c == a * a) result++;
      }
    }
    return result;
  }
}
```

but the above runs more than ten times quicker:

```text
scala> timed((3 to 1000).maxBy(ExampleJava.calc _))
took 85822387ns (85ms)
val res1: Int = 840
```

This suggests that although both languages have the for keyword, they result in very different executions. Perhaps because of its focus on immutable variables, Scala doesn’t have a direct equivalent to this Java for loop, but it does of course have while so we can easily write something in Scala that is roughly equivalent to the Java snippet:

```scala
object ExampleScala {
  def calcWithWhile(p: Int) = {
    var (result, a) = (0, 3)
    while (a <= p) {
      var b = 1
      while (b < ((p - a) / 2)) {
        val c = p - (a + b)
        if (b * b + c * c == a * a)
          result += 1
          b += 1
      }
      a += 1
    }
    result
  }
}
```

To our poor sensitive Scala eyes, accustomed only to gazing on sublime functional concision, this may be unpleasant to look at. But how does it perform:

```text
scala> timed((3 to 1000).maxBy(ExampleScala.calcWithWhile _))
took 66075510ns (66ms)
val res0: Int = 840
```

Even better than the Java version (incidentally in all these cases I am running from a cold JVM instance).

What is the difference between these two implementations? We can discover by using the -Xprint:parser option to show us what our Scala code looks like after some of the desugaring, in this case the removal of the for comprehensions (the wording alone here is telling – Java has for-loops, but Scala has for-comprehensions – clearly they aren’t the same thing …).

```scala
def calc(p: Int) = {
  var result = 0;
  3.to(p).foreach(((a) => 1.until(p.$minus(a).$div(2)).map(((b) => {
    val c = p.$minus(a.$plus(b));
    scala.Tuple2(b, c)
  })).foreach(((x$1) => x$1: @scala.unchecked match {
    case scala.Tuple2((b @ _), (c @ _)) => if (b.$times(b).$plus(c.$times(c)).$eq$eq(a.$times(a)))
      result.$plus$eq(1)
    else
      ()
  }))));
  result
};
```

Our code has been converted into the creation of a number of different anonymous functions, which are then called in a loop using foreach(). Even more alarming is the use of a map() call. foreach() does not keep the results and reconstruct them into another data structure like map() does, and so it is naturally much faster. This map() example is actually pairing each value of b with its corresponding c into a tuple, and building this back into the original sequence before applying another function which applies to each pairing and does the calculation.

This storing of the data into a newly summoned sequence before processing it is memory-hungry and entirely redundant. I was surprised to see this, as I had assumed that assignments within the for-comprehension were equivalent to assignments within the code block, but clearly this was not correct.

This is borne out when we look at the stack traces produced by running this code with a profiler:

```text
          ns  percent  samples  top
  ----------  -------  -------  ---
 30940000000   55.07%     3094  scala.collection.immutable.VectorBuilder.result
  5000000000    8.90%      500  ExampleScala$.$anonfun$calc$2
  3420000000    6.09%      342  scala.collection.immutable.VectorStatics$.foreachRec
  2290000000    4.08%      229  scala.collection.immutable.VectorBuilder.advance1
```

It is spending 55% of its time building up Vectors that we don’t even need.

Therefore we can immediately make a quick performance gain by making a small and seemingly innocuous change to this code:

```scala
object ExampleScala {
  def calcNoAssign(p: Int) = {
    var result = 0
    for {
      a <- 3 to p
      b <- 1 until ((p - a) / 2)
    } {
      val c = p - (a + b)
      if (b * b + c * c == a * a) result += 1
    }
    result
  }
}
```

Note that the assignment is now moved down to the code block. How does this perform:

```text
scala> timed((3 to 1000).maxBy(ExampleScala.calcNoAssign _))
took 302834504ns (302ms)
val res0: Int = 840
```

302ms! Again a huge improvement. It is still a lot slower than the while loop version though. Why is that? I would speculate that this is due to the remaining lambda function creation and execution. Function calls are very expensive operations in terms of performance, due mainly to the fact that we need to store our running state somewhere before entering the next function so that we can return to that state again afterwards. Of course, this is what makes function calls powerful, so when you need this it’s the only way to go. But if you are solving a problem like this one, then that state is potentially redundant as each iteration can be calculated entirely without the state from the previous one. This also shows why tail recursion optimisation is so fast. Although it allows you to write code which conceptually looks exactly the same as a recursive function call, it actually throws away this execution state at each recursion point, because in the case where tail recursion optimisation is valid, that previous state is not required.

As a side-note, while looking into this issue, I came across the impressive [cfor()](https://typelevel.org/spire/api/spire/syntax/package$$cfor$.html#cfor%5BA%5D\(init:A\)\(test:A=%3EBoolean,next:A=%3EA\)\(body:A=%3EUnit\):Unit) macro from the TypeLevel [Spire](https://typelevel.org/spire/) library.

```scala
object ExampleScala {
  import spire.syntax.cfor._
  def calcWithCfor(p: Int) = {
    var result = 0
    cforRange(3 to p) { a =>
      cforRange(1 until ((p-a)/2)) { b =>
        val c = p-(a+b)
        if(b*b + c*c == a*a) result += 1
      }
    }
    result
  }
}
```

```text
scala> timed((3 to 1000).maxBy(ExampleScala.calcWithCfor _))
took 57206928ns (57ms)
val res0: Int = 840
```

Amazingly, this is the fastest result yet, even faster than the while loop solution.

One reassuring conclusion that we can make from all of this is that Scala is actually really performant when it needs to be. We just need to be careful about where and when we make use of its rich abstractions. Self-contained programming problems such as those you find on Project Euler and other sites can be a really useful way to experiment with Scala’s many different ways of solving a problem, so why not start exploring! And of course it’s never really about getting the right answer in the end, but much more about the route(s) you take to get there.
