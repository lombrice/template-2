import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
  >
    {children}
  </button>
);
