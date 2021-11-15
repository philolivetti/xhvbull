import React, { PureComponent } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

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

const formatter = ({
  value,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
}) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits,
  })
const customTooltip = tooltipProps => {
  if (!tooltipProps.payload.length) return <></>
  const { label, payload } = tooltipProps
  if (!payload.length) return <></>
  return (
    <div className={`box bg-white rounded p-2`}>
      <p className="is-size-7">Period {label}</p>
      <table>
        <tbody>
          {payload.map(c => {
            return (
              <tr className="is-size-7" key={c.dataKey}>
                <th style={{ color: c.stroke, textAlign: "left" }}>{c.name}</th>
                <th style={{ paddingLeft: "2px", textAlign: "right" }}>
                  {c.name == "XHV Price" ? "$" : ""}
                  {formatter({ value: c.value })}
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const Graph = ({ data }) => {
  return (
    <div className="w-full md:w-2/3 lg:w-4/5 mt-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 25,
            right: 0,
            left: 60,
            bottom: 5,
          }}
        >
          <XAxis dataKey="period" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={customTooltip} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="xUsdSupplyAfterMint"
            stroke="#0fbcf9"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={false}
            name="xUSD Supply"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="xhvMarketCap"
            stroke="#ffd32a"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={false}
            name="XHV Marketcap"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="appreciatedPrice"
            stroke="#0be881"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8 }}
            name="XHV Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
