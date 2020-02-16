import React from 'react';
import './Dropdown.scss';

export const Dropdown = ({ id, options, text, required }) => {

  const reCenterText = () => {
    const ele = document.querySelector(`#${id}`);
    const len = (ele.value.length === 0) ? text.length : ele.value.length;
    const indent = ele.offsetWidth / 3 - len * 3;
    ele.style.textIndent = indent.toString() + 'px';
  }

  return (
    <div className="dropdown">
      <div className="dropdown-bg">
        <select onChange={reCenterText} id={id} required={required}>
          <option value="">{text}</option>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}