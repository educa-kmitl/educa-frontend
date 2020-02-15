import React from 'react';
import './Dropdown.scss';

export const Dropdown = ({ id, subjects, text, required }) => {

  const reCenterText = () => {
    const ele = document.querySelector(`#${id}`);
    const indent = ele.offsetWidth / 3 - ele.value.length * 3;
    ele.style.textIndent = indent.toString() + 'px';
  }

  return (
    <div className="dropdown">
      <div className="dropdown-bg">
        <select onChange={reCenterText} id={id} required={required}>
          <option value="">{text}</option>
          {subjects.map((subject) => (
            <option value={subject}>{subject}</option>
          ))}
        </select>
      </div>
    </div>
  );
}