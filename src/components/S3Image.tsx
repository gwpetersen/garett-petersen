import Img, { FluidObject } from "gatsby-image"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
interface Props {
  fileName: string
  alt?: string
}
function S3Image({ fileName, alt }: Props) {
  const data = useStaticQuery(graphql`
    query {
      images: allS3ImageAsset {
        edges {
          node {
            Key
            childImageSharp {
              fluid(maxHeight: 600, quality: 90, fit: COVER) {
                ...GatsbyImageSharpFluid_withWebp
                src
              }
            }
          }
        }
      }
    }
  `)
  const image = data.images.edges.find(({ node }: { node: { Key: string }}) =>
    node.Key.includes(fileName)
  )
  const imageSizes: FluidObject = image.node.childImageSharp.fluid
  if (!image) {
    return null
  }
  return (
    <Img
      alt={alt}
      fluid={imageSizes}
      style={{ maxHeight: "400px", marginBottom: "1em" }}
    />
  )
}

export default S3Image
