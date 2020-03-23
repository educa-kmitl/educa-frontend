import React from 'react'
import './Chatbox.scss'

import { FaTelegramPlane } from 'react-icons/fa'

export const Chatbox = ({ message, setMessage, sendMessage, messages }) => {
  return (
    <div className="chat-box">
      <div className="room-info">
        <header>Chatbox</header>
        <p>8 users in this chat</p>
      </div>
      <hr />

      <div className="room-chat">
        {messages.map((message, index) => (
          <div key={index}>
            <p className="chat-box-message">
              <span className="username">
                {(message.name!=='s3rver') ? `${message.name}: ` : null}
              </span>
              {message.text}
            </p>
          </div>
        ))}
        <div id="lastest-message"></div>
      </div>
      
      <div className="chat-input">
        <input
          placeholder="Type message.."
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <div className="icon-c" onClick={e => sendMessage(e)}>
          <FaTelegramPlane className="icon" />
        </div>
      </div>
    </div>
  );
}