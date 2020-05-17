import React from "react"
import styled from 'styled-components'
import mainLogo from '../images/logo.png';


const LogoContainer = styled.a`
margin: 0 auto;
text-align:center;
display: flex;
width: 60vw;
height: 6vh;
`

const LogoImage = styled.img`
{
  text-indent: -100px;
  margin-right: 4rem;
  overflow: hidden;
  width: 200px;
  height: 100px;
  background: url(${mainLogo}) no-repeat 0 0;
  background-size: cover;
}
`

const Logo = () => {
  return (
  <LogoContainer href='/home'>
      <LogoImage  src={mainLogo} alt="fireSpot"/>
  </LogoContainer>
  )
}

export default Logo