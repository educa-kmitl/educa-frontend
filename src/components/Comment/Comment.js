import React, { useState } from 'react'
<<<<<<< HEAD
=======
import moment from 'moment'
>>>>>>> 4102e9f91049040aa483958e2e8a65ec117b8329
import './Comment.scss'

import { FaTelegramPlane } from 'react-icons/fa'
import { profiles } from '../../img/Profile'
import logo from '../../img/room/play.svg'

<<<<<<< HEAD
const moment = require('moment')

export const Comment = ({ refresh, comments }) => {
  const [message, setMessage] = useState('')

  const writeComment = () => {
    refresh(message)
    setMessage('')
=======
export const Comment = ({ post, comments, more, onMore }) => {
  const [message, setMessage] = useState('')

  const writeComment = () => {
    if (message.length !== 0) {
      post(message)
      setMessage('')
    }
>>>>>>> 4102e9f91049040aa483958e2e8a65ec117b8329
  }

  return (
    <div className="comment-box">
      <header>Comment</header>
      <hr />

      <div className="room-comment">
<<<<<<< HEAD
=======
        {more && <button id="show-earlier-btn" onClick={onMore}>Show earlier</button>}
>>>>>>> 4102e9f91049040aa483958e2e8a65ec117b8329
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