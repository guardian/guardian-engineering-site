import * as React from 'react'
import styled from '@emotion/styled'
import { ContentLeft, ContentRight } from './ContentBox'

const StyledContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 10px;
  background: none;
  color: white;
`

interface ContentSectionProps {
  className?: string
  imgSrc?: string
  imgAlt?: string
}

const ContentSection: React.FC<ContentSectionProps> = ({ children, className }) => (
  <StyledContentSection className={className}>{children}</StyledContentSection>
)

export default ContentSection
