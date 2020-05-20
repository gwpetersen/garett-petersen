import React from "react"
import styled from 'styled-components'
import mainLogo from '../images/nameLogo.png';

const LogoContainer = styled.a`
float: left;
`

const LogoImage = styled.img`
text-indent: -9999px;
width: 140px;
height: 80px;
background: url(${mainLogo});
background-size: 150px 100px;
`

const Logo = () => {
  return (
  <LogoContainer href='/home'>
      <LogoImage/>
  </LogoContainer>
  )
}

export default Logo