import React from 'react';
import './Input.scss';

export const Input = ({ icon, text, type, onChange, onChange2, index, required, disabled }) => {
  const Icon = icon || null;

  return (
    <div className="input-container">
      <input 
        className={disabled ? 'input-field disabled' : 'input-field'}
        placeholder={text}
        type={type}
        id={index}
        onChange={(onChange) ? e => onChange(e) : onChange2 ? e => onChange2(e.target.value, e.target.id) : null}
        required={required}
        disabled={disabled}
      />
      {icon ? <Icon className={disabled ? 'icon disabled' : 'icon'} /> : null}
    </div>
  );
}