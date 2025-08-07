import React, { useState } from "react";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { adminLogin } from "../services/adminApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAdminAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await adminLogin(form);
      login(res.data.token);
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {err && (
          <div className="text-sm text-red-600 mb-4 text-center animate-pulse">
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}