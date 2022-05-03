import React from 'react';
import './gallery.css';
import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageItem = styled.div`
  :hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
function PrivateGallery() {
  const [showBox, setShowBox] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const [imageLength, setImageLength] = React.useState(0);

  const open = ({ data, index }) => {
    const { length } = data.allS3ImageAsset.edges;
    setImages(data.allS3ImageAsset.edges);
    setImageLength(length);
    setShowBox(true);
    setPhotoIndex(index);
  };

  return (
    <StaticQuery
      query={graphql`
      {
        allS3ImageAsset(filter: { Key: { regex: "/private/g" } }){
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
            {data.allS3ImageAsset.edges.map(({ node }, index) => (
              <ImageItem
                className="image-item"
                id={node.Key}
                data-foo={index}
                key={`Image-${index}`}
                src={node.childImageSharp.fluid.src}
                onClick={(e) => open({ data, index }, e)}
              >
                <Image
                  fluid={node.childImageSharp.fluid}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '600px',
                    objectFit: 'contain',
                  }}
                />
              </ImageItem>
            ))}

          </div>
          <div>
            {showBox && (
            <Lightbox
              onCloseRequest={() => setShowBox(false)}
              mainSrc={images[photoIndex].node.childImageSharp.fluid.src}
              nextSrc={images[(photoIndex + 1) % imageLength].node.childImageSharp.fluid.src}
              prevSrc={images[(photoIndex + imageLength - 1) % imageLength].node.childImageSharp.fluid.src}
              onMovePrevRequest={() => setPhotoIndex(
                (photoIndex + imageLength - 1) % imageLength,
              )}
              onMoveNextRequest={() => setPhotoIndex(
                (photoIndex + 1) % imageLength,
              )}
            />
            )}
          </div>
        </div>
      )}
    />
  );
}
export default PrivateGallery;
