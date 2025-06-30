# Migrate blog from our Content API to Markdown files

This is a simple script which was used to import our engineering blog from our Content API and transform them into markdown files for them to be rendered by our website. The migration is carried in two steps:
 - first an import step which use DCR API to capture as much information as possible in json.
 - then a transformation step which clean, extract and write markdown for [Astro](https://astro.build/)

The import step was written in TypeScript benefitting from existing defined types from the Content API model. 
The transformation step was written in JavaScript as it is far less verbose and was enbaling a fast iteration loop.

## How to run?

To run those scripts, you will need to have [Bun](https://bun.sh/) installed on your machine. Bun is a fast JavaScript runtime that can be used to run scripts and manage packages.

First, you need to install dependencies:

```bash
bun install
```

### Import from the Content API

Configure an environment variable with your Content API key:

```bash
export CONTENT_API_KEY=your_api_key
```

To import data 

```bash
bun run import.ts
```

### Transform data into properly markdown

```bash
bun run transform.js
```
