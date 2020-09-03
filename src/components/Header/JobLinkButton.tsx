import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { space } from '@guardian/src-foundations'
import { Link } from 'gatsby'
import { Button } from '@guardian/src-button'
import { ThemeProvider } from 'emotion-theming'
import { colors } from '../../styles/variables'
import arrowRightStraight from './arrowRight.png'

const JobLink = styled(Link)`
  display: block;
  top: ${space[2]}px;
`

const jobsButton = {
  button: {
    textPrimary: colors.primaryText,
    backgroundPrimary: colors.silverGrey
  }
}

const arrowRight = css`
  width: 20px;
  height: 20px;
  margin-left: ${space[2]}px;
  margin-right: ${space[1]}px;
`

const ArrowRightStraight = () => <img css={arrowRight} src={arrowRightStraight} alt="" />

function JobLinkButton() {
  return (
    <JobLink to="https://workforus.theguardian.com/">
      <ThemeProvider theme={jobsButton}>
        <Button size="xsmall" iconSide="right" icon={<ArrowRightStraight />}>
          Jobs
        </Button>
      </ThemeProvider>
    </JobLink>
  )
}

export default JobLinkButton
