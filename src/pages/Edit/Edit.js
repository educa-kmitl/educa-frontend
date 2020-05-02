import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext, RoomContext } from '../../contexts'
import { embedYoutube, randAlert, passwordValidator } from '../../helpers'
import { editRoom, editResource, deleteResource, postResource } from '../../apis'
import './Edit.scss'

import { FaBook, FaBookmark, FaLink, FaTrashAlt, FaLock, FaFileAlt, FaHeartBroken, FaCheck } from 'react-icons/fa'
import { Input, Dropdown, ToggleButton, Button, Popup, Card } from '../../components'

export default () => {
  const history = useHistory()
  const { auth } = useContext(AuthContext)
  const { room } = useContext(RoomContext)
  const [newRoom, setNewRoom] = useState()
  const [popup, setPopup] = useState('')
  const [password, setPassword] = useState('')
  const [willDelete, setWillDelete] = useState([])

  useEffect(() => {
    if (auth.role === false) history.push('/notfound')
    setNewRoom(room)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTitle = value => setNewRoom({ ...newRoom, name: value })
  const handleSubject = value => setNewRoom({ ...newRoom, subject: value })
  const handlePrivacy = value => setNewRoom({ ...newRoom, private: value })
  const handlePassword = value => setNewRoom({ ...newRoom, password: value })
  const handleVideoTitle = (value, id) => {
    const newVideos = newRoom.resources
    newVideos[id].topic = value
    setNewRoom({ ...newRoom, resources: newVideos })
  }
  const handleVideoLink = (value, id) => {
    const newVideos = newRoom.resources
    newVideos[id].video_url = value
    setNewRoom({ ...newRoom, resources: newVideos })
  }
  const handleFileLink = (value, id) => {
    const newVideos = newRoom.resources
    newVideos[id].file_url = value
    setNewRoom({ ...newRoom, resources: newVideos })
  }
  const addPlaylist = () => {
    const newVideos = newRoom.resources
    newVideos.push({ topic: 'Untitled', video_url: '', file_url: '' })
    setNewRoom({ ...newRoom, resources: newVideos })
  }
  const delPlaylist = (i, id) => {
    if (id) setWillDelete([...willDelete, { resource_id: id }])
    const newVideos = newRoom.resources
    newVideos.splice(i, 1)
    setNewRoom({ ...newRoom, resources: newVideos })
    setPopup('')
  }
  const handleTeacherPassword = value => setPassword(value)
  const handleSubmit = () => {
    setPopup('loading')

    editRoom(newRoom, password)
      .then(res => {
        const { room, error } = res.data
        if (room) {
          const willPatch = newRoom.resources.filter(nr => nr.resource_id !== undefined)
          for (let i = 0; i < willPatch.length; i++) {
            willPatch[i].video_url = embedYoutube(willPatch[i].video_url)
          }
          editResource(willPatch)
            .then(res => {
              const { success, error } = res.data
              if (success) {
                deleteResource(willDelete)
                  .then(res => {
                    const { success, error } = res.data
                    if (success) {
                      const willPost = newRoom.resources.filter(nr => nr.resource_id === undefined)
                      for (let i = 0; i < willPost.length; i++) {
                        willPost[i].video_url = embedYoutube(willPost[i].video_url)
                      }
                      postResource(newRoom.room_id, willPost)
                        .then(res => {
                          const { success, error } = res.data
                          if (success) {
                            setPopup({ type: 'alert', title: 'Yeah!', text: 'Your course has been edited', func: () => history.push(`/room/${newRoom.room_id}`) })
                          } else {
                            setPopup({ type: 'alert', title: randAlert(), text: error, bad: true })
                          }
                        })
                    } else {
                      setPopup({ type: 'alert', title: randAlert(), text: error, bad: true })
                    }
                  })
              } else {
                setPopup({ type: 'alert', title: randAlert(), text: error, bad: true })
              }
            })
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error, bad: true })
        }
      })
  }

  return (
    <div className="create-bg">
      <div className="create-content">

        <form onSubmit={e => { e.preventDefault(); setPopup('password') }} autoComplete="off">
          <header>Edit Course</header>
          <Input
            Icon={FaBook}
            type="text"
            value={newRoom?.name}
            text="Course title"
            onChange={handleTitle}
            minLength={2}
            maxLength={30}
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
                onChange={handlePassword}
                validator={passwordValidator}
                pattern="^[A-Za-z0-9][A-Za-z0-9]*$"
                minLength={6}
                maxLength={32}
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
                  <label>{index + 1}. {video.topic}</label>
                  {
                    newRoom.resources.length > 1 ?
                      <div
                        id={video.resource_id}
                        className="del"
                        onClick={() => {
                          if (video.resource_id !== undefined) {
                            return setPopup({ type: 'confirm', func: () => delPlaylist(index, video.resource_id) })
                          }
                          else return delPlaylist(index)
                        }}
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
                  text="Video title"
                  onChange={handleVideoTitle}
                  minLength={2}
                  maxLength={30}
                  required
                />
                <Input
                  Icon={FaLink}
                  id={index}
                  type="url"
                  value={newRoom.resources[index].video_url}
                  text="Video link"
                  onChange={handleVideoLink}
                  minLength={4}
                  maxLength={200}
                  required
                />
                <Input
                  Icon={FaFileAlt}
                  id={index}
                  type="url"
                  value={newRoom.resources[index].file_url}
                  text="Attachment (optional)"
                  onChange={handleFileLink}
                  minLength={4}
                  maxLength={200}
                />
              </div>
            )}

            <div className="add"><p onClick={addPlaylist}>+</p></div>
          </div>
          <hr />

          <span>
            <Button text="Save" type="submit" />
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
          text="Saving"
        />}
      {popup === 'password' &&
        <Popup
          type="password"
          title="Confirm Changes"
          confirm="Confirm"
          cancel="Cancel"
          onChange={handleTeacherPassword}
          onConfirm={handleSubmit}
          onCancel={() => setPopup('')}
        />}
      {popup.type === 'alert' &&
        <Popup
          type="alert"
          Icon={popup.bad ? FaHeartBroken : FaCheck}
          title={popup.title}
          text={popup.text}
          confirm="Okay"
          onConfirm={popup.bad ? () => setPopup('') : popup.func}
        />}
      {popup.type === 'confirm' &&
        <Popup
          type="confirm"
          Icon={FaTrashAlt}
          title="Are you sure ?"
          text="Comment and Heart on this video will be lost"
          confirm="Delete"
          cancel="Cancel"
          onConfirm={popup.func}
          onCancel={() => setPopup('')}
        />}
    </div>
  )
}