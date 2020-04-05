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
  const [playlist, setPlaylist] = useState({ show: false, playing: 0, id: 0 })
  const [comments, setComments] = useState([])

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

              if (room) {
                setRoomData(room)
                fetchComments(room)
              }
              else {
                alert(error)
              }
            })
        } else {
          alert(error)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleDialog = () => {
    const overlay = document.querySelector('.room-password')
    overlay.classList.toggle('hide')
    document.querySelector('#room-pw').value = ''
  }
  const fetchComments = (room, index = 0) => {
    handlePopup()
    fetch(window.$ENDPOINT + '/comments', {
      method: 'GET',
      headers: {
        resource_id: room.resources[index].resource_id
      }
    })
      .then(res => res.json())
      .then(json => {
        const { comments, error } = json

        if (comments) {
          const lastestComment = comments.sort((a, b) => new Date(b.time) - new Date(a.time))
          setComments(lastestComment)
        }
        else {
          alert(error)
        }
        handlePopup()
      })
  }
  const handleComment = (text) => {
    fetch(window.$ENDPOINT + '/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: auth.data.user_id,
        resource_id: roomData.resources[playlist.playing].resource_id,
        text,
        time: new Date()
      })
    })
      .then(res => res.json())
      .then(json => {
        const { user, error } = json

        if (user) {
          fetchComments(roomData)
        }
        else alert(error)
      })
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
          fetchComments(room)
          toggleDialog()
        } else {
          alert(error)
        }
      })
  }
  const handlePopup = () => document.querySelector('.popup-content').classList.toggle('hide')
  const handlePassword = value => setPassword(value)
  const handlePlaylist = (value, action) => {
    const newValue = value
    setPlaylist(newValue)
    if (action) {
      fetchComments(roomData, newValue.playing)
    }
  }
  const exitRoom = () => history.push('/home')
  const downloadFile = () => {
    const file = roomData.resources[playlist.playing].file_url
    if (file) window.open(file)
    else alert('This video has no file to download')
  }

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
                allowFullScreen
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
              <div className="btn" onClick={downloadFile}>
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
              setPlaylist={handlePlaylist}
              roomData={roomData}
            />
          </div>

          <div className="comment-container">
            <Comment
              refresh={handleComment}
              comments={comments}
            />
          </div>

        </div>
      </div>

      <Popup
        type="lock"
        onChange={handlePassword}
        onSubmit={handlePrivacy}
        onCancel={exitRoom}
      />
      <Popup type="loading" waitText="Loading" />
    </div >
  );
}