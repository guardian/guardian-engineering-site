import * as React from 'react'
import styled from '@emotion/styled'
import { headline } from '@guardian/src-foundations/typography'
import { colors } from '../styles/variables'

const StyledStandfirst = styled.h2`
  font-family: GH Guardian Headline;
  font-weight: 400;
  position: relative;
  top: 5%;
  margin-left: 16px;
  ${headline.xxsmall({ fontWeight: 'regular' })};
  color: ${colors.primaryText};
  width: 400px;
  margin-bottom: 16px;
  /* Tablet/Landscape Mobile Phone */
  @media (min-width: 650px) and (max-width: 812px) {
    font-size: 48px;
  }
  /* Mobile Phones */
  @media (min-width: 320px) and (max-width: 649px) {
    font-size: 36px;
    margin-bottom: 8px;
  }
`

interface StandfirstProps {
  className?: string
}

export const Standfirst: React.FC<StandfirstProps> = ({ children, className }) => (
  <StyledStandfirst className={className}>{children}</StyledStandfirst>
)
