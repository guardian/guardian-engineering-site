import * as React from 'react'
import { graphql } from 'gatsby'

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Page from '../components/Page'
import { BodyContainer } from '../components/HomePage/BodyContainer'
import ContentSection from '../components/ContentSection'
import Content from '../components/Content'
import { ContentLeft, ContentRight } from '../components/ContentBox'
import { Headline, CallToAction } from '../components/HomePage/Headline'
import { Image } from '../components/Image'
import { LearnMoreButton } from '../components/HomePage/LearnMoreButton'
import IndexLayout from '../layouts'

const shortcodes = {
  ContentSection,
  Content,
  ContentLeft,
  ContentRight,
  h1: Headline,
  em: CallToAction,
  Image,
  LearnMoreButton
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
        <BodyContainer>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </BodyContainer>
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
