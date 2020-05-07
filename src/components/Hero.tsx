import * as React from 'react'
import styled from '@emotion/styled'

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ children, className }) => <StyledHero className={className}>{children}</StyledHero>

export default Hero
