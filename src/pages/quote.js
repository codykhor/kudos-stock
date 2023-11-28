import React, { useEffect, useState } from "react";
import { useQuote } from "../customHooks/useQuote";
import { SymbolDropdown } from "../components/symbolDropdown";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useStockMarket } from "../customHooks/useStockMarket";
import Time from "../components/dataTime.js";

export default function Quote() {
  // check if any symbol was chosen
  const [symbol, setSymbol] = useState("");
  const { stock } = useStockMarket();

  useEffect(() => {
    const symbol = window.location?.search?.split("symbol=")?.[1];

    if (stock.length > 0 && stock[0]?.symbol && !symbol) {
      setSymbol(stock[0].symbol);
    }
  }, [stock]);

  useEffect(() => {
    const symbol = window.location?.search?.split("symbol=")?.[1];

    if (symbol) {
      setSymbol(symbol);
    }
  }, []);

  // state / data
  const { loading, quote, error } = useQuote(symbol);

  const columns = [
    { headername: "Symbol", field: "symbol", sortable: true },
    { headername: "Date", field: "date", sortable: true },
    { headername: "Price Open", field: "open", sortable: true },
    { headername: "Price High", field: "high", sortable: true },
    { headername: "Price Low", field: "low", sortable: true },
    { headername: "Price Close", field: "close", sortable: true },
  ];

  //  handler
  const handleSymbolSelect = (symbol) => {
    setSymbol(symbol);
  };

  // rendering and error
  if (loading) {
    return <p>Content is currently loading.</p>;
  }

  if (error != null) {
    return (
      <div>
        <p>Error encountered: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container text-center pt-3">
      <div>
        <h3>Daily Quote for Nasdaq-100 Index</h3>
      </div>
      <div className="pt-2">
        <SymbolDropdown defaultValue={symbol} onSelect={handleSymbolSelect} />
      </div>
      <div className="d-flex justify-content-center">
        <div
          className="ag-theme-balham"
          style={{ height: "200px", width: "1200px" }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={symbol ? [quote] : [""]}
            pagination={true}
          />
        </div>
      </div>
      <div>
        <Time />
      </div>
    </div>
  );
}
