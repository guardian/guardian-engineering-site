import * as React from 'react'
import styled from '@emotion/styled'
import { titlepiece } from '@guardian/src-foundations/typography'

const StyledSecondaryHeadline = styled.h2`
  ${titlepiece.large({ fontWeight: 'bold' })};
  margin-right: 8px;
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

export const DISecondaryHeadline: React.FC<HeadlineProps> = ({ children, className }) => (
    <StyledSecondaryHeadline className={className}>{children}</StyledSecondaryHeadline>
)
