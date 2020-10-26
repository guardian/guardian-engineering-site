import React, { useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { from } from '@guardian/src-foundations/mq'
import { space } from '@guardian/src-foundations'
import { neutral } from '@guardian/src-foundations/palette'
import { headline } from '@guardian/src-foundations/typography'
import { colors } from '../../styles/variables'
import veggieBurger from './veggieBurger.png'

const desktopMenu = css`
  width: 100%;
  border: ${colors.ui.light} 0.2px solid;
  border-bottom: none;
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
      border-left: ${colors.ui.light} 0.2px solid;
      padding: ${space[1]}px ${space[6]}px 0 ${space[3]}px;
      :first-of-type {
        border-left: none;
      }
    }
  }
`
const showNavList = css`
  width: 97%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: -12px;
  background: ${colors.lilac};
  z-index: 10;
  li {
    list-style: none;
    padding-top: ${space[4]}px;
    ${headline.xsmall()};
    &:hover,
    &:focus {
      border-bottom: solid 3px ${neutral[100]};
    }
  }

  ul {
    padding: 0 ${space[9]}px;
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
  color: ${colors.primaryText};
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
  z-index: 20;

  ${from.desktop} {
    display: none;
  }
`

const highlightMenuItem = css`
  border-bottom: solid 3px ${colors.ui.light};
  border-top: none;
  ${from.desktop} {
    border-top: solid 3px ${colors.ui.light};
    border-bottom: none;
  }
`
const regularMenuItem = css`
  border-bottom: solid 3px transparent;
  border-top: none;
  ${from.desktop} {
    border-top: solid 3px transparent;
    border-bottom: none;
  }
`

const menuItems = [
  { id: 'home', text: 'Home', link: '/' },
  { id: 'diversity', text: 'Diversity & inclusion', link: '/diversity' },
  { id: 'openPeople', text: 'Open people', link: '/open-people' },
  { id: 'openSource', text: 'Open source', link: '/open-source' },
  { id: 'events', text: 'Events & talks', link: '/events' }
]

function createList(closeMenu: Function) {
  const [selected, setSelected] = useState('home')
  const handleMenuItemClick = (id: string) => {
    setSelected(id)
    closeMenu()
  }
  return menuItems.map(item => (
    <li key={item.id} css={item.id === selected ? highlightMenuItem : regularMenuItem}>
      <MenuItemLink onClick={() => handleMenuItemClick(item.id)} to={item.link}>
        {item.text}
      </MenuItemLink>
    </li>
  ))
}

function NavBar() {
  const [menuOpen, toggleMenu] = useState(false)
  const closeMenu = () => toggleMenu(false)
  const openMenu = () => toggleMenu(true)
  return (
    <>
      <button css={button} type="button" onClick={menuOpen ? closeMenu : openMenu}>
        <img css={burger} src={veggieBurger} alt="menu dropdown link" />
      </button>
      <nav css={menuOpen ? showNavList : hideNavList}>
        <ul>{createList(closeMenu)}</ul>
      </nav>
    </>
  )
}

export default NavBar
