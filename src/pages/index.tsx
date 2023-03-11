import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import BuiltSiteImage from "../components/subpost"

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
`
const BuiltSiteLink = styled.a`
  text-decoration: none !important;
  color: inherit;
  &:hover {
    color: inherit;
  }
`

const Header = styled.header`
  margin-top: 2em;
  box-sizing: border-box;
  display: block;
`

const HoverImg = styled.div`
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
    opacity: 0.5;
    cursor: pointer;
  }
`

export default function LandingPage() {
  return (
    <Layout>
      <main>
        <div>
          <Header>
            <H2>How I Built My Site</H2>
          </Header>
          <HoverImg>
            <BuiltSiteLink href="/post/how-i-built-my-site">
              <BuiltSiteImage />
            </BuiltSiteLink>
          </HoverImg>
        </div>
      </main>
    </Layout>
  )

}


