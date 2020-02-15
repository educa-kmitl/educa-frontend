import React, { useState } from 'react';
import './Teach.scss';
import { Input, Dropdown, ToggleButton, Button } from '../../components';

export const Teach = () => {

  const [roomID, setRoomID] = useState('');

  const submitForm = () => {
    alert('Submit!')
  }

  return (
    <div className="teach-page-bg">
      <div className="teach-content">
        <div className="teach-form">
          <header>Create Room</header>
          <form id="create-room" onSubmit={submitForm}>
            <Input text="Room Name" type="text" required/>
            <div className="tag-group">
              <Dropdown id="main" subjects={['Science']} text="Main tag"/>
              <Dropdown id="sub" subjects={['Physics', 'Chemistry', 'Biology']} text="Sub tag"/>
            </div>
            <Input text="Descripion" type="text"/>
            <div className="private-group">
              <Dropdown id="num" subjects={[2, 3, 4, 5]} text="Number" required/>
              <ToggleButton on="Private" off="Public"/>
            </div>
            <Button alt text="Create" type="submit"/>
          </form>
        </div>
      </div>
    </div>
  );
}