import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { isLoggedIn } from "../../services/auth"

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`

const Brand = styled.a`
  color: white;
  font-family: "Playfair Display", serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: none;
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 600px) {
    gap: 18px;
  }
`

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.75);
  font-family: "Playfair Display", serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  padding-bottom: 3px;
  transition: color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: white;
    transition: width 0.25s ease;
  }

  &:hover {
    color: white;
    text-decoration: none;
    &::after {
      width: 100%;
    }
  }
`

export default function NavBarComponent() {
  function handlePrivateClick(event: React.MouseEvent) {
    event.preventDefault()
    navigate(isLoggedIn() ? "/private" : "/login")
  }

  return (
    <Nav>
      <Brand href="/">Garett Petersen</Brand>
      <NavLinks>
        <NavLink href="/gallery">Gallery</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/private" onClick={handlePrivateClick}>Private</NavLink>
        {isLoggedIn() && <NavLink href="/upload">Upload</NavLink>}
      </NavLinks>
    </Nav>
  )
}
