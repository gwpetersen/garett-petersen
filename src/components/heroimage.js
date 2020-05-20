import React from 'react'
import heroImage from '../images/hero-image.jpg'
import Jumbotron from 'react-bootstrap/Jumbotron';
import styled from 'styled-components'


const HeroImageStyle = {
  "backgroundImage": `url(${heroImage})`,
  "backgroundSize": 'cover',
  "height": `60vh`
}

const ButtonContainer = styled.div`
position:relative;
display:inline-block;
text-align:center;
margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`
const HeroButton = styled.button`
  position: relative;
  display: inline-block;
  border: 1px solid;
  border-radius: 40px;
  font-weight: 400;
  text-align: center;
  transition: 150ms;
  cursor: pointer;
  color: #fff;
  background-color: #2F4F4F;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.125rem;
  line-height: 1.25;
  text-decoration: none;
  :hover {
    filter: brightness(80%);
}
`



const HeroImage = () =>(
        <Jumbotron id="hero-image" style={HeroImageStyle}>
          <ButtonContainer id="button_container">
          <HeroButton href="/about">About Me...</HeroButton>
          </ButtonContainer>
        </Jumbotron>
      )
    

export default HeroImage