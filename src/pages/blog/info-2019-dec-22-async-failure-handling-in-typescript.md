---
layout: ../../layouts/blog.astro
slug: 'info-2019-dec-22-async-failure-handling-in-typescript'
headline: 'Async Failure handling in Typescript'
date: '2019-12-22'
authors: [Alex Ware]
standfirst: 'We look at a pattern which makes dealing with failures in async functions easier to reason about'
image:
  url: 'https://media.guim.co.uk/a2ae8cfe64bde752295471eef91494dfcbd1bec7/0_900_6500_3900/6500.jpg'
  alt: 'Programming code abstract technology background of software developer and Computer script'
  credit: 'Photograph: monsitj/Getty Images/iStockphoto'
tags: [TypeScript]
---

At the Guardian, we’ve been using Typescript to bring some of the type safety that we enjoy in Scala into the world of javascript. By shifting some of the work ensuring what we write is valid to our tools, we see a robust increase in our quality and productivity.

Since starting to use typescript, we’ve fairly dramatically increased our use of node backends. From [our new website](https://www.theguardian.com/info/2019/dec/08/migrating-the-guardian-website-to-react) to our collection of node lambdas.

During the editions project, I built a little wrapper for Promises which was inspired by error handling patterns from both golang and scala.

In es6, when writing asynchronous code using the async/await syntax, errors from promises are thrown and must be caught using a try/catch block.

```
try { 
  await f()
} catch(e) {
  console.log(e)
}
```

Consider a function which runs three async functions in serial:

```
const A = await a()
const B = await b()
const C = await c()
```

Trying to catch each of these errors independently with try/catch can become messy.

```
async () => {
  try {
    const A = await a();
    try {
      const B = await b(A);
      try {      
        const C = await c(C);
      } catch(e) {
        // handle error C
      }
    } catch (e) {
      //handle error B
    }
  } catch (e) {
    //handle error A
  }
};
```

One alternative to this is to declare the variable before the try block, and then change it. However, this isn’t a particularly good reason to perform a mutation and the error may end up improperly handled without it being obvious.

```
async () => {
  try {
    const A = await a();
    let B;
    try {
      B = await b(A);
    } catch (e) {
      //handle other error
    }
    const C = await c(B);
  } catch (e) {
    //handle error
  }
};
```

  
In both these slightly contrived examples, the flow control is somewhat difficult to unpick. And in the second, there is a chance of using B without it having a value.

In golang, functions communicate whether the have succeeded or failed by [returning an error value](https://blog.golang.org/error-handling-and-go) alongside their results. Handling the value of this, handles the error encountered in the same manner as so-called ‘happy path’ code.

```
val, err := myFunction()
if err != nil {
  //handle error
}
```

In Scala, a common error handling strategy is for a type to either be the successful result of the function- or the reason it failed. The type system is then able to reason about whether the function was successful or not, preventing you from using the value if there may have been an error.

Combining these ideas, you might get something like this:

```
async () => {
  const A = await attempt(a());
  if (hasFailed(A)) {
    //handle your error here
    throw A.error;
  }
  const B = await attempt(b(A));
  if (hasFailed(B)) {
    //handle your error here
    throw B.error;
  }
  const C = await attempt(c(B));
  if (hasFailed(C)) {
    //handle your error here
    throw C.error;
  }
  const D = await attempt(d(C));
};
```

Wrapping promises with the attempt function will catch any errors from the promise, and return either the output of the function or a value containing the thrown error.

This uncertainty is encoded in the type of the value returned, and a helper function is provided to check whether the function was successful.

Typescript is then able to reason about whether the error has been handled or not, allowing each error to be reasoned about neatly.

If this way of handling errors makes sense to you, we have published this as a library called [ts-failure](https://github.com/guardian/ts-failure) under the MIT license for you to use in your own projects.
