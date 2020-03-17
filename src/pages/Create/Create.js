import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Create.scss';
import { Input, Dropdown, ToggleButton, Button } from '../../components';
import { UserContext } from '../../contexts';

export const Create = () => {
  const [user, setUser] = useContext(UserContext);
  const [room, setRoom] = useState("")
  const [link, setLink] = useState("")
  const history = useHistory();
  
  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/room?name=${user.name}&room_id=${room}&link=${link}`)
  }

  return (
    <div className="create-page-bg">
      <div className="create-content">
        <div className="create-form">

          <header>Create Room</header>
          <form onSubmit={handleSubmit}>
            <Input text="Room Name" type="text" onChange={setRoom} required/>
            <div className="tag-group">
              <Dropdown id="main" menus={['Science']}/>
              <Dropdown id="sub" menus={['Physics', 'Chemistry', 'Biology']}/>
            </div>
            <Input text="Embed Link" type="text" onChange={setLink} required/>
            <div className="private-group">
              <Dropdown id="num" menus={[2, 3, 4, 5]}/>
              <ToggleButton on="Private" off="Public"/>
            </div>
            <Button alt text="Create" type="submit"/>
          </form>

        </div>
      </div>
    </div>
  );
}