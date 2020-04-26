import React, { useState } from 'react'
import './Dropdown.scss'

import { FaAngleDown, FaListUl } from 'react-icons/fa'

export const Dropdown = ({ onSelect, items, init }) => {
  const [value, setValue] = useState(init || items[0])

  const handleToggle = () => {
    document.querySelector('.dd-box').classList.toggle('active')
    document.querySelector('.dd-arrow').classList.toggle('active')
    document.querySelector('.dd-overlay').classList.toggle('active')
  }

  const handleSelect = e => {
    const newValue = e.target.dataset.value
    setValue(newValue)
    onSelect(newValue)
  }

  return (
    <div className='my-dropdown' onClick={handleToggle}>
      <FaListUl className='icon' />
      <div className="text">{value}</div>
      <FaAngleDown className='dd-arrow' />

      <div className='dd-box'>
        {items.map((item, index) =>
          <div
            key={index}
            data-value={item}
            className='item'
            onClick={e => handleSelect(e)}
          >
            {item}
          </div>
        )}
      </div>

      <div
        data-value={value}
        className='dd-overlay'
        onClick={e => handleSelect(e)}
      ></div>

    </div>
  )
}