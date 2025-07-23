import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseStyle = 'py-2 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-black text-white hover:bg-black focus:ring-black',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;