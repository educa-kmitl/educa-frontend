import React, { useState } from 'react'
import './Comment.scss'

import { FaTelegramPlane } from 'react-icons/fa'
import { profiles } from '../../img/Profile'
import logo from '../../img/room/play.svg'

const moment = require('moment')

export const Comment = ({ refresh, comments }) => {
  const [message, setMessage] = useState('')

  const writeComment = () => {
    refresh(message)
    setMessage('')
  }

  return (
    <div className="comment-box">
      <header>Comment</header>
      <hr />

      <div className="room-comment">
        {comments.map((comment, index) => (
          <div key={index} className="box">
            <span>
              <img className='profile' src={profiles[comment.profile_icon]} alt='' />
              <header>
                {comment.role && <img src={logo} alt="" />}
                {comment.name}
              </header>
            </span>
            <p>{comment.text}</p>
            <label>{moment(comment.time).fromNow()}</label>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="Write comment"
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? writeComment() : null}
        />
        <div className="icon-c" onClick={writeComment}>
          <FaTelegramPlane className="icon" />
        </div>
      </div>

    </div>
  );
}