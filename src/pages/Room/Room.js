import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '../../hooks'
import './Room.scss'

import { FaUserPlus, FaFileDownload, FaSignOutAlt } from 'react-icons/fa'
import { Comment, Playlist, Button } from '../../components'
import { AuthContext } from '../../contexts'
import io from 'socket.io-client'

let socket

const defaultRoom = {
  name: 'Title',
  subject: 'Math',
  video_source: [{ topic: 'Video title', link: 'https://www.youtube.com/embed/9ilIXz65YXU' }],
  private: false
}

export default () => {
  const query = useQuery()
  const [auth] = useContext(AuthContext)
  const [roomData, setRoomData] = useState(defaultRoom)
  const [roomID, setRoomID] = useState(-1)
  const [playlist, setPlaylist] = useState({ show: false, playing: 0 })
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const location = useLocation()

  useEffect(() => {
    const room_id = query.get('room_id')

    setRoomID(room_id)
    socket = io(window.$ENDPOINT)

    socket.emit('join', { room_id, name: auth.data.name }, () => {
      console.log(`${auth.data.name} join room ${room_id}`)
    })

  }, [auth.data.name, location.search])

  useEffect(() => {
    socket.on('room-data', ({ room }) => {
      setRoomData(room)
      console.log(room)
    })
  })

  useEffect(() => {
    socket.on('message', newMessage => {
      setMessages([...messages, newMessage])
    })

    const lastest = document.querySelector('.room-comment')
    lastest.scrollTop = lastest.scrollHeight

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [messages])

  const sendMessage = e => {
    e.preventDefault()

    if (message !== '') {
      socket.emit('sendMessage', { message, room_id: roomID, name: auth.data.name })
      setMessage('')
    }
  }

  const exitRoom = e => {
    e.preventDefault()

    socket.emit('disconnect', { room_id: roomID, name: auth.data.name })
    socket.off()
    console.log(roomID, auth.data.name)

    window.location = '/home'
  }



  return (
    <div className="room-page-bg">
      <div className="room-page-content">
        <div className="video-card">
          <div className="video">
            {
              <iframe
                className="embed-video"
                src={roomData.video_source[playlist.playing].link}
                title={roomData.video_source[playlist.playing].topic}
              ></iframe>
            }
          </div>
          <div className="video-menu">
            <div className="video-title">
              <div className="title">{roomData.video_source[playlist.playing].topic}</div>
              <div className="name">by Sakchai</div>
            </div>
            <div className="btn-group">
              <div className="btn" onClick={() => console.log(playlist.playing)}>
                <FaUserPlus className="icon" />
              </div>
              <div className="btn" onClick={() => console.log(roomData)}>
                <FaFileDownload className="icon" />
              </div>
              <div className="btn" onClick={exitRoom}>
                <FaSignOutAlt className="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">

          <div className="course-card">
            <div className="course-detail">
              <div className="course-title">{roomData.name}</div>
              <div className="course-count">{roomData.video_source.length} video{roomData.video_source.length > 1 ? 's' : null}</div>
            </div>
            <footer>
              <Button text="show all" onClick={() => setPlaylist({ ...playlist, show: !playlist.show })} />
            </footer>
            <Playlist
              playlist={playlist}
              setPlaylist={setPlaylist}
              roomData={roomData}
            />
          </div>

          <div className="comment-container">
            <Comment />
          </div>

        </div>
      </div>
    </div>
  );
}