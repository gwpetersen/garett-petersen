/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import styled, { createGlobalStyle } from 'styled-components';
import Header from './header';

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swa"');
body{
  font-family: 'Playfair Display', serif;
  margin: 0 !important;
  padding: 0 !important;
}`


const LayoutWrapper = styled.main`
max-width: 960px;
margin: 0 auto;
`

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <LayoutWrapper>
      <Header/>
        {children}
      </LayoutWrapper>
    </div>
  )
}


export default Layout
