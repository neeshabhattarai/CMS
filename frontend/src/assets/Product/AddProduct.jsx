import React from "react";
import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form";
import "../../App.css";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      updated_by: "admin", 
    },
  });
  const navigate=useNavigate();

  const onSubmit = async (data) => {
    await fetch("https://cms-xano.vercel.app/product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    reset()
    reset({ created_by: "admin" }); 
    navigate("/all")
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="product_name"
          >
            Product Name
          </label>
          <input
            id="product_name"
            type="text"
            {...register("product_name", {
              required: "Product name is required",
              minLength: { value: 3, message: "It should be greater than 3" },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.product_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors?.product_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.product_name?.message}
            </p>
          )}
        </div>

        
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="product_desc"
          >
            Description
          </label>
          <textarea
            id="product_desc"
            {...register("product_desc")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

 
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

      
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="updated_by"
          >
            Updated By
          </label>
          <input
            id="updated_by"
            type="text"
            {...register("created_by")}
            defaultValue="admin"
            readOnly 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

    
        <div className="text-center">
          <button
            type="submit"
            className="!bg-blue-500 text-white px-6 py-2 rounded-lg !hover:bg-blue-600 transition-colors"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
