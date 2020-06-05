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
                  fixed(width: 300, quality: 100) {
                    ...GatsbyImageSharpFixed
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
      const imageSizes = image.node.localFile.childImageSharp.fixed
      return <Img alt={props.alt} fixed={imageSizes} />
    }}
  />
)

export default S3Image
