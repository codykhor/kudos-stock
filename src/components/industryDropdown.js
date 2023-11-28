import React, { useState } from "react";
import { useStockMarket } from "../customHooks/useStockMarket";
import Dropdown from "react-bootstrap/Dropdown";

export function IndustryDropdown({ onSelect = () => {} }) {
  // const [stocks, setStocks] = useState([]);
  // stock symbol list from FMP
  const { loading, stock: stocks, error } = useStockMarket();
  const [selection, setSelection] = useState(null);

  // display selected industry and pass selection to get data
  const handleSelect = (sector) => {
    setSelection(sector);
    onSelect(sector);
  };

  // array to store sectors - avoid duplication
  const sectors = stocks.reduce((acc, res) => {
    if (!acc.includes(res.sector)) {
      acc.push(res.sector);
    }

    return acc;
  }, []);

  return (
    <div>
      <Dropdown onSelect={handleSelect} className="mb-3">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {selection || "Select Industry"}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: "250px", overflowY: "auto" }}>
          <Dropdown.Item eventKey="">- No Filter -</Dropdown.Item>
          {!loading &&
            !error &&
            sectors.map((sector, index) => (
              <Dropdown.Item key={sector + index} eventKey={sector}>
                {sector}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
