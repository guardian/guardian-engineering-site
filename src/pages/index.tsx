import * as React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import Section from '../components/Section'
import Hero from '../components/Hero'
import HeroBox from '../components/HeroBox'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Hero>
          <HeroBox side="left">A</HeroBox>
          <HeroBox side="right">B</HeroBox>
        </Hero>
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
