import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Img, { FluidObject } from "gatsby-image";
import "./Portfolio.css";
import { Col, Container, Row } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import { ListGroup } from "react-bootstrap";
export interface Node {
    Key: string;
    localFile: {
        childImageSharp: {
            fluid: FluidObject
        }
    }
}
export interface Edges {
    node: Node
}
const customStyle: React.CSSProperties = {
    display: "flex",
    height: "60px",
    justifyContent: "center",
}

const PortfolioCard = () => {
    const data = useStaticQuery(graphql`
    query  {
      allS3Object(filter: { Key: { regex: "/.*icons.*/" } }) {
        edges {
          node {
            Key
            localFile {
              childImageSharp {
                fluid(maxWidth: 1024) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
    const edges: {
        node: Node
    }[] = data.allS3Object.edges.filter((edge: { node: { localFile: string | null } }) => edge.node.localFile)
    const image = edges[0]
    return (
        <div>
            <div className="main-container shadow">
                <Container>
                    <br />
                    <br />
                    <Row>
                        <Col sm={12} md={4}>
                            <div className="container">
                                <Img
                                    alt={''}
                                    fluid={image.node.localFile.childImageSharp.fluid}
                                    style={{
                                        width: "85%", borderRadius: "100%"
                                    }}
                                />
                                <br />
                                <Container fluid style={customStyle}>
                                    <ListGroup horizontal>
                                        <SocialIcon
                                            key="linkedin-key"
                                            url="http://linkedin.com/in/garett-petersen-5317b8117/"
                                            style={{ height: 40, width: 40 }}
                                            className="list-inline-item"
                                        />
                                        <SocialIcon
                                            key="twitter-key"
                                            url="https://twitter.com/GMoney_bhd/"
                                            className="list-inline-item"
                                            style={{ height: 40, width: 40 }}
                                        />
                                        <SocialIcon
                                            key="github-key"
                                            url="https://github.com/gwpetersen"
                                            style={{ height: 40, width: 40 }}
                                            className="list-inline-item"
                                        />
                                    </ListGroup>
                                </Container>
                            </div>
                        </Col>
                        <Col>
                            <div className="container">
                                <h2>Garett Petersen</h2>
                                <p>Software Engineer</p>
                                <p>Anaheim, California, USA</p>
                            </div>
                            <hr />
                            <Container>
                                <Row>

                                    <Col>
                                        <p className="bio">
                                            I'm a meticulous Software Engineer with a strong
                                            technical background. I specialize in designing
                                            comprehensive test plans, leadership, executing thorough testing processes,
                                            and implementing automation frameworks to ensure the delivery
                                            of high-quality software products.
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                            <br />
                            <br />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default PortfolioCard
