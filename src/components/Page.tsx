import * as React from 'react'
import styled from '@emotion/styled'
import { space } from '@guardian/src-foundations'
import { from } from '@guardian/src-foundations/mq'
import { dimensions, colors } from '../styles/variables'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: 0 ${space[3]}px;
  margin-bottom: 3rem;
  color: ${colors.primaryText};

  ${from.desktop} {
    padding: 0 ${dimensions.containerPadding}rem;
  }
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps> = ({ children, className }) => <StyledPage className={className}>{children}</StyledPage>

export default Page
