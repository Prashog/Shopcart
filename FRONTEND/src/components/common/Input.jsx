import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, name, className = '' }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    />
  );
};

export default Input;