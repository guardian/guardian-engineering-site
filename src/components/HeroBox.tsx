import * as React from 'react'
import styled from '@emotion/styled'

const StyledHeroText = styled.div`
  grid-area: 1/1/3/2;
  justify-self: start;
  background: red;
  width: 100%;
`
const StyledHeroImage = styled.div`
  grid-area: 1/2/3/3;
  justify-self: end;
  background: blue;
  width: 100%;
  text-align: right;
`
interface HeroTextProps {
  className?: string
}

interface HeroImageProps {
  className?: string
}

export const HeroText: React.FC<HeroTextProps> = ({ children, className }) => (
  <StyledHeroText className={className}>{children}</StyledHeroText>
)

export const HeroImage: React.FC<HeroImageProps> = ({ children, className }) => (
  <StyledHeroImage className={className}>{children}</StyledHeroImage>
)
