import * as React from 'react'
import styled from '@emotion/styled'
import { headline } from '@guardian/src-foundations/typography'
import { colors } from '../../styles/variables'

const StyledHeadline = styled.h1`
  font-family: GH Guardian Headline;
  font-weight: 600;
  position: relative;
  width: 10ch;
  top: 5%;
  ${headline.small({ fontWeight: 'bold' })};
  font-size: 75px;
  line-height: 101.6%;
  color: ${colors.primaryText};
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

interface HeadlineProps {
  className?: string
}

export const DIHeadline: React.FC<HeadlineProps> = ({ children, className }) => (
  <StyledHeadline className={className}>{children}</StyledHeadline>
)
