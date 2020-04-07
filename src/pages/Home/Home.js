import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { getAllRoom, getMyRoom, randAlert } from '../../helpers'
import './Home.scss'

import { Card, Popup } from '../../components'
import { FaSearch, FaPlus, FaSkull } from 'react-icons/fa'


export default () => {
  const history = useHistory()
  const [auth] = useContext(AuthContext)
  const [roomList, setRoomList] = useState([])
  const [search, setSearch] = useState({
    text: '',
    sort_by: 1,
    arrange_by: 1,
    limit: 6
  })
  const [popup, setPopup] = useState('')

  useEffect(() => {
    setPopup('loading')
    if (auth.data.role) {

      getMyRoom(auth.data)
        .then(res => {
          const { rooms, error } = res.data
          if (rooms) {
            setRoomList(rooms)
            setPopup('')
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    } else {

      getAllRoom(search)
        .then(res => {
          const { rooms, error } = res.data
          if (rooms) {
            setRoomList(rooms)
            setPopup('')
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = value => setSearch({ ...search, text: value })
  const enterRoom = room => history.push(`/room/${room.room_id}`)

  return (
    <div className="home-page-bg">
      <div className="home-content">
        <header>{auth.data.role ? 'Your active course' : `Let's find some course!`}</header>
        <div className="search">
          <input
            placeholder="Type something to find..."
            value={search.text}
            onChange={e => handleSearch(e.target.value)}
          />
          <div className="icon">
            <FaSearch />
          </div>
        </div>

        <div className="all-room">
          {roomList.map((room, index) => <Card key={index} room={room} onClick={enterRoom} />)}
        </div>

      </div>

      {auth.data.role &&
        <Link to="/create">
          <div className="create-room-button">
            <FaPlus />
          </div>
        </Link>}
      {popup.type === 'alert' &&
        <Popup
          type="alert"
          Icon={FaSkull}
          title={popup.title}
          text={popup.text}
          confirm="Refresh"
          onConfirm={() => window.location = 'home'}
        />}

    </div>
  )
}