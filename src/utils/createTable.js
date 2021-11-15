const createPeriod = (
  period,
  xhvSupply,
  price,
  xUsdSupply,
  xUsdInflation = 0,
  xUsdMint,
  priceAppreciation
) => {
  const xhvMarketCap = xhvSupply * price
  const xUsdMinted = xUsdMint * (1 + xUsdInflation / 100)
  const xhvBurnt = xUsdMint / price
  const xhvSupplyAfterBurn = xhvSupply - xhvBurnt
  const xUsdSupplyAfterMint = xUsdSupply + xUsdMinted
  const ComputedPrice = xhvMarketCap / xhvSupplyAfterBurn
  const appreciatedPrice = ComputedPrice * (1 + priceAppreciation / 100)
  const xhvNewMarketCap = appreciatedPrice * xhvSupplyAfterBurn
  const totalEconomy = xhvNewMarketCap + xUsdSupplyAfterMint
  const xhvFraction = (xhvNewMarketCap / totalEconomy) * 100
  return {
    period: period + 1,
    xUsdMint: xUsdMinted,
    xUsdSupplyAfterMint,
    xhvBurnt,
    xhvSupplyAfterBurn,
    ComputedPrice,
    appreciatedPrice,
    xhvMarketCap,
    totalEconomy,
    xhvFraction,
  }
}

const createTable = ({
  xhvSupply,
  price,
  xUsdSupply,
  xUsdInflation,
  xUsdMint,
  priceAppreciation,
  numberOfPeriods = 200,
}) => {
  const periods = []

  periods.push(
    createPeriod(
      0,
      xhvSupply,
      price,
      xUsdSupply,
      0,
      xUsdMint,
      priceAppreciation
    )
  )

  for (let i = 0; i < numberOfPeriods - 1; i++) {
    const lastPeriod = periods[i]
    periods.push(
      createPeriod(
        i + 1,
        lastPeriod.xhvSupplyAfterBurn,
        lastPeriod.appreciatedPrice,
        lastPeriod.xUsdSupplyAfterMint,
        xUsdInflation,
        lastPeriod.xUsdMint,
        priceAppreciation
      )
    )
  }

  return periods
}

export default createTable
