import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { createRoom, randAlert } from '../../helpers'
import './Create.scss'

import { FaBook, FaBookmark, FaLink, FaTrashAlt, FaLock, FaFileAlt } from 'react-icons/fa'
import { Input, Dropdown, ToggleButton, Button, Popup } from '../../components'

const defaultRoom = {
  name: 'Course Title',
  subject: 'Math',
  resources: [{ topic: 'Video title', video_url: '', file_url: '' }],
  privacy: false,
  password: ''
}

export default () => {
  const history = useHistory()
  const [auth] = useContext(AuthContext)
  const [room, setRoom] = useState(defaultRoom)
  const [popup, setPopup] = useState('')

  const handleTitle = value => setRoom({ ...room, name: value })
  const handleSubject = value => setRoom({ ...room, subject: value })
  const handlePrivacy = value => setRoom({ ...room, privacy: value })
  const handlePassword = value => setRoom({ ...room, password: value })
  const handleVideoTitle = (value, id) => {
    const newVideos = room.resources
    newVideos[id].topic = value
    setRoom({ ...room, resources: newVideos })
  }
  const handleVideoLink = (value, id) => {
    const newVideos = room.resources
    newVideos[id].video_url = value
    setRoom({ ...room, resources: newVideos })
  }
  const handleFileLink = (value, id) => {
    const newVideos = room.resources
    newVideos[id].file_url = value
    setRoom({ ...room, resources: newVideos })
  }
  const addPlaylist = () => {
    const newVideos = room.resources
    newVideos.push({ topic: 'Video title', video_url: '', file_url: '' })
    setRoom({ ...room, resources: newVideos })
  }
  const delPlaylist = i => {
    const newVideos = room.resources
    newVideos.splice(i, 1)
    setRoom({ ...room, resources: newVideos })
  }
  const handleSubmit = e => {
    e.preventDefault();
    setPopup('loading')

    createRoom(room, auth.data)
      .then(res => {
        const { room, error } = res.data
        if (room) {
          history.push(`/room/${room.room_id}`)
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }

  return (
    <div className="create-bg">
      <div className="create-content">

        <form onSubmit={handleSubmit} autoComplete="off">
          <header>Create Course</header>
          <Input
            Icon={FaBook}
            type="text"
            text="Course title *"
            onChange={handleTitle}
            required
          />
          <div className="row">
            <div className="column">
              <label className="head">Subject</label>
              <Dropdown onSelect={handleSubject} items={['Math', 'Science', 'English', 'Computer']} />
            </div>
            <div className="column">
              <span style={{ display: 'flex', alignItems: 'flex-start' }}>
                <label className="head">Privacy</label>
                <ToggleButton onToggle={handlePrivacy} />
              </span>
              <Input
                Icon={FaLock}
                type="password"
                text="Password"
                pattern="[A-Za-z0-9]*$"
                title="Enter only english character and number"
                onChange={handlePassword}
                required={room.privacy}
                disabled={!room.privacy}
              />
            </div>
          </div>
          <label className="head" onClick={() => console.log(room)}>Playlist</label>
          <hr />
          <div className="playlist">

            {room.resources.map((video, index) =>
              <div className="item" key={index}>
                <span>
                  <label onClick={() => alert(index)}>{index + 1}. {video.topic}</label>
                  {
                    room.resources.length > 1 ?
                      <div
                        id={index}
                        className="del"
                        onClick={e => delPlaylist(e.target.id)}
                      >
                        <FaTrashAlt className="icon" />
                      </div>
                      : null
                  }
                </span>
                <Input
                  Icon={FaBookmark}
                  id={index}
                  type="text"
                  text="Video title *"
                  onChange={handleVideoTitle}
                  required
                />
                <Input
                  Icon={FaLink}
                  id={index}
                  type="url"
                  text="Video link *"
                  onChange={handleVideoLink}
                  required
                />
                <Input
                  Icon={FaFileAlt}
                  id={index}
                  type="url"
                  text="Attachment"
                  onChange={handleFileLink}
                />
              </div>
            )}

            <div className="add"><p onClick={addPlaylist}>+</p></div>
          </div>
          <hr />

          <span>
            <Button text="EDUCA" type="submit" />
            <Link to="/home"><div className="cancel">Cancel</div></Link>
          </span>
        </form>

        <div className="display-container">
          <div className="display-card">
            <div className="img"></div>
            <div className="detail">
              <header>
                {room.privacy && <FaLock style={{ fontSize: '36px' }} />} {room.name}<br />
                <p>{room.subject} {room.resources.length} video{room.resources.length > 1 ? 's' : null}</p>
              </header>
              <footer>by {auth.data.name}</footer>
            </div>
          </div>
        </div>

      </div>

      {popup === 'loading' &&
        <Popup
          type="loading"
          text="Creating"
        />}
    </div>
  )
}