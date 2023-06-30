import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import React, { useState } from "react"
import "./gallery.css"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import "react-image-lightbox/style.css"
import Img, { FluidObject } from "gatsby-image";
export interface Node {
  Key: string;
  localFile: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}
export interface Edges {
  node: Node
}
const ImageItem: any = styled.div`
  :hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`

const Gallery = () => {
  const data = useStaticQuery(graphql`
    query  {
      allS3Object(filter: { Key: { regex: "/.*public.*/" } }) {
        edges {
          node {
            Key
            localFile {
              childImageSharp {
                fluid(maxWidth: 1024) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  const [showBox, setShowBox] = React.useState(false)
  const [images, setImages] = React.useState<Edges[]>(
    data.allS3Object.edges
  )
  const [photoIndex, setPhotoIndex] = React.useState(0)
  const [imageLength, setImageLength] = React.useState(0)
  const [category, setCategory] = useState("all")
  const open = ({ edges, index }: { edges: Edges[]; index: number }) => {
    const images =
      category !== "all"
        ? edges.filter(image => image.node.Key.includes(category) && image.node.localFile)
        : edges
    setImages(images)
    setImageLength(images.length)
    setShowBox(true)
    setPhotoIndex(index)
  }

  const edges: {
    node: Node
  }[] =  data.allS3Object.edges.filter((edge: { node: { localFile: string | null } }) => edge.node.localFile)
  const allCategories = edges
    .filter(({ node }) => {
      return node.Key.includes("public")
    })
    .map(({ node }) => {
      return node.Key.split("/")[1]
    })
  allCategories.push("all")
  const categories = [...new Set(allCategories)]
  const imageCategory = categories.map(category => {
    return {
      cat: category,
      edges:
        category !== "all"
          ? edges.filter(image => image.node.Key.includes(category))
          : edges,
    }
  })
  const imagesBucket = imageCategory.find(bucket => bucket.cat === category)
  return (
    <div>
      <Tabs
        id="tab"
        activeKey={category}
        className="myClass"
        onSelect={category => setCategory(category || "")}
      >
        {imageCategory.map(({ cat }) => (
          <Tab className="tabs" key={`tab-${cat}`}  eventKey={cat} title={cat.toUpperCase()}>
            {" "}
          </Tab>
        ))}
      </Tabs>
      <div className="image-grid">
        {imagesBucket?.edges.map(({ node }, index) => (
          <ImageItem
            className="image-item"
            id={node.Key}
            data-foo={index}
            key={`Image-${index}`}
            onClick={() => {
              open({ edges, index })
            }}
          >
            <Img
            alt={''}
            fluid={node.localFile.childImageSharp.fluid}
            style={{
                width: "100%",
                height: "600px",
                maxHeight: "600px",
                objectFit: "cover",
              }}
            />
          </ImageItem>
        ))}
      </div>
      <div>
        {showBox && (
          <Lightbox
            onCloseRequest={() => setShowBox(false)}
            animationDuration={700}
            keyRepeatLimit={500}
            mainSrc={images[photoIndex].node.localFile.childImageSharp.fluid.src || ''}
            nextSrc={
              images[(photoIndex + 1) % imageLength].node.localFile.childImageSharp.fluid.src
            }
            prevSrc={
              images[(photoIndex + imageLength - 1) % imageLength].node.localFile.childImageSharp.fluid.src
            }
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + imageLength - 1) % imageLength)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % imageLength)
            }
          />
        )}
      </div>
    </div>
  )
}

export default Gallery
