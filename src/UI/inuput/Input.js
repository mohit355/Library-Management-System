import React from "react";

const Input = ({
  type,
  placeholder,
  autoFocus,
  name,
  value,
  onChange,
  ...extra
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      name={name}
      value={value}
      onChange={onChange}
      {...extra}
    />
  );
};

export default Input;
