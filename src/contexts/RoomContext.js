import React, { createContext, useState, useEffect } from 'react'

export const RoomContext = createContext({})

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({})

  useEffect(() => {
    const data = window.localStorage.getItem("roomData")
    console.log(data)
    setRoom(data ? JSON.parse(data) : null)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("roomData", JSON.stringify(room))
  }, [room])

  // a function that will help us to add the user data in the auth;

  return <RoomContext.Provider value={[room, setRoom]}>{children}</RoomContext.Provider>
}
