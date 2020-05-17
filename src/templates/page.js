import React from 'react'
import Layout from '../components/layout';
import NavBar from '../components/navbar';

export default ({pageContext}) => (
    <Layout>
    <NavBar/> 
    <div dangerouslySetInnerHTML={{__html:pageContext.content}}/>
    </Layout>
);