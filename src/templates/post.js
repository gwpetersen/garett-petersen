import React from "react"
import Layout from "../components/layout"
import S3Image from "../components/alls3image"
import BuiltSiteImage from "../components/builtsite"
import styled from "styled-components"

const Container = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  box-sizing: border-box;
  display: block;
`

export default ({ pageContext }) => {
  switch (pageContext.slug) {
    case "how-i-built-my-site":
      return (
        <Layout>
          <Container>
            <BuiltSiteImage />
          </Container>
          <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        </Layout>
      )
    case "balboa-park":
      return (
        <Layout>
          <Container>
            <S3Image filename="huntington-library.jpg" />
          </Container>
          <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        </Layout>
      )
    case "hawaii":
      return (
        <Layout>
          <Container>
            <S3Image filename="hawaii-waipio-valley-2.jpg" />
          </Container>

          <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        </Layout>
      )
    case "cancun":
      return (
        <Layout>
          <Container>
            <S3Image filename="cancun1.jpg" />
          </Container>

          <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        </Layout>
      )
    default:
      return (
        <Layout>
          <Container>
            <S3Image filename="cancun1.jpg" />
          </Container>
          <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
        </Layout>
      )
  }
}
