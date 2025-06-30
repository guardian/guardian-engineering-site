---
layout: ../../layouts/blog.astro
slug: 'info-2019-jan-29-code-readability-matters'
headline: 'Code readability matters'
date: '2019-01-29'
authors: [Santiago Villa Fernandez]
standfirst: 'Readable code is an important part of software development, Santiago, one of our developers discusses why and some of the things we do at the Guardian to achieve this goal.'
image:
  url: 'https://media.guim.co.uk/e0fd20c6a332f13fd2868f133a6ba7191897be92/0_335_7952_4774/7952.jpg'
  alt: 'Wood block letter press lettering '
  credit: 'Photograph: Alamy Stock Photo'
tags: []
---

When a programmer builds software, they do so based on requirements which are likely to change in the future. Requirements change because software interacts with the real world which is dynamic.

When these requirements change, the developer, who perhaps did not write the original version, must implement the new requirements. In order to do so, they read the original source code, understand the different abstractions, identifies what needs to change and then implements the changes. Readable source code facilitates the reading and understanding of the abstraction phases and as a result, facilitates the evolution of the codebase. Readable code saves future developers’ time and effort.

Code readability is key for large software projects with many developers, and where the source code that is being written will have to be modified by another person.

Code readability plays a central part at the Guardian digital department, where the scale of the projects is large and developers are encouraged to rotate teams. For example the [frontend project](https://github.com/guardian/frontend) has 164 contributors and over 86000 commits.

  
In order to develop readable source code, we should ask ourselves: “If I re-read this piece of code in fifteen days or one year, will I be able to understand the abstraction I’ve made here?” or even better, **“If a programmer who just joined the development team reads my software, will** **they be able to understand what I have written here?”**

There are many tools and practices that help increase the readability of a project. Here are some:

**Code review**

The code review process means that every piece of code is read by as many people of varying experience as possible. If these people can understand the abstractions the developer introduced, then the source code is more likely to be understandable to others. Also, it is advisable to have rotating code reviewers in order to make our code even more readable and at the same time spread the knowledge throughout the team.

The code review process could take different shapes depending on the development process defined in the team. For example, it could be two developers side by side discussing the different abstractions of the codebase or via an online tool using a version control system like git or SVN. At the Guardian the majority of our projects are hosted in Github, and we perform code review using Pull Requests. For example, see [the introduction of new font files on the Guardian website](https://github.com/guardian/frontend/pull/20466).

**Keep the code concise**

It is fundamental when we write source code to try to keep it as concise as possible, for example only write the source code that is absolutely necessary to cover all the cases defined by the requirements. The extra source code is additional source code that developers will have to read, maintain and that may generate bugs in the future. **The best source code to maintain is the one that does not exist.** If you are modifying a portion of existing source code and there is a part of the source code that is not used anymore, delete it and it will avoid future issues. In line with the [Extreme Programming](https://martinfowler.com/bliki/ExtremeProgramming.html) principle of [Yagni](https://martinfowler.com/bliki/Yagni.html), which stands for “You Aren’t Gonna Need It”.

**Consider using a linter**

For large projects, where many developers are involved, consider using a linter. Linters prevent regular bugs and enforce a common style guidethrough the project.

Linters don’t guarantee readable code per se. If a piece of readable code doesn’t comply with the style guide, a Linter will mark the line as failed. Nevertheless, sharing a code style across the entire project will make the code easier to read by new and current developers as it eliminates the need to adapt to a new code style per file.

Some linter utilities that we use at the Guardian are [ESLint](https://eslint.org/) for JavaScript and [ScalaStyle](http://www.scalastyle.org/) for Scala.

**Tests as documentation**

Readable tests are the best up-to-date documentation as long as they are set up to run every time the codebase is compiled. When a requirement changes, the developer will update the codebase, causing the old test to fail. Therefore, the developer will have to update it in order to ship the feature. Additionally, well-defined tests give the team the confidence that new features or big refactors will not break the existing expected behaviour. Some test frameworks that we use at the Guardian are [Jest](https://jestjs.io/) for JavaScript and [ScalaTest](http://www.scalatest.org/) for Scala.

**Meaningful variable and function names**

When giving naming, it is worth spending a couple of extra minutes (and bytes of memory) to come up with meaningful and specific names which will boost readability in our codebase. It is important to avoid abstract names that could lead to a poor and unmaintainable codebase. Finally, when re-writing a piece of source code to reflect requirements that have changed, it is important to update the variable name to reflect the latest logic.

This blog post is only an introduction of readable code, and they are other practices used to improve readability such as [comments](http://antirez.com/news/124) and [small functions with name based on intent](https://martinfowler.com/bliki/FunctionLength.html).

In summary, readable source code saves developers’ time and therefore reduces costs and creates a better work environment of collaboration with increased productivity. In order to produce readable code, it is advisable to perform code reviews, write tests and use them as documentation, choose meaningful variable and function names and consider using a linter to have a shared code style in large projects. Last but not least, keep the code concise and write only the necessary source code to fulfils the requirements.
