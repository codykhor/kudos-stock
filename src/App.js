import React from "react";
import Root from "./components/root";
import Home from "./pages/home";
import Stocks from "./pages/stocks";
import Quote from "./pages/quote";
import History from "./pages/history";
import ErrorPage from "./pages/errorPage";
import Auth from "./pages/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> }, //default page once load
      { path: "home", element: <Home /> },
      { path: "stocks", element: <Stocks /> },
      { path: "todays-quote", element: <Quote /> },
      { path: "price-history", element: <History /> },
      { path: "auth", element: <Auth /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
