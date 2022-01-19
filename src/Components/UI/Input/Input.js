import React from 'react';
import classes from './Input.module.css';

const Input = ({ id, type, placeholder, value, onChange, defaultValue }) => {
  return (
    <div>
      <input
        className={classes.input}
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        min={1}
        max={10}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
