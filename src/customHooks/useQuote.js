import { useState, useEffect } from "react";

// to get daily quote of chosen symbol

// change to FMP API
async function getQuote(symbolChosen) {
  if (symbolChosen === "") {
    return null;
  }

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbolChosen}&apikey=${process.env.REACT_APP_API_KEY_ALPHA}`;
  let res = await fetch(url);
  let data = await res.json();

  // invalid data
  if (!data["Meta Data"] || !data["Time Series (Daily)"]) {
    console.log("Invalid response data: ", data);

    if (data?.Note) {
      throw new Error(data.Note);
    }

    throw new Error("Unexpected error occur, unable to get data");
  }

  // select second key from objects returned by Alpha
  let daily = data["Time Series (Daily)"];

  // reverse list to get latest date
  let dates = Object.keys(daily).sort((a, b) => b.localeCompare(a));
  let latestDate = dates[0];
  let quote = {
    symbol: data["Meta Data"]["2. Symbol"],
    date: latestDate,
    open: daily[latestDate]["1. open"],
    high: daily[latestDate]["2. high"],
    low: daily[latestDate]["3. low"],
    close: daily[latestDate]["4. close"],
  };
  return quote;
}

export function useQuote(symbolChosen) {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setQuote(await getQuote(symbolChosen));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [symbolChosen]);

  return { loading, quote, error };
}
