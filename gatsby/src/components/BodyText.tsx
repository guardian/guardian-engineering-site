import * as React from 'react'
import styled from '@emotion/styled'
import { textSans } from '@guardian/src-foundations/typography'
import { colors } from '../styles/variables'

const StyledBodyText = styled.p`
  ${textSans.xsmall()};
  font-size: 0.85rem;
  color: ${colors.primaryText};
  margin: 16px;
  padding-bottom: 16px;
`

interface BodyTextProps {
  className?: string
}

export const BodyText: React.FC<BodyTextProps> = ({ children, className }) => (
  <StyledBodyText className={className}>{children}</StyledBodyText>
)
