import React from 'react'
import './Button.scss'

export const Button = ({ text, type, onClick }) => {

  return (
    <button 
      className="my-btn"
      type={type || 'button'}
      onClick={onClick || null}
    >
      <label>{text}</label>
    </button>
  )
}