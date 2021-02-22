import * as React from 'react'
import styled from '@emotion/styled'
import { headline } from '@guardian/src-foundations/typography'
import { colors } from '../styles/variables'

const StyledSecondaryHeadline = styled.section`
  position: absolute;
  top: 5%;
  margin-left: 16px;
  ${headline.small({ fontWeight: 'bold' })};
  font-size: 50px;
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

interface SecondaryHeadlineProps {
  className?: string
}

export const SecondaryHeadline: React.FC<SecondaryHeadlineProps> = ({ children, className }) => (
  <StyledSecondaryHeadline className={className}>{children}</StyledSecondaryHeadline>
)
