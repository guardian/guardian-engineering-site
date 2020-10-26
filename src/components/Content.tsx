import * as React from 'react'
import styled from '@emotion/styled'
import { colors } from '../styles/variables'

const StyledContent = styled.section`
  background: none;
  width: 100%;
  color: ${colors.primaryText};
`

interface ContentProps {
  className?: string
}

const Content: React.FC<ContentProps> = ({ children, className }) => <StyledContent className={className}>{children}</StyledContent>

export default Content
