import React from 'react'
import moment from 'moment'
import './Card.scss'

import { FaLock, FaHeart } from 'react-icons/fa'
import { subjects } from '../../img/subject'

export const Card = ({ room, onClick }) => {
  return (
    <div className="course-card" onClick={onClick && (() => onClick(room))}>
      <img src={subjects[room?.subject]} className="course-cover" alt="" />
      <section className="course-detail">
        <div className="course-header">
          <h5 className="course-name">
            {room?.private && <FaLock style={lock} />}
            {room?.name}
          </h5>
          <p className="course-teacher">by {room?.teacher_name}</p>
        </div>
        <footer className="course-footer">
          <p className="course-date">
            {moment(new Date(room?.date_created)).format("LL")}
          </p>
          <div style={like}>
            <FaHeart style={heart} />
            {room?.likes}
          </div>
        </footer>
      </section>
    </div>
  )
}

const like = {
  display: 'flex',
  alignItems: 'center'
}

const heart = {
  fontSize: '20px',
  color: '#ff0062',
  marginRight: '10px'
}

const lock = {
  fontSize: '20px',
  marginRight: '5px',
  color: 'grey'
}