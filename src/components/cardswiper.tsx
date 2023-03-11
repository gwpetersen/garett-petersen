// import React from "react"
// import Swiper from "react-id-swiper"
// import styled from "styled-components"

// const SwiperSlide = styled.div`
//   background-position: center;
//   background-size: cover;
//   width: 300px;
//   height: 200px;
// `
// const CardPostLink = styled.a`
//   text-decoration: none !important;
//   color: inherit;
//   &:hover {
//     color: inherit;
//   }
// `
// const SwiperContainer = styled.div`
//   width: 30%;
// `

// interface Props {
//   data: {
//     Url: string
//     slug: string
//     Key: string
//   }[]
// }
// function CoverflowEffect({ data }: Props) {
//   const params: any = {
//     pagination: ".swiper-pagination",
//     effect: "coverflow",
//     grabCursor: true,
//     centeredSlides: true,
//     slidesPerView: "auto",
//     coverflow: {
//       rotate: 50,
//       stretch: 0,
//       depth: 100,
//       modifier: 1,
//       slideShadows: true,
//     },
//     loop: true,
//   }
//   return (
//     <Swiper {...params}>
//       {data.map(node => (
//         <SwiperContainer className="swiper-container" key={node.Key}>
//           <CardPostLink href={`/post/${node.slug}`}>
//             <div className="swiper-wrapper">
//               <SwiperSlide
//                 className="swiper-slide"
//                 style={{ backgroundImage: `url(${node.Url}` }}
//               />
//             </div>
//             <div className="swiper-pagination" />
//           </CardPostLink>
//         </SwiperContainer>
//       ))}
//     </Swiper>
//   )
// }
// export default CoverflowEffect
