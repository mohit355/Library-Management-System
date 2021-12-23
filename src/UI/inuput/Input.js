import React from "react";

const Input = ({ type, placeholder, autoFocus, name, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
