module.exports = {
  siteMetadata: {
    title: 'theguardian.engineering',
    description: "Site for The Guardian's Engineering department",
    keywords: 'The Guardian, Engineering, Software Development',
    siteUrl: 'https://theguardian.engineering',
    author: {
      name: 'The Guardian Engineering'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/content/images`
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://theguardian.engineering'
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        // a workaround to solve mdx-remark plugin compat issue
        // https://github.com/gatsbyjs/gatsby/issues/15486
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`
          },

          {
            resolve: `gatsby-remark-smartypants`
          },
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                contentSection: {
                  classes: 'content-section'
                },
                contentLeft: {
                  classes: 'content-left'
                },
                contentRight: {
                  classes: 'content-right'
                }
              }
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-remark-images',
    'gatsby-plugin-sass'
  ]
}
