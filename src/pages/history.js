import React, { useMemo, useState } from "react";
import { useHistory } from "../customHooks/useHistory";
import { AgGridReact } from "ag-grid-react";
import { AgChartsReact } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { SymbolDropdown } from "../components/symbolDropdown";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Time from "../components/dataTime.js";

export default function History() {
  const [rowData, setRowData] = useState([]);
  const [symbol, setSymbol] = useState("");

  const { loading, history, error } = useHistory(symbol, setRowData);
  const columns = [
    { headername: "Date", field: "date", sortable: true },
    { headername: "Price Open", field: "open", sortable: true },
    { headername: "Price High", field: "high", sortable: true },
    { headername: "Price Low", field: "low", sortable: true },
    { headername: "Price Close", field: "close", sortable: true },
    { headername: "Volume", field: "volume", sortable: true },
  ];

  // for date picker
  const [startDate, setStartDate] = useState(null);

  const handleSymbolSelect = (symbol) => {
    setSymbol(symbol);
    // setStartDate(null)
  };

  const filteredRow = useMemo(() => {
    return startDate
      ? rowData.filter((res) => {
          return new Date(res.date).getTime() >= startDate.getTime();
        })
      : rowData;
  }, [startDate, rowData]);

  const handleRowClick = (value) => {
    setStartDate(new Date(value.data.date));
  };

  const Chart = {
    autoSize: true,
    series: [
      {
        data: filteredRow.map((row) => ({ date: row.date, close: row.close })),
        xKey: "date",
        yKey: "close",
        yName: "Closing Price",
        stroke: "red",
        marker: {
          fill: "red",
          stroke: "grey",
        },
      },
      {
        data: filteredRow.map((row) => ({ date: row.date, open: row.open })),
        xKey: "date",
        yKey: "open",
        yName: "Opening Price",
        stroke: "green",
        marker: {
          fill: "green",
          stroke: "grey",
        },
      },
    ],
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="container pt-3 text-center">
      <div>
        <h3>Price History of Nasdaq-100 Index</h3>
      </div>
      <div className="pt-2">
        <SymbolDropdown onSelect={handleSymbolSelect} />
      </div>
      <div className="container mb-3">
        <ReactDatePicker
          selected={startDate}
          onChange={setStartDate}
          showPopperArrow={false}
          isClearable
          placeholderText="Select a date"
        />
      </div>
      <p>
        Showing the historical price of <b>{symbol}</b>
      </p>
      <div>
        <Time />
      </div>
      <div className="d-flex justify-content-center">
        <div
          className="ag-theme-balham"
          style={{ height: "400px", width: "1200px" }}
        >
          <AgGridReact
            onRowClicked={handleRowClick}
            columnDefs={columns}
            rowData={filteredRow}
            pagination={true}
            paginationPageSize={20}
          />
        </div>
      </div>
      <div
        className="container justify-content-center pt-3"
        style={{ height: "500px", width: "1200px" }}
      >
        <h4>
          Opening and closing price of <b>{symbol}</b>
        </h4>
        <AgChartsReact options={Chart} />
      </div>
    </div>
  );
}
