import * as React from 'react'
import styled from '@emotion/styled'

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`

interface SectionProps {
  className?: string
}

const Section: React.FC<SectionProps> = ({ children, className }) => <StyledSection className={className}>{children}</StyledSection>

export default Section
