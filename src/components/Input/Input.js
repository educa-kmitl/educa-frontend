import React from 'react';
import './Input.scss';

export const Input = ({ text, type, size, alt, chat, update, func, required, message }) => {

  return (
    <input 
      className={(alt) ? 'input-field-alt' : 'input-field'}
      placeholder={text}
      type={type}
      style={{width: size}}
      value={message}
      onChange={e => update(e.target.value)}
      onKeyPress={(chat) ?
        e => e.key === 'Enter' ? func(e) : null
        : null}
      required={required}
    />
  );
}