import React from "react"
import styled from "styled-components"
import Layout from "../components/layout/layout"
import BuiltSiteImage from "../components/subpost/subpost"
import Card from 'react-bootstrap/Card';
import { graphql, useStaticQuery, navigate } from "gatsby";
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

const CustomDate = styled.div`
  font-size: 1rem;
  display: block;
  color: rgba(0, 0, 0, 0.4);
  text-align: right;
  font-weight: 500;
  box-sizing: border-box;
`

const Header = styled.header`
  margin-top: 2em;
  box-sizing: border-box;
  display: block;
`
const PostCardHover = styled.div`
&:hover{
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
`

const PostCard = styled(Card)`
border-radius: 4px;
background: #fff;
margin: 8px;
box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
padding: 14px 80px 18px 36px;
cursor: pointer;
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
          {postData.map(
            ({ slug, title, date, content }) => (
              <PostCardHover className="card-example d-flex flex-row flex-nowrap overflow-auto">
                <PostCard onClick={() => navigate(`/post/${slug}`)}>
                  <Card.Body >
                    <Card.Title>{title.replace(/&nbsp;/g, " ")}</Card.Title>
                    <CustomDate>
                      {new Date(date).toLocaleDateString("en-US")}
                    </CustomDate>
                    <Card.Text dangerouslySetInnerHTML={{ __html: content }} />
                  </Card.Body>
                </PostCard>
              </PostCardHover>

            )
          )}
        </div>
      </main>
    </Layout>
  )

}


