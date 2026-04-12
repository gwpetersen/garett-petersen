import React from "react"
import NavBar from "../navbar/nav"

const Header = () => (
  <header
    style={{
      background: "#111",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 1px 24px rgba(0, 0, 0, 0.5)",
    }}
  >
    <NavBar />
  </header>
)

export default Header
