import React from "react"
import NumberFormat from "react-number-format"
const Input = ({
  label,
  name,
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
          name={name}
          prefix={isPrice ? "$ " : ""}
          suffix={isPercentage ? " %" : ""}
          thousandSeparator={true}
          className={`
            p-2 focus:outline-none focus:border-xhv-blue-500 block w-full text-sm border-white border-2 rounded-md
            ${readOnly ? "opacity-50" : ""}`}
          value={value}
          onValueChange={({ value }) => updateFn(value)}
        />
      </div>
    </>
  )
}
const Form = ({
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
    { label: "Starting XHV supply", value: xhvSupply, name: "xhvSupply" },
    { label: "XHV market price", value: price, name: "price", isPrice: true },
    {
      label: "XHV market Cap",
      value: (price * xhvSupply).toFixed(0),
      name: "marketCap",
      readOnly: true,
      isPrice: true,
    },
    { label: "Starting xUSD supply", value: xUsdSupply, name: "xUsdSupply" },
    { label: "Daily xUSD minted", value: xUsdMint, name: "xUsdMint" },
    {
      label: "xUSD mint inflation",
      value: xUsdInflation,
      name: "xUsdInflation",
      isPercentage: true,
    },
    {
      label: "XHV price appreciation",
      value: priceAppreciation,
      name: "priceAppreciation",
      isPercentage: true,
    },
    { label: "Days to forecast", value: periods, name: "periods" },
  ]
  return (
    <>
      {inputs.map((i, index) => (
        <div className="md:w-full w-1/2 px-2" key={`input-${index}`}>
          <Input {...i} updateFn={newValue => updateFn(i.name, newValue)} />
        </div>
      ))}
    </>
  )
}

export default Form
