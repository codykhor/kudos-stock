import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="footer text-center pt-5 pb-5">
      <br />
      <br />
      <div className="footer-stock-links">
        <p>
          Stock data generated from{" "}
          <NavLink to="https://site.financialmodelingprep.com/" target="_blank">
            Financial Modeling Prep
          </NavLink>{" "}
          and{" "}
          <NavLink to="https://www.alphavantage.co/" target="_blank">
            Alpha Vantage
          </NavLink>
        </p>
      </div>
      <span>Copyright &copy; 2023 KUDOS Stock | kudosstock@hello.com</span>
      <br />
      <div className="footer-links">
        <NavLink to="/terms-of-service" onClick={handleClick}>
          Terms of Service
        </NavLink>
        <NavLink to="/privacy-policy" onClick={handleClick}>
          Privacy Policy
        </NavLink>
      </div>
    </div>
  );
}
