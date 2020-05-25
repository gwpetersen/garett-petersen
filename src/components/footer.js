import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import styled from 'styled-components';

const customStyle = {
  color: '#463b36',
  display: 'flex',
  height: '50px',
  justifyContent: 'center',
};

const CopyRight = styled.a`
  color: rgb(117, 117, 117);
  transition: color 0.2s ease 0s;
  text-decoration: none;
  text-decoration-line: none;
  text-decoration-style: initial;
  text-decoration-color: initial;
  font-size: 1.3rem;
`;
const Footer = () => (
  <footer>
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
          key="facebook-key"
          url="https://www.facebook.com/garett.petersen.3"
          className="list-inline-item"
          style={{ height: 40, width: 40 }}
        />
      </ListGroup>
    </Container>
    <div className="footer-copyright text-center py-3">
      © 2020 Copyright:
      <CopyRight href="/home"> Garett Petersen</CopyRight>
    </div>
  </footer>
);

export default Footer;
