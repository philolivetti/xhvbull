/* This example requires Tailwind CSS v2.0+ */

import React from "react"
import Logo from "../assets/xhv-logo.svg"
export default function Example() {
  return (
    <header className="bg-xhv-dark">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <img className="h-10 w-auto" src={Logo} />
            <h2 className="ml-5 font-lg font-bold text-white">
              Haven Bullish AF
            </h2>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="#"
              className="inline-block bg-xhv-blue py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-xhv-bluer"
            >
              Sign in
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
