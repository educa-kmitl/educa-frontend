import React from 'react';
import './Input.scss';

export const Input = ({ text, type, size, onChange, required }) => {

  return (
    <input 
      className='input-field'
      placeholder={text}
      type={type}
      style={{width: size}}
      onChange={e => onChange(e.target.value)}
      required={required}
    />
  );
}