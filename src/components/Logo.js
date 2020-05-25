import React from 'react';
import styled from 'styled-components';
import mainLogo from '../images/nameLogo.png';

const LogoImage = styled.img`
  text-indent: -9999px;
  width: 150px;
  height: 80px;
  background: url(${mainLogo});
  backgroundsize: 150px 100px;
`;

const Logo = () => (
  <div href="/home" style={{ float: 'left' }}>
    <LogoImage />
  </div>
);

export default Logo;
