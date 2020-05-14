import React from 'react'
import Layout from '../components/layout';

export default ({pageContext, content}) => (
    <Layout>
    <div>
        <div dangerouslySetInnerHTML={{__html:pageContext.content}}/>
    </div>
    </Layout>
);