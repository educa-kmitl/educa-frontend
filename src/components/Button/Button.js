import React from 'react';
import './Button.scss';

export const Button = ({ text, alt, onClick, type }) => {
  return (
    <button className="custom-button" type={type || 'button'}>
      <div 
        className={(alt) ? 'btn-alt-wrapper' : 'btn-wrapper'}
        onClick={onClick || null}
        type={(type) ? type : 'button'}
      >
        <div className={(alt) ? 'btn-alt' : 'btn'}>
          <div className="label">{text}</div>
        </div>
      </div>
    </button>
  );
}