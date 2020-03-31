import React, { useState, useEffect, useContext } from 'react'
import './Home.scss'

import { Card } from '../../components'
import { AuthContext } from '../../contexts'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'


export const Home = () => {
  const ENDPOINT = "http://localhost:5000" // Change Later

  const [auth] = useContext(AuthContext)
  const [roomList, setRoomList] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (auth.data.role) {
      fetch(ENDPOINT + '/api/user/myrooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teacher_id: auth.data.id
        })
      })
        .then(res => res.json())
        .then(json => {
          const { rooms } = json
          if (rooms) {
            setRoomList(rooms)
          }
        })
    } else {

      fetch(ENDPOINT + '/api/user/rooms', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(json => {
          const { rooms } = json
          if (rooms) {
            setRoomList(rooms)
          }
        })
    }
  })

  const handleSearch = e => setFilter(e.target.value)
  const filterRoom = () => {
    return roomList.filter(room => (
      room.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      room.subject.toLowerCase().indexOf(filter.toLowerCase()) > -1
      // room.teacher_id.toLowerCase().indexOf(filter.toLowerCase()) > -1
    ))
  }

  return (
    <div className="home-page-bg">
      <div className="home-content">
        <header>{auth.data.role ? 'Your active course' : `Let's find some course!`}</header>
        <div className="search">
          <input
            placeholder="Type something to find..."
            value={filter}
            onChange={handleSearch}
          />
          <div className="icon">
            <FaSearch />
          </div>
        </div>

        <div className="all-room">
          {filterRoom().map((room, index) => <Card key={index} room={room} />)}
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