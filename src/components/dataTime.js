import React from "react";

export default function Time() {
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  return (
    <p>
      Data generated at {date} {time}
    </p>
  );
}
