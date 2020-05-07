import * as React from 'react'
import styled from '@emotion/styled'

const StyledHero = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  margin-bottom: 20px;
`

interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ children, className }) => <StyledHero className={className}>{children}</StyledHero>

export default Hero
