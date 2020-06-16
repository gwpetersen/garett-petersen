import React from "react"
import Layout from "../components/layout"
import S3Image from "../components/alls3image"

export default ({ pageContext }) => (
  <Layout>
    <S3Image filename="cancun1.jpg" />
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
)
