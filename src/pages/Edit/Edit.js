import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext, RoomContext } from '../../contexts'
import { get, embedYoutube, randAlert } from '../../helpers'
import './Edit.scss'

import { FaBook, FaBookmark, FaLink, FaTrashAlt, FaLock, FaFileAlt } from 'react-icons/fa'
import { Input, Dropdown, ToggleButton, Button, Popup, Card } from '../../components'

export default () => {
  const history = useHistory()
  const [auth] = useContext(AuthContext)
  const [room] = useContext(RoomContext)
  const [newRoom, setRoom] = useState()
  const [popup, setPopup] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.role === false) history.push('/notfound')
    setRoom(room)
    console.log(room)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTitle = value => setRoom({ ...newRoom, name: value })
  const handleSubject = value => setRoom({ ...newRoom, subject: value })
  const handlePrivacy = value => setRoom({ ...newRoom, private: value })
  const handlePassword = value => setRoom({ ...newRoom, password: value })
  const handleVideoTitle = (value, id) => {
    const newVideos = newRoom.resources
    newVideos[id].topic = value
    setRoom({ ...newRoom, resources: newVideos })
  }
  const handleVideoLink = (value, id) => {
    const newVideos = newRoom.resources
    newVideos[id].video_url = value
    setRoom({ ...newRoom, resources: newVideos })
  }
  const handleFileLink = (value, id) => {
    const newVideos = newRoom.resources
    newVideos[id].file_url = value
    setRoom({ ...newRoom, resources: newVideos })
  }
  const addPlaylist = () => {
    const newVideos = newRoom.resources
    newVideos.push({ topic: 'Video title', video_url: '', file_url: '' })
    setRoom({ ...newRoom, resources: newVideos })
  }
  const delPlaylist = i => {
    const newVideos = newRoom.resources
    newVideos.splice(i, 1)
    setRoom({ ...newRoom, resources: newVideos })
  }
  const handleTeacherPassword = value => setPassword(value)
  const handleSubmit = () => {
    setPopup('loading')

    const embedRoom = newRoom
    for (let i = 0; i < newRoom.resources.length; i++) {
      embedRoom.resources[i].video_url = embedYoutube(embedRoom.resources[i].video_url)
    }
    // createRoom(embedRoom, auth)
    //   .then(res => {
    //     const { newRoom, error } = res.data
    //     if (newRoom) {
    //       history.push(`/newRoom/${newRoom.room_id}`)
    //     } else {
    //       setPopup({ type: 'alert', title: randAlert(), text: error })
    //     }
    //   })
  }

  return (
    <div className="create-bg">
      <div className="create-content">

        <form onSubmit={handleSubmit} autoComplete="off">
          <header>Edit Course</header>
          <Input
            Icon={FaBook}
            type="text"
            value={newRoom?.name}
            text="Course title *"
            onChange={handleTitle}
            required
          />
          <div className="row">
            <div className="column">
              <label className="head">Subject</label>
              <Dropdown onSelect={handleSubject} items={['Math', 'Science', 'English', 'Computer']} init={room.subject} />
            </div>
            <div className="column">
              <span style={{ display: 'flex', alignItems: 'flex-start' }}>
                <label className="head">Privacy</label>
                <ToggleButton onToggle={handlePrivacy} init={room.private} />
              </span>
              <Input
                Icon={FaLock}
                type="password"
                text="Password"
                pattern="[A-Za-z0-9]*$"
                title="Enter only english character and number"
                onChange={handlePassword}
                required={newRoom?.private}
                disabled={!newRoom?.private}
              />
            </div>
          </div>
          <label className="head">Playlist</label>
          <hr />
          <div className="playlist">

            {newRoom?.resources.map((video, index) =>
              <div className="item" key={index}>
                <span>
                  <label onClick={() => alert(index)}>{index + 1}. {video.topic}</label>
                  {
                    newRoom.resources.length > 1 ?
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
                  value={newRoom.resources[index].topic}
                  text="Video title *"
                  onChange={handleVideoTitle}
                  required
                />
                <Input
                  Icon={FaLink}
                  id={index}
                  type="url"
                  value={newRoom.resources[index].video_url}
                  text="Video link *"
                  onChange={handleVideoLink}
                  required
                />
                <Input
                  Icon={FaFileAlt}
                  id={index}
                  type="url"
                  value={newRoom.resources[index].file_url}
                  text="Attachment"
                  onChange={handleFileLink}
                />
              </div>
            )}

            <div className="add"><p onClick={addPlaylist}>+</p></div>
          </div>
          <hr />

          <span>
            <Button text="EDUCA" onClick={() => setPopup('password')} />
            <Link to="/home"><div className="cancel">Cancel</div></Link>
          </span>
        </form>
        <div className="display-container">
          <Card room={newRoom} />
        </div>

      </div>

      {popup === 'loading' &&
        <Popup
          type="loading"
          text="Creating"
        />}
      {popup === 'password' &&
        <Popup
          type="password"
          title="Confirm Changes"
          text="Enter your password"
          confirm="Confirm"
          cancel="Cancel"
          onChange={handleTeacherPassword}
          onConfirm={handleSubmit}
          onCancel={() => setPopup('')}
        />}
    </div>
  )
}