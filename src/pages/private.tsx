import React, { useEffect } from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout/layout"
import PrivateGallery from "../components/private/private"
import { isLoggedIn } from "../services/auth"

const isBrowser = () => typeof window !== "undefined"

export default function Private() {
  useEffect(() => {
    if (isBrowser() && !isLoggedIn()) {
      navigate("/login")
    }
  })
  return <Layout>{isLoggedIn() ? <PrivateGallery /> : <div></div>}</Layout>
}
