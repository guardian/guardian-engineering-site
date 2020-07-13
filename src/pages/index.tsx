import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import Section from '../components/Section'
import Content from '../components/Content'
import { HeroText, HeroImage } from '../components/HeroBox'
import ContentSection from '../components/ContentSection'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <ContentSection>
          <HeroText>A</HeroText>
          <HeroImage>B</HeroImage>
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
