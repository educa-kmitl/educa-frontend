import React, { useState } from 'react';
import './ToggleButton.scss';
import { FaGlobeAmericas, FaLock } from "react-icons/fa";

export const ToggleButton = ({ on, off }) => {
  const [state, setState] = useState(false);

  const toggle = () => {
    const btn = document.querySelector('.toggle-btn');
    btn.classList.toggle('active');
    setState(!state);
  }

  return (
    <div className="toggle-btn" onClick={toggle}>
      <div className="label">{ (state) ? on : off }</div>
      <div className="circle">
        {(state) ? <FaLock className="icon-check"/>
          : <FaGlobeAmericas className="icon-check"/>
        }
      </div>
    </div>
  );
}