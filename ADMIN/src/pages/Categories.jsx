import React, { useState, useEffect, useRef } from "react";
import { getCategories, createCategory } from "../services/adminApi";
import Loader from "../components/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      const cats = Array.isArray(res.data.response)
        ? res.data.response
        : res.data.categories || [];
      setCategories(cats);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;
    try {
      await createCategory({ name: catName, description });
      setCatName("");
      setDescription("");
      setOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <button
          className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-900 transition"
          onClick={() => setOpen(true)}
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
        <ul className="divide-y divide-gray-200 text-gray-800">
          {categories.length === 0 ? (
            <li className="py-3 text-center text-gray-500">No categories found.</li>
          ) : (
            categories.map((cat) => (
              <li key={cat._id} className="py-4">
                <div className="text-lg font-semibold">{cat.name}</div>
                <div className="text-sm text-gray-600">{cat.description || "No description"}</div>
              </li>
            ))
          )}
        </ul>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={submit}
            className="bg-white shadow-xl rounded-xl p-6 w-96 space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
            <input
              ref={inputRef}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter category name"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              required
            />
            <textarea
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Enter description (optional)"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-black text-white rounded-lg px-4 py-2 w-full hover:bg-gray-900 transition"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-200 rounded-lg px-4 py-2 w-full hover:bg-gray-300 transition"
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