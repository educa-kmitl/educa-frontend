import React, { useState } from 'react'
import './ToggleButton.scss'

export const ToggleButton = ({ init, onToggle }) => {
  const [state, setState] = useState(init || false)

  const handleToggle = () => {
    const nextState = !state
    setState(nextState)
    onToggle(nextState)
  }

  return (
    <div className='toggle-btn' state={state.toString()} onClick={handleToggle}>
      <div className="circle"></div>
    </div>
  );
}