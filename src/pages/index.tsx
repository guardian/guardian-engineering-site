import * as React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { neutral } from '@guardian/src-foundations/palette'
import { space } from '@guardian/src-foundations'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import Section from '../components/Section'
import Content from '../components/Content'
import { HeroText, HeroImage } from '../components/HeroBox'
import ContentSection from '../components/ContentSection'

const containerStyles = css`
  color: white;
  border: ${neutral[46]} 0.2px solid;
  padding: ${space[3]}px;
`

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
