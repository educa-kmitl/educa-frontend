import React, { useState } from 'react'
import './Dropdown.scss'
import { FaAngleDown } from "react-icons/fa"
import { Button } from '../../components'

export const Dropdown = ({ id, menus }) => {

  const [state, setState] = useState(menus[0])

  const toggle = () => {
    const content = document.querySelector(`#dd-content-${id}`)
    const arrow = document.querySelector(`#dd-arrow-${id}`)
    const overlay = document.querySelector(`#dd-overlay-${id}`)
    content.classList.toggle('hide')
    arrow.classList.toggle('active')
    overlay.classList.toggle('active')
  }

  const select = e => {
    setState(e.target.value)
    toggle()
  }

  return (
    <div className="dropdown" id={`dd-${id}`}>
      <Button text={state} onClick={toggle} />
      <div className="dropdown-arrow" id={`dd-arrow-${id}`}>
        <FaAngleDown />
      </div>
      <div className="dropdown-content hide" id={`dd-content-${id}`}>
        {menus.map(menu =>
          <option className="item" id={menu} value={menu} onClick={e => select(e)}>{menu}</option>
        )}
      </div>
      <div className="dropdown-overlay" id={`dd-overlay-${id}`} onClick={toggle}></div>
    </div>
  )
}