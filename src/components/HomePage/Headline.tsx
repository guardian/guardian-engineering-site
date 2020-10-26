import * as React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from '../../styles/variables'

const StyledHeadline = styled.h1`
  position: relative;
  top: 5%;
  font-family: ${fonts.headline};
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

const StyledCallToAction = styled.p`
  display: inline-block;
  background: ${colors.white};
  color: ${colors.black};
`

interface HeadlineProps {
  className?: string
}

interface CallToActionProps {
  className?: string
}

export const Headline: React.FC<HeadlineProps> = ({ children, className }) => (
  <StyledHeadline className={className}>{children}</StyledHeadline>
)

export const CallToAction: React.FC<CallToActionProps> = ({ children, className }) => (
  <StyledCallToAction className={className}>{children}</StyledCallToAction>
)
