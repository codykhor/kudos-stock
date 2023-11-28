import { useState, useEffect } from "react";

//get stock information
export async function getStocks() {
  const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${process.env.REACT_APP_API_KEY_FMP}`;
  let res = await fetch(url);
  let data = await res.json();

  if (data?.["Error Message"]) {
    throw new Error(data["Error Message"]);
  }

  let stocks = data.map((stock) => {
    return {
      symbol: stock.symbol,
      name: stock.name,
      sector: stock.sector,
    };
  });

  // ensure stock is in ascending order
  stocks.sort((a, b) => a.symbol.localeCompare(b.symbol));

  return stocks;
}

export function useStockMarket(onStockChange = () => {}) {
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setStock(await getStocks());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  //to pass stock info and set row data/symbols
  useEffect(() => {
    if (stock.length > 0) {
      onStockChange(stock);
    }
  }, [stock, onStockChange]);

  return { loading, stock, error };
}
