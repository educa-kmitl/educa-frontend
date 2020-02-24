import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import './ChatInput.scss';

export const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="chat-input-container">
      <div className="input-box">
        <input 
          className="chat-input-field"
          placeholder="type something..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
      
      <div className="send-icon" onClick={e => sendMessage(e)}>
        <FaTelegramPlane className="icon"/>
      </div>
    </div>
  );
}