import * as React from 'react'
import { css } from '@emotion/core'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import Section from '../components/Section'
import Content from '../components/Content'
import { ContentLeft, ContentRight } from '../components/ContentBox'
import ContentSection from '../components/ContentSection'

const headlineStyles = css`
  position: absolute;
  width: 709px;
  height: 334px;
  left: 158.85px;
  top: 312px;
  font-family: GH Guardian Headline;
  font-size: 75px;
  line-height: 101.6%;
  color: #ffffff;
`

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <ContentSection>
          <ContentLeft>
            <h1 css={headlineStyles}>We're shaping the future of digital journalism. Join us.</h1>
          </ContentLeft>
          <ContentRight>
            <StaticQuery
              query={graphql`
                query {
                  fileName: file(relativePath: { eq: "assets/home-about-gnm.png" }) {
                    childImageSharp {
                      fluid(maxWidth: 450, maxHeight: 500) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              `}
              render={data => <Img fluid={data.fileName.childImageSharp.fluid} alt="The Guardian reception" />}
            />
          </ContentRight>
          <Content>
            <h2>Content Section</h2>
            <p>This is a content chunk</p>
          </Content>
        </ContentSection>

        <Section>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
        </Section>
        <Link to="/page-2/">Go to page 2</Link>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
