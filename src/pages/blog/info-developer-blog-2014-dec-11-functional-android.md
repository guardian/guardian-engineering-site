---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-dec-11-functional-android'
headline: 'Functional Android'
date: '2014-12-11'
authors: [Rupert Bates]
standfirst: 'Android’s support for functional programming is usually limited, but in this blogpost the Guardian shares techniques to bring the benefits of functional code to Java'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/12/4/1417694936751/522ab068-2d8f-42a4-a700-6a9e36327c54-928x1020.png'
  alt: 'Functional Android'
  credit: 'Photograph: Google/Rupert Bates'
tags: [Android, Computing, Programming, Software]
---

For anyone who is used to functional programming in a language such as Scala or F#, programming on [Android](https://www.theguardian.com/technology/android) can feel a bit like going back to the bad old days of programming.

This is especially noticeable when working with lists. Say I have a list of articles that a user has read, and from that I want to extract a list of the contributors who wrote those articles, find out how many times each contributor appears in that list, and then display a list of the contributors the user has read more than once.

This is the sort of task that feels natural and easy in a [functional language](http://en.wikipedia.org/wiki/Functional_programming), but can leave you scratching your head in an [imperative](http://en.wikipedia.org/wiki/Imperative_programming) one.

Another area where Java can feel underpowered is in the handling of missing values. Say I have a method which may or may not return a value – in Scala I could return an Option type, but this doesn’t exist in Java 6. So I need to either find an ‘empty’ return value, which is not always possible, or return null instead – and we all know where that leads...


   <figure>
   <img alt="NullPointerException!" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/11/21/1416582159726/9931bb79-b4d7-4368-8402-ed0ebf7f79c3-384x480.jpeg?width=620&quality=45&auto=format&fit=max&dpr=2&s=bf908b7119af436c091d54f914e5e2c8" loading="lazy" />
   <figcaption>
     NullPointerException!
    <i>Photograph: http://memegenerator.net/instance/35420551</i>
    </figcaption>
    </figure>

In order to get the benefits of a functional programming language on Android, it initially seems attractive to make use of Scala. While it is possible to do this, it’s not really very practical. For instance, the size of the Scala libraries mean your app will immediately exceed [Android’s 65k method limit](https://developer.android.com/tools/building/multidex.html#about) unless you use [Proguard](http://proguard.sourceforge.net/) to shrink it, and this results in unacceptably long build times during development.

Even with Proguard, it is still quite easy to get into a situation where you exceed the 65k limit. The size of the Scala libraries also greatly swells your apk size and can negatively impact app performance.

So recently I’ve been playing around with a much more lightweight way to bring the benefits of functional programming to Android: a combination of the [Functional Java](http://www.functionaljava.org/) library which provides support for list operations like map, filter and fold, and the [Gradle Retrolambda plugin](https://github.com/evant/gradle-retrolambda) which backports Java 8’s [lambda](http://en.wikipedia.org/wiki/Lambda#Lambda_as_a_programming_construct) syntax to Java 6 (and earlier) through some clever compiler magic.

Setup is basically as simple as adding a few lines into your build.gradle file and adding a dependency on the Functional Java library – full details are on the project’s Github pages.

Now let’s look again at our example scenarios mentioned above:

**Compiling a list of contributors a user has read more than once, along with counts for the number of articles by that contributor they have read.**

Here is how that might look in an imperative classic Java style:

```java
public List<ContributorCount> getContributorCounts() {
    List<ArticleView> articleViews = getArticleViews();

    //First iterate over the articles counting the occurrences of
    //each contributor
    HashMap<String, Integer> contributorCounts = new HashMap<String, Integer>();
    for (ArticleView articleView : articleViews) {
        Integer count = contributorCounts.get(articleView.contributor);
        if (count == null)
            contributorCounts.put(articleView.contributor, 1);
        else
            contributorCounts.put(articleView.contributor, count + 1);
    }

    //Now iterate over the results filtering out the contributors who
    //only appear once and converting the results to the required output type
    List<ContributorCount> result = new ArrayList<ContributorCount>();
    for (String contributor : contributorCounts.keySet()) {
        int count = contributorCounts.get(contributor);
        if (count > 1)
            result.add(new ContributorCount(contributor, contributorCounts.get(contributor)));
    }

    return result;
}
```

And here is the functional implementation, made possible by the Functional Java library and Java 8 lambda syntax:

```java
public List<ContributorCount> getContributorCounts(){
    List<ArticleView> articleViews = getArticleViews(); 
    
    return articleViews
            .map(a -> a.contributor)        //Get the contributor names from the article views
            .sort(Ord.stringOrd)            //Need to sort before grouping
            .group(Equal.stringEqual)       //Group by contributor name
            .filter(l -> l.length() > 1)    //remove any contributors who only appear once
            .map(l -> new ContributorCount(l.head(), l.length())); //Map to the return type
}
```

There are a few things worth commenting on here. Firstly, the imperative version uses mutable state to track the contributor counts – this is a common source of bugs and the fact that we avoid it in the functional version is a real improvement.

Secondly, the imperative version is quite a bit more complicated. We are using an intermediate data structure (the HashMap) and two separate loops complete with if statements. This makes it a lot harder to see at a glance what the intent of the code is.

Not only is it harder to read the imperative version but it was harder to write as well – there are quite a few different ways it could have been implemented and so there was a lot of upfront planning to think about the pros and cons of different approaches. With the functional style, once you learn to think about problems in terms of list transformations there is really only one way to implement it. The solution becomes so obvious you barely have to think about it at all.

Now let’s look at the second scenario mentioned above; a method which may or may not return a value.

**Let’s say we have a class Article which may or may not have a main image associated with it. The class declaration could look something like this:**

```java
public class Article {
    
    DisplayImage mainImage;
    
    //Rest of the class declaration
    
    public DisplayImage getMainImage(){
        //What happens if there is no main image on this article?
        return mainImage;
    }
}
```

Classic Java doesn’t really give us an elegant way to deal with missing values – if the article doesn’t have a main image this method will return null and we need to ensure that we check for this first when accessing it or we will encounter the dreaded NullPointerException.

Introducing the Option type from the Functional Java library gives us a much clearer type signature for our method:

```java
public class Article {
    
    private Option<DisplayImage> mainImage;

    //Rest of the class declaration
    
    public Option<DisplayImage> getMainImage() {
      //Now it is obvious what will happen if this article has
      //no main image the method will return none()
      return mainImage;
    }
}
```

It is made explicit in the type signature that this method may not return a value and by using the Option type we ensure that the caller of this method has to think about what to do when it does. There is far less chance of us forgetting to check for a missing value with this approach.

To make use of an Option type in calling code, we can essentially take one of two approaches. One is to treat it in very much the same way as we might a nullable variable: to check the value in an if statement and only continue if it has a value. A more idiomatic way to treat Option in functional programming would be to map over it, though, and this is also supported by the Functional Java library.

```java
//Imperative style of dealing with an Option type
if(article.getMainImage().isSome())
    setArticleImage(article.getMainImage().some());

//Functional approach using map
article.getMainImage().map(this::setArticleImage);
```

Another advantage of Options is that they compose well. When we have a chain of values which may be missing it quickly becomes unwieldy to manage with the classic Java null checking route, but with the Option type we can chain them in much the same way that we chained list transformations in the earlier example.

```java
//Checking for null through an object graph quickly becomes unwieldy
if (article.getContributor() != null &&
        article.getContributor().getImage() != null &&
        article.getContributor().getImage().getSize() != null) {

    Size size = article.getContributor().getImage().getSize();
    setContributorImageSize(size.getWidth(), size.getHeight());
}

//Chaining multiple optional values using bind and map
article.getContributor()
        .bind(Contributor::getImage)
        .map(DisplayImage::getSize)
        .map(size -> setContributorImageSize(size.getWidth(), size.getHeight()));
        
```

Finally, what Android developer hasn’t wanted to replace this code:

```java
findViewById(R.id.myView).setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        handleClick();
    }
});
```

...with this:

```java
findViewById(R.id.myView).setOnClickListener(v -> handleClick());
```

The aim of this article was to show how some of the benefits of functional programming can be brought to the Android platform. We have seen how, through the use of the Functional Java library and the Gradle RetroLambda plugin, we can perform sophisticated list transformations, replace nulls with the type safe Option class and generally slim our code through the use of lambda expressions.
