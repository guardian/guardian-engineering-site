import * as React from 'react'
import styled from '@emotion/styled'
import { colors } from '../styles/variables'

const StyledContentSection = styled.section<ContentSectionProps>`
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
  color: ${colors.primaryText};
  border-bottom: ${props => (props.borderBottom ? `${colors.ui.light} 0.2px solid;` : 'none;')};
  /* Mobile Devices */
  @media (min-width: 320px) and (max-width: 812px) {
    padding-top: 10%;
    flex-direction: column;
  }
`

interface ContentSectionProps {
  className?: string
  imgSrc?: string
  imgAlt?: string
  borderBottom?: boolean
}

const ContentSection: React.FC<ContentSectionProps> = ({ children, className, borderBottom }) => (
  <StyledContentSection className={className} borderBottom={borderBottom}>
    {children}
  </StyledContentSection>
)

export default ContentSection
