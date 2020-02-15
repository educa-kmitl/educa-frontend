import React from 'react';
import './Input.scss';

export const Input = ({ text, type, size, alt, required }) => {
  return (
    <input 
      className={(alt) ? 'input-field-alt' : 'input-field'}
      placeholder={text}
      type={type}
      style={{width: size}}
      required={required}
    />
  );
}