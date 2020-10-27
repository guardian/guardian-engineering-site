import * as React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../styles/variables'

const StyledContentSection = styled.section`
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
  color: ${colors.primaryText};
  border-bottom: ${colors.ui.light} 0.2px solid;
  /* Mobile Devices */
  @media (min-width: 320px) and (max-width: 812px) {
    padding-top: 10%;
    flex-direction: column;
  }
`

interface ContentSectionProps {
  className?: string
}

const ContentSection: React.FC<ContentSectionProps> = ({ children, className }) => (
  <StyledContentSection className={className}>{children}</StyledContentSection>
)

export default ContentSection