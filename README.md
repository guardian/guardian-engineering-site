# [theguardian.engineering](https://theguardian.engineering/)’s code

This website is built with [Astro](https://astro.build/) as a static site.

## Development

All astro commands are run from the root of the project, from a terminal:

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Installs dependencies                       |
| `pnpm build`   | Build your production site to `./dist/`     |
| `pnpm dev`     | Starts local dev server at `localhost:3000` |


## Protips

### Where to put your blog post

The blog post itself should be put in 

```
guardian-engineering-site/src/pages/blog
```

Some old entries that came from the original migration use a weird naming scheme, for instance `help-insideguardian-2010-oct-18-linked-data-guardian-open-platform.md`, but that's not a requirement, you should use something short ans sweet like `sustainability-blog-2014-apr-02-coming-of-a-new-age.md`

### Where to put your standfirst image.

The image in the standfirst, should be put in directory

```
guardian-engineering-site/public/images/blog
```

Please use the .jpg file to reduce its size.

### Where to put your blog post inlined images

One way of doing it, is to rename your post file from .md to .mdx, and then 

1. Declare your picture near the top of the file, [see example](https://github.com/guardian/guardian-engineering-site/blob/main/src/pages/blog/the-end-of-password-pain-building-frictionless-authentication-at-the-guardian.mdx?plain=1#L15)

2. use this template

```
<figure>
  <Image
    src={createAccountGif}
    alt="The create account flow demonstrating account verification with a passcode and setting a password."
    loading="lazy"
  />
  <figcaption>
    The create account flow demonstrating account verification with a passcode
    and setting a password.
    <i>Illustration: Mahesh Makani</i>
  </figcaption>
</figure>
```

The important thing is to use the picture nickname, in this case `createAccountGif`.


## Publishing to GitHub Pages

Publishing is done automatically upon merging to `main`. Before merging, you might want to run the app locally to check that everything is fine.

## Get Involved

If you’re a Guardian Developer, join our [P&E/theguardian.engineering chat][room].

If you’re not a Guardian developer, [join us](https://workforus.theguardian.com/)!

[room]: https://mail.google.com/chat/u/0/#chat/space/AAAABKqqeUI
