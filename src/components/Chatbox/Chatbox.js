import React from 'react';
import './Chatbox.scss';
import { ChatInput } from '../../components';

export const Chatbox = ({ roomID, message, setMessage, sendMessage, messages }) => {
  return (
    <div className="chat-box">
      <div className="room-info">
        <header>{roomID}</header>
        <p>Teacher name</p>
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

      <ChatInput 
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}