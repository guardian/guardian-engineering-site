import * as React from 'react'
import styled from '@emotion/styled'

const StyledContent = styled.section`
  grid-area: 3/1/4/4;
`

interface ContentProps {
  className?: string
}

const Content: React.FC<ContentProps> = ({ children, className }) => <StyledContent className={className}>{children}</StyledContent>

export default Content
