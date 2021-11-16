import React from "react"

const labels = {
  period: "Day",
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
