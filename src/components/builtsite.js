import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Card } from "react-bootstrap"

const BuiltSiteImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "how-I-built-my-site.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Card style={{ marginBottom: '2rem'}}>
      <Img fluid={data.placeholderImage.childImageSharp.fluid} />
      <Card.Body>
        <Card.Text>
          Web dev stack I use in 2020 (Gatsby + Netlify + S3 + Wordpress) I use
          this as a playground to test and use new technologies in the Web dev
          world.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default BuiltSiteImage
