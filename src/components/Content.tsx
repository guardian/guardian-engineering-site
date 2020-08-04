import * as React from 'react'
import styled from '@emotion/styled'

const StyledContent = styled.section`
  background: none;
  width: 100%;
  color: white;
`

interface ContentProps {
  className?: string
}

const Content: React.FC<ContentProps> = ({ children, className }) => <StyledContent className={className}>{children}</StyledContent>

export default Content
