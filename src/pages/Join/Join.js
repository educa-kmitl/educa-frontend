import React, { useState } from "react"

export const Join = ({ history }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    history.push(`/room?name=${name}&room_id=${room}`)
  }

  return (
    <div>
      <h1>Join the room</h1>
      <form onSubmit={handleSubmit}>
        name
        <input type="text" name="name" onChange={e => setName(e.target.value)} />
        <br />
        room
        <input type="text" name="room" onChange={e => setRoom(e.target.value)} />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  )
}

