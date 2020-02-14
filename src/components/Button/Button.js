import React from 'react';
import './Button.scss';

export const Button = ({ text, alt }) => {
  return (
    <div className={(alt) ? 'btn-alt-wrapper' : 'btn-wrapper'}>
      <div className={(alt) ? 'btn-alt' : 'btn'}>
        <div className="label">{text}</div>
      </div>
    </div>
  );
}