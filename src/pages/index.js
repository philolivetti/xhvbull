import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import NumberFormat from "react-number-format"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/form"
import Table from "../components/table"
import Graph from "../components/graph"
import createTable from "../utils/createTable"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xhvSupply: 14826022,
      price: 16.5,
      xUsdSupply: 22267043,
      xUsdMint: 4000000,
      xUsdInflation: 0.1,
      priceAppreciation: 0.3,
      periods: 200,
      calculations: [],
      showTable: false,
    }
  }

  componentDidMount() {
    this.calculateData()
  }

  calculateData() {
    const {
      xhvSupply,
      price,
      xUsdSupply,
      xUsdInflation,
      xUsdMint,

      priceAppreciation,
      periods,
    } = this.state
    const calculations = createTable({
      xhvSupply,
      price,
      xUsdSupply,
      xUsdInflation,
      xUsdMint,
      priceAppreciation,
      numberOfPeriods: periods,
    })

    this.setState({ calculations })
  }
  render() {
    const {
      xhvSupply,
      price,
      xUsdSupply,
      xUsdInflation,
      xUsdMint,
      priceAppreciation,
      periods,
      calculations,

      showTable,
    } = this.state
    const formParams = {
      xhvSupply,
      price,
      xUsdSupply,
      xUsdInflation,
      periods,
      xUsdMint,

      priceAppreciation,
    }
    return (
      <Layout>
        <SEO title="Home" />
        <div className="w-full md:w-1/3 lg:w-1/5">
          <Form
            {...formParams}
            updateFn={(key, value) => {
              this.setState({ [key]: value })
              // Recalc after a second
              setTimeout(() => {
                const stateValue = this.state[key]
                console.log({ stateValue, value })
                if (stateValue == value) {
                  this.calculateData()
                }
              }, 1250)
            }}
          />
          <button
            className="mt-10 inline-block bg-xhv-blue py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-xhv-bluer"
            onClick={() => {
              this.setState({ showTable: !showTable })
            }}
          >
            {showTable ? "Hide" : "Show"} Data
          </button>
        </div>
        <Graph data={calculations} />
        {showTable ? <Table data={calculations} /> : <></>}
      </Layout>
    )
  }
}

export default IndexPage
