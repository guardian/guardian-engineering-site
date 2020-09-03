import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { space } from '@guardian/src-foundations'
import { from, until } from '@guardian/src-foundations/mq'
import { heights, dimensions, colors } from '../../styles/variables'
import Container from '../Container'
import logo from './logo.png'
import JobLinkButton from './JobLinkButton'
import NavBar from './NavBar'
import { ThemeProvider } from 'emotion-theming';
import { LinkButton } from '@guardian/src-button/index';
import { SvgTwitter } from '@guardian/src-icons/twitter';

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${space[3]}px;
  background-color: ${colors.siteBackground};
  color: ${transparentize(0.5, colors.white)};

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
  top: ${space[2]}px;
`

const socialLinkWrapper = css`
  margin-left: 5px;
  padding: 10px;
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
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V3.27378C8.13239 3.27378 14.7263 9.86761 14.7263 18H18C18 8.06298 9.93702 0 0 0ZM2.52185 12.9563C1.12907 12.9563 0 14.0853 0 15.4781C0 16.871 1.12907 18 2.52185 18C3.91463 18 5.0437 16.871 5.0437 15.4781C5.0437 14.0853 3.91463 12.9563 2.52185 12.9563ZM0 9.82134V6.54756C6.32776 6.54756 11.4525 11.6722 11.4525 18H8.17866C8.17866 13.4884 4.51157 9.82134 0 9.82134Z" fill="black"/>
    </svg>
  )
}

// TODO: Find github SVG
const SvgGithub = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    </svg>
  )
}

const TwitterLinkButton = () => {
  return (
      <ThemeProvider theme={socialButton} >
        <LinkButton size="xsmall" css={socialLinkWrapper} href="https://twitter.com/gdndevelopers" target="_blank" icon={<SvgTwitter />} hideLabel={true}>
        </LinkButton>
      </ThemeProvider>
  )
}

const RSSLinkButton = () => {
  return (
      <ThemeProvider theme={socialButton}>
        <LinkButton size="xsmall" css={socialLinkWrapper} href="https://www.theguardian.com/info/series/digital-blog/rss" target="_blank" icon={<SvgRSS />} hideLabel={true}>
        </LinkButton>
      </ThemeProvider>
  )
}

const GithubLinkButton = () => {
  return (
      <ThemeProvider theme={socialButton}>
        <LinkButton size="xsmall" css={socialLinkWrapper} href="https://github.com/guardian" target="_blank" icon={<SvgGithub />} hideLabel={true}>
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
