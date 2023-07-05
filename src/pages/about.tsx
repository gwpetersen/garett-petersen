import React from "react"
import Layout from "../components/layout/layout"
import { graphql, useStaticQuery } from "gatsby";
import PortfolioCard from "../components/portrait/PortfolioCard";
import "../css/about.css";
import Img, { FluidObject } from "gatsby-image";

export default function LandingPage() {
    interface Node {
        Key: string;
        localFile: {
            childImageSharp: {
                fluid: FluidObject
            }
        }
    }
    const data = useStaticQuery(graphql`
    query {
        allS3Object(filter: { Key: { regex: "/.*techlogos.*/" } }) {
            edges {
              node {
                Key
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          },
          allWpPage(filter: {title: {eq: "About"}}) {
            nodes {
              content
            }
          }
    }
  `)
    const edges: {
        node: Node
    }[] = data.allS3Object.edges.filter((edge: { node: { localFile: string | null } }) => edge.node.localFile)
    const allPages: {
        content: string
    }[] = data.allWpPage.nodes.filter((node: { content: string | null }) => node.content)
    const contentData = allPages[0].content;
    return (
        <Layout>
            <div>
                <PortfolioCard />
            </div>
            <h2 className="header">About Me</h2>
            <div className="bio-container">
                <div className="bio" dangerouslySetInnerHTML={{ __html: contentData }} />
            </div>
            <h2 className="header">Recently Used Tech</h2>
            <div className='center'>
                <ul className="logo">
                    {edges.map(
                        ({ node }) => (
                            <li key={node.Key}>
                                <div className="logo-item">
                                    <Img
                                        className="image"
                                        alt={''}
                                        fluid={node.localFile.childImageSharp.fluid}
                                    />
                                </div>
                            </li>
                        )
                    )}
                </ul>

            </div>


        </Layout>
    )

}