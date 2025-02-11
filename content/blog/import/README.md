# Migrate blog from our Content API to Markdown files

This is a simple script to import our engineering blog from our Content API and transform them into markdown files for them to be rendered by our website.
The migration is carried in two steps, first an import step which use DCR API to capture as much information as possible in json.

## How to run?

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
bun run transform.ts
```
