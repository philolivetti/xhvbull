/* This example requires Tailwind CSS v2.0+ */

import React from "react"
import Logo from "../assets/xhv-logo.svg"
export default function Footer() {
  const buttonClasses =
    "inline-block flex items-center bg-xhv-blue py-2 px-4 border border-transparent rounded-md text-xs font-medium text-white hover:bg-xhv-bluer"
  return (
    <footer className="bg-xhv-dark bg-opacity-25 mt-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-5 flex flex-wrap flex-col md:flex-row items-center justify-between">
          <div className="inline-block">
            <p className="text-base text-white">
              Community Built. Contibutions are welcome.
            </p>
            <p className="text-sm text-white mt-2">To do list:</p>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              style={{ fill: "#fff" }}
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Github
          </a>
        </div>
        <p className="text-xs text-white pb-5">
          If you want to buy me a beer or coffee:
          <br />
          <span className="text-xhv-blue break-all">
            hvxy3cJ5C8jBfA3oPrjMNPNyv9fXiJu6NY4hwwvzN9kQBRfb6QAn5Z854s3ZEbBX5bSaQdvrgZbofHbmkTR1X87d2GPfroLLHz
          </span>
        </p>
      </nav>
    </footer>
  )
}
