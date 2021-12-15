<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  theguardian.engineering
</h1>

## Installation

This project uses Gatsby to build the website before deploying to Github Pages.

It should be possible to simply run

```bash
yarn
```

to install all dependencies.

## Development

The dev server can be set up using

```bash
yarn dev
```

which uses gatsby to set up a dev server that will watch for changes on the javascript code. If the GraphQL schema is being updated,the dev server may need restarting in order for the changes to appear.

The project is tested using

```bash
yarn ci
```

which is also run using Github Actions on a `push`.

## Releasing

Release is done automatically upon merging to `main`.

## ❤️ Credits

Built with [Gatsby](https://www.gatsbyjs.org/) - the blazing-fast static site generator for [React](https://facebook.github.io/react/).
