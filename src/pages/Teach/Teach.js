import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Teach.scss';
import { Input, Dropdown, ToggleButton, Button } from '../../components';

export const Teach = ({ user }) => {
  const [room, setRoom] = useState("")
  const [link, setLink] = useState("")
  const [redirect, setRedirect] = useState(false);

  const redirectLink = `/room?name=${user.name}&room_id=${room}&link=${link}`;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(room, '||', link);
    setRedirect(true);
  }

  return (
    <div className="teach-page-bg">
      <div className="teach-content">
        <div className="teach-form">

          <header>Create Room</header>
          <form onSubmit={handleSubmit}>
            <Input text="Room Name" type="text" onChange={setRoom} required/>
            <Input text="Embed Link" type="text" onChange={setLink} required/>
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

            {
              (redirect) ? 
              <Redirect to={redirectLink} /> 
              : null
            }

          </form>

        </div>
      </div>
    </div>
  );
}