import React, { useState } from 'react'
import './Dropdown.scss'

import { FaAngleDown, FaListUl } from 'react-icons/fa'

export const Dropdown = ({ onSelect, menus }) => {

  const [value, setValue] = useState(menus[0])

  const toggleDD = () => {
    const content = document.querySelector('.dropdown-content')
    const arrow = document.querySelector('.dropdown-arrow')
    const overlay = document.querySelector('.dropdown-overlay')
    content.classList.toggle('active')
    arrow.classList.toggle('active')
    overlay.classList.toggle('active')
  }

  const select = e => {
    e.preventDefault();
    const newValue = e.target.value
    setValue(newValue)
    onSelect(newValue)
  }

  return (
    <div className='dropdown' onClick={toggleDD}>
      <FaListUl className="dd-icon" />
      <p>{value}</p>
      <div className='dropdown-arrow'>
        <FaAngleDown />
      </div>
      <div className='dropdown-content'>
        {menus.map(menu =>
          <option className='item' id={menu} value={menu} onClick={e => select(e)}>{menu}</option>
        )}
      </div>
      <option className='dropdown-overlay' value={value} onClick={e => select(e)}></option>
    </div>
  )
}