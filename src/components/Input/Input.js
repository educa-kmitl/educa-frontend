import React from 'react';
import './Input.scss';

export const Input = ({ icon, text, type, onChange, required }) => {
  const Icon = icon || null;

  return (
    <div className="input-container">
      <input 
        className='input-field'
        placeholder={text}
        type={type}
        onChange={(onChange) ? e => onChange(e) : null}
        required={required}
      />
      {icon ? <Icon className="icon" /> : null}
    </div>
  );
}