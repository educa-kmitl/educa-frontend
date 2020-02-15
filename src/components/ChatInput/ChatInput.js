import React from 'react';
import './ChatInput.scss';

export const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <input 
      className="chat-input-field"
      placeholder="type something..."
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
    />
  );
}