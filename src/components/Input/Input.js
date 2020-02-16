import React from 'react';
import './Input.scss';

export const Input = ({ text, type, onChange, required }) => {

  return (
    <input 
      className='input-field'
      placeholder={text}
      type={type}
      onChange={(onChange) ? e => onChange(e.target.value) : null}
      required={required}
    />
  );
}