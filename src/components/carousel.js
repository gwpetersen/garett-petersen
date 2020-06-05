import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Carousel } from "react-bootstrap"
import Image from "gatsby-image"

const CarouselHero = () => (
  <StaticQuery
    query={graphql`
      {
        allS3Image {
          edges {
            node {
              Key
              localFile {
                childImageSharp {
                  fluid(maxWidth: 3080, quality: 100) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Carousel>
        {data.allS3Image.edges.map(({ node }) => (
          <Carousel.Item key={`image-${node.Key}`}>
            <Image
              fluid={node.localFile.childImageSharp.fluid}
              sizes={{
                ...node.localFile.childImageSharp.fluid,
                aspectRatio: 16 / 9,
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    )}
  />
)

export default CarouselHero
