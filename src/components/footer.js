/* This example requires Tailwind CSS v2.0+ */

import React from "react"
import Logo from "../assets/xhv-logo.svg"
export default function Example() {
  const buttonClasses =
    "inline-block bg-xhv-blue py-2 px-4 border border-transparent rounded-md text-xs font-medium text-white hover:bg-xhv-bluer"
  return (
    <footer className="bg-xhv-dark bg-opacity-25">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-5 flex flex-wrap flex-col md:flex-row items-center justify-between">
          <div className="inline-block">
            <p className="text-base text-white">Community Built</p>
            <p className="text-sm text-white mt-3">
              Contibutions are welcome. Next to do are:
            </p>
            <ul className="mt-2 md:ml-2">
              <li className="text-xs text-white">
                Market Price and supply pulled dynamically.
              </li>
              <li className="text-xs text-white">
                Include other xAssets in xUSD value.
              </li>
              <li className="text-xs text-white">
                Convert periods to day and week. Show Dates on X Axis, include
                tail emission in XHV supply.
              </li>
              <li className="text-xs text-white ">
                xUSD minting inflation based on moving average of xUSD minting.
              </li>
            </ul>
          </div>

          <a
            href="https://github.com/philolivetti/xhvbull/"
            className={buttonClasses}
          >
            Github
          </a>
        </div>
        <p className="text-xs text-white pb-5">
          IF you want to buy me a beer or coffee:{" "}
          <span className="text-xhv-blue break-all">
            hvxy3cJ5C8jBfA3oPrjMNPNyv9fXiJu6NY4hwwvzN9kQBRfb6QAn5Z854s3ZEbBX5bSaQdvrgZbofHbmkTR1X87d2GPfroLLHz
          </span>
        </p>
      </nav>
    </footer>
  )
}
