import React from "react"

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
  },
  // More people...
]
/*
"period": 1,
"xUsdMint": 4000000,
"xUsdSupplyAfterMint": 26267043,
"xhvBurnt": 242424.24242424243,
"xhvSupplyAfterBurn": 14583597.757575758,
"ComputedPrice": 16.774280741041565,
"appreciatedPrice": 16.82460358326469,
"xhvMarketCap": 244629363,
"totalEconomy": 271630294.089,
"xhvFraction": 0.9032985511130303
*/

const labels = {
  period: "Period",
  xUsdMint: "xUSD Minted",
  xUsdSupplyAfterMint: "xUSD Supply After Mint",
  xhvBurnt: "XHV Burnt",
  xhvSupplyAfterBurn: "XHV Supply After Burn",
  appreciatedPrice: "XHV Price",
  xhvMarketCap: "XHV Market Cap",
  xhvFraction: "XHV % Market",
}

const formatting = {
  period: "Period",
  appreciatedPrice: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
  xhvFraction: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
}
const preFix = {
  xUsdMint: "$",
  xUsdSupplyAfterMint: "$",
  appreciatedPrice: "$",
  xhvMarketCap: "$",
}
const suffix = {
  xhvFraction: "%",
}

const formatter = ({
  value,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
}) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits,
  })

export default function Table({ data }) {
  return (
    <div className="flex flex-col mt-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.entries(labels).map(l => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {l[1]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((period, index) => (
                  <tr
                    key={`table-row-${period.period}`}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {Object.entries(period).map(([key, value]) => {
                      if (labels[key]) {
                        return (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            {preFix[key] ? preFix[key] : ""}
                            {formatting[key]
                              ? formatter({
                                  value,
                                  ...formatting[key],
                                })
                              : formatter({ value })}
                            {suffix[key] ? suffix[key] : ""}
                          </td>
                        )
                      }
                      return <></>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
