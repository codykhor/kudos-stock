import React, { useEffect, useState } from "react";
import { useStockMarket } from "../customHooks/useStockMarket";
import Dropdown from "react-bootstrap/Dropdown";

export function SymbolDropdown({ onSelect = () => {}, defaultValue }) {
  const [stocks, setStocks] = useState([]);
  // stock symbol list from FMP
  const { loading, error } = useStockMarket(setStocks);

  const [selectedSymbol, setSelectedSymbol] = useState(null);

  //display selected symbol and pass symbol selection to get data
  const handleSelect = (symbol) => {
    setSelectedSymbol(symbol);
    onSelect(symbol);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedSymbol(defaultValue);
    }
  }, []);

  return (
    <div>
      <Dropdown
        defaultValue={defaultValue}
        onSelect={handleSelect}
        className="mb-3"
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {selectedSymbol || "Select Stock Symbol"}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: "250px", overflowY: "auto" }}>
          {!loading &&
            !error &&
            stocks.map((stock, index) => (
              <Dropdown.Item key={stock + index} eventKey={stock.symbol}>
                {stock.symbol}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
