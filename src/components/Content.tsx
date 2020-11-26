import * as React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from '../styles/variables'

const StyledContent = styled.section`
  background: none;
  width: 100%;
  color: ${colors.primaryText};
  margin-right: 0;
  font-family: ${fonts.headline};
`

interface ContentProps {
  className?: string
}

const Content: React.FC<ContentProps> = ({ children, className }) => <StyledContent className={className}>{children}</StyledContent>

export default Content
