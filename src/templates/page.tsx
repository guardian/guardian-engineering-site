import * as React from 'react'
import { graphql } from 'gatsby'

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Page from '../components/Page'
import Container from '../components/Container'
import ContentSection from '../components/ContentSection'
import Content from '../components/Content'
import IndexLayout from '../layouts'

const shortcodes = {
  ContentSection,
  Content
}
interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    mdx: {
      body: string
      excerpt: string
      frontmatter: {
        title: string
      }
    }
  }
}

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

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
      }
    }
  }
`
