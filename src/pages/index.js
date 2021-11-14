import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xhvSupply: 14826022,
      price: 16.5,
      xUsdSupply: 22267043,
      xUsdMint: 4000000,
      priceAppreciation: 0.3,
    }
  }
  render() {
    const { xhvSupply, price, xUsdSupply, xUsdMint, priceAppreciation } =
      this.state
    const formParams = {
      xhvSupply,
      price,
      xUsdSupply,
      xUsdMint,
      priceAppreciation,
    }
    return (
      <Layout>
        <SEO title="Home" />
        <Form
          {...formParams}
          updateFn={(key, value) => this.setState({ [key]: value })}
        />
      </Layout>
    )
  }
}

export default IndexPage
