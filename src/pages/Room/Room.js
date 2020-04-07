import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import {
  getRoomPrivacy,
  getRoom,
  getComment,
} from '../../helpers'
import './Room.scss'

import { FaHeart, FaFileDownload, FaSignOutAlt, FaWalking, FaHeartBroken } from 'react-icons/fa'
import { Comment, Playlist, Button, Popup } from '../../components'

export default () => {
  const history = useHistory()
  const { room_id } = useParams()
  const [auth] = useContext(AuthContext)
  const [popup, setPopup] = useState('')
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
  const [like, setLike] = useState(false)

  useEffect(() => {
    setPopup('loading')
    getRoomPrivacy(room_id)
      .then(data => {
        const { lock } = data
        if (lock) {
          setPopup('password')
        } else {
          getRoom(room_id, password)
            .then(data => {
              const { room } = data
              setRoomData(room)
              getRemainingData()
            })
            .catch(err => {
              console.log(err)
              setPopup({ type: 'alert', title: 'Oh no!', text: `We can't get data for you now` })
            })
        }
      })
      .catch(err => {
        console.log(err)
        setPopup({ type: 'alert', title: 'Err..', text: `Please contact out staff` })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRemainingData = () => {
    getComment(roomData, playlist)
      .then(data => {
        const { comments } = data
        setComments(comments)
        setPopup('')
      })
      .catch(err => {
        console.log(err)
        setPopup({ type: 'alert', title: 'Sorry..', text: `Comment unavailable now` })
      })
  }

  const handlePrivacy = e => {
    e.preventDefault()

    setPopup('loading')
    getRoom(room_id, password)
      .then(data => {
        const { room } = data
        setRoomData(room)
        getRemainingData()
      })
      .catch(err => {
        console.log(err)
        setPopup({ type: 're-password', title: 'Argh!', text: `Invalid password` })
      })
  }
  const handlePassword = value => setPassword(value)
  const handlePlaylist = (value, action) => {
    const newValue = value
    setPlaylist(newValue)
    if (action) {
      setPopup('loading')
      getComment(roomData, playlist)
        .then(data => {
          const { comments } = data
          setComments(comments)
          setPopup('')
        })
        .catch(err => {
          console.log(err)
          setPopup({ type: 'alert', title: 'Sorry..', text: `Comment unavailable now` })
        })
    }
  }
  const exitRoom = () => setPopup('confirm')
  const downloadFile = () => {
    const file = roomData.resources[playlist.playing].file_url
    if (file) window.open(file)
    else alert('This video has no file to download')
  }
  const likeVideo = () => {
    if (like) {
      setLike(false)
      fetch(window.$ENDPOINT + '/likes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: auth.data.user_id,
          room_id
        })
      })
        .then(res => res.json())
        .then(json => {
          const { success, error } = json
          if (success) {
            console.log('Unliked!')
          } else {
            console.log(new Error(error))
            setPopup({ type: 'alert', text: error })
          }
        })
    } else {
      setLike(true)
      fetch(window.$ENDPOINT + '/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: auth.data.user_id,
          room_id
        })
      })
        .then(res => res.json())
        .then(json => {
          const { success, error } = json
          if (success) {
            console.log('Liked!')
          } else {
            console.log(new Error(error))
            setPopup({ type: 'alert', text: error })
          }
        })
    }
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
              <div className={`btn ${like && 'active'}`} onClick={likeVideo}>
                <FaHeart className={`icon ${like && 'active'}`} />
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
              <Button color="" text="show all" onClick={() => setPlaylist({ ...playlist, show: !playlist.show })} />
            </footer>
            <Playlist
              playlist={playlist}
              setPlaylist={handlePlaylist}
              roomData={roomData}
            />
          </div>

          <div className="comment-container">
            <Comment
              refresh={null}
              comments={comments}
            />
          </div>

        </div>
      </div>

      {popup === 'loading' && <Popup type="loading" text="Loading" />}
      {popup === 'password' &&
        <Popup
          type="password"
          title="It's Locked!"
          text="This course require a password"
          onChange={handlePassword}
          onConfirm={handlePrivacy}
          onCancel={() => history.push('/home')}
        />}
      {popup === 'confirm' &&
        <Popup
          type="confirm"
          Icon={FaWalking}
          title="Exiting.."
          text="Are you sure, You want to exit"
          confirm="Yes"
          cancel="No"
          onConfirm={() => history.push('/home')}
          onCancel={() => setPopup('')}
        />}
      {popup === 'alert' &&
        <Popup
          type="confirm"
          Icon={FaHeartBroken}
          title={popup.title}
          text={popup.text}
          confirm="Okay"
          onConfirm={() => setPopup('')}
        />}
      {popup.type === 're-password' &&
        <Popup
          type="alert"
          Icon={FaHeartBroken}
          title={popup.title}
          text={popup.text}
          confirm="Try again"
          onConfirm={() => setPopup('password')}
        />}
    </div >
  );
}