import React from "react"
import Swiper from "react-id-swiper"
import styled from "styled-components"

const SwiperSlide = styled.div`
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 200px;
`
const CardPostLink = styled.a`
  text-decoration: none !important;
  color: inherit;
  &:hover {
    color: inherit;
  }
`
const SwiperContainer = styled.div`
  width: 30%;
`
const CoverflowEffect = props => {
  const params = {
    pagination: ".swiper-pagination",
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflow: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
  }
  return (
    <Swiper {...params}>
      {props.data.map(node => (
        <SwiperContainer className="swiper-container" key={node.Key}>
          <CardPostLink href={`/post/${node.slug}`}>
            <div className="swiper-wrapper">
              <SwiperSlide
                className="swiper-slide"
                image={node.Url}
                style={{ backgroundImage: `url(${node.Url}` }}
              >
              </SwiperSlide>
            </div>
            <div className="swiper-pagination"></div>
          </CardPostLink>
        </SwiperContainer>
      ))}
    </Swiper>
  )
}
export default CoverflowEffect
