import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import NumberFormat from "react-number-format"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"
import Table from "../components/table"
import createTable from "../utils/createTable"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xhvSupply: 14826022,
      price: 16.5,
      xUsdSupply: 22267043,
      xUsdMint: 4000000,
      priceAppreciation: 0.3,
      calculations: [],
    }
  }

  componentDidMount() {
    const { xhvSupply, price, xUsdSupply, xUsdMint, priceAppreciation } =
      this.state
    const calculations = createTable({
      xhvSupply,
      price,
      xUsdSupply,
      xUsdMint,
      priceAppreciation,
    })

    this.setState({ calculations })
  }
  render() {
    const {
      xhvSupply,
      price,
      xUsdSupply,
      xUsdMint,
      priceAppreciation,
      calculations,
    } = this.state
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

        <Table data={calculations} />
      </Layout>
    )
  }
}

export default IndexPage
