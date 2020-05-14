/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import NavBar from './NavBar'
import styled,{ createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
body{
  font-family: 'Source Sans Pro', sans-serif;
  margin: 0 !important;
  padding: 0 !important;
}`

const LayoutWrapper=styled.div`
max-width: 960px;
margin: 0 auto;
`

const Layout = ({ children }) => {
  return (
      <div>
        <GlobalStyles />
        <NavBar />
      <LayoutWrapper>
      {children}
      </LayoutWrapper>
      </div>
  )
}


export default Layout
