import React from 'react';
import {graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import SiteInfo from './SiteInfo';

const NavWrapper = styled.header`
display: flex;
max-width: 100%;
background-color: rgb(5, 67, 77)
`
const NavItem = styled(Link)`
color: white;
display: block;
text-decoration: none;
padding: 30px 30px;
`

const NavBarInner = styled.div`
margin: 0 auto;
text-align:center;
display: flex;
width: 80vw;
height: 8vh;
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