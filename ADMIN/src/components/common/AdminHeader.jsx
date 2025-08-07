import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

const nav = [
  { label: "Dashboard", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "Products", path: "/products" },
  { label: "Orders", path: "/orders" },
  { label: "Users", path: "/users" },
];

export default function AdminHeader() {
  const { pathname } = useLocation();
  const { logout, admin } = useAdminAuth();

  return (
    <header className="bg-slate-900 text-white shadow-md h-16 flex items-center px-6">
      <div className="text-2xl font-bold tracking-wide text-pink-500">Admin Panel</div>
      <nav className="flex-1 ml-10">
        <ul className="flex gap-6">
          {nav.map(({ label, path }) => (
            <li key={label}>
              <Link
                to={path}
                className={`transition font-medium hover:text-pink-400 ${
                  pathname === path
                    ? "text-pink-400 border-b-2 border-pink-500 pb-1"
                    : "text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {admin && (
        <button
          onClick={logout}
          className="ml-4 px-4 py-1.5 text-sm rounded bg-pink-600 hover:bg-pink-700 transition font-semibold"
        >
          Logout
        </button>
      )}
    </header>
  );
}