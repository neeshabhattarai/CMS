import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Product/main";
import AddProduct from "../Product/AddProduct";
import HomePage from "../Product/HomePage";
import AllProduct from "../Product/AllProduct";

export const routes = createBrowserRouter([
  {
    element: <Home />,
    children: [
      { path: "/add", element: <AddProduct /> },
      { path: "/", element: <HomePage /> },
      { path: "/all", element: <AllProduct /> },
    ],
  },
]);
