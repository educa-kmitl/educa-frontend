import React, { useState } from 'react'
import './ToggleButton.scss'

export const ToggleButton = ({ init, onToggle }) => {
  const [state, setState] = useState(init || false)

  const toggle = () => {
    const btn = document.querySelector('.toggle-btn')
    btn.classList.toggle('active')
    const nextState = !state
    setState(nextState)
    onToggle(nextState)
  }

  return (
    <div className={state ? 'toggle-btn active' : 'toggle-btn'} onClick={toggle}>
      <div className="circle"></div>
    </div>
  );
}