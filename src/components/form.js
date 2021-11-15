import React from "react"
import NumberFormat from "react-number-format"
const Input = ({
  label,
  key,
  value,
  readOnly = false,
  isPrice = false,
  isPercentage = false,
  updateFn,
}) => {
  return (
    <>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-white pl-2 mt-5"
      >
        {label}
      </label>
      <div className="mt-1">
        <NumberFormat
          readOnly={readOnly}
          type="text"
          name={key}
          id={key}
          prefix={isPrice ? "$ " : ""}
          suffix={isPercentage ? " %" : ""}
          thousandSeparator={true}
          className={`
            p-2 focus:outline-none focus:border-xhv-blue-500 block w-full text-md border-white border-2 rounded-md
            ${readOnly ? "opacity-50" : ""}`}
          value={value}
          onValueChange={values => {
            const { formattedValue, value } = values
            updateFn(value)
          }}
        />
      </div>
    </>
  )
}
export default ({
  xhvSupply,
  price,
  xUsdSupply,
  xUsdMint,
  xUsdInflation,
  priceAppreciation,
  periods,
  updateFn,
}) => {
  const inputs = [
    { label: "Starting XHV Supply", value: xhvSupply, key: "xhvSupply" },
    { label: "XHV Market Price", value: price, key: "price", isPrice: true },
    {
      label: "XHV Market Cap",
      value: price * xhvSupply,
      key: "marketCap",
      readOnly: true,
      isPrice: true,
    },
    { label: "Starting xUSD Supply", value: xUsdSupply, key: "xUsdSupply" },
    { label: "xUSD Minted per period", value: xUsdMint, key: "xUsdMint" },
    {
      label: "xUSD Mint Inflation",
      value: xUsdInflation,
      key: "xUsdInflation",
      isPercentage: true,
    },
    {
      label: "XHV Price Appreciation per period",
      value: priceAppreciation,
      key: "priceAppreciation",
      isPercentage: true,
    },
    { label: "Mint/Burn Periods", value: periods, key: "periods" },
  ]
  return (
    <>
      {inputs.map(i => (
        <Input {...i} updateFn={newValue => updateFn(i.key, newValue)} />
      ))}
    </>
  )
}
