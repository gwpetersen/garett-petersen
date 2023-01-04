import Img from "gatsby-image"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
interface Props {
  fileName: string
  alt?: string
}
function S3Image({ fileName, alt }: Props) {
  const data = useStaticQuery(graphql`
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
  `)
  const image = data.images.edges.find((n: any) =>
    n.node.Key.includes(fileName)
  )
  const imageSizes = image.node.localFile.childImageSharp.fluid
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
