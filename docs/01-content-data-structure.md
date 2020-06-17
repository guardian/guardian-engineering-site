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

Of these two, it seems more sensible to use mdx for now as it allows styling with minimal extra work to integrate the components.

## MDX

[MDX](https://github.com/mdx-js/mdx) allows us to embed JSX in Markdown. The [Gatsby documentation on MDX](https://www.gatsbyjs.org/docs/mdx/) has some really useful information on getting started which I will summarise below. If you want a more detailed explanation, it's worth reading into the documentation a bit more.

### Gatsby Layout/Template

Similar to vanilla Markdown, there is a template file which is used to generate pages from MDX files. For us this is [src/templates/page.tsx](../src/templates/page.tsx). If you want to change how the MDX files are rendered on the page, this is the place you need to edit to reflect those broad changes.

Examples of where this would be the appropriate place to implement changes would be amending the GraphQL queries or adding in new shortcodes (see below).

### Embedding Components

React components can be embedded directly into MDX files by importing them:

```
import { Chart } from "../components/chart"
import FAQ from "../components/faq.mdx"

# Here’s a chart
The chart is rendered inside our MDX document.

<Chart />
<FAQ />
```

However, if we are using a component repeatedly in multiple MDX files we have the option of adding them as "shortcodes".

In [page.tsx](../src/templates/page.tsx) there is a shortcodes object containing regularly used components.

```js
const shortcodes = {
  ContentSection,
  Content
}
```

Thie object is then passed to the `<MDXProvider>` element in the exported `PageTemplate`

```jsx
const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const post = data.mdx

  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>{post.frontmatter.title}</h1>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </Container>
      </Page>
    </IndexLayout>
  )
}
```

Any components in this object are accessible inside the MDX files without the need to import.

### Custom Markdown Components

It's also possible to [customise standard Markdown components](https://www.gatsbyjs.org/docs/mdx/customizing-components/). This allows us to replace things like the default heading elements with custom components that we have styled to reflect custom requirements. This is done by adding an object to the components field of the `MDXProvider` to map the standard elements (`h1`, `h2`, `p`,...) to custom components:

```jsx
<MDXProvider
    components={{
    // Map HTML element tag to React component
    h1: DesignSystem.H1,
    h2: DesignSystem.H2,
    h3: DesignSystem.H3,
    // Or define component inline
    p: props => <p {...props} style={{ color: "rebeccapurple" }} />,
    }}
>
```

### Programatically creating pages

It's outside of the scope of this documentation to outline specifically what is needed to programatically create pages from MDX files but the [Gatsby documentation on this topic](https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/) is comprehensive and well written.
