import * as React from 'react'
import styled from '@emotion/styled'
import Content from './Content'
import { HeroText, HeroImage } from './HeroBox'

const StyledContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 10px;
  background: LightGray;
`

interface ContentSectionProps {
  className?: string
<<<<<<< HEAD
  imgSrc?: string
=======
  imgSrc: string
>>>>>>> d5cf16d54781078e46f2c58dfc54ca74e775bf45
  imgAlt?: string
}

const ContentSection: React.FC<ContentSectionProps> = ({ children, className, imgSrc, imgAlt }) => {
  return (
    <StyledContentSection className={className}>
      <HeroText>A</HeroText>
      <HeroImage>
        <img src={imgSrc} alt={imgAlt} />
      </HeroImage>

      <Content>
        <h2>Content Section</h2>
        This is a content chunk
      </Content>
    </StyledContentSection>
  )
}

export default ContentSection
