import React, { useState, useContext } from 'react'
import './Create.scss'

import { useHistory } from 'react-router-dom'
import { FaBook, FaBookmark, FaLink, FaTrashAlt, FaLock } from 'react-icons/fa'
import { Input, Dropdown, ToggleButton, Button } from '../../components'
import { AuthContext } from '../../contexts'

const defaultRoom = {
  name: 'Title',
  subject: 'Math',
  video_source: [{ topic: 'Video title', link: '' }],
  private: false
}

export const Create = () => {
  const ENDPOINT = "http://localhost:5000" // Change Later

  const [auth, setAuth] = useContext(AuthContext)
  const [room, setRoom] = useState(defaultRoom)
  const history = useHistory()

  const handleTitle = e => setRoom({ ...room, name: e.target.value })
  const handleSubject = e => setRoom({ ...room, subject: e })
  const handlePrivacy = e => setRoom({ ...room, private: e })
  const handlePassword = e => setRoom({ ...room, password: e.target.value })
  const handleVideoTitle = (value, index) => {
    const newVideos = room.video_source
    newVideos[index].topic = value
    setRoom({ ...room, video_source: newVideos })
  }
  const handleVideoLink = (value, index) => {
    const newVideos = room.video_source
    newVideos[index].link = value
    setRoom({ ...room, video_source: newVideos })
  }
  const addPlaylist = () => {
    const newVideos = room.video_source
    newVideos.push({ topic: 'Video title', link: '' })
    setRoom({ ...room, video_source: newVideos })
  }
  const delPlaylist = i => {
    const newVideos = room.video_source
    newVideos.splice(i, 1)
    setRoom({ ...room, video_source: newVideos })
  }
  const handleSubmit = e => {
    e.preventDefault();

    fetch(ENDPOINT + '/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    })
      .then(res => res.json())
      .then(json => {
        const { room } = json
        if (room) {
          alert('Created!')
          console.log(room)
          history.push(`/room?room_id=${room.id}`)
        }
      })
    
  }

  return (
    <div className="create-bg">
      <div className="create-content">

        <form onSubmit={handleSubmit}>
          <header>Create Course</header>
          <Input
            text="Course title"
            type="text"
            onChange={handleTitle}
            icon={FaBook}
            required
          />
          <div className="row">
            <div className="column">
              <label className="head">Subject</label>
              <Dropdown onSelect={handleSubject} menus={['Math', 'Science', 'English', 'Computer']} />
            </div>
            <div className="column">
              <span style={{ display: 'flex', alignItems: 'flex-start' }}>
                <label className="head">Privacy</label>
                <ToggleButton onToggle={handlePrivacy} />
              </span>
              <Input
                text="Password"
                type="text"
                onChange={handlePassword}
                icon={FaLock}
                required={room.private}
                disabled={!room.private}
              />
            </div>
          </div>
          <label className="head" onClick={() => console.log(room)}>Playlist</label>
          <hr />
          <div className="playlist">

            {room.video_source.map((video, index) =>
              <div className="item" id={index}>
                <span>
                  <label>{index + 1}. {video.topic}</label>
                  {
                    room.video_source.length > 1 ?
                      <div id={index} className="del" onClick={(e) => delPlaylist(e.target.id)}><FaTrashAlt className="icon" /></div>
                      : null
                  }
                </span>
                <Input
                  text="Video title"
                  type="link"
                  onChange2={handleVideoTitle}
                  index={index}
                  icon={FaBookmark}
                  required
                />
                <Input
                  text="Video link"
                  type="url"
                  onChange2={handleVideoLink}
                  index={index}
                  icon={FaLink}
                  required
                />
              </div>
            )}

            <div className="add"><p onClick={addPlaylist}>+</p></div>
          </div>
          <hr />

          <Button text="EDUCA" type="submit" />
        </form>

        <div className="display-container">
          <div className="display-card">
            <div className="img"></div>
            <div className="detail">
              <header>
                {room.private && <FaLock style={{ fontSize: '36px' }} />} {room.name}<br />
                <p>{room.subject} {room.video_source.length} video{room.video_source.length > 1 ? 's' : null}</p>
              </header>
              <footer>by {auth.data.name}</footer>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}