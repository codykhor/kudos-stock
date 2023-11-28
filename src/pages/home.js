import React from "react";
import logo from "../banner.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="text-center"
      style={{ backgroundImage: `url(${logo}`, height: 500 }}
    >
      <div
        className="mask"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", height: 500 }}
      >
        <div className="pt-5 justify-content-center align-items-center">
          <h1 className="pt-5 pb-2 mb-5">Welcome to KUDOS Stock.</h1>
          <h2 className="pb-2">
            Check out NASDAQ-100 stock market index,
            <br />
            view today's stock price or the previous price history
            <br />
            for any particular stock of your choice.
          </h2>
          <div className="cta pt-4">
            <div className="btn btn-outline-light btn-lg pt-1" role="button">
              <Link to="/stocks">EXPLORE STOCKS</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
