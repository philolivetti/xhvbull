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
        className="block text-xs font-medium text-white pl-2 mt-3"
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
            p-2 focus:outline-none focus:border-xhv-blue-500 block w-full text-sm border-white border-2 rounded-md
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
    { label: "Starting XHV supply", value: xhvSupply, key: "xhvSupply" },
    { label: "XHV market price", value: price, key: "price", isPrice: true },
    {
      label: "XHV market Cap",
      value: (price * xhvSupply).toFixed(0),
      key: "marketCap",
      readOnly: true,
      isPrice: true,
    },
    { label: "Starting xUSD supply", value: xUsdSupply, key: "xUsdSupply" },
    { label: "xUSD minted per period", value: xUsdMint, key: "xUsdMint" },
    {
      label: "xUSD mint inflation",
      value: xUsdInflation,
      key: "xUsdInflation",
      isPercentage: true,
    },
    {
      label: "XHV price appreciation",
      value: priceAppreciation,
      key: "priceAppreciation",
      isPercentage: true,
    },
    { label: "Mint/burn periods", value: periods, key: "periods" },
  ]
  return (
    <>
      {inputs.map(i => (
        <div className="md:w-full w-1/2 px-2">
          <Input {...i} updateFn={newValue => updateFn(i.key, newValue)} />
        </div>
      ))}
    </>
  )
}
