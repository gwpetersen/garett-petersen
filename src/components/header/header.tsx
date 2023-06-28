import React from "react"
import NavBar from "../navbar/nav"

const Header = () => (
  <header
    style={{
      background: "#404040",
      top: 0,
      marginBottom: "1.45rem",
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        minHeight: "10px",
      }}
    >
      <NavBar />
    </div>
  </header>
)

export default Header
