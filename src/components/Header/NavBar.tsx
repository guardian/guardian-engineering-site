import React, { useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { from } from '@guardian/src-foundations/mq'
import { space } from '@guardian/src-foundations'
import { neutral } from '@guardian/src-foundations/palette'
import { headline } from '@guardian/src-foundations/typography'
import veggieBurger from './veggieBurger.png'

const desktopMenu = css`
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
      display: block;
      ${headline.xxxsmall()};
      border-left: ${neutral[46]} 0.2px solid;
      padding: ${space[1]}px ${space[6]}px 0 ${space[3]}px;
      :first-of-type {
        border-left: none;
      }
    }
  }
`
const showNavList = css`
  position: absolute;
  top: 80px;
  right: 45px;
  background: ${neutral[20]};
  z-index: 10;
  li {
    list-style: none;
    padding-top: ${space[4]}px;
    ${headline.xsmall()};
  }

  ul {
    padding: 0 ${space[4]}px;
  }

  ${from.desktop} {
    ${desktopMenu}
  }
`

const hideNavList = css`
  li {
    display: none;
  }

  ${from.desktop} {
    ${desktopMenu}
  }
`

const MenuItemLink = styled(Link)`
  color: white;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const button = css`
  border: none;
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
`

const burger = css`
  display: block;
  position: absolute;
  right: 0;
  bottom: -28px;
  z-index: 5;

  ${from.desktop} {
    display: none;
  }
`

const highlightMenuItem = css`
  border-bottom: solid 3px ${neutral[100]};
  ${from.desktop} {
    border-top: solid 3px ${neutral[100]};
  }
`
const regularMenuItem = css`
  border-bottom: solid 3px transparent;
  ${from.desktop} {
    border-top: solid 3px transparent;
  }
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
  const [menuOpen = false, toggleMenu] = useState(false)
  const closeMenu = () => toggleMenu(false)
  const openMenu = () => toggleMenu(true)
  return (
    <>
      <button css={button} type="button" onClick={menuOpen ? closeMenu : openMenu}>
        <img css={burger} src={veggieBurger} alt="menu dropdown link" />
      </button>
      <nav css={menuOpen ? showNavList : hideNavList}>
        <ul>{createList()}</ul>
      </nav>
    </>
  )
}

export default NavBar
