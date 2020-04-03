import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Home.scss'

import { Card, Input, Button } from '../../components'
import { FaSearch, FaPlus, FaLock } from 'react-icons/fa'


export default () => {
  const ENDPOINT = "http://localhost:5000" // Change Later
  const history = useHistory()

  const [auth] = useContext(AuthContext)
  const [roomList, setRoomList] = useState([])
  const [select, setSelect] = useState({ room: {}, password: '' })
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
  const handlePassword = value => { setSelect({ ...select, password: value }); console.log(select.password) }
  const handlePrivacy = e => {
    e.preventDefault()

    fetch(ENDPOINT + '/api/user/room-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id: select.room.id,
        password: select.password
      })
    })
      .then(res => res.json())
      .then(json => {
        const { success } = json
        if (success) {
          history.push(`/room/${select.room.id}`)
        } else {
          alert('Wrong!')
        }
      })
  }
  const enterRoom = room => {
    setSelect({ room, password: '' })
    if (room.private) {
      toggleDialog()
    } else {
      history.push(`/room/${room.id}`)
    }
  }
  const toggleDialog = () => {
    const overlay = document.querySelector('.room-password')
    overlay.classList.toggle('hide')
    document.querySelector('#room-pw').value = ''
  }

  return (
    <div className="home-page-bg">
      <div className="home-content">
        <header onClick={() => console.log(select)}>{auth.data.role ? 'Your active course' : `Let's find some course!`}</header>
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
          {filterRoom().map((room, index) => <Card key={index} room={room} onClick={enterRoom} />)}
        </div>

        <div className="room-password hide">
          <form className="dialog-box" onSubmit={handlePrivacy}>
            <header>It's Locked!</header>
            <Input
              id='room-pw'
              Icon={FaLock}
              text="Enter password"
              value={select.password}
              type="password"
              onChange={handlePassword}
              required
            />
            <span>
              <div className="cancel" onClick={toggleDialog}>Cancel</div>
              <Button text="EDUCA" type="submit" />
            </span>
          </form>
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