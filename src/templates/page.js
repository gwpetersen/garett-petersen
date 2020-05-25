import React from 'react';
import Layout from '../components/layout';

export default ({ pageContext }) => (
  <Layout>
    <div>
      <h1>{pageContext.title}</h1>
    </div>
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
);
