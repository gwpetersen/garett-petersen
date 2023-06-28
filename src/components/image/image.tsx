import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
export interface Node {
  Key: string;
  childImageSharp: {
      gatsbyImageData: IGatsbyImageData
  }
}
interface Props {
  fileName: string
  alt?: string
}
export interface Edges {
  node: Node
}
function S3Image({ fileName, alt }: Props) {
  const data = useStaticQuery(graphql`
    query {
      images: allS3ImageAsset {
        edges {
          node {
            Key
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
          }
          }
        }
      }
    }
  `)
  const allEdges: Edges[] = data.images.edges
  const image = allEdges.find(({ node }) =>
    node.Key.includes(fileName)
  )
  if (!image) {
    return null
  }
  return (
    <GatsbyImage
      alt={alt || ''}
      image={image.node.childImageSharp.gatsbyImageData}
      style={{ maxHeight: "400px", marginBottom: "1em" }}
    />
  )
}

export default S3Image
