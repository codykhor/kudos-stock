import React from "react";
import Header from "../components/header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
