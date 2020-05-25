import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Layout from '../components/layout';
import HeroCarousel from '../components/carousel';

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
      }
    `}
    render={data => (
      <Layout>
        <HeroCarousel />
        <main>
          <div>
            <p>Hello, my name is Garett Petersen. Welcome to my site. </p>
          </div>
          <p>
            Mauris viverra scelerisque lobortis. Orci varius natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus. Fusce
            ultrices enim sit amet elit tincidunt maximus. Suspendisse vitae
            pellentesque lectus. Duis commodo leo suscipit augue mollis, non
            venenatis dolor ullamcorper. Duis tincidunt scelerisque lacus, vel
            vehicula leo consectetur vel. Duis posuere nisl non odio consequat
            ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <ListGroup horizontal>
            {data.allS3Image.nodes.map(node => (
              <ListGroup.Item>
                <Card style={CardCustom}>
                  <Card.Img variant="top" src={node.Url} />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </Card.Text>
                    <Button style={{ backgroundColor: '#2F4F4F' }}>
                      Read More...
                    </Button>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p>
            Etiam a leo nec mi blandit euismod. Etiam fringilla odio vitae risus
            ornare, id bibendum velit consequat. Fusce posuere risus
            sollicitudin condimentum ultrices. Fusce gravida, purus eget laoreet
            mattis, velit sapien ultrices diam, id dapibus erat leo id quam.
            Maecenas quis risus convallis, placerat elit non, iaculis tortor.
            Nullam porttitor magna risus, quis bibendum metus tincidunt in.
            Etiam vel ligula ac risus mattis tincidunt vel sit amet ante. Morbi
            et viverra ligula. Ut ac dignissim nisi, condimentum imperdiet
            mauris. Pellentesque ut ipsum vel diam tristique faucibus eu et
            lectus. Maecenas posuere neque non lacus bibendum, sit amet pharetra
            justo semper. Sed mi risus, tempor sit amet ligula eget, varius
            pretium est. Sed a odio in orci accumsan pretium suscipit ut quam.
          </p>
        </main>
      </Layout>
    )}
  />
);

export default HomePage;
