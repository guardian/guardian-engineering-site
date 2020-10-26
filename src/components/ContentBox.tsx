import * as React from 'react'
import styled from '@emotion/styled'

import Content from './Content'

const StyledContentLeft = styled(Content)`
  float: left;
  padding-left: 8px;
`
const StyledContentRight = styled(Content)`
  float: right;
  width: 120%;
  margin-right: -40%;
`
interface ContentLeftProps {
  className?: string
}

interface ContentRightProps {
  className?: string
}

export const ContentLeft: React.FC<ContentLeftProps> = ({ children, className }) => (
  <StyledContentLeft className={className}>{children}</StyledContentLeft>
)

export const ContentRight: React.FC<ContentRightProps> = ({ children, className }) => (
  <StyledContentRight className={className}>{children}</StyledContentRight>
)
