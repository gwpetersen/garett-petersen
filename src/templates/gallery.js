import React from 'react';
import Gallery from 'react-photo-gallery';
import Layout from '../components/layout';

const widthHeight = [
  { width: 3, height: 4 },
  { width: 1, height: 1 },
  { width: 3, height: 3 },
  { width: 4, height: 4 },
];

const photos = pageContext => pageContext.edges.map(edge => {
  const { width, height } = widthHeight[
    Math.floor(Math.random() * widthHeight.length) + 0
  ];
  return {
    src: edge.node.Url,
    width,
    height,
  };
});

export default ({ pageContext }) => (
  <Layout>
    <Gallery photos={photos(pageContext)} />
  </Layout>
);
