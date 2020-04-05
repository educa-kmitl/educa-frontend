import React from 'react'
import './Card.scss'

import { FaLock } from 'react-icons/fa'
const moment = require('moment')

export const Card = ({ room, onClick }) => {
  return (
    <div className={'card ' + room?.subject} onClick={onClick && (() => onClick(room))}>
      <div className="imgCard"></div>
      <div className="txt">

        <div className="title">
          <div className="heading">
            {room?.private && <FaLock style={{ fontSize: '20px', marginRight: '5px' }} />}
            {room?.name}
          </div>
          <div className="description">
            {room?.subject} {room?.resource_length} video{room?.resource_length > 1 ? 's' : null}
          </div>
        </div>
        <div className="tutor">
          by {room?.teacher_name} <br />
          {moment(new Date(room?.date_created)).format("LL")}
        </div>
      </div>
    </div>
  )
}