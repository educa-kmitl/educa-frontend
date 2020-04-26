import React from 'react'
import './Button.scss'

export const Button = ({ text, type, onClick, alt }) => {

  return (
    <button
      className={
        `my-btn ${alt && ' alt'}`
      }
      type={type || 'button'}
      onClick={onClick || null}
    >
      <label className="my-btn-text">
        {text}
      </label>
    </button>
  )
}