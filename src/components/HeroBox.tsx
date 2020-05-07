import * as React from 'react'
import styled from '@emotion/styled'

const StyledHeroBox = styled.div`
  float: ${props => (props.side === 'left' ? 'left' : 'right')};
  margin: auto;
  width: 50%;
  height: 100%;
  background-color: red;
`

interface HeroBoxProps {
  className?: string
  side: string
}

const HeroBox: React.FC<HeroBoxProps> = ({ children, className }) => <StyledHeroBox className={className}>{children}</StyledHeroBox>

export default HeroBox
