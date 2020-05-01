import React from 'react'
import './Button.scss'

export const Button = ({ text, type, alt, ...rest }) => {

  return (
    <button
      className={`my-btn ${alt && ' alt'}`}
      type={type || 'button'}
      {...rest}
    >
      <label className="my-btn-text">
        {text}
      </label>
    </button>
  )
}