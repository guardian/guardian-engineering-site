import * as React from 'react'
import styled from '@emotion/styled'
import { space } from '@guardian/src-foundations'
import { Link } from 'gatsby'
import { Button, buttonBrandAlt } from '@guardian/src-button'
import { ThemeProvider } from 'emotion-theming'
import { SvgArrowRightStraight } from '@guardian/src-icons'
import { isInternalLink } from 'is-internal-link'

const ExternalButtonLink = styled.a`
  margin-bottom: ${space[1]}px;
`

const InternalButtonLink = styled(Link)`
  margin-bottom: ${space[1]}px;
`

interface ButtonLinkProps {
  linkUrl: string
  isInternal: boolean
}

interface StyledButtonProps {
  buttonText: string
}

const StyledButton: React.FC<StyledButtonProps> = ({ buttonText }) => (
  <ThemeProvider theme={buttonBrandAlt}>
    <Button size="default" iconSide="right" icon={<SvgArrowRightStraight />} priority="secondary">
      {buttonText}
    </Button>
  </ThemeProvider>
)

export const LearnMoreButton: React.FC<ButtonLinkProps> = ({ linkUrl }) => {
  if (isInternalLink(linkUrl)) {
    return (
      <InternalButtonLink to={linkUrl}>
        <StyledButton buttonText="Learn More" />
      </InternalButtonLink>
    )
  }
  return (
    <ExternalButtonLink href={linkUrl}>
      <StyledButton buttonText="Learn More" />
    </ExternalButtonLink>
  )
}
