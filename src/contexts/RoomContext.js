import React, { useState, createContext } from 'react';

export const RoomContext = createContext();

export const RoomProvider = (props) => {
  const [room, setRoom] = useState(
    {
      name: 'Calculus',
      owner: 'guest',
      video: [
        {
          topic: 'matrix',
          link: 'https://www.youtube.com'
        },
        {
          topic: 'matrix',
          link: 'https://www.youtube.com'
        },
        {
          topic: 'matrix',
          link: 'https://www.youtube.com'
        }
      ],
      userlist: [
        'guest',
        'friend1',
        'friend2',
        'friend3'
      ],
      messages: [
        {
          name: 'guest',
          text: 'Hello friend1'
        },
        {
          name: 'friend1',
          text: 'Hi guest!'
        }
      ]
    }
  );

  return (
    <RoomContext.Provider>
      {props.children}
    </RoomContext.Provider>
  );
}