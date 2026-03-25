import React from "react";
import "../../styles/retroui-theme.css";

export default function Button({ children, className = "", ...props }) {
  return (
    <button className={`retroui-btn ${className}`} {...props}>
      {children}
    </button>
  );
}
