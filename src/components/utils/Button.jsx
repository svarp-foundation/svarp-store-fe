import React from "react";

const Button = ({ children, onClick, className = "", style = {}, disabled = false, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`px-6 py-2.5 rounded-full font-medium text-sm transition-custom hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
