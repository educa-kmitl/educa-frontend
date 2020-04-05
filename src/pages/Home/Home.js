import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Home.scss'

import { Card } from '../../components'
import { FaSearch, FaPlus } from 'react-icons/fa'


export default () => {
  const history = useHistory()
  const [auth] = useContext(AuthContext)
  const [roomList, setRoomList] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch(window.$ENDPOINT + '/all-rooms', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        const { rooms, error } = json
        if (rooms) {
          if (auth.data.role) {
            const teacher_room = rooms.filter(room => room.teacher_id === auth.data.user_id)
            setRoomList(teacher_room)
          } else {
            setRoomList(rooms)
          }
        } else {
          alert(error)
        }
      })
  })

  const handleSearch = value => setFilter(value)
  const filterRoom = () => roomList.filter(room => (
    room.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
    room.subject.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
    room.teacher_name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  ))
  const enterRoom = room => history.push(`/room/${room.room_id}`)
  
  return (
    <div className="home-page-bg">
      <div className="home-content">
        <header>{auth.data.role ? 'Your active course' : `Let's find some course!`}</header>
        <div className="search">
          <input
            placeholder="Type something to find..."
            value={filter}
            onChange={e => handleSearch(e.target.value)}
          />
          <div className="icon">
            <FaSearch />
          </div>
        </div>

        <div className="all-room">
          {filterRoom().map((room, index) => <Card key={index} room={room} onClick={enterRoom} />)}
        </div>

      </div>

      {
        auth.data.role &&
        <Link to="/create">
          <div className="create-room-button">
            <FaPlus />
          </div>
        </Link>
      }

    </div>
  )
}