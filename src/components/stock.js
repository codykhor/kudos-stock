import React from "react";

export default function Stock(props) {
  return (
    <div>
      <h3>{props.symbol}</h3>
      <h4>{props.name}</h4>
      <h5>{props.sector}</h5>
    </div>
  );
}
