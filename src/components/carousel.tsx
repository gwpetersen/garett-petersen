import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Carousel } from "react-bootstrap"
import Image from "gatsby-image"

function CarouselHero() {
  const data = useStaticQuery(graphql`
    query {
      allS3Image {
        edges {
          node {
            Key
            localFile {
              childImageSharp {
                fluid(maxWidth: 3080, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  const edges: {
    node: {
      Key: string
      localFile: {
        childImageSharp: {
          fluid: any
        }
      }
    }
  }[] = data.allS3Image.edges
  return (
    <Carousel>
      {edges.map(({ node }) => (
        <Carousel.Item key={`image-${node.Key}`}>
          <Image
            fluid={{
              ...node.localFile.childImageSharp.fluid,
              aspectRatio: 16 / 9,
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default CarouselHero
