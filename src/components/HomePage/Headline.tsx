import * as React from 'react'
import styled from '@emotion/styled'

const StyledHeadline = styled.h1`
  position: relative;
  top: 5%;
  font-family: GH Guardian Headline;
  font-size: 75px;
  line-height: 101.6%;
  color: #ffffff;
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
  background: white;
  color: #000000;
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
