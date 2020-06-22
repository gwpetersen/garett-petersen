import React from "react"
import Layout from "../components/layout"

import styled from "styled-components"

const Container = styled.div`
  margin-bottom: 3em;
  margin-left: 2em;
  margin-right: 2em;
  box-sizing: border-box;
  display: block;
`

export default ({ pageContext }) => (
  <Layout>
    <Container dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
)
