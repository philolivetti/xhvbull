import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Form from "../components/form"
import Table from "../components/table"
import Graph from "../components/graph"
import createTable from "../utils/createTable"
import { navigate } from "@reach/router"

const buttonClasses =
  "inline-block ml-2 mt-5 flex items-center bg-xhv-blue py-1 px-2 md:py-2 md:px-4 border border-transparent rounded-md text-xs font-medium text-white hover:bg-xhv-bluer"
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
              href={`https://twitter.com/intent/tweet?text=Check out how ridiculously bullish ${
                typeof window !== "undefined"
                  ? encodeURIComponent(window.location.href)
                  : "https://xhvbull.com/"
              } is for @havenXHV`}
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
            className={`${buttonClasses}`}
            onClick={() => {
              this.setState({ showTable: !showTable })
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                clipRule="evenodd"
              />
            </svg>
            {showTable ? "Hide" : "Show"}
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
