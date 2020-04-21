import React from 'react'
import './Input.scss'

export const Input = ({ Icon, id, type, text, pattern, title, onChange, required, disabled, autoFocus, ...rest }) => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        className="my-input"
        id={id && id.toString()}
        type={type || 'text'}
        placeholder={text}
        pattern={pattern || null}
        title={title || null}
        onChange={onChange && (e => onChange(e.target.value, e.target.id))}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        {...rest}
      />
      {Icon && <Icon className={disabled ? 'my-input-icon disabled' : 'my-input-icon'} />}
    </div>
  )
}