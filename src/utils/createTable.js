const createPeriod = (
  period,
  xhvSupply,
  price,
  xUsdSupply,
  xUsdMint,
  priceAppreciation
) => {
  const xhvMarketCap = xhvSupply * price
  const xhvBurnt = xUsdMint / price
  const xhvSupplyAfterBurn = xhvSupply - xhvBurnt
  const xUsdSupplyAfterMint = xUsdSupply + xUsdMint
  const ComputedPrice = xhvMarketCap / xhvSupplyAfterBurn
  const appreciatedPrice = ComputedPrice * (1 + priceAppreciation / 100)
  const xhvNewMarketCap = appreciatedPrice * xhvSupplyAfterBurn
  const totalEconomy = xhvNewMarketCap + xUsdSupplyAfterMint
  const xhvFraction = (xhvNewMarketCap / totalEconomy) * 100
  return {
    period: period + 1,
    xUsdMint,
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
  xUsdMint,
  priceAppreciation,
  numberOfPeriods = 10,
}) => {
  const periods = []

  periods.push(
    createPeriod(0, xhvSupply, price, xUsdSupply, xUsdMint, priceAppreciation)
  )

  for (let i = 0; i < numberOfPeriods - 1; i++) {
    const lastPeriod = periods[i]
    periods.push(
      createPeriod(
        i + 1,
        lastPeriod.xhvSupplyAfterBurn,
        lastPeriod.appreciatedPrice,
        lastPeriod.xUsdSupplyAfterMint,
        lastPeriod.xUsdMint,
        priceAppreciation
      )
    )
  }

  return periods
}

export default createTable
