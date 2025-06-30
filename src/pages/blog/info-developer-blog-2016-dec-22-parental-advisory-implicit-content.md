---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-dec-22-parental-advisory-implicit-content'
headline: 'Implicits and type classes in Scala'
date: '2016-12-22'
authors: [Joseph Smith]
standfirst: 'What are implicits? What are type classes? And why do they go so well together? Here are the answers I wish I’d had before diving into the Guardian’s codebase'
image:
  url: 'https://media.guim.co.uk/28bc0753c4d54687dcea4ed7fffd7567c45e7ffb/0_121_5100_3060/5100.jpg'
  alt: 'Should implicits carry a warning? Actually, they already do'
  credit: 'Photograph: age fotostock / Alamy/Alamy'
tags: [Advent developer blog 2016, Functional programming, Scala]
---

Scala is the Guardian’s principal backend language (and has even been used in production on [the frontend](https://github.com/guardian/explain-maker/tree/master/explainer-client/src/main/scala)). As someone new to Scala, I found the use of implicits one of the trickiest things to understand when diving into the Guardian’s codebase for the first time. While implicits are conceptually not too difficult in and of themselves, their interaction with Scala’s sophisticated type system has implications which can be hard to grasp for a novice. In particular, the type class pattern which is pervasive in the Scala core libraries as well as in code written here at the Guardian was quite baffling to me at first.

In this post I’ll attempt to explain, in the most explicit way possible, implicits and their use in the type class pattern. I’ll explain how they work, how they’re commonly used, some of their potential pitfalls, and how these pitfalls are mitigated by the type class pattern.

What are implicits?
-------------------

When we talk about implicits in Scala, we’re talking about two closely related language features: **implicit parameters** and **implicit conversions**. Both of these involve the compiler implicitly (i.e. invisibly) resolving certain type errors using extra information supplied in scope but not at the site of the type error. For implicit parameters, this is the error that occurs when a method call does not supply all the required parameters. For implicit conversions, it’s the error that occurs when a supplied type does not match the expected type. Let’s consider implicit parameters first.

Something missing: implicit parameters
--------------------------------------

Implicit parameters are method parameters which do not have to be explicitly passed to the method when it is called. If they’re missing, the compiler will look in the surrounding scope for something that fits the bill. Consider the following code (typed line-by-line into the Scala REPL):

```scala
def multiply(x: Int)(implicit y: Int) = x * y

multiply(3)(10) // 30
multiply(4)(10) // 40

multiply(3)
// error: could not find implicit value for parameter factor: Int

implicit val z: Int = 10

multiply(3) // 30
multiply(4) // 40

implicit val z2: Int = 11

multiply(3)
// error: ambiguous implicit values:
// both value y of type => Int
// and value z of type => Int
// match expected type Int
```

The second parameter list (consisting of one parameter) is declared implicit. This means we can explicitly pass that argument if we wish. But if we omit it, the Scala compiler will look for the missing parameter in the current scope, hunting for a value declared with the keyword “implicit” and with the expected type (Int).

There are two key things to note here. The first is that once a parameter is marked as implicit, a matching implicit value only needs to be brought into scope once, rather than at passed in at every call site. One can immediately see the potential for reducing boilerplate but also for obfuscating the actual behaviour of a function.

The other thing to note is that the compiler matches up an implicit parameter with its implicit value via the _type_**,** and it will only supply an implicit value if it finds exactly one in scope that matches. This is why the final line gives a compiler error: by this point we’ve declared two implicit values of type Int, both of which could be used to fill in the missing parameter.

Something mismatched: implicit conversions
------------------------------------------

Besides supplying missing parameters, the other thing the Scala compiler can do implicitly is transform one type into another. It will look for opportunities to do this whenever there is a type mismatch, i.e. when the compiler expects an expression to be of one type but it is actually of a different type. Here’s another contrived example, again in the Scala REPL:

```scala
def alert(msg: String): Unit = println(msg)

alert(7)
// error: type mismatch;
// found   : Int(7)
// required: String

implicit def intToString(i: Int): String = i.toString

alert(7)
// 7
```

Since alert expects a String, passing an Int would normally give a compiler error. But if we have in scope an implicit def which takes in an Int and spits out a String, then the compiler will pass the value with the mismatched type through this function. So what’s actually happening on the last line there is:

```scala
alert(intToString(7))
```

The compiler will also look for opportunities to implicitly convert types when code tries to access an object member which is not defined for that type. Consider the following:

```scala
3.chat
// error: value chat is not a member of Int

class LoquaciousInt(x: Int) {
  def chat: Unit = for(i <- 1 to x) println("Hi!")
}

implicit def intToLoquaciousInt(x: Int) = new LoquaciousInt(x)

3.chat
// Hi!
// Hi!
// Hi!
```

The example above, where we are converting to a new type which we have defined ourselves, is the most common use case for the more general process of implicit conversion. It is common enough that it has its own shorthand: an **implicit class**. If you have a class whose constructor takes a single argument, as above, then it can be marked as implicit and the compiler will automatically allow implicit conversions from the type of its constructor argument to the type of the class. So the above definition of a class and implicit def can be rewritten as follows:

```scala
implicit class LoquaciousInt(x: Int) {
  def chat: Unit = for(i <- 1 to x) println("Hi!")
}

3.chat
// Hi!
// Hi!
// Hi!
```

This process is often referred to as **type enrichment** and can be used whenever we want to add extra functionality to classes which may be defined in libraries whose source code we cannot modify.

We have on the one hand the ability of implicit parameters to magically supply missing arguments of a matching type. We have on the other hand the ability of implicit conversions to magically turn an object from one type into another in order to supply missing functionality. The combination of these things proves particularly useful in Scala when defining and using type classes.

What is a type class?
---------------------

Type classes define classes of types in the same way types define classes of objects. In Scala, a type class means a trait with at least one type variable. For instance:

```scala
trait CanChat[A] {
  def chat(x: A): String
}
```

This defines not just one type, but a set of types. Some particular types which are members of this set would be CanChat\[String\], CanChat\[Int\], CanChat\[SomeUserDefinedType\], in the same way that “this”, “that”, “the other” are members of the set defined by class String. Allowing traits to be parameterised in this way gives you new options for adding functionality to classes without modifying existing code, as we will see below.

Life without type classes
-------------------------

Imagine you want to give some extra common functionality to Person and Dog. But also imagine they’re from a library whose source we don’t have access to - we can’t modify them. Any extra functionality will have to come from passing an instance of the object into a method, a.k.a. the Adaptor pattern.

```scala
final case class Person(firstName: String, lastName: String)

object PersonCanChat {
  def chat(x: Person) = s"Hi, I'm ${x.firstName}"
}

PersonCanChat.chat(Person("John", "Smith"))

final case class Dog(name: String)

object DogCanChat {
  def chat(x: Dog) = s"Woof, my name is ${x.name}"
}

DogCanChat.chat(Dog("Meg"))
```

This allows us to make both Dog and Person chat. But nowhere is it captured that we are bestowing _common functionality_ on different types in the way that this would be encoded in the type system if we could make Dog and Person extend a common trait. We cannot define a method that accepts things that can chat but not those that don’t, which makes this code very difficult to use.

Life with type classes
----------------------

Consider the type class we defined earlier:

```scala
trait CanChat[A] {
  def chat(x: A): String
}
```

Since this defines a set of types rather than any one type, we can extend the particular types from this set which correspond to the Person and Dog types whose functionality we are trying to extend - namely, CanChat\[Person\] and CanChat\[Dog\]. The objects which extend these concrete types and actually implement the interface defined by the type class are known as **type class instances**.

```scala
final case class Person(firstName: String, lastName: String)

object PersonCanChat extends CanChat[Person] {
  def chat(x: Person) = s"Hi, I'm ${x.firstName}"
}

final case class Dog(name: String)

object DogCanChat extends CanChat[Dog] {
  def chat(x: Dog) = s"Woof, my name is ${x.name}"
}
```

Now the fact that the chat functionality is common to a range of types is encoded in the type system, and now we _can_ define a method which accepts anything that can chat:

```scala
object ChatUtil {
  def chat[A](x: A, chattyThing: CanChat[A]) = {
    chattyThing.chat(x)
  }
}

ChatUtil.chat(Dog("Meg"), DogCanChat)
ChatUtil.chat(Person("John", "Smith"), PersonCanChat)
```

We can even define multiple implementations for a particular type. So in addition to PersonCanChat we could have PersonCanChatFormally and call this with the same ChatUtil.chat() method:

```scala
object PersonCanChatFormally extends CanChat[Person] {
  def chat(x: Person) = s"Hello, I'm ${x.firstName} ${x.lastName}"
}

ChatUtil.chat(Person("John", "Smith"), PersonCanChatFormally)
```

... plus implicit parameters
----------------------------

Notice in the above code that we have to pass in a type class instance which contains the actual implementation. This is cumbersome, and seems in some sense repetitious of the information we already have: we know we’re operating on a Dog and we know we’re trying to make that dog chat, so why do we have to pass in DogCanChat? Granted, we may need to pick between PersonCanChat and PersonCanChatFormally when making a person chat. But wouldn’t it be nice if we could do that once per scope rather than at every call site?

This is exactly what implicit parameters were designed for - condensing repetitious information about function arguments. So let’s make that parameter implicit:

```scala
object ChatUtil {
  def chat[A](x: A)(implicit chattyThing: CanChat[A]) = {
    chattyThing.chat(x)
  }
}
```

If we then omit this argument, the compiler will look for a value in scope which is marked implicit and which matches the type expected by the method_._ Because of the type parameter, the matching type will be _whatever the type of its first argument happens to be_. So if we mark our implementations as implicit and bring them into scope, it will pick the right one automatically (assuming there is only one per type - otherwise we would have to be more specific with our import):

```scala
object ChattyAddons {
  implicit object PersonCanChat extends CanChat[Person] {
    def chat(x: Person) = s"Hi, I'm ${x.firstName}"
  }
  implicit object DogCanChat extends CanChat[Dog] {
    def chat(x: Dog) = s"Woof, my name is ${x.name}"
  }
}

// ...in another package
import ChattyAddons._

ChatUtil.chat(Person("John", "Smith"))
ChatUtil.chat(Dog("Meg"))
```

... plus implicit conversions (in the form of implicit classes)
---------------------------------------------------------------

ChatUtil defines a type which can chat. Person and Dog define types which we’d like to be able to chat. By using an implicit class similar to LoquaciousInt above, we can automatically convert instances of Person and Dog into instances of ChatUtil by trying to call the .chat method on instances of Person and Dog. Unlike LoquaciousInt, which converted from a specific type (Int), this class will use a type parameter and so be able to convert from a range of types. Which ones? Those which correspond to the type class instances that are in scope.

If we bundled up our implementations and our implicit ChatUtil class together in a ChattyAddons object, we would be able to use it like so:

```scala
object ChattyAddons {
  implicit object PersonCanChat extends CanChat[Person] {
    def chat(x: Person) = s"Hi, I'm ${x.firstName}"
  }
  implicit object DogCanChat extends CanChat[Dog] {
    def chat(x: Dog) = s"Woof, my name is ${x.name}"
  }
  implicit class ChatUtil[A](x: A) {
    def chat(implicit makesChatty: CanChat[A]) = {
      makesChatty.chat(x)
    }
  }
}

// in another package...

import ChattyAddons._

Person("John", "Smith").chat
Dog("Meg").chat

"Hello".chat // this will not work
```

We’ve imported the implicit class which converts to a type with .chat and the implicit objects which provide the implementations for particular types. For a Person or Dog object, the Scala compiler knows that .chat is not defined directly on the class, but it is able to make the types line up for implicit resolution such that it can replace that object with a new ChatUtil object which does have .chat defined.

“Hello”.chat will obviously not work. However, we could add .chat functionality to String too just by adding another implicit object into ChattyAddons which extends the CanChat\[String\] type class instance:

```scala
implicit object StringCanChat extends CanChat[String] {
  def chat(x: String) = s"""I'm a string containing "${x}""""
}
```

Parental advisory
-----------------

Implicits are very powerful and have the potential to do as much harm as good. The most obvious pitfalls occur when the type used to match up an implicit is too general. Consider this implicit conversion:

```scala
implicit def stringToInt(s: String) = s.toInt
```

If this implicit is in scope, accidentally passing a String where an Int is required could result in an unexpected runtime error rather than the expected compile error:

```scala
def addOne(i: Int) = i + 1
addOne(“hello”)
// java.lang.NumberFormatException: For input string: "hello"
//  at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
//  at java.lang.Integer.parseInt(Integer.java:580)
//  at java.lang.Integer.parseInt(Integer.java:615)
//  at scala.collection.immutable.StringLike$class.toInt(StringLike.scala:272)
//  at scala.collection.immutable.StringOps.toInt(StringOps.scala:30)
//  at .stringToInt(<console>:10)
//  ... 33 elided
```

For this reason the compiler actually gives you a warning if you write an implicit def without importing scala.language.implicitConversions.

Similarly, using an implicit parameter with a built-in type like Int as we did in our earlier example is not a good idea in practice - the chance of accidentally importing an implicit value of type Int is too great. In the best case this would give you a compiler error like the one above. In the worst case, if for instance you forgot to import your desired implicit value but accidentally imported another matching one, your code would compile but not behave as expected.

On the other hand, the way implicits are used with type classes exploits their usefulness while avoiding the pitfalls. In this context, implicit conversions are used in their safest form, namely type enrichment with an implicit class. Similarly, the implicit parameter used in the type class pattern accepts the type class which we have defined rather than an arbitrary existing type. This means the compiler rules for finding a matching implicit value work to our advantage: they allow us to automatically find an implementation matching the type we are extending, but also to choose between multiple implementations for the same type by importing different implicits into scope.

Conclusion
----------

Unconstrained use of implicits has the potential to make code confusing. But type enrichment with implicit classes is a common pattern which IDEs generally help to clarify (e.g. by underlining methods which are the result of type enrichment). And type enrichment combined with implicit parameters makes type classes incredibly useful for extending existing types with new functionality while also allowing the caller to choose between multiple implementations. This pattern is a common one at the Guardian, not to mention in the Scala core libraries, and its effectiveness provides ample justification for the inclusion of implicits in the Scala language. There may be a cost to learning these concepts, but it is more than outweighed by their eventual usefulness.
