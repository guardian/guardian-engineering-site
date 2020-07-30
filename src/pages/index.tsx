import * as React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Page from '../components/Page'
import IndexLayout from '../layouts'
// import Section from '../components/Section'
import { LearnMoreButton } from '../components/HomePage/LearnMoreButton'
import { ContentLeft, ContentRight } from '../components/ContentBox'
import ContentSection from '../components/ContentSection'
import { Headline, CallToAction } from '../components/HomePage/Headline'
import { BodyContainer } from '../components/HomePage/BodyContainer'



const IndexPage = () => (
  <IndexLayout>
    <Page>
      <BodyContainer>
        <ContentSection>
          <ContentLeft>
            <Headline><p>We're shaping the future of digital journalism.</p> <CallToAction>Join us.</CallToAction></Headline>
          </ContentLeft>
          <ContentRight>
            <StaticQuery
              query={graphql`
                query {
                  fileName: file(relativePath: { eq: "assets/home-about-gnm.jpg" }) {
                    childImageSharp {
                      fluid(maxWidth: 450, maxHeight: 500, cropFocus: ENTROPY, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              `}
              render={data => <Img fluid={data.fileName.childImageSharp.fluid} alt="The Guardian reception" />}
            />
          </ContentRight>

        </ContentSection>

        <ContentSection>
          <ContentLeft>
            <Headline><p>We build in pursuit of a cause that is greater than ourselves.</p> <LearnMoreButton linkUrl="https://www.theguardian.com"/></Headline>
          </ContentLeft>
          <ContentRight>

          </ContentRight>

        </ContentSection>
      </BodyContainer>
    </Page>
  </IndexLayout>
)

export default IndexPage
