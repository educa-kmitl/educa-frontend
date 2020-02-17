import React from 'react';
import './Button.scss';

export const Button = ({ text, type, alt, onClick, children }) => {
  const Icon = children || null;

  return (
    <button 
      className={(alt && 'custom-btn alt') || 'custom-btn'} 
      type={type || 'button'}
      onClick={onClick || null}
    >
      <div className='btn-content'>
        <label>{text}</label>
        {children && <Icon className='icon'/>}
      </div>
    </button>
  );
}