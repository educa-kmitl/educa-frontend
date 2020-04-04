import React from 'react'
import './Popup.scss'

import { Input, Button } from '../'
import { FaLock } from 'react-icons/fa'

export const Popup = ({ type, onChange, onSubmit, onCancel }) => {
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
          pattern="^[A-Za-z][A-Za-z0-9]*$"
          title="Enter only english character and number"
          onChange={onChange}
          required
        />
        <span>
          <div className="cancel" onClick={onCancel}>Cancel</div>
          <Button text="EDUCA" type="submit" />
        </span>
      </form>
    </div>
    :
    <>
    </>
    }
    </>
  )
}