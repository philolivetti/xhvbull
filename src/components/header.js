/* This example requires Tailwind CSS v2.0+ */

import React from "react"
import Logo from "../assets/xhv-logo.svg"
export default function Example() {
  const buttonClasses =
    "inline-block bg-xhv-blue py-1 px-2 md:py-2 md:px-4 border border-transparent rounded-md text-xs font-medium text-white hover:bg-xhv-bluer"
  return (
    <header className="bg-xhv-dark">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img className="h-10 w-auto" src={Logo} />
            <h2 className="ml-5 font-lg font-bold text-white">Haven Bull</h2>
          </div>
          <div className="space-x-4 space-y-2 md:space-y-0 flex flex-col md:flex-row flex-wrap">
            <a
              href="https://havenprotocol.org/"
              className={buttonClasses}
              target="_blank"
            >
              Haven Protocol
            </a>

            <a
              href="https://trade.kucoin.com/XHV-USDT"
              className={buttonClasses}
              target="_blank"
            >
              LFG! Buy now
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
