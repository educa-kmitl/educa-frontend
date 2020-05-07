import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext, RoomContext } from '../../contexts'
import { randAlert } from '../../helpers'
import { getMyRoom, getFollowRoom, deleteRoom } from '../../apis'
import './Home.scss'

import { Card, Popup, Button } from '../../components'
import { FaHeartBroken } from 'react-icons/fa'
import logo from '../../img/room/play.svg'


export default () => {
  const history = useHistory()
  const { auth } = useContext(AuthContext)
  const { setRoom } = useContext(RoomContext)
  const [roomList, setRoomList] = useState([])
  const [password, setPassword] = useState('')
  const [roomId, setRoomId] = useState(null)
  const [popup, setPopup] = useState('')
  const [more, setMore] = useState({ have: true, limit: 6 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (auth.role) {

      getMyRoom(auth, more.limit)
        .then(res => {
          setIsLoading(false)
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
          setIsLoading(false)
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
  const handlePassword = value => setPassword(value)
  const handlePrivacy = () => {
    setPopup('loading')
    deleteRoom(roomId, auth, password)
      .then(res => {
        const { success, error } = res.data
        if (success) {
          const newRoomList = roomList.filter(room => room.room_id !== roomId)
          setRoomList(newRoomList)
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }
  const handleMore = () => {
    setIsLoading(true)
    if (auth.role) {

      getMyRoom(auth, more.limit + 6)
        .then(res => {
          setIsLoading(false)
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
          setIsLoading(false)
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
    <div className="home-page-bg">
      <div className="home-content">
        <header id="home-header">{auth?.role ? 'Your course' : 'Course for you'}</header>
        {!isLoading && (roomList.length === 0 && (
          auth.role ?
            <div className="no-room-content">
              <h6>You have no course. Start creating one for your student!</h6>
              <Button text="Let's Create" onClick={() => history.push('/create')} />
            </div>
            :
            <div className="no-room-content">
              <h6>Nothing special for you now. Start follow the Teacher to see some!</h6>
              <Button text="Let's Find" onClick={() => history.push('/find')} />
            </div>
        ))}
        <div className="all-room">
          {roomList.map((room, index) =>
            <Card
              key={index}
              room={room}
              onClick={enterRoom}
              editable={auth.role}
              onEdit={(room) => { setRoom(room); history.push(`/edit/${room.room_id}`) }}
              onDelete={room => { setPopup('password'); setRoomId(room.room_id) }}
            />)}
        </div>
        {isLoading && <div style={{ textAlign: 'center' }}><img id="popup-loading-img-2" src={logo} alt="" /></div>}
        {!isLoading && more.have && <button className="see-more-btn" onClick={handleMore}>Show more</button>}
      </div>

      {popup === 'loading' && <Popup type="loading" text="Loading" />}
      {popup === 'password' &&
        <Popup
          type="password"
          title="Are you sure ?"
          text="Course will lost forever"
          confirm="Delete"
          cancel="Cancel"
          onChange={handlePassword}
          onConfirm={handlePrivacy}
          onCancel={() => setPopup('')}
        />}
      {popup.type === 'alert' &&
        <Popup
          type="alert"
          Icon={FaHeartBroken}
          title={popup.title}
          text={popup.text}
          confirm="Okay"
          onConfirm={() => setPopup('')}
        />}
    </div>
  )
}