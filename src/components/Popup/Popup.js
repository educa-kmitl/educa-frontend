import React from 'react'
import './Popup.scss'

import { Input, Button } from '../'
import { FaLock } from 'react-icons/fa'
import logo from '../../img/room/play.svg'

export const Popup = ({ type, text, confirm, cancel, onChange, onConfirm, onCancel }) => {
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
                <div className="cancel" onClick={onCancel}>Cancel</div>
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
                <div id="popup-confirm">
                  <header id="popup-title">{text}</header>
                  <span id="popup-btn-group">
                    <button className="secondary-btn" onClick={onCancel}>{cancel}</button>
                    <Button text={confirm} type="submit" onClick={onConfirm} />
                  </span>
                </div>
              </div>
              : null
      }
    </>
  )
}