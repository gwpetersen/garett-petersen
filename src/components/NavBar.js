import React from 'react';
import {graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import SiteInfo from './SiteInfo';

const NavWrapper = styled.header`
display: flex;
background-color: rgb(3, 27, 77)
`
const NavItem = styled(Link)`
color: white;
display: block;
padding: 16px 16px;
`

const NavBarInner = styled.div`
max-width: 960px;
margin: 0 auto;
display: flex;
width: 960px;
height: 100%;
`

const NavBar = () => (
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
    <NavWrapper>
        <NavBarInner>
        <SiteInfo/>
        {data.allWordpressPage.edges.map(edges => (
            <NavItem to={edges.node.slug} key={edges.node.title}>
                {edges.node.title}
            </NavItem>
    ))}
    </NavBarInner>
    </NavWrapper>
)}/>
)

export default NavBar;