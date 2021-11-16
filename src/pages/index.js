import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Form from "../components/form"
import Table from "../components/table"
import Graph from "../components/graph"
import createTable from "../utils/createTable"
import { navigate } from "@reach/router"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xhvSupply: 14836682,
      price: 16.71,
      xUsdSupply: 22267043,
      xUsdMint: 2500000,
      xUsdInflation: 0.25,
      priceAppreciation: 0.25,
      periods: 365,
      calculations: [],
      showTable: false,
    }
  }

  componentDidMount() {
    console.log({ props: this.props })
    if (
      this.props.location &&
      this.props.location.search &&
      this.props.location.search.includes("strategy")
    ) {
      const search = this.props.location.search
      const splitString = search.split("=")
      if (splitString.length > 1) {
        const properties = splitString[1].split(",")

        console.log({ search, properties })
        if (properties.length == 7) {
          this.setState({
            xhvSupply: properties[0],
            price: properties[1],
            xUsdSupply: properties[2],
            xUsdInflation: properties[3],
            xUsdMint: properties[4],
            priceAppreciation: properties[5],
            periods: properties[6],
          })
        }
      }
    } else {
      this.calculateData()
    }
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
      xhvSupply: parseInt(xhvSupply),
      price,
      startingXusdSupply: parseInt(xUsdSupply),
      xUsdInflation,
      xUsdMint: parseInt(xUsdMint),
      priceAppreciation,
      numberOfPeriods: parseInt(periods),
    })

    this.setState({ calculations })
  }

  // updates strategy in the URL so that people can bookmark this strategy specifically
  async updateStrategy() {
    const {
      xhvSupply,
      price,
      xUsdSupply,
      xUsdInflation,
      xUsdMint,
      priceAppreciation,
      periods,
    } = this.state

    const concatenatedString = `${xhvSupply},${price},${xUsdSupply},${xUsdInflation},${xUsdMint},${priceAppreciation},${periods}`
    if (window) {
      window.history.pushState(
        {},
        null,
        window.location.origin + `?strategy=${concatenatedString}`
      )
    }
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
        <Seo title="LFG: XHV price based on xUSD minting" />

        <div className="w-full text-white text-sm py-5">
          <p className="mb-2">
            This is an easy to use XHV price forecasting tool based on xAsset
            minting.
          </p>
          <p className="mb-2">
            Inspired by{" "}
            <a
              rel="noreferrer"
              className="text-xhv-blue"
              target="_blank"
              href="https://medium.com/@crypto.oli/haven-protocol-xhv-future-price-model-based-on-xusd-adoption-1ee5a0113979"
            >
              crypt∞li's 2020 Medium article
            </a>{" "}
            and{" "}
            <a
              rel="noreferrer"
              target="_blank"
              className="text-xhv-blue"
              href="https://www.youtube.com/watch?v=J6Oz5RdMJgg"
            >
              CTO Larsson's video
            </a>
            , please read and watch both of these excellent resources.
          </p>
          <p className="mb-2">
            Changes to your strategy will be added to the URL and this can be
            bookmarked or shared{" "}
            <a
              target="_blank"
              className="text-xhv-blue"
              href={`https://twitter.com/intent/tweet?text=Check out how ridiculously bullish this is ${
                typeof window !== "undefined"
                  ? encodeURIComponent(window.location.href)
                  : ""
              } for @havenXHV`}
            >
              directly
            </a>
          </p>
          <p>
            Note: This tool does not yet include block rewards in supply
            calculations.
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
                if (stateValue == value) {
                  this.updateStrategy()
                  this.calculateData()
                }
              }, 1250)
            }}
          />
          <button
            className="mt-5 mx-2 inline-block bg-xhv-blue py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-xhv-bluer"
            onClick={() => {
              this.setState({ showTable: !showTable })
            }}
          >
            {showTable ? "Hide" : "Show"} Data
          </button>
        </div>
        {calculations.length == this.state.periods ? (
          <>
            <div className="w-full md:hidden" style={{ height: "50vh" }}>
              <p className="md:hidden text-base text-white mt-10 text-center">
                Please click on the graph to see data
              </p>
              <Graph data={calculations} isMobile={true} />
            </div>

            <div className="w-full md:w-2/3 lg:w-5/6 hidden md:inline-block">
              <Graph data={calculations} />
            </div>
          </>
        ) : (
          <></>
        )}
        {showTable ? <Table data={calculations} /> : <></>}
      </Layout>
    )
  }
}

export default IndexPage
