import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { navigate } from "gatsby"
import styled from "styled-components"
import { handleLogin, isLoggedIn } from "../services/auth"
import Layout from "../components/layout"
import "../containers/Login.css"

const ErrorMessage = styled.div`
  padding-bottom: 10px;
`
export default function Login() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrormessage] = useState("")
  function validateForm() {
    return user.length > 0 && password.length > 0
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    handleLogin({ username: user, password })
    if (isLoggedIn()) {
      navigate("/private")
    }
    if (!isLoggedIn()) {
      setErrormessage("The username or password is incorrect")
    }
  }

  return (
    <Layout>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <ErrorMessage className="text-danger">{errorMessage}</ErrorMessage>
          <Button
            variant="dark"
            style={{ backgroundColor: "#404040" }}
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
        </Form>
      </div>
    </Layout>
  )
}
