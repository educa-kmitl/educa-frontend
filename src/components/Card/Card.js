import React, { useState, useContext } from 'react'
import './Card.scss'

import { Input, Button } from '../'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { FaLock } from 'react-icons/fa'

export const Card = ({ room }) => {
  const ENDPOINT = "http://localhost:5000" // Change Later

  const history = useHistory()
  const [auth, setAuth] = useContext(AuthContext)
  const [password, setPassword] = useState('')

  const enterRoom = e => {
    if (room.private) {
      const overlay = document.querySelector(`#pw-room-${room.id}`)
      overlay.classList.toggle('hide')
    } else {
      history.push(`/room?room_id=${room.id}`)
    }
  }

  const handlePassword = e => setPassword(e.target.value)
  const handlePrivacy = e => {
    e.preventDefault()

    fetch(ENDPOINT + '/api/user/room-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id: room.id,
        password
      })
    })
      .then(res => res.json())
      .then(json => {
        const { success } = json
        if (success) {
          alert('Great!')
          history.push(`/room?room_id=${room.id}`)
        } else {
          alert('Wrong!')
        }
      })
  }

  const cancelDialog = () => {
    const overlay = document.querySelector(`#pw-room-${room.id}`)
    overlay.classList.toggle('hide')
  }

  return (
    <>
      <div className={'card ' + room.subject} onClick={enterRoom}>
        <div className="imgCard"></div>
        <div className="txt">

          <div className="title">
            <div className="heading">
              {room.private && <FaLock style={{ fontSize: '20px', marginRight: '5px' }} />}
              {room.name}
            </div>
            <div className="description">
              {room.subject} {room.video_source.length} video{room.video_source.length > 1 ? 's' : null}
            </div>
          </div>
          <div className="tutor">
            {room.teacher_id}
          </div>
        </div>
      </div>

      <div className="room-password hide" id={`pw-room-${room.id}`}>
        <form className="dialog-box" onSubmit={handlePrivacy} name={`pw-room-${room.id}`}>
          <header>It's Locked!</header>
          <Input 
            text="Enter password" 
            type="password" 
            icon={FaLock} 
            onChange={handlePassword} 
            required 
          />
          <span>
            <div className="cancel" onClick={cancelDialog}>Cancel</div>
            <Button text="EDUCA" type="submit" />
          </span>
        </form>
      </div>
    </>
  )
}