import React, { useMemo, useState } from "react";
import { useStockMarket } from "../customHooks/useStockMarket";
import { SearchBar } from "../components/searchBar";
import { AgGridReact } from "ag-grid-react";
import { IndustryDropdown } from "../components/industryDropdown";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Time from "../components/dataTime.js";

export default function Stocks() {
  const [rowData, setRowData] = useState([]);
  const { loading, error } = useStockMarket(setRowData);
  const [symbolFilter, setSymbolFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const columns = [
    {
      headername: "Symbol",
      field: "symbol",
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ["reset", "apply"],
      },
      closeOnApply: true,
    },
    {
      headername: "Company Name",
      field: "name",
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ["reset", "apply"],
      },
      closeOnApply: true,
    },
    {
      headername: "Industry",
      field: "sector",
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ["reset", "apply"],
      },
      closeOnApply: true,
    },
  ];

  const filteredRow = useMemo(() => {
    return symbolFilter || sectorFilter
      ? rowData.filter((s) => {
          if (sectorFilter) {
            // if both filter present, both needs to be true
            return (
              s.sector.includes(sectorFilter) &&
              s.symbol.toUpperCase().includes(symbolFilter)
            );
          } else {
            // if no sector filter set, filter based on symbol only
            return s.symbol.toUpperCase().includes(symbolFilter);
          }
        })
      : rowData;
  }, [symbolFilter, sectorFilter, rowData]);

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

  // load Quote page
  const handleRowClick = (value) => {
    if (value?.data?.symbol) {
      window.location.assign(`/todays-quote?symbol=${value?.data?.symbol}`);
    }
  };

  // filter stocks with search query
  const handleSymbolSearch = (search) => {
    console.log("Symbol filter: ", search);
    setSymbolFilter(search.toUpperCase());
  };

  // filter industry sector
  const handleSectorSelect = (sector) => {
    setSectorFilter(sector);
  };

  return (
    <div className="container text-center pt-3">
      <h3 className="pb-2">Stock List for Nasdaq-100 Index</h3>
      <div className="mb-3">
        <SearchBar onSearch={handleSymbolSearch} />
      </div>
      <div>
        <IndustryDropdown onSelect={handleSectorSelect} />
      </div>
      <div className="d-flex justify-content-center">
        <div
          className="ag-theme-balham"
          style={{ height: "500px", width: "600px" }}
        >
          <AgGridReact
            onRowClicked={handleRowClick}
            columnDefs={columns}
            rowData={filteredRow}
            pagination={true}
            paginationPageSize={15}
          />
        </div>
      </div>
      <div>
        <Time />
      </div>
    </div>
  );
}
