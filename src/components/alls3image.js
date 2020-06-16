import Img from "gatsby-image"
import React from "react"
import { graphql, StaticQuery } from "gatsby"

const S3Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allS3Image {
          edges {
            node {
              Url
              Key
              localFile {
                relativePath
                name
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n =>
        n.node.Key.includes(props.filename)
      )
      if (!image) {
        return null
      }
      const imageSizes = image.node.localFile.childImageSharp.fluid
      return (
        <Img
          alt={props.alt}
          fluid={imageSizes}
          style={{ maxHeight: `400px`, marginBottom: '1em' }}
        />
      )
    }}
  />
)

export default S3Image
