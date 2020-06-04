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

const jobLinkMobile = css`
  ${from.desktop} {
    display: none;
  }
`

// interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
  <StyledHeader>
    <HeaderInner>
      <span css={jobLinkMobile}>
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
