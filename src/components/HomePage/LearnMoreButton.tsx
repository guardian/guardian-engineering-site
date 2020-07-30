import * as React from 'react'
import styled from '@emotion/styled'
import { space } from '@guardian/src-foundations'
import { Link } from 'gatsby'
import { Button, buttonBrandAlt } from '@guardian/src-button'
import { ThemeProvider } from 'emotion-theming'
import { SvgArrowRightStraight } from "@guardian/src-icons"

const ButtonLink = styled(Link)`
  margin-bottom: ${space[1]}px;
`

interface ButtonProps {
  linkUrl : string
}

export const LearnMoreButton: React.FC<ButtonProps> = ({ linkUrl }) => {
  return (
    <ButtonLink to={linkUrl}>
      <ThemeProvider theme={buttonBrandAlt}>
        <Button size="default" iconSide="right" icon={<SvgArrowRightStraight />} priority="secondary" >
          Learn More
        </Button>
      </ThemeProvider>
    </ButtonLink>
  )
}
