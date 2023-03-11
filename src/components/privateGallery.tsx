import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import styled from "styled-components"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import React, { useState } from "react"
import "./gallery.css"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import "react-image-lightbox/style.css"
import { S3ImageAssetNode } from "gatsby-source-s3-image"
export interface Edges {
  node: S3ImageAssetNode & { childImageSharp: { fluid: FluidObject } }
}
const ImageItem: any = styled.div`
  :hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`

const PrivateGallery = () => {
  const data = useStaticQuery(graphql`
    query {
      allS3ImageAsset(filter: { Key: { regex: "/.*private.*/" } }) {
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
  const [showBox, setShowBox] = React.useState(false)
  const [images, setImages] = React.useState<Edges[]>(
    data.allS3ImageAsset.edges
  )
  const [photoIndex, setPhotoIndex] = React.useState(0)
  const [imageLength, setImageLength] = React.useState(0)
  const [category, setCategory] = useState("all")
  const open = ({ edges, index }: { edges: Edges[]; index: number }) => {
    const images =
      category !== "all"
        ? edges.filter(image => image.node.Key.includes(category))
        : edges
    setImages(images)
    setImageLength(images.length)
    setShowBox(true)
    setPhotoIndex(index)
  }

  const edges: {
    node: S3ImageAssetNode & { childImageSharp: { fluid: FluidObject } }
  }[] = data.allS3ImageAsset.edges
  const allCategories = edges
    .filter(({ node }) => {
      return node.Key.includes("private")
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
              fluid={node.childImageSharp.fluid}
              key={`Img-${index}`}
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
            mainSrc={images[photoIndex].node.childImageSharp.fluid.src}
            nextSrc={
              images[(photoIndex + 1) % imageLength].node.childImageSharp.fluid
                .src
            }
            prevSrc={
              images[(photoIndex + imageLength - 1) % imageLength].node
                .childImageSharp.fluid.src
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

export default PrivateGallery
