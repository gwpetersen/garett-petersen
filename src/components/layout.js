
import React from "react"
import styled, { createGlobalStyle } from 'styled-components';
import Header from './header';
import Footer from './footer';

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
      <Footer/>
      </LayoutWrapper>
    </div>
  )
}


export default Layout
