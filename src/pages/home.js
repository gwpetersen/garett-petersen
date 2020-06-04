import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Card, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import Layout from '../components/layout';
import HeroCarousel from '../components/carousel';
import BuiltSiteImage from '../components/builtsite';


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
`;
const BuiltSiteLink = styled.a`
  text-decoration: none !important;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const CardPostLink = styled.a`
  text-decoration: none !important;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const Header = styled.header`
  margin-top: 2em;
  box-sizing: border-box;
  display: block;
`;

const HoverImg = styled.div`
transition: transform .2s ease;
&:hover {
  transform: scale(1.1);
}
`;

const CardCustom = {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
  width: '18rem',
};

const HomePage = () => (
  <StaticQuery
    query={graphql`
      {
        allS3Image {
          nodes {
            Url
            Key
          }
        }
        allWordpressPost {
          nodes {
            slug
            content
            title
          }
        }
      }
    `}
    render={data => {
      const hawaiiPost = data.allWordpressPost.nodes.find(n => n.slug.includes('hawaii'));
      const hawaiiImg = data.allS3Image.nodes.find(n => n.Key.includes('hawaiiwaipiovalley.JPG'));
      const cancunPost = data.allWordpressPost.nodes.find(n => n.slug.includes('cancun'));
      const cancunImg = data.allS3Image.nodes.find(n => n.Key.includes('cancun1.jpg'));
      const balboaPost = data.allWordpressPost.nodes.find(n => n.slug.includes('balboa-park'));
      const balboaImg = data.allS3Image.nodes.find(n => n.Key.includes('huntington-library.jpg'));
      const newData = [
        ({
          ...hawaiiPost,
          ...hawaiiImg,
        }),
        ({
          ...cancunPost,
          ...cancunImg,
        }),
        ({
          ...balboaPost,
          ...balboaImg,
        }),
      ];
      return (
        <Layout>
          <HeroCarousel />
          <main>
            <div>
              <Header>
                <H2>View Some of My Post</H2>
              </Header>
              <ListGroup horizontal>
                {newData.map(node => (
                  <HoverImg>
                    <ListGroup.Item action key={node.Key}>
                      <CardPostLink href={`/post/${node.slug}`}>
                        <Card style={CardCustom}>
                          <Card.Img variant="top" src={node.Url} />
                          <Card.Body>
                            <Card.Title className="text-center" style={{ fontSize: 25, fontWeight: 600, fontColor: '#463b36' }}>
                              {node.title}
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </CardPostLink>
                    </ListGroup.Item>
                  </HoverImg>

                ))}
              </ListGroup>
              <Header>
                <H2>How I Built My Site</H2>
              </Header>
              <HoverImg>
                <ListGroup.Item action>
                  <BuiltSiteLink href="/post/how-i-built-my-site">
                    <BuiltSiteImage />
                  </BuiltSiteLink>
                </ListGroup.Item>
              </HoverImg>
            </div>
          </main>
        </Layout>
      );
    }}
  />
);

export default HomePage;
