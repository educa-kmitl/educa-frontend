import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import './Comment.scss'

import { FaTelegramPlane } from 'react-icons/fa'
import { profiles } from '../../img/Profile'
import logo from '../../img/room/play.svg'

export const Comment = ({ post, comments, more, onMore }) => {
  const [message, setMessage] = useState('')
  const history = useHistory()

  const writeComment = () => {
    if (message.length !== 0) {
      post(message)
      setMessage('')
    }
  }

  return (
    <div className="comment-box">
      <header>Comment</header>
      <hr />

      <div className="room-comment">
        {more && <button id="show-earlier-btn" onClick={onMore}>Show earlier</button>}
        {comments.length === 0 && <p style={{ fontSize: '16px', margin: '10px' }}>No comment on this video</p>}
        {comments.map((comment, index) => (
          <div key={index} className="box">
            <span className="teacher-detail">
              <img className='profile' src={profiles[comment.profile_icon]} onClick={() => history.push(`/profile/${comment.user_id}`)} alt='' />
              <header>
                {comment.role && <img src={logo} alt="" />}
                {(comment.name.length > 12 && comment.name.substr(0, 12) + '...') || comment.name}
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