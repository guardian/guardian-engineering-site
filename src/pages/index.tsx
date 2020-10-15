import * as React from 'react'
import Page from '../components/Page'
import IndexLayout from '../layouts'
// import Section from '../components/Section'
import { LearnMoreButton } from '../components/HomePage/LearnMoreButton'
import { ContentLeft, ContentRight } from '../components/ContentBox'
import ContentSection from '../components/ContentSection'
import { Headline, CallToAction } from '../components/HomePage/Headline'
import { BodyContainer } from '../components/HomePage/BodyContainer'
import { Image } from '../components/Image'
import { Floater } from '../components/Floater'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <BodyContainer>
        <ContentSection>
          <ContentLeft>
            <Headline>
              <p>We're shaping the&nbsp;future of&nbsp;digital journalism.</p>
              <CallToAction>Join us.</CallToAction>
            </Headline>
            <Floater size="small" gradient="green" right rotation={130} />
          </ContentLeft>
          <ContentRight>
            <Image filename="images/home-about-gnm.jpg" />
            <Floater size="medium" gradient="purple" rotation={60} />
          </ContentRight>
          <Floater size="small" gradient="green" right rotation={10} />
        </ContentSection>

        <ContentSection>
          <Floater size="large" gradient="purple" right={false} rotation={300} />
          <ContentLeft>
            <Headline>
              <p>We build in pursuit of a cause that is greater than ourselves.</p>{' '}
              <LearnMoreButton linkUrl="https://www.theguardian.com" />
            </Headline>
          </ContentLeft>
          <ContentRight />
        </ContentSection>
      </BodyContainer>
    </Page>
  </IndexLayout>
)

export default IndexPage
