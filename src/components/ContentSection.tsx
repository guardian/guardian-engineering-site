import * as React from 'react'
import styled from '@emotion/styled'

const StyledContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 10px;
  background: LightGray;
`

interface ContentSectionProps {
  className?: string
}

const ContentSection: React.FC<ContentSectionProps> = ({ children, className }) => (
  <StyledContentSection className={className}>{children}</StyledContentSection>
)

export default ContentSection
