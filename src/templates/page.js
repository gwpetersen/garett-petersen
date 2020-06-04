import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import S3Image from '../components/alls3image';

const HeaderImage = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

export default ({ pageContext }) => (
  <Layout>
    <HeaderImage>
      <S3Image filename="cancun1.jpg" />
    </HeaderImage>
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
);
