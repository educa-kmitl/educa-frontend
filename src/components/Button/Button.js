import React from 'react';
import './Button.scss';

export const Button = ({ text, type, onClick }) => {

  return (
    <button 
      className="custom-btn" 
      type={type || 'button'}
      onClick={onClick || null}
    >
      <div className='btn-content'>
        <label>{text}</label>
      </div>
    </button>
  );
}