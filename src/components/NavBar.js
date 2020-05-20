import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import logo from '../images/nameLogo.png';
import { Navbar, Nav } from 'react-bootstrap';



const NavBarComponent = () => (
  <StaticQuery
    query={graphql`{
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
      <Navbar expand="lg">
        <Navbar.Brand href="/home">
          <img
            src={logo}
            width="200"
            height="70"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {data.allWordpressPage.edges.map(edges => (
              <Nav.Link href={`${edges.node.slug}/`} id="nav-item">
                {edges.node.title}
                </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )} />
)

export default NavBarComponent;