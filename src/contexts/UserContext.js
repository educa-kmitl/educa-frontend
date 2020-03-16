import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(
    {
      name: 'guest',
      exp: 0,
      follow: [
        'friend1'
      ],
      follower: [
        'friend1',
        'friend2',
        'friend3'
      ],
      stat: {
        teach: {
          math: 0,
          science: 0,
          english: 0,
          computer: 0
        },
        learn: {
          math: 0,
          science: 0,
          english: 0,
          computer: 0
        }
      }
    }
  );

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}