import React from 'react';
import './gallery.css';
import { graphql, StaticQuery } from 'gatsby';
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
    const { length } = data.allS3Image.edges;
    setImages(data.allS3Image.edges);
    setImageLength(length);
    setShowBox(true);
    setPhotoIndex(index);
  };

  return (
    <StaticQuery
      query={graphql`
      {
        allS3Image(filter: { Key: { regex: "/.*private.*/" } }){
            edges {
                node {
                  Key
                  Url
                }
              }
        }
      }
    `}
      render={data => (
        <div>
          <div className="image-grid">
            {data.allS3Image.edges.map(({ node }, index) => (
              <ImageItem
                className="image-item"
                id={node.Key}
                data-foo={index}
                key={`Image-${index}`}
                src={node.Url}
                onClick={(e) => open({ data, index }, e)}
              >
                <img
                  src={node.Url}
                  style={{
                    width: '100%',
                    height: '500px',
                    maxHeight: '600px',
                    objectFit: 'cover',
                  }}
                />
              </ImageItem>
            ))}

          </div>
          <div>
            {showBox && (
            <Lightbox
              onCloseRequest={() => setShowBox(false)}
              animationDisabled
              keyRepeatLimit={900}
              mainSrc={images[photoIndex].node.Url}
              nextSrc={images[(photoIndex + 1) % imageLength].node.Url}
              prevSrc={images[(photoIndex + imageLength - 1) % imageLength].node.Url}
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
