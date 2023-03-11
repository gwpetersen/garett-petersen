import React, { useEffect } from "react"
import { navigate } from "gatsby"
import Layout from "../components/Layout"
import PrivateGallery from "../components/PrivateGallery"
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
