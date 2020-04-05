import React from 'react'
import './Input.scss'

export const Input = ({ Icon, id, type, text, pattern, title, onChange, required, disabled, autoFocus }) => {
  return (
    <div className="my-input">
      <input
        id={id && id.toString()}
        type={type || 'text'}
        placeholder={text}
        pattern={pattern || null}
        title={title || null}
        onChange={onChange && (e => onChange(e.target.value, e.target.id))}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      {Icon && <Icon className={disabled ? 'icon disabled' : 'icon'} />}
    </div>
  )
}