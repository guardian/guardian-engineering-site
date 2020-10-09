import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { space } from '@guardian/src-foundations'
import { from, until } from '@guardian/src-foundations/mq'
import { ThemeProvider } from 'emotion-theming'
import { LinkButton } from '@guardian/src-button/index'
import { SvgTwitter } from '@guardian/src-icons/twitter'
import { heights, dimensions, colors } from '../../styles/variables'
import Container from '../Container'
import logo from './logo.svg'
import JobLinkButton from './JobLinkButton'
import NavBar from './NavBar'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${space[3]}px;
  background-color: ${colors.siteBackground};
  color: ${transparentize(0.5, colors.primaryText)};

  ${from.desktop} {
    padding: 0 ${dimensions.containerPadding}rem;
    height: ${heights.headerDesktop}px;
  }
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

const HomepageLink = styled(Link)`
  margin-top: 37px;

  ${until.mobileMedium} {
    width: 230px;
  }

  ${from.desktop} {
    position: absolute;
    right: 0;
    top: -20px;
  }

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const socialLinksWrapper = css`
  display: flex;
  left: 0;
  position: absolute;
  top: ${space[4]}px;
`

const socialLinkWrapper = css`
  margin-left: ${space[2]}px;
`

const socialButton = {
  button: {
    textPrimary: colors.primaryText,
    backgroundPrimary: colors.silverGrey
  }
}

// TODO: Add this to Source?
const SvgRSS = () => {
  return (
    <svg
      css={css`
        padding: ${space[1]}px;
      `}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M0 0V3.27378C8.13239 3.27378 14.7263 9.86761 14.7263 18H18C18 8.06298 9.93702 0 0 0ZM2.52185 12.9563C1.12907 12.9563 0 14.0853 0 15.4781C0 16.871 1.12907 18 2.52185 18C3.91463 18 5.0437 16.871 5.0437 15.4781C5.0437 14.0853 3.91463 12.9563 2.52185 12.9563ZM0 9.82134V6.54756C6.32776 6.54756 11.4525 11.6722 11.4525 18H8.17866C8.17866 13.4884 4.51157 9.82134 0 9.82134Z"
        fill={colors.siteBackground}
      />
    </svg>
  )
}

// TODO: Add this to Source?
const SvgGithub = () => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        fill={colors.siteBackground}
        // eslint-disable-next-line max-len
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  )
}

const TwitterLinkButton = () => {
  return (
    <ThemeProvider theme={socialButton}>
      <LinkButton
        size="small"
        css={socialLinkWrapper}
        href="https://twitter.com/gdndevelopers"
        target="_blank"
        icon={<SvgTwitter />}
        hideLabel
      >
        Twitter @gdndevelopers
      </LinkButton>
    </ThemeProvider>
  )
}

const RSSLinkButton = () => {
  return (
    <ThemeProvider theme={socialButton}>
      <LinkButton
        size="small"
        css={socialLinkWrapper}
        href="https://www.theguardian.com/info/series/digital-blog/rss"
        target="_blank"
        icon={<SvgRSS />}
        hideLabel
      >
        RSS Feed
      </LinkButton>
    </ThemeProvider>
  )
}

const GithubLinkButton = () => {
  return (
    <ThemeProvider theme={socialButton}>
      <LinkButton size="small" css={socialLinkWrapper} href="https://github.com/guardian" target="_blank" icon={<SvgGithub />} hideLabel>
        Github @guardian
      </LinkButton>
    </ThemeProvider>
  )
}

const Header: React.FC = () => (
  <StyledHeader>
    <HeaderInner>
      <span css={socialLinksWrapper}>
        <GithubLinkButton />
        <TwitterLinkButton />
        <RSSLinkButton />
        <JobLinkButton />
      </span>
      <HomepageLink to="/">
        <img src={logo} alt="" />
      </HomepageLink>
      <NavBar />
    </HeaderInner>
  </StyledHeader>
)

export default Header
