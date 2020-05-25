import React from 'react';
import Layout from '../components/layout';


export default ({ pageContext }) => (
  <Layout>
    {pageContext.edges.map(edge => (
      <div>{edge.node.Url}</div>
    ))}
  </Layout>
);
