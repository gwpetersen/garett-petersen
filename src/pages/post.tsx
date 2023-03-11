import React from "react"
import { ListGroup } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"

const ListItem = styled.a`
  font-family: Lora, serif;
  font-weight: 400;
  font-size: 1.3rem;
  margin: 0rem;
  line-height: 1.3;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0.25rem;
  text-decoration: none !important;
  margin-left: 0px;
  font-weight: 600;
  cursor: pointer;
  border: 3px solid transparent;
  border-bottom-color: #f2f2f2;
`
const CustomDate = styled.div`
  font-size: 1rem;
  display: block;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  box-sizing: border-box;
`

const CustomHeader = styled.h2`
  font-size: 1.3rem;
  line-height: 1.3;
  margin: 0 0 0.25rem;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0.25rem;
  margin-left: 0px;
  box-sizing: border-box;
`


export default function AllPost() {
  const data = useStaticQuery(graphql`
    query {
      allWpPost {
        edges {
          node {
            id
            title
            slug
            excerpt
            content
            date
          }
        }
      }
    }
  `)
  return  (
    <Layout>
      <ListGroup>
        {data.allWpPost.edges.map(
          (edge: { node: { slug: string; title: string; date: string } }) => (
            <ListItem href={`/post/${edge.node.slug}`} key={edge.node.slug}>
              <ListGroup.Item action>
                <CustomHeader>
                  {edge.node.title.replace(/&nbsp;/g, " ")}
                </CustomHeader>
                <CustomDate>
                  {new Date(edge.node.date).toLocaleDateString("en-US")}
                </CustomDate>
              </ListGroup.Item>
            </ListItem>
          )
        )}
      </ListGroup>
    </Layout>
  )
}
