import React, { useEffect, useState } from "react";
import EditProductModal from "./EditProduct";
import { useNavigate } from "react-router-dom";

export default function AllProduct() {
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetched = async () => {
      try {
        const res = await fetch("https://testingp-eight.vercel.app/product/");
        const data = await res.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetched();
  }, [editingProduct]);

  const handleSave = async (id, data) => {
    try {
      await fetch(`https://testingp-eight.vercel.app/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setList((prev) =>
        prev.map((item) =>
          item.product_id === id ? { ...item, ...data } : item
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await fetch(`https://testingp-eight.vercel.app/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updated_by: "admin" }),
      });

      setList(list.filter((item) => item.product_id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!list || list.length === 0) {
    return (
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/add")}
          className="mb-4 px-4 py-2 !bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add Product
        </button>
        <h1 className="text-gray-600">No data found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <button
          onClick={() => navigate("/add")}
          className="px-4 py-2 !bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add Product
        </button>
      </div>

      <div className="grid gap-4">
        {list.map((item) => (
          <div
            key={item.product_id}
            className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.product_name}</h2>
              <p className="text-gray-600">{item.product_desc}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
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
            <div className="flex gap-2">
              <button
                onClick={() => setEditingProduct(item)}
                className="px-4 py-2 !bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.product_id)}
                className="px-4 py-2 !bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
