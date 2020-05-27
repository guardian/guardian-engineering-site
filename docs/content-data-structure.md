# Content Data Structure

## Introduction

This is a working document that will be updated as it is developed. Its purpose is to help define and explain the structure of the markdown files used to generate content for this site. These markdown files are used by Gatsbgy to populate the GraphQL data system that underpins it. With this in mind, it is useful to:

1. Run `yarn dev` and get the dev server running
2. Go to `http://localhost:8000/___graphql` to run interactive graphql queries.

Using the GraphiQL explorer at this location will help to understand what information is currently queryable from GraphQL. For example, we can see what `headings` are on a page and what depth they are each at, or what generated `fields` there are avilable, such as the `slug` or layout.

We are using [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark) to convert markdown files into GraphQL data structures and so the documentation available there will also prove useful for understanding. More information about GraphQL can be found at [graphql.org](https://graphql.org/).

## Markdown files

### Front matter

Markdown files for use with Gatsby should contain "frontmatter" at the start of the document. This is done by writing something like the following example at the start of the document

```
---
layout: page
title: 'Example Markdown page'
---
```

Doing this will create a `frontmatter` field in each graphql node. this will have the form of something like

```
"frontmatter": {
  "title": "Example Markdown page",
  "layout": "page"
}
```

Adding new fields to the frontmatter will update this in GraphQL

```
---
layout: page
title: 'Example Markdown page'
new-field: 'Something'
---

"frontmatter": {
  "title": "Example Markdown page",
  "layout": "page"
  "new_field": "Something"
}
```

_Note: If adding a new field to the Frontmatter and it doesn't appear in GraphiQL, try restarting the dev server as it may need to rebuild the schema._

We can use this Frontmatter to help define fields like the title of the page or other useful metadata, as well as things like the path to the webpage it is describing. This is an optional field of "path", and if not included, Gatsby is set up to create a slug based on the filename and location relative to the `content/` directory. For example, the `a-markdown-page.md` file is found at `examples/a-markdown-page` as a path has not been defined in the frontmatter.

### Page Content

The actual "content" of the page can also be accessed using GraphQL. Headings are found in the `headings` field of each node and are stored as an array. Each heading will take roughly the following form, with data here taken from `a-markdown-page.md`

```
"headings": [
  {
    "value": "Example H1",
    "depth": 1
  },
  {
    "value": "Example H2",
    "depth": 2
  }
]
```

Filtering on heading depth can be done from inside GraphQL using the following notation

```
headings(depth: h2) {
  value
  depth
}
```

returning

```
"headings": [
  {
    "value": "Example H2",
    "depth": 2
  }
]
```

The general content of a markdown file is then available at the `html` field as raw html, or in the `htmlAst` as an abstract syntax tree. For our purposes, we will probably want to look into using additional plugins to allow us to manipulate the HTML further in order to parse it into a structure that meets our design requirements. This could involve two options:

1. We move to using [.mdx](https://github.com/mdx-js/mdx) files that allow us to embed react components directly into the markdown.
2. We use something like [`rehype-react`](https://using-remark.gatsbyjs.org/custom-components/) to create custom components.
