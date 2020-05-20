import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components'


const NavItem = styled.a`
color: black;
font-family: 'Playfair Display',serif;
font-size: large;
display: block;
padding: 8px;
text-decoration: none;
:hover 
{
     color:black; 
     text-decoration:none; 
     cursor:pointer;  
}
`
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {data.allWordpressPage.edges.map(edges => (
              <NavItem href={`/${edges.node.slug}`} key={`${edges.node.slug}-key`} id="nav-item" className="ml-auto">
                {edges.node.title}
                </NavItem>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )} />
)

export default NavBarComponent;