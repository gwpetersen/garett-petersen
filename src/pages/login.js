import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from '../services/auth';
import Layout from '../components/layout';
import '../containers/Login.css';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return user.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin({ username: user, password });
    if (isLoggedIn()) {
      navigate('/private');
    }
  }

  return (
    <Layout>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
    </Layout>
  );
}
