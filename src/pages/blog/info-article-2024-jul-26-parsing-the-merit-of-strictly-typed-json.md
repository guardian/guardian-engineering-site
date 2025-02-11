---
layout: ../../layouts/blog.astro
slug: 'info-article-2024-jul-26-parsing-the-merit-of-strictly-typed-json'
headline: 'Parsing: the merit of strictly typed JSON'
date: '2024-07-26'
authors: [Max Duval]
standfirst: 'Dealing with content that keeps changing can lead to bugs on users’ devices that are hard to reproduce. By precisely describing the shape of the content using types and ensuring it matches, exceptions can be avoided and users shown helpful messages when errors occur. This post will illustrate how this can be achieved with standard web technologies.'
image:
  url: 'https://media.guim.co.uk/4adba267ca620af5d01c92be270b7dd8c60d05a0/0_0_7500_4500/7500.jpg'
  alt: 'Through the ages… whether an interstellar battle station’s exhaust vent, a Greek warrior’s heel or a static type analysis tool, the tiniest flaw can lead to catastrophic failures.'
  credit: 'Illustration: Max Duval'
tags: []
---

The programming language of the web is JavaScript (JS), but its lack of static typing is [the top pain point raised from the 2023 State of JS](https://2023.stateofjs.com/en-US/features/#language_pain_points) survey. We rely on [TypeScript](https://www.typescriptlang.org/) (TS) to get a strong structural type analysis of our code, as mentioned in [our article on standardisation](https://www.theguardian.com/info/2023/oct/24/standardisation-the-merit-of-consistent-patterns). Static typing helps prevent runtime errors on our users’ machines. However, to ensure that no TypeError ever appears, we need to avoid the loose ‘any’ type, which is an escape hatch designed to opt-out of TS’ static analysis.

JavaScript Object Notation (JSON) is widely used as a data exchange format for REST APIs. Its syntax is compatible with JS, with only a subset of the language’s primitives: objects, arrays, strings, numbers and nulls. Simple objects can be turned into a string with [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and turned back into an object with [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), making it an adequate choice for many uses. We use it for powering our comments, new live blog updates, football match scores, weather, most read and other features of the website and Apps.

How things can go wrong
-----------------------

The TS compiler is able to analyse code based on the types description objects and functions. For code that you write, this will be done via annotations alongside your code, either using its own syntax or JSDocs. For the browser APIs, Microsoft provides the DOM declaration files which are aligned with versions of the ECMAScript specification. For example, [calls to ‘JSON.parse’ will return ‘any’](https://github.com/microsoft/TypeScript/blob/3163fe7e3898c1f48cd9bc097b96e3426cd2a453/src/lib/es5.d.ts#L1144) in [ES5](https://en.wikipedia.org/wiki/ECMAScript_version_history#5th_Edition_%E2%80%93_ECMAScript_2009). As mentioned above, this means these objects are opted out of static analysis. This means that we can no longer rely on the compiler for catching errors that could occur on users’ devices before we publish our code.

```typescript
const object = JSON.parse(`{
  "key": "value",
  "year": 1821,
}`)

// TypeScript is unable to catch that accessing
// these keys will throw a TypeError:
// can't access property "shape", "wrong" is undefined
object.wrong.shape;
```

Things can get even more confusing if you [assign a type to the parsed object](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAygFgQ0lAvFA3gKClEEEBOAXFAHYCuAtgEYQEDc2UEAHpAMbAQAmJ6UANwQAbchBLUA9pOH5SUAL6MlmTAHoAVBuwaowONAAqMKO0mUwAS1kFTk0gDNLBSgGc9iYB8vvJ1AFYQnDpQrgjAlk4Q7vrQrBxc3FAABvBIEMk6aphmpK5eQsKWSWhYOHiEJABMAAxVACwANEzxQYl8giJiJMAEYorNCqHhPlHuaZCM6lohsVDGdhbWdKbh7AYxnt6+AW0h3JLRZJJeYREOIB5xbG08KRMZIQib0GAEkpAEoCmtnDzJUB8UEoPlcllIAHMsjl7PlAaRCsVUBgmBViFAAIwADiqGMGwwirjGsEQk1Umm0UF0AHcDPICEEIJYBOCIVBuOEEFBJAIVnNSBBgNTJAQANYhSxeanWYRQWhQBnsJm8pLPKBc5L5AiszJU7K5OEc4BctAAKRgAHkAHIAOi1rMiIAAFODEdwAJRTA1eESuSQASQRImKJAeyPN1ptYEIrggTqNCE95LUV3mJjMSxsgPc5FICGosj0klWwHWHnC6vYStcYMh6hTsVjUFFEBA7mlwll+ne1PV83AEAAogR3sR66tSAByH1V6LuN4fOjfABEhTEy8aUGXv0Sy+zUFz3AgTgF3EwvoDQaK3BtO54NrXEEYahTODf74-H4AegB+TBAA), as the TS compiler will use that value in the future, turning the ‘any’ into a specific shape. Such errors will be hard to debug, because they will only occur when your code is accessing the undefined properties, rather than when you receive a JSON response from the REST API. As errors will interrupt execution all the way up to the nearest [try…catch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#try...catch_statement), they can break large parts of the interactions for your users. These errors can occur because you’ve inadvertently declared the wrong shape, but they could also start appearing if the API changes its schema. If you have chosen TS for its ability to prevent runtime errors, these kinds of surprises are exactly what you were trying to avoid in the first place.

Check everything is as expected
-------------------------------

“For some developers, it may be more informative to see a production implementation, so we implemented an example of this pattern in [dotcom-rendering#11835](https://github.com/guardian/dotcom-rendering/pull/11835)”

This problem has been encountered by many developers, and the simplest way to force TS to warn of any possible issues is to explicitly assign the ‘unknown’ type to the object returned from JSON.parse. There is [a proposal for this to become the default](https://github.com/microsoft/TypeScript/issues/26188) in TS and [a custom declaration library](https://github.com/total-typescript/ts-reset) to ensure that your code will gracefully handle any unexpected object shape.

Thanks to TS’s control flow analysis, you could check that each of the properties are as you expect them, using the [‘typeof’ operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) recursively, and only accessing valid properties in nested conditional blocks. However, this can easily lead to [repetitive boilerplate for objects with complex shapes](https://www.typescriptlang.org/play/?module=200#code/IYZwngdgxgBAZgV2gFwJYHsIwOYFNkAquAtgA64BOwyCFuAFAJQBcMAChesaiLgDwQExAEaUAfDADeAKBgwomEMhh0QpRbhgBeGMADuwVMrj4oAC3oByM8mSkQzAPSPgpVADoIuAB7I8Ed2wEYAoAE1RgCFd7dwV3BABrRz1cajNKdwArEExLRll5RWVQ6mBWJASIdD0sHX1DZVV1CF4snIgmAG5pAucYFJhiBCV5dKgEmGQzakn0mBLkYBhpkF0YNVwoVDhUWBBp8gLtmHpkMHJ0OHnS7S0dS3RhTM3kSxgAMnfrxZgAQh1BAAbQEfL6WFJpShvVBYBbARhSApyY6nc64S7fYDuCFTSi3e6PZ5QV6gzHY1K4ih-AEIYGkyzIEjkKg0OjQ2GlcmQigImRyfkwFFnC5XOFcynuRlkSjUWiaO4Ep4vN6fMk49IUSVMmWszT-GBAkGqyzEfAUXbstUUjVa6UsuW8pECwVXVEiq3c23M2V0dym5Dm2AKmCWQQiKGO53OuisjmLcU2qXe3V+s27bpRuQAXyd2adObzBSmnD0MAIaIAohROBQrAA5dAwABuwEBqFCk219rZjG6OZ6TfQ7Zw+CIdp9DEYkvSHVOXYnCK0EgULXQgNw7kB6Gw9AABgBJZQ8GAAEkkSZ1cqzAAaAMK7xi9npAA).

```typescript
async function getTemperature(): Promise<number> {
  const response = await fetch('https://api.nextgen.guardianapps.co.uk/weather.json')
  const data: unknown = await response.json();

  // we must check that the data has a specific shape
  if (typeof data === 'object' && data != null && 'weather' in data) {
    if (typeof data.weather === 'object' && data.weather != null && 'temperature' in data.weather) {
      if (typeof data.weather.temperature === 'object' && data.weather.temperature != null && 'metric' in data.weather.temperature) {
        if (typeof data.weather.temperature.metric === 'number') {
          return data.weather.temperature.metric;
        }
      }
    }
  }

  throw TypeError('No valid temperature');
}
```

Thankfully, this problem has been encountered by many developers and there are a [multitude of parsing libraries](https://typeschema.com/#coverage) that bring more ergonomic APIs for these operations. In order to integrate with the TS compiler, they generally expose custom schemas that describe the expected shape of the data, which the unknown objects can then be validated against. Unlike TS, their work is done at runtime, on the user’s device, so the size of the library and its performance must be taken into consideration. We therefore picked [Valibot](https://valibot.dev/), which has a similar API to the popular [Zod](https://zod.dev/) library with a typically much smaller footprint. Comparing [the declarative schema](https://www.typescriptlang.org/play/?module=200#code/JYWwDg9gTgLgBAbzmAhlAzgUwDRwgIwCtMBjGXAOwFcR9Mo4BfOAMyghDgHIA3FAG2D4IMLgG4AUBJIQK6eOhIALTCBRwAvHiKkYACgQS4cAO6YUMFVABc24mQNHjcGKrD0LVKJlsF7+w2dnEEwYKGASW2paej0ASmwnY0YEpxTElMkJFHQATwoSVioCmGBZOABzUIAVNw8YL0x42wAFdhBgLAAeaLooAD5EJxk5eG90SDlMTTgUExRgeBZQ5T0uJRgYMHRrAHpdlDBgADoKTAAPGCqKY4qqNAATYBQKQ+3jmWOqAGtdswsrMdCOhZFw4sNZPI4A8LOotKgME1FCo1Lg5gsxpgJpDMECQRR4nFJMZ9i4VHBqgBlOAycDAfj0OCdOBKN65WYkEhY9DACgVMnMvy6Jykl4PMnTBE8vlwQT4KBodmYOSNdBkixM+AoMj3fj8dmdJzeBpQCjQ2HHf6WejHVzgeqNY4hMIRSSMKRSHgQYDiqowWr2hUmppxW0qAl6O3uIONOKaQYjEEM478CAVPQAAwAkvBmQASBBRh3eRgABoAwhm4kSpEA) below with the imperative checks above shows a stark improvement in readability, and this distinction increases with the complexity of the data model.

```typescript
import { parse, object, number } from 'valibot';

const schema = object({
  weather: object({
	temperature: object({
  	metric: number(),
	}),
  }),
});

async function getTemperature(): Promise<number> {
  const response = await fetch('https://api.nextgen.guardianapps.co.uk/weather.json')
  const data = parse(schema, await response.json());
  // the TS compiler is happy accessing this object
  // and the parsing library ensures that it actually is
  return data.weather.temperature.metric;
}
```

  
We’ve used this approach for our comments, which has enabled us to make changes with confidence, as we are now guaranteed that the data model will actually have the shape the TS compiler expects. This is especially helpful as the team implementing the web interface is distinct from the team [providing the JSON API](https://discussion.guardianapis.com/discussion-api/), which could evolve its data model over time. Now, a breaking change will be caught at the parsing step and dealt with there.

Failing gracefully
------------------

When the data does not match the schema, the ‘parse’ function will throw an error. While this ensures that no further errors will be thrown, it still stops code execution and may break other interactions on the website. In order to prevent exceptions and handle this case, we can treat errors as values by using the ‘safeParse’ helpers, which return a [tagged union](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#unions) that allows code to check for success or failure. To prevent relying too much on a specific library’s implementation, we wrap this in [our custom ‘Result’ type](https://github.com/guardian/dotcom-rendering/blob/acb9d15ec6af316bea621db69a6309afe4753d4b/dotcom-rendering/src/lib/result.ts), so this pattern becomes more familiar to developers as it can be used outside of the specific cases of parsing that could fail.

When making a network request to a REST API, there are several other types of errors that could occur: dropped or timed out network requests, a backend server error or an invalid JSON string. By using a consistent pattern for dealing with failures, we can display the most adequate messaging to our users. For example, we could offer to retry the operation, or give a plain language explanation of why the error occurred.
