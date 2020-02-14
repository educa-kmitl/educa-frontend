import React from 'react';
import './Dropdown.scss';

export const Dropdown = ({ subjects }) => {

  const reCenterText = () => {
    const ele = document.querySelector('select');
    const indent = ele.offsetWidth / 3 - ele.value.length * 3;
    ele.style.textIndent = indent.toString() + 'px';
  }

  return (
    <div className="dropdown">
      <div className="dropdown-bg">
        <select onChange={reCenterText}>
          <option value="Select tag">Select tag</option>
          {subjects.map((subject) => (
            <option value={subject}>{subject}</option>
          ))}
        </select>
      </div>
    </div>
  );
}