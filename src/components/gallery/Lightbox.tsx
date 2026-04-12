import React, { useEffect, useState, useCallback } from "react"
import styled, { keyframes, css } from "styled-components"
import { FluidObject } from "gatsby-image"

export interface LightboxImage {
  Key: string
  localFile: {
    childImageSharp: {
      fluid: FluidObject & { src: string }
    }
  }
}

interface LightboxProps {
  images: LightboxImage[]
  startIndex: number
  onClose: () => void
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.96);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.25s ease;
`

const ImageWrapper = styled.div<{ fading: boolean }>`
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.18s ease, transform 0.18s ease;
  opacity: ${({ fading }) => (fading ? 0 : 1)};
  transform: ${({ fading }) => (fading ? "scale(0.97)" : "scale(1)")};
`

const LightboxImg = styled.img`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
`

const NavButton = styled.button<{ side: "left" | "right" }>`
  position: fixed;
  top: 50%;
  ${({ side }) => side}: 20px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: white;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  z-index: 10000;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 600px) {
    ${({ side }) => side}: 10px;
    width: 38px;
    height: 38px;
  }
`

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.6rem;
  cursor: pointer;
  z-index: 10000;
  line-height: 1;
  padding: 4px 8px;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
`

const Counter = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.45);
  font-family: "Playfair Display", serif;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  z-index: 10000;
  user-select: none;
`

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex)
  const [fading, setFading] = useState(false)

  const navigate = useCallback((nextIndex: number) => {
    setFading(true)
    setTimeout(() => {
      setIndex(nextIndex)
      setFading(false)
    }, 180)
  }, [])

  const goNext = useCallback(() => {
    navigate((index + 1) % images.length)
  }, [index, images.length, navigate])

  const goPrev = useCallback(() => {
    navigate((index + images.length - 1) % images.length)
  }, [index, images.length, navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goNext, goPrev, onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  const currentImage = images[index]
  if (!currentImage?.localFile?.childImageSharp?.fluid) return null

  return (
    <Overlay onClick={onClose}>
      <CloseButton onClick={onClose} aria-label="Close">✕</CloseButton>

      <NavButton side="left" onClick={e => { e.stopPropagation(); goPrev() }} aria-label="Previous">
        <ChevronLeft />
      </NavButton>

      <ImageWrapper fading={fading} onClick={e => e.stopPropagation()}>
        <LightboxImg
          src={currentImage.localFile.childImageSharp.fluid.src}
          alt=""
        />
      </ImageWrapper>

      <NavButton side="right" onClick={e => { e.stopPropagation(); goNext() }} aria-label="Next">
        <ChevronRight />
      </NavButton>

      <Counter>{index + 1} / {images.length}</Counter>
    </Overlay>
  )
}
