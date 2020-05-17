import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'

// const HeroHeader = styled.h1`
// {
//   font-size: 60px;
//   font-weight: 600;
//   color: grey;
//   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.37);
//   box-sizing: border-box;
//   filter: brightness(100%);
// }
// `
// const HeroSubHeader = styled.h2`
// {
//   text-transform: capitalize;
//   color: grey;
//   letter-spacing: 1px;
//   font-size: 26px;
//   box-sizing: border-box;
// }
// `

const HeroBody = styled.div`
margin: 0;
font-size: 100%;
background: #fff;
font-family: 'Source Sans Pro', sans-serif;
`

const HeroButton = styled.a`
{
  position: relative;
  display: inline-block;
  border: 1px solid;
  border-radius: 40px;
  font-weight: 400;
  text-align: center;
  -webkit-transition: 150ms;
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

const BackgroundSection = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "hero-image.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <HeroBody>
          <BackgroundImage
            Tag="section"
            className={className}
            fluid={imageData}
            backgroundColor={`#040e18`}
          >
           <HeroButton href="/about">About Me...</HeroButton>
          </BackgroundImage>
        </HeroBody>
      )
    }}
  />
)

const SyledHeroImage = styled(BackgroundSection)`
/* Sizing */
max-width: 100%;
height: 60vh;
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
`

export default SyledHeroImage