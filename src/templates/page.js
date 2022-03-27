import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

const Container = styled.div`
  margin-bottom: 3em;
  margin-left: 2em;
  margin-right: 2em;
  box-sizing: border-box;
  display: block;
`;

export default ({ pageContext }) => (
  <Layout>
    <Container dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
);
