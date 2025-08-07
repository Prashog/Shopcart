import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="text-center animate-fade-in">
        <h1 className="text-[8rem] font-extrabold text-red-600 leading-none mb-4">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </p>
        <p className="text-gray-600 text-base mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition duration-200"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}