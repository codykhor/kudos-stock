import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="pt-5">
      <br />
      <h3>Oops! You found the error page.</h3>
      <div className="error pt-4">
        <div className="btn btn-outline-dark btn-lg pt-1" role="button">
          <Link to="/home">GO HOME</Link>
        </div>
      </div>
    </div>
  );
}
