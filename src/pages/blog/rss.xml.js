import rss from "@astrojs/rss";

export function GET(context) {
  const allPosts = Object.values(
    import.meta.glob("./*.{md,mdx}", { eager: true }),
  );

  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });

  return rss({
    // `<title>` field in output xml
    title: "The Guardian Engineering Blog",
    // `<description>` field in output xml
    description:
      "A blog by the Guardian's internal engineering team. We build and run the Guardian website, mobile apps, editorial tools, revenue products, advertising, and data and identity platforms. This blog is where we share our experiences and approaches, including software development tips, code examples, open source software and code stories behind product development.",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: "https://theguardian.engineering/blog",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: sortedPosts.map((post) => ({
      title: post.frontmatter.headline,
      description: post.frontmatter.standfirst,
      link: `/blog/${post.frontmatter.slug}`,
      pubDate: new Date(post.frontmatter.date),
      author: post.frontmatter.authors
        .filter((name) => name && name.trim())
        .join(", "),
      categories: post.frontmatter.tags.filter((tag) => tag && tag.trim()),
    })),
    // (optional) inject custom xml
    customData: `<language>en-gb</language>`,
  });
}
