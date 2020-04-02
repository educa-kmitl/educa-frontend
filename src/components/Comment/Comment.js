import React from 'react'
import './Comment.scss'

import { FaTelegramPlane } from 'react-icons/fa'
import { profiles } from '../../img/Profile'

const comments = [
  { name: 'Teacher', text: 'This is Great!', role: true, profile_icon: 1 },
  { name: 'Stupident', text: 'Hello teqacherdasd addad adashhic d kdj', role: false, profile_icon: 4 },
  { name: 'Weed', text: 'I want to study', role: false, profile_icon: 7 },
  { name: 'Weed', text: 'I want to study!', role: false, profile_icon: 7 },
  { name: 'Teacher', text: 'I want to study more!!', role: true, profile_icon: 1 },
  { name: 'Stupident', text: 'Wrong role!', role: false, profile_icon: 4 },
]

export const Comment = () => {
  return (
    <div className="comment-box">
      <header>Comment</header>
      <hr />

      <div className="room-comment">
        {comments.map((comment, index) => (
          <div key={index} className="box">
            <span>
              <img className='profile' src={profiles[comment.profile_icon]} alt='' />
              <header>{comment.name}</header>
            </span>
            <p>{comment.text}</p>
            <label>12:14AM 1 April 2000</label>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="Write comment"
          type="text"
          onChange={null}
          onKeyPress={null}
        />
        <div className="icon-c" onClick={null}>
          <FaTelegramPlane className="icon" />
        </div>
      </div>
    </div>
  );
}