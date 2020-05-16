import React from 'react';
import {graphql, StaticQuery} from 'gatsby';
import styled from 'styled-components';


const Hero = styled.section`
/* Sizing */
width: 80vw;
height: 70vh;
/* Flexbox stuff */
display: flex;
justify-content: center;
align-items: center;
/* Text styles */
text-align: center;
color: white;
/* Background styles */
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
z-index : 1000;
background-attachment: fixed;
background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${props => props.image});
`

const HeroHeader = styled.h1`
/* Text styles */
font-size: 4em;
/* Margins */
margin-top: 0;
margin-bottom: 0.5em;
`

const HeroBody = styled.body`
margin: 0;
font-family: sans-serif;
`

const HeroButton = styled.a`
/* Positioning and sizing */
    display: block;
    width: 130px;
    
    /* Padding and margins */
    padding: 1em;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    
    /* Text styles */
    color: white; /* CHANGE THIS LINE */
    text-decoration: none;
    font-size: 1.5em;
    
    /* Border styles */
    border: 5px solid white; /* CHANGE THIS LINE */
    border-radius: 20px;
`

const findHeroImage = (data) => {
  const filtered = data.allWordpressPage.edges.map(edge => {
    return edge.node.jetpack_related_posts.filter(res => res.img.alt_text==="Home")
  }).filter(finalSet => finalSet.length>0)
  return filtered[0][0].img.src

}


const HeroImage = () => (
    <StaticQuery 
    query={graphql`{
      allWordpressPage {
        edges {
          node {
            jetpack_related_posts {
              img {
                src
                alt_text
              }
            }
          }
        }
      }
    }       
`}
    render={data => (
      <HeroBody>
        <Hero class="hero" image={findHeroImage(data)}>
          <div class="hero-inner">
            <HeroHeader>Garett Petersen</HeroHeader>
            <h2>Look at this website and bask in its amazing glory!</h2>
            <HeroButton href="https://example.com/" class="btn">About Me...</HeroButton>
          </div>
        </Hero>
      </HeroBody>
    )}


/>)

export default HeroImage;