import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={`border-b p-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className }) => (
  <h2 className={`text-xl font-bold ${className}`}>
    {children}
  </h2>
);