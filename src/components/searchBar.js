import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export function SearchBar({ onSearch = () => {} }) {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
      />
      <Button
        className="searchbutton"
        variant="outline-secondary"
        size="sm"
        id="search-button"
        type="button"
        onClick={() => onSearch(innerSearch)}
      >
        Search
      </Button>
    </div>
  );
}
