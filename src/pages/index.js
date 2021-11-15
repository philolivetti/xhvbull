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
      xhvSupply: 14835386,
      price: 18.11,
      xUsdSupply: 22267043,
      xUsdMint: 4000000,
      xUsdInflation: 0.25,
      priceAppreciation: 0.25,
      periods: 300,
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
        <SEO title="LFG: XHV Price based on xUSD" />

        <div className="w-full text-white text-sm py-5 text-justify">
          <p className="mb-2">
            This is an easy to use XHV price forecasting tool based on various
            xAsset minting characteristics.
          </p>
          <p className="mb-2">
            Inspired by{" "}
            <a
              className="text-xhv-blue"
              target="_blank"
              href="https://medium.com/@crypto.oli/haven-protocol-xhv-future-price-model-based-on-xusd-adoption-1ee5a0113979"
            >
              crypt∞li's 2020 Medium article
            </a>{" "}
            and{" "}
            <a
              className="text-xhv-blue"
              target="_blank"
              href="https://www.youtube.com/watch?v=J6Oz5RdMJgg"
            >
              CTO Larsson's video
            </a>
            , please read and watch both of these excellent resources.
          </p>
          <p className="md:hidden">
            The user experience on mobile is not ideal. Please click on the
            graph to see tooltip.
          </p>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/6 flex flex-wrap">
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
            className="mt-10 mx-2 inline-block bg-xhv-blue py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-xhv-bluer"
            onClick={() => {
              this.setState({ showTable: !showTable })
            }}
          >
            {showTable ? "Hide" : "Show"} Data
          </button>
        </div>
        <div className="w-full md:w-2/3 lg:w-5/6 mt-10 h-screen md:h-auto">
          <Graph data={calculations} />
        </div>
        {showTable ? <Table data={calculations} /> : <></>}
      </Layout>
    )
  }
}

export default IndexPage
