import React from 'react';
import './Chatbox.scss';
import { Input } from '../';

export const Chatbox = ({ message, setMessage, messages, func }) => {
  return (
    <div className="chat-box">
      <div className="room-info">
        <header>The Video name</header>
        <p>Teacher name</p>
      </div>
      <hr />

      <div className="room-chat">
      {messages.map((msg, index) => (
        <div key={index}>
          <p>{msg.text}</p>
        </div>
      ))}
      <div id="lastest-message"></div>
      </div>

      <form onSubmit={func}>
        <Input alt chat 
          text="type message..." 
          func={func} 
          update={setMessage}
          message={message}
        />
      </form>
    </div>
  );
}