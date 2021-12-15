import * as React from 'react'
import styled from '@emotion/styled'
import { headline } from '@guardian/src-foundations/typography'
import { colors } from '../styles/variables'

const StyledContentHeadline = styled.h2`
  margin-left: 16px;
  ${headline.xxsmall({ fontWeight: 'bold' })};
  color: ${colors.primaryText};
  margin-bottom: 16px;
  margin-top: 16px;
  width: 20ch;
  height: 50px;
`

interface ContentHeadlineProps {
  className?: string
}

export const ContentHeadline: React.FC<ContentHeadlineProps> = ({ children, className }) => (
  <StyledContentHeadline className={className}>{children}</StyledContentHeadline>
)
