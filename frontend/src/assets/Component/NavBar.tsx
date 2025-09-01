import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../App.css";

export default function NavBar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Live" },
    { path: "/add", label: "Add Product" },
    { path: "/all", label: "All Products" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-600 h-[3.5rem] flex items-center justify-center gap-12 shadow-md z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`text-lg font-semibold transition-colors duration-200 ${
              isActive
                ? "px-4 py-2 rounded-md bg-white text-blue-600 shadow-lg"
                : "px-4 py-2 rounded-md !text-white hover:text-yellow-300 hover:font-bold"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
