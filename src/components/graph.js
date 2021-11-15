import React, { PureComponent } from "react"
import {
  LineChart,
  Line,
  XAxis,
  Label,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

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
  const lineParams = {
    strokeWidth: 2,
    activeDot: { r: 5, strokeWidth: 1 },
    dot: false,
    type: "monotone",
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 25,
          right: 20,
          left: 60,
          bottom: 100,
        }}
      >
        <XAxis dataKey="period" />

        <YAxis
          yAxisId="left"
          tickFormatter={tick => tick.toLocaleString()}
          tick={{ fontSize: "10px" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={tick => tick.toLocaleString()}
          tick={{ fontSize: "10px" }}
        >
          <Label
            value="XHV Price"
            angle={-90}
            position="insideRight"
            fill="#fff"
            style={{ textAnchor: "middle", fontSize: "12px" }}
          />
        </YAxis>
        <Tooltip content={customTooltip} />
        <Legend />
        <Line
          {...lineParams}
          yAxisId="left"
          dataKey="xUsdSupplyAfterMint"
          stroke="#0fbcf9"
          name="xUSD Supply"
        />
        <Line
          {...lineParams}
          yAxisId="left"
          dataKey="xhvMarketCap"
          stroke="#ffd32a"
          name="XHV Marketcap"
        />
        <Line
          {...lineParams}
          yAxisId="right"
          dataKey="appreciatedPrice"
          stroke="#0be881"
          name="XHV Price"
          strokeWidth={6}
          activeDot={{ r: 8, strokeWidth: 1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Graph
