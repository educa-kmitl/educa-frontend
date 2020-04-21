import React, { useState } from 'react'
import moment from 'moment'
import './Comment.scss'

import { FaTelegramPlane } from 'react-icons/fa'
import { profiles } from '../../img/Profile'
import logo from '../../img/room/play.svg'

export const Comment = ({ post, comments, more, onMore }) => {
  const [message, setMessage] = useState('')

  const writeComment = () => {
    post(message)
    setMessage('')
  }

  return (
    <div className="comment-box">
      <header>Comment</header>
      <hr />

      <div className="room-comment">
        {more && <button id="show-earlier-btn" onClick={onMore}>Show earlier</button>}
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