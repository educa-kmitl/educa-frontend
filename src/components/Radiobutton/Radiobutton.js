import React from 'react'
import './Radiobutton.scss'

export const Radiobutton = ({ text, group, onClick, checked }) => {
  const handleCheck = () => {
    const radio = document.querySelector(`#radio-${text}`)
    radio.checked = true;
    onClick(radio.value)
  }
  return (
    <div className='my-radio' onClick={handleCheck}>
      <input
        id={`radio-${text}`}
        type='radio'
        value={text}
        name={group}
        defaultChecked={checked}
      />
      <text>{text}</text>
    </div>
  )
}