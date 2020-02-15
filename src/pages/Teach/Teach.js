import React, { useState } from 'react';
import './Teach.scss';
import { Input, Dropdown, ToggleButton } from '../../components';

export const Teach = () => {

  const [roomID, setRoomID] = useState('');

  return (
    <div className="teach-page-bg">
      <div className="teach-content">
        <div className="teach-form">
          <header>Create Room</header>
          <form>
            <Input text="Room Name" type="text"/>
            <div className="tag-group">
              <Dropdown id="main" subjects={['Science']} text="Main tag"/>
              <Dropdown id="sub" subjects={['Physics', 'Chemistry', 'Biology']} text="Sub tag"/>
            </div>
            <Input text="Descripion" type="text"/>
            <div className="private-group">
              <Dropdown id="num" subjects={[2, 3, 4, 5]} text="Number"/>
              <ToggleButton on="Private" off="Public"/>
            </div>
            <Input alt text="password" type="password"/>
          </form>
        </div>
      </div>
    </div>
  );
}