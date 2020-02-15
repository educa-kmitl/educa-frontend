import React from 'react';
import './Button.scss';

export const Button = ({ text, alt, func, type }) => {
  return (
    <button className="custom-button" type={(type) ? type : 'button'}>
      <div 
        className={(alt) ? 'btn-alt-wrapper' : 'btn-wrapper'}
        onClick={(func) ? func : null}
        type={(type) ? type : 'button'}
      >
        <div className={(alt) ? 'btn-alt' : 'btn'}>
          <div className="label">{text}</div>
        </div>
      </div>
    </button>
  );
}