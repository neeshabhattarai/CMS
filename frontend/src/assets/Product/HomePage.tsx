import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetched = async () => {
      try {
        const res = await fetch("http://localhost:4000/product/live");
        const data = await res.json();

        // Sort products by created_at (latest first)
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setList(sorted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetched();
  }, []);

  if (!list || list.length === 0) {
    return <h1 className="text-center mt-10 text-gray-600">No data found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Live Products</h1>
      <div className="grid gap-4">
        {list.map((item) => (
          <div
            key={item.product_id}
            className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
          >
            {/* Left Side - All Details */}
            <div className="text-left">
              <h2 className="text-xl font-semibold">{item.product_name}</h2>
              <p className="text-gray-700">{item.product_desc}</p>

              <div className="mt-1 space-y-0.5">
                <p className="text-xs text-gray-500">
                  Created At:{" "}
                  {new Date(item.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-xs text-gray-500">
                  Product ID: {item.product_id}
                </p>
              </div>
            </div>

            {/* Right Side - Status */}
            <div className="ml-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Draft"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
