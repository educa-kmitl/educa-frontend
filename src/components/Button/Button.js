import React from 'react'
import './Button.scss'

<<<<<<< HEAD
export const Button = ({ text, type, onClick }) => {

  return (
    <button 
      className="my-btn"
      type={type || 'button'}
      onClick={onClick || null}
    >
      <label>{text}</label>
=======
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
>>>>>>> 4102e9f91049040aa483958e2e8a65ec117b8329
    </button>
  )
}