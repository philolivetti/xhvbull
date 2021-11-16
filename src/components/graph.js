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

import { format } from "date-fns"
import addDays from "date-fns/addDays"

const today = new Date()
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
      <p className="text-xs md:text-base mb-2">
        {format(addDays(today, label - 1), "MM/dd/yyyy")}
      </p>
      <table>
        <tbody>
          {payload.map(c => {
            return (
              <tr className="text-xs md:text-base" key={c.dataKey}>
                <th style={{ color: c.stroke, textAlign: "left" }}>{c.name}</th>
                <td style={{ paddingLeft: "5px", textAlign: "right" }}>
                  {c.name == "XHV Price" ? "$" : ""}
                  {c.name == "XHV / xUSD"
                    ? formatter({
                        value: c.value,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : formatter({ value: c.value })}
                  {c.name == "XHV / xUSD" ? " %" : ""}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const Graph = ({ data, isMobile = false }) => {
  const lineParams = {
    strokeWidth: 2,
    activeDot: { r: 5, strokeWidth: 1 },
    dot: false,
    type: "monotone",
  }
  return (
    <ResponsiveContainer width="99%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 25,
          right: isMobile ? 7 : 20,
          left: isMobile ? 7 : 60,
          bottom: isMobile ? 7 : 20,
        }}
      >
        <XAxis dataKey="period" tick={false} />
        {!isMobile ? (
          <>
            <YAxis
              yAxisId="left"
              tickFormatter={tick => (tick / 1000000).toLocaleString() + " mil"}
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
            <YAxis
              yAxisId="middle"
              orientation="right"
              tick={false}
              style={{ display: "none" }}
            />
          </>
        ) : (
          <></>
        )}
        <Tooltip content={customTooltip} />
        <Legend height={50} verticalAlign="top" />
        <Line
          {...lineParams}
          yAxisId="right"
          dataKey="appreciatedPrice"
          stroke="#0be881"
          name="XHV Price"
          strokeWidth={6}
          activeDot={{ r: 8, strokeWidth: 1 }}
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
          yAxisId="left"
          dataKey="xUsdSupplyAfterMint"
          stroke="#0fbcf9"
          name="xUSD Supply"
        />
        <Line
          {...lineParams}
          yAxisId="middle"
          dataKey="xhvFraction"
          stroke="#888"
          name="XHV / xUSD"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Graph
