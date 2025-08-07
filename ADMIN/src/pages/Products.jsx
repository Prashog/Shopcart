import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../services/adminApi";
import Loader from "../components/Loader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    stock: "",
    description: "",
    categories: [],
    images: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setProducts(data.response || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data.response || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpen = (product = null) => {
    setEdit(product);
    setForm(
      product
        ? {
          name: product.name,
          price: product.price,
          brand: product.brand,
          stock: product.stock,
          description: product.description,
          categories: product.categories?.map(c => (typeof c === "object" ? c._id : c)) || [],
          images: product.images || [],
        }
        : {
          name: "",
          price: "",
          brand: "",
          stock: "",
          description: "",
          categories: [],
          images: [],
        }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(null);
    setForm({
      name: "",
      price: "",
      brand: "",
      stock: "",
      description: "",
      categories: [],
      images: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const preparedForm = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (edit) {
        await updateProduct(edit._id, preparedForm);
      } else {
        await createProduct(preparedForm);
      }

      handleClose();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setForm((f) => ({ ...f, categories: selectedOptions }));
  };

  const handleImagesChange = (e) => {
    const urls = e.target.value.split("\n").filter(Boolean);
    setForm((f) => ({ ...f, images: urls }));
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => handleOpen()}
          className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left font-semibold">Image</th>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Brand</th>
              <th className="p-4 text-left font-semibold">Category</th>
              <th className="p-4 text-left font-semibold">Price</th>
              <th className="p-4 text-left font-semibold">Stock</th>
              <th className="p-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    className="h-14 w-14 rounded object-cover"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">{p.name}</td>
                <td className="p-4">{p.brand}</td>
                <td className="p-4">
                  {p.categories?.map((c) =>
                    typeof c === "object" ? c.name : c
                  ).join(", ")}
                </td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleOpen(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center backdrop-blur-sm"
          onClick={handleClose}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl w-[95%] max-w-md max-h-[90vh] overflow-y-auto p-6 space-y-4 animate-fade-in"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {edit ? "Edit Product" : "Add Product"}
            </h2>

            {/* Same form fields as before */}
            {["name", "brand", "description"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [field]: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-4 py-2"
                required
              />
            ))}

            {/* Categories pills and select */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Categories</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.categories.map((id) => {
                  const category = categories.find((c) => c._id === id);
                  return (
                    <span
                      key={id}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {category?.name || id}
                      <button
                        type="button"
                        className="text-blue-700 hover:text-blue-900"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            categories: f.categories.filter((cid) => cid !== id),
                          }))
                        }
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
              <select
                className="w-full border border-gray-300 rounded px-4 py-2"
                value=""
                onChange={(e) => {
                  const id = e.target.value;
                  if (!form.categories.includes(id)) {
                    setForm((f) => ({ ...f, categories: [...f.categories, id] }));
                  }
                }}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                    disabled={form.categories.includes(cat._id)}
                    className={form.categories.includes(cat._id) ? "text-gray-400" : ""}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Images dynamic input field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Images</label>
              {form.images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={img}
                    onChange={(e) => {
                      const updatedImages = [...form.images];
                      updatedImages[idx] = e.target.value;
                      setForm((f) => ({ ...f, images: updatedImages }));
                    }}
                    className="flex-1 border border-gray-300 rounded px-4 py-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setForm((f) => ({
                        ...f,
                        images: f.images.filter((_, i) => i !== idx),
                      }));
                    }}
                    className="bg-red-100 text-red-600 rounded px-2 py-1 hover:bg-red-200 text-sm"
                  >
                    –
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, images: [...f.images, ""] }))}
                className="text-sm text-blue-600 font-semibold hover:underline"
              >
                + Add Image
              </button>
            </div>

            {/* Price & Stock */}
            {["price", "stock"].map((field) => (
              <input
                key={field}
                type="number"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [field]: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-4 py-2"
                min="0"
                required
              />
            ))}

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                {edit ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}