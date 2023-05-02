const SYMBOLS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/stock-symbols";
const MARKET_CAPS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/stock-market-caps";
const PRICES_API_BASE_URL = "https://api.frontendexpert.io/api/fe/stock-prices";

/**
 * The function retrieves data on trending stocks based on market capitalization and returns an array
 * of objects containing information on the stocks' symbols, names, market caps, and prices.
 * @param n - The number of top trending stocks to retrieve.
 * @returns The function `trendingStocks` returns an array of objects containing information about the
 * top `n` trending stocks, including their symbol, name, market capitalization, and current price.
 */
async function trendingStocks(n) {
  const [symbolsResponse, marketCapsResponse] = await Promise.all([
    fetch(SYMBOLS_API_BASE_URL),
    fetch(MARKET_CAPS_API_BASE_URL),
  ]);

  const [symbols, marketCaps] = await Promise.all([
    symbolsResponse.json(),
    marketCapsResponse.json(),
  ]);

  const requestedSymbols = marketCaps
    .sort((stockA, stockB) => {
      return stockB["market-cap"] - stockA["market-cap"];
    })
    .slice(0, n)
    .map((stock) => stock.symbol);

  const pricesURL = await new URL(PRICES_API_BASE_URL);
  pricesURL.searchParams.set("symbols", JSON.stringify(requestedSymbols));

  const pricesResponse = await fetch(pricesURL);

  const prices = await pricesResponse.json();

  const namesAndMarketCapsBySymbol = getNamesAndMarketCapsBySymbol(
    symbols,
    marketCaps
  );

  const stockData = prices.map(({ symbol, ...rest }) => ({
    symbol,
    ...namesAndMarketCapsBySymbol[symbol],
    ...rest,
  }));
  return stockData;
}

/**
 * The function takes in an array of symbols and an array of market caps, and returns an object with
 * the names and market caps of each symbol.
 * @param symbols - an array of objects containing information about stock symbols and their
 * corresponding names.
 * @param marketCaps - An array of objects containing information about market capitalization for
 * different symbols. Each object has a "symbol" property representing the stock symbol and a
 * "market-cap" property representing the market capitalization of the corresponding company.
 * @returns an object that contains the names and market caps of the symbols passed as arguments. The
 * object has the symbol as the key and an object with the name and market cap as the value.
 */
function getNamesAndMarketCapsBySymbol(symbols, marketCaps) {
  const namesAndMarketCapsBySymbol = {};

  symbols.forEach(({ symbol, name }) => {
    namesAndMarketCapsBySymbol[symbol] = { name };
  });

  marketCaps.forEach(({ symbol, "market-cap": marketCap }) => {
    namesAndMarketCapsBySymbol[symbol]["market-cap"] = marketCap;
  });

  return namesAndMarketCapsBySymbol;
}
