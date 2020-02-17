import React from 'react';
import './Button.scss';

export const Button = ({ text, type, onClick, children }) => {
  const Icon = children || null;

  return (
    <button 
      className='custom-btn' 
      type={type || 'button'}
      onClick={onClick || null}
    >
      {children && <Icon className="icon"/>}
      <label>{text}</label>
    </button>
  );
}