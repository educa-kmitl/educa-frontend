import React from 'react'
import './Popup.scss'

import { Input, Button } from '../'
import { FaLock } from 'react-icons/fa'
import logo from '../../img/room/play.svg'

export const Popup = ({ type, Icon, title, text, confirm, cancel, onChange, onConfirm, onCancel }) => {
  return (
    <>
      {
        type === 'lock' ?
          <div className="room-password">
            <form className="dialog-box" onSubmit={e => onConfirm(e)}>
              <header>It's Locked!</header>
              <Input
                id='room-pw'
                Icon={FaLock}
                text="Enter password"
                type="password"
                pattern="[A-Za-z0-9]*$"
                title="Enter only english character and number"
                onChange={onChange}
                required
                autoFocus
              />
              <span>
                <Button alt text="Cancel" onClick={onCancel} />
                <Button text="EDUCA" type="submit" />
              </span>
            </form>
          </div>
          :
          type === 'loading' ?
            <div className="popup-content">
              <div className="popup-box">
                <img src={logo} alt="" />
                <span>{text}</span>
              </div>
            </div>
            :
            type === 'confirm' ?
              <div className="popup-content">
                <div id="popup-box">
                  <Icon id="popup-icon" />
                  <header id="popup-title">{title}</header>
                  <p id="popup-text">{text}</p>
                  <span id="popup-btn-group">
                    <Button alt text={cancel} onClick={onCancel} />
                    <Button text={confirm} onClick={onConfirm} />
                  </span>
                </div>
              </div>
              :
              type === 'alert' ?
                <div className="popup-content">
                  <div id="popup-box">
                    <Icon id="popup-icon" />
                    <header id="popup-title">{title}</header>
                    <p id="popup-text">{text}</p>
                    <span id="popup-btn-single">
                      <Button text={confirm} onClick={onConfirm} />
                    </span>
                  </div>
                </div>
                : null
      }
    </>
  )
}