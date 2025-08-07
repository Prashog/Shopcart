import React from "react";

export default function AdminFooter() {
  return (
    <footer className="bg-slate-900 text-gray-400 text-center py-4 border-t border-slate-700">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </p>
    </footer>
  );
}