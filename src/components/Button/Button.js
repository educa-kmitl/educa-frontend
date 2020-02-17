import React from 'react';
import './Button.scss';

export const Button = ({ text, onClick, type }) => {
  return (
    <button 
      className='custom-btn' 
      type={type || 'button'}
      onClick={onClick || null}
    >
      <label>{text}</label>
    </button>
  );
}