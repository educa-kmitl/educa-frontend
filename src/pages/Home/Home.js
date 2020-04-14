import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { getMyRoom, getFollowRoom, randAlert } from '../../helpers'
import './Home.scss'

import { Card, Popup } from '../../components'
import { FaHeartBroken } from 'react-icons/fa'


export default () => {
  const history = useHistory()
  const [auth] = useContext(AuthContext)
  const [roomList, setRoomList] = useState([])
  const [popup, setPopup] = useState('')
  const [more, setMore] = useState({ have: false, limit: 6 })

  useEffect(() => {
    if (auth.role) {

      getMyRoom(auth, more.limit)
        .then(res => {
          const { rooms, have_more, error } = res.data
          if (rooms) {
            setRoomList(rooms)
            setMore({ have: have_more, limit: 6 })
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    } else {

      getFollowRoom(auth, more.limit)
        .then(res => {
          const { rooms, have_more, error } = res.data
          if (rooms) {
            setRoomList(rooms)
            setMore({ have: have_more, limit: 6 })
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enterRoom = room => history.push(`/room/${room.room_id}`)
  const handleMore = () => {
    if (auth.role) {

      getMyRoom(auth, more.limit + 6)
        .then(res => {
          const { rooms, have_more, error } = res.data
          if (rooms) {
            setRoomList(rooms)
            setMore({ have: have_more, limit: more.limit + 6 })
            setPopup('')
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    } else {

      getFollowRoom(auth, more.limit + 6)
        .then(res => {
          const { rooms, have_more, error } = res.data
          if (rooms) {
            setRoomList(rooms)
            setMore({ have: have_more, limit: more.limit + 6 })
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    }
  }

  return (
    <div className="full-page home-page-bg">
      <div className="full-page-content home-content">
        <header id="home-header">{auth?.role ? 'Your course' : 'Course for you'}</header>

        <div className="all-room">
          {roomList.map((room, index) => <Card key={index} room={room} onClick={enterRoom} />)}
        </div>

        {more.have && <button className="see-more-btn" onClick={handleMore}>Show more</button>}
      </div>

      {popup === 'loading' &&
        <Popup
          type="loading"
          text="Loading"
        />}
      {popup.type === 'alert' &&
        <Popup
          type="alert"
          Icon={FaHeartBroken}
          title={popup.title}
          text={popup.text}
          confirm="Refresh"
          onConfirm={() => window.location = 'home'}
        />}

    </div>
  )
}