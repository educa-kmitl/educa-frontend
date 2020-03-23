import React, { useEffect, useState, useContext } from 'react'
import './Room.scss'

import { useLocation, useHistory } from 'react-router-dom'
import { FaUserPlus, FaFileDownload, FaSignOutAlt } from 'react-icons/fa'
import { Chatbox, Button } from '../../components'
import { AuthContext } from '../../contexts'
import io from 'socket.io-client'
import queryString from 'query-string'

let socket

export const Room = () => {
  const ENDPOINT = "http://localhost:5000" // Change Later

  const [auth, setAuth] = useContext(AuthContext)
  const [roomID, setRoomID] = useState()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const location = useLocation()

  useEffect(() => {
    const { room_id } = queryString.parse(location.search)

    setRoomID(room_id)
    socket = io(ENDPOINT)

    socket.emit('join', { room_id, name: auth.data.name }, () => {
      console.log(`${auth.data.name} join room ${room_id}`)
    })

  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', newMessage => {
      console.log(newMessage)
      setMessages([...messages, newMessage])
    })

    window.scrollTo(0, document.querySelector('.room-chat').scrollHeight);

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [messages])

  const sendMessage = e => {
    e.preventDefault()

    if (message !== '') {
      console.log(roomID)
      socket.emit('sendMessage', { message, room_id: roomID, name: auth.data.name })
      setMessage('')
    }
  }

  return (
    <div className="room-page-bg">
      <div className="room-page-content">
        <div className="video-card">
          <div className="video">
            {/* { videoLink && 
              <iframe 
                className="embed-video"
                src={videoLink}
                title={videoLink}
              ></iframe> 
            } */}
          </div>
          <div className="video-menu">
            <div className="video-title">
              <div className="title">Linear Algebra</div>
              <div className="name">by Sakchai</div>
            </div>
            <div className="btn-group">
              <div className="btn">
                <FaUserPlus className="icon" />
              </div>
              <div className="btn">
                <FaFileDownload className="icon" />
              </div>
              <div className="btn">
                <FaSignOutAlt className="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">

          <div className="course-card">
            <div className="course-detail">
              <div className="course-title">Calculus</div>
              <div className="course-count">3 Videos</div>
            </div>
            <footer><Button text="show all" /></footer>
          </div>

          <div className="chat-container">
            <Chatbox
              roomID={roomID}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              messages={messages}
            />
          </div>

        </div>
      </div>
    </div>
  );
}