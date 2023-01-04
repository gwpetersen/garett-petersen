import React from "react"
import { graphql, StaticQuery, navigate } from "gatsby"
import { Navbar, Nav } from "react-bootstrap"
import styled from "styled-components"
import "./navbar.css"
import { isLoggedIn } from "../services/auth"
import Emoji from "./emoji"

const NavItem = styled.a`
  color: white;
  font-family: "Playfair Display", serif;
  fontsize: large;
  display: block;
  padding: 8px;
  text-decoration: none;
  :hover {
    color: white;
    text-decoration: none;
    cursor: pointer;
    background-color: grey;
  }
`

const NavItemBrand = styled.div`
  color: white;
  font-family: "Playfair Display", serif;
  fontsize: large;
  display: block;
  padding: 8px;
  text-decoration: none;
  :hover {
    color: white;
    text-decoration: none;
    cursor: pointer;
    background-color: grey;
  }
`
export default function NavBarComponent() {
  function handleClick(event: React.MouseEvent) {
    event.preventDefault()
    if (isLoggedIn()) {
      navigate("/private")
    }
    if (!isLoggedIn()) {
      navigate("/login")
    }
  }
  return (
    <StaticQuery
      query={graphql`
        {
          allWordpressPage {
            edges {
              node {
                slug
                title
              }
            }
          }
        }
      `}
      render={data => (
        <Navbar className="navbar" expand="lg">
          <Navbar.Brand href="/home">
            <NavItemBrand>
              <Emoji symbol={0x1f481} />
              Garett Petersen
            </NavItemBrand>
          </Navbar.Brand>
          <Navbar.Toggle
            className="color-nav-collapse"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavItem
                href="/private"
                key="private-gallery"
                onClick={handleClick}
                id="nav-item"
                style={{ fontSize: "1.3rem" }}
                className="ml-auto"
              >
                Private Gallery
              </NavItem>
              <NavItem
                href="/gallery"
                key="gallery"
                id="nav-item"
                style={{ fontSize: "1.3rem" }}
                className="ml-auto"
              >
                Gallery
              </NavItem>
              <NavItem
                href="/post"
                key="post"
                id="nav-item"
                style={{ fontSize: "1.3rem" }}
                className="ml-auto"
              >
                Post
              </NavItem>
              {data.allWordpressPage.edges.map(
                (edges: { node: { slug: string; title: string } }) => (
                  <NavItem
                    href={`/${edges.node.slug}`}
                    key={`${edges.node.slug}-key`}
                    id="nav-item"
                    style={{ fontSize: "1.3rem" }}
                    className="ml-auto"
                  >
                    {edges.node.title}
                  </NavItem>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    />
  )
}
