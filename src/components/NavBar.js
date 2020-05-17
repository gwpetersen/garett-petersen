import React from 'react';
import {graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './logo';

const NavWrapper = styled.header`
display: flex;
max-width: 100%;
max-height: 100px;
height: 100px;
background-color: white
`
const NavItem = styled(Link)`
flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: right;
  color: #999;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: inherit;
  display: flex;
  font-size: 18px;
  height: 100px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px ;
  white-space: nowrap;
`

const NavBarInner = styled.div`
margin: 0 auto;
text-align:center;
display: flex;
width: 60vw;
height: 6vh;
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
      <Logo/>
        <NavBarInner>
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