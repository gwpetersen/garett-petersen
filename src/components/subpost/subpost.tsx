import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const BuiltSiteImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "how-I-built-my-site.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  `)

  return <GatsbyImage
  alt={''}
  image={data.placeholderImage.childImageSharp.gatsbyImageData}
  />
}

export default BuiltSiteImage
