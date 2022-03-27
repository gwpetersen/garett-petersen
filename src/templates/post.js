import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import S3Image from '../components/alls3image';
import BuiltSiteImage from '../components/builtsite';

const Container = styled.div`
  margin-bottom: 3em;
  margin-left: 2em;
  margin-right: 2em;
  box-sizing: border-box;
  display: block;
`;

export default ({ pageContext }) => {
  switch (pageContext.slug) {
    case 'how-i-built-my-site':
      return (
        <Layout>
          <Container>
            <BuiltSiteImage />
            <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
          </Container>
        </Layout>
      );
    case 'balboa-park':
      return (
        <Layout>
          <Container>
            <S3Image filename="huntington-library.jpg" />
            <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
          </Container>
        </Layout>
      );
    case 'hawaii':
      return (
        <Layout>
          <Container>
            <S3Image filename="hawaii-waipio-valley-2.jpg" />
            <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
          </Container>
        </Layout>
      );
    case 'cancun':
      return (
        <Layout>
          <Container>
            <S3Image filename="cancun1.jpg" />
            <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
          </Container>
        </Layout>
      );
    default:
      return (
        <Layout>
          <Container>
            <S3Image filename="default.jpg" />
          </Container>
          <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        </Layout>
      );
  }
};
