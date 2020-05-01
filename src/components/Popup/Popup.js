import React from 'react'
import './Popup.scss'

import { Input, Button } from '../'
import { FaLock } from 'react-icons/fa'
import logo from '../../img/room/play.svg'

export const Popup = ({ type, Icon, title, text, placeholder, confirm, cancel, onChange, onConfirm, onCancel }) => {
  return (
    <>
      {type === 'password' &&
        <div id="popup-overlay">
          <form name="password" id="popup-form" onSubmit={e => { e.preventDefault(); onConfirm() }}>
            <h4>{title}</h4>
            <h6>{text}</h6>
            <Input
              Icon={FaLock}
              type="password"
              text={placeholder || "Enter your password"}
              pattern="[A-Za-z0-9]*$"
              title="Enter only english character and number"
              onChange={onChange}
              required
              autoFocus
            />
            <span id="popup-btn-group">
              <Button alt text={cancel} onClick={onCancel} />
              <Button text={confirm} type="submit" />
            </span>
          </form>
        </div>}

      {type === 'loading' &&
        <div id="popup-overlay">
          <div id="popup-loading">
            <img id="popup-loading-img" src={logo} alt="" />
            <p>{text}</p>
          </div>
        </div>}

      {type === 'confirm' &&
        <div id="popup-overlay">
          <div id="popup-box">
            <Icon id="popup-icon" />
            <h4>{title}</h4>
            <p style={{ textAlign: 'center' }}>{text}</p>
            <span id="popup-btn-group">
              <Button alt text={cancel} onClick={onCancel} />
              <Button text={confirm} onClick={onConfirm} />
            </span>
          </div>
        </div>}

      {type === 'alert' &&
        <div id="popup-overlay">
          <div id="popup-box">
            <Icon id="popup-icon" />
            <h4>{title}</h4>
            <p style={{ textAlign: 'center' }}>{text}</p>
            <span id="popup-btn-single">
              <Button text={confirm} onClick={onConfirm} />
            </span>
          </div>
        </div>}
    </>
  )
}