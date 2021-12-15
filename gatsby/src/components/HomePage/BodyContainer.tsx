import * as React from 'react'
import styled from '@emotion/styled'
import { neutral } from '@guardian/src-foundations/palette'

import Container from '../Container'

const StyledBodyContainer = styled(Container)`
  border-top: ${neutral[46]} 0.2px solid;
  border-left: ${neutral[46]} 0.2px solid;
  border-right: ${neutral[46]} 0.2px solid;
`
interface BodyContainerProps {
  className?: string
}

export const BodyContainer: React.FC<BodyContainerProps> = ({ children, className }) => (
  <StyledBodyContainer className={className}>{children}</StyledBodyContainer>
)
