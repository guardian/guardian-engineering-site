import React, { useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { from } from '@guardian/src-foundations/mq'
import { space } from '@guardian/src-foundations'
import { neutral } from '@guardian/src-foundations/palette'
import { headline } from '@guardian/src-foundations/typography'
import veggieBurger from './veggieBurger.png'

const navList = css`
  li {
    list-style: none;
    ${headline.xsmall()};
  }

  ${from.desktop} {
    width: 100%;
    border-top: ${neutral[46]} 0.2px solid;
    border-right: ${neutral[46]} 0.2px solid;
    border-left: ${neutral[46]} 0.2px solid;
    display: flex;
    align-self: flex-end;
    ul {
      margin: 0;
      padding: 0 0 ${space[3]}px;
      display: flex;
      flex-direction: row;
      li {
        ${headline.xxxsmall()};
        border-left: ${neutral[46]} 0.2px solid;
        padding: ${space[1]}px ${space[6]}px 0 ${space[3]}px;
        :first-of-type {
          border-left: none;
        }
      }
    }
  }
`

const MenuItemLink = styled(Link)`
  color: white;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const burger = css`
  display: block;
  position: absolute;
  right: 0;
  bottom: -32px;
  z-index: 5;

  ${from.desktop} {
    display: none;
  }
`

const highlightMenuItem = css`
  border-top: solid 3px ${neutral[100]};
`
const regularMenuItem = css`
  border-top: solid 3px transparent;
`

const menuItems = [
  { id: 'home', text: 'Home', link: '/' },
  { id: 'diversity', text: 'Diversity & inclusion', link: '/' },
  { id: 'openPeople', text: 'Open people', link: '/' },
  { id: 'openSource', text: 'Open source', link: '/' },
  { id: 'events', text: 'Events & talks', link: '/' }
]

function createList() {
  const [selected = 'home', setSelected] = useState(false)
  return menuItems.map(item => (
    <li key={item.id} css={item.id === selected ? highlightMenuItem : regularMenuItem}>
      <MenuItemLink onClick={() => setSelected(item.id)} to={item.link}>
        {item.text}
      </MenuItemLink>
    </li>
  ))
}

function NavBar() {
  return (
    <nav css={navList}>
      <ul>{createList()}</ul>
      <img css={burger} src={veggieBurger} alt="menu dropdown link" />
    </nav>
  )
}

export default NavBar
