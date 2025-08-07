import React from 'react';

export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center">
      <div
        className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      ></div>
      <p className="mt-4 text-sm text-gray-500">{message}</p>
    </div>
  );
}