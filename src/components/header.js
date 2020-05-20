import PropTypes from "prop-types"
import React from "react"
import NavBar from './NavBar';


const Header = () => (
  <header
    style={{
      background: `white`,
      marginBottom: `1.45rem`,
    }}
  >
      <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
     <NavBar/>
     </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
