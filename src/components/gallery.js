import React from "react"
import "./gallery.css"
import { graphql, StaticQuery } from "gatsby"
import Image from "gatsby-image"

const Gallery = () => (
  <StaticQuery
    query={graphql`
      {
        allS3ImageAsset {
          edges {
            node {
              Key
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <div className="image-grid">
          {data.allS3ImageAsset.edges.map(({ node }) => (
            <div className="image-item" key={`${node.Key}-cl`}>
              <Image
                fluid={node.childImageSharp.fluid}
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  maxHeight: "500px",
                  "object-fit": "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    )}
  />
)
export default Gallery
