import React from "react"

const Input = ({ label, key, value, updateFn }) => {
  return (
    <>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-white pl-2 mt-5"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name={key}
          id={key}
          className="p-2 focus:outline-none focus:border-xhv-blue-500 block w-full text-md border-white border-2 rounded-md"
          value={value}
          onChange={updateFn}
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
  priceAppreciation,
  updateFn,
}) => {
  const inputs = [
    { label: "XHV Supply", value: xhvSupply, key: "xhvSupply" },
    { label: "XHV Market Price", value: price, key: "price" },
    { label: "xUSD Supply", value: xUsdSupply, key: "xUsdSupply" },
    { label: "xUSD Mint", value: xUsdMint, key: "xUsdMint" },
    {
      label: "Price Appreciation",
      value: priceAppreciation,
      key: "priceAppreciation",
    },
  ]
  return (
    <div className="w-1/4">
      {inputs.map(i => (
        <Input {...i} updateFn={event => updateFn(i.key, event.target.value)} />
      ))}
    </div>
  )
}
