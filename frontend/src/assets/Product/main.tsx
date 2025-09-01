import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../Component/NavBar";
import "../../App.css";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="mt-20 w-screen">
        <Outlet />
      </div>
    </div>
  );
}
