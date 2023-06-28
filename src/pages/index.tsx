import React, { useState } from "react"
import styled from "styled-components"
import Layout from "../components/layout/layout"
import BuiltSiteImage from "../components/subpost/subpost"
import Card from 'react-bootstrap/Card';
import { graphql, useStaticQuery, navigate } from "gatsby";
import { Container, Row } from "react-bootstrap";
const H2 = styled.h2`
  color: #463b36;
  font-family: Lora, serif;
  font-weight: 400;
  font-size: 2.25rem;
  margin: 0rem;
  line-height: 1.25;
  margin-bottom: 2rem;
  font-family: Lora;
  font-weight: 600;
  text-align: center;
`
const BuiltSiteLink = styled.a`
  text-decoration: none !important;
  color: inherit;
  &:hover {
    color: inherit;
  }
`

const Header = styled.header`
  margin-top: 2em;
  box-sizing: border-box;
  display: block;
`

const LatesPostHeader = styled.h2`
  margin-top: 2em;
  text-align: center;
`

const HoverImg = styled.div`
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
    opacity: 0.5;
    cursor: pointer;
  }
`

export default function LandingPage() {
  interface NodeInterface {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    categories: { nodes: { name: string }[] }
    tags: { nodes: { name: string }[] }
  }
  interface EdgesInterface {
    node: NodeInterface
  }[]
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
  const edges: EdgesInterface[] = data.allWpPost.edges;
  const postData = edges.map(({ node }) => {
    return {
      date: new Date(node.date).toLocaleDateString("en-US"),
      title: node.title.replace(/&nbsp;/g, " "),
      slug: node.slug,
      content: node.excerpt
    }
  }).flat().sort((a, b) => {
    const dateA = a.date.split('/').reverse().join('');
    const dateB = b.date.split('/').reverse().join('');
    return dateA > dateB ? 1 : dateA > dateB ? -1 : 0;
  }).slice(0, 3);
  console.log(postData)
  return (
    <Layout>
      <main>
        <div>
          <Header>
            <H2>How I Built My Site</H2>
          </Header>
          <HoverImg>
            <BuiltSiteLink href="/post/how-i-built-my-site">
              <BuiltSiteImage />
            </BuiltSiteLink>
          </HoverImg>
          <Header>
            <LatesPostHeader>Latest Post</LatesPostHeader>
          </Header>
          <Container fluid className="App py-2 overflow-hidden">
            <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
              {postData.map(
                ({ slug, title, content }) => (
                  <Card onClick={() => navigate(`/post/${slug}`)} style={{ cursor: "pointer", width: '18rem' }}>
                    <Card.Body >
                      <Card.Title>{title.replace(/&nbsp;/g, " ")}</Card.Title>
                      <Card.Text dangerouslySetInnerHTML={{ __html: content }} />
                    </Card.Body>
                  </Card>
                )
              )}
            </Row>
          </Container>
        </div>
      </main>
    </Layout>
  )

}


