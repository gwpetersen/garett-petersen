import React from 'react';
import Layout from '../components/layout';

export default ({ pageContext }) => (
  <Layout>
    <div />
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
);
