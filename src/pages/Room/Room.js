import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Room.scss'

import { FaUserPlus, FaFileDownload, FaSignOutAlt } from 'react-icons/fa'
import { Comment, Playlist, Button, Popup } from '../../components'


export default () => {
  const history = useHistory()
  const { room_id } = useParams()
  const [auth] = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [roomData, setRoomData] = useState({
    name: 'Loading',
    subject: 'Loading',
    teacher_name: 'Loading',
    resources: [{ topic: 'Loading', link: '' }],
    private: false
  })
  const [playlist, setPlaylist] = useState({ show: false, playing: 0 })

  useEffect(() => {
    fetch(window.$ENDPOINT + '/room-privacy', {
      method: 'GET',
      headers: {
        room_id
      }
    })
      .then(res => res.json())
      .then(json => {
        const { lock, error } = json

        if (lock) {
          toggleDialog()
        } else if (!lock) {
          fetch(window.$ENDPOINT + '/rooms', {
            method: 'GET',
            headers: {
              room_id
            }
          })
            .then(res => res.json())
            .then(json => {
              const { room, error } = json

              if (room) setRoomData(room)
              else alert(error)
            })
        } else {
          alert(error)
        }
      })
  }, [])

  const toggleDialog = () => {
    const overlay = document.querySelector('.room-password')
    overlay.classList.toggle('hide')
    document.querySelector('#room-pw').value = ''
  }
  const handlePrivacy = e => {
    e.preventDefault()

    fetch(window.$ENDPOINT + '/rooms', {
      method: 'GET',
      headers: {
        room_id,
        password
      }
    })
      .then(res => res.json())
      .then(json => {
        const { room, error } = json

        if (room) {
          setRoomData(room)
          toggleDialog()
        } else {
          alert(error)
        }
      })
  }
  const handlePassword = value => setPassword(value)
  const exitRoom = () => history.push('/home')

  return (
    <div className="room-page-bg">
      <div className="room-page-content">
        <div className="video-card">
          <div className="video">
            {
              <iframe
                className="embed-video"
                src={roomData.resources[playlist.playing].video_url}
                title={roomData.resources[playlist.playing].topic}
              ></iframe>
            }
          </div>
          <div className="video-menu">
            <div className="video-title">
              <div className="title">{roomData.resources[playlist.playing].topic}</div>
              <div className="name">
                by {roomData.teacher_id === auth.data.user_id ? 'You' : roomData.teacher_name}
              </div>
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
              <div className="course-count">{roomData.resources.length} video{roomData.resources.length > 1 ? 's' : null}</div>
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

      <Popup
        type="lock"
        onChange={handlePassword}
        onSubmit={handlePrivacy}
        onCancel={exitRoom}
      />
    </div>
  );
}