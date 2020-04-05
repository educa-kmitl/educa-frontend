import React from 'react'
import './Popup.scss'

import { Input, Button } from '../'
import { FaLock } from 'react-icons/fa'
import logo from '../../img/room/play.svg'

export const Popup = ({ type, waitText, onChange, onSubmit, onCancel }) => {
  return (
    <>
      {
        type === 'lock' ?
          <div className="room-password hide">
            <form className="dialog-box" onSubmit={e => onSubmit(e)}>
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
            <div className="popup-content hide">
              <div className="popup-box">
                <img src={logo} alt="" />
                <span>{waitText}</span>
              </div>
            </div>
            : null
      }
    </>
  )
}