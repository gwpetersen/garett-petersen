import React from "react"
import NavBar from "./NavBar"
import logo from "../images/nameLogo.png"

const Header = () => (
  <header
    style={{
      background: "white",
      marginBottom: "1.45rem",
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem",
      }}
    >
      <a href="/home">
        <img
          src={logo}
          width="240"
          height="120"
          className="d-inline-block align-top"
          alt="logo"
        />
      </a>
      <NavBar />
    </div>
  </header>
)

export default Header
