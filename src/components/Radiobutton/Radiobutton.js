import React from 'react'
import './Radiobutton.scss'

export const Radiobutton = ({ text, group, onClick, checked }) => {
  const handleCheck = () => {
    const rb = document.querySelector(`#rb-${text}`)
    rb.checked = true
    onClick(rb.value)
  }

  return (
    <div className="radio-container" onClick={handleCheck}>
      <input 
        type="radio" 
        name={group}
        id={`rb-${text}`}
        value={text}
        defaultChecked={checked}
      />
      <label>{text}</label>
    </div>
  )
}