import { useState, useEffect } from "react";

//get history information
async function getHistory(symbolChosen) {
  if (symbolChosen === "") {
    return null;
  }

  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbolChosen}?apikey=${process.env.REACT_APP_API_KEY_FMP}`;
  let res = await fetch(url);
  let data = await res.json();

  let info = data["historical"].slice(0, 100); //initial - shows info from the past 100 days
  let history = info.map((history) => {
    return {
      date: history.date,
      open: history.open,
      high: history.high,
      low: history.low,
      close: history.close,
      volume: history.volume,
    };
  });

  return history;
}

export function useHistory(symbolChosen, onHistoryChange) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setHistory(await getHistory(symbolChosen));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [symbolChosen]);

  // to pass history info and set row data
  useEffect(() => {
    if (history) {
      onHistoryChange(history);
    }
  }, [history, onHistoryChange]);

  return { loading, history, error };
}
