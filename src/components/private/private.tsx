import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import styled from "styled-components"
import Lightbox, { LightboxImage } from "../gallery/Lightbox"
import "./private.css"

interface PrivateNode {
  Key: string
  localFile: {
    childImageSharp: {
      fluid: FluidObject & { src: string }
    }
  }
}

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
`

const FilterPill = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? "#1a1a1a" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#555")};
  border: 1px solid ${({ active }) => (active ? "#1a1a1a" : "#d0d0d0")};
  border-radius: 20px;
  padding: 6px 18px;
  font-family: "Playfair Display", serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? "#1a1a1a" : "#f5f5f5")};
    border-color: ${({ active }) => (active ? "#1a1a1a" : "#aaa")};
    color: ${({ active }) => (active ? "white" : "#1a1a1a")};
  }
`

const ImageItem = styled.div`
  overflow: hidden;
  cursor: pointer;
  background: #f0f0f0;

  &:hover .gatsby-image-wrapper {
    transform: scale(1.04);
  }

  .gatsby-image-wrapper {
    transition: transform 0.4s ease;
    height: 100%;
  }
`

const PrivateGallery = () => {
  const data = useStaticQuery(graphql`
    query {
      allS3Object(filter: { Key: { regex: "/.*private.*/" } }) {
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

  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allEdges: { node: PrivateNode }[] = data.allS3Object.edges.filter(
    (edge: { node: { localFile: string | null } }) => edge.node.localFile
  )

  const categories: string[] = [
    "all",
    ...Array.from(
      new Set(
        allEdges
          .filter(({ node }) => node.Key.includes("private"))
          .map(({ node }) => node.Key.split("/")[1])
          .filter(Boolean)
      )
    ),
  ]

  const filteredEdges =
    activeCategory === "all"
      ? allEdges
      : allEdges.filter(({ node }) => node.Key.includes(activeCategory))

  const lightboxImages: LightboxImage[] = filteredEdges.map(({ node }) => node)

  return (
    <div>
      <FilterBar>
        {categories.map(cat => (
          <FilterPill
            key={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </FilterPill>
        ))}
      </FilterBar>

      <div className="image-grid">
        {filteredEdges.map(({ node }, index) => (
          <ImageItem
            key={node.Key}
            className="image-item"
            onClick={() => setLightboxIndex(index)}
          >
            <Img
              alt=""
              fluid={node.localFile.childImageSharp.fluid}
              style={{ height: "100%", width: "100%" }}
              imgStyle={{ objectFit: "cover" }}
            />
          </ImageItem>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}

export default PrivateGallery
