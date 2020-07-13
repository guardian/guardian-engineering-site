import * as React from 'react'
import styled from '@emotion/styled'

const StyledContentLeft = styled.div`
  grid-area: 1/1/3/2;
  background: none;
  width: 100%;
`
const StyledContentRight = styled.div`
  grid-area: 1/2/3/3;
  background: none;
  width: 100%;
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
