import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { randAlert } from '../../helpers'
import {
  getRoomPrivacy,
  getRoom,
  getComment,
  getLike,
  postLike,
  postComment,
  deleteLike
} from '../../apis'
import './Room.scss'

import { FaFileDownload, FaSignOutAlt, FaWalking, FaHeartBroken } from 'react-icons/fa'
import { TiThList, TiHeart } from 'react-icons/ti'
import { Comment, Playlist, Popup } from '../../components'

export default () => {
  const history = useHistory()
  const { room_id } = useParams()
  const { auth } = useContext(AuthContext)
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
  const [like, setLike] = useState({ liked: false, count: 0 })
  const [more, setMore] = useState({ have: false, limit: 10 })

  useEffect(() => {
    setPopup('loading')

    window.confirm = exitRoom

    getRoomPrivacy(room_id)
      .then(res => {
        const { lock, error } = res.data
        if (lock) {
          setPopup('password')
        } else if (!lock) {

          getRoom(room_id)
            .then(res => {
              const { room, error } = res.data
              if (room) {
                setRoomData(room)
                getRemainingData(room)
              } else {
                setPopup({ type: 'alert', title: randAlert(), text: error })
              }
            })
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRemainingData = room => {
    getComment(room, playlist, more.limit)
      .then(res => {
        const { comments, have_more, error } = res.data
        if (comments) {
          setComments(comments)

          getLike(room_id, auth)
            .then(res => {
              const { liked, error } = res.data
              scrollComment()
              if (error) {
                setPopup({ type: 'alert', title: randAlert(), text: error })
              } else {
                setLike({ liked, count: room.likes.length })
                setPopup('')
              }
            })
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
        if (have_more) setMore({ have: have_more, limit: 10 })
      })
  }

  const handlePrivacy = () => {
    setPopup('loading')

    getRoom(room_id, password)
      .then(res => {
        const { room, error } = res.data
        if (room) {
          setRoomData(room)
          getRemainingData(room)
        } else {
          setPopup({ type: 're-password', title: randAlert(), text: error })
        }
      })
  }
  const handlePassword = value => setPassword(value)
  const handlePlaylist = (value, action) => {
    const newValue = value
    setPlaylist(newValue)
    if (action) {
      setPopup('loading')

      getComment(roomData, newValue, 10)
        .then(res => {
          const { comments, have_more, error } = res.data
          if (comments) {
            setComments(comments)
            setPopup('')
            scrollComment()
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
          if (have_more) setMore({ have: have_more, limit: 10 })
        })
    }
  }
  const showPlaylist = () => setPlaylist({ ...playlist, show: !playlist.show })
  const handleMore = () => {
    const newLimit = more.limit + 10
    const old = document.querySelector('.room-comment').scrollHeight

    getComment(roomData, playlist, newLimit)
      .then(res => {
        const { comments, have_more, error } = res.data
        if (comments) {
          setComments(comments)
          setMore({ have: have_more, limit: newLimit })
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
      .then(() => scrollComment(old))
  }
  const scrollComment = old => {
    const e = document.querySelector('.room-comment')
    if (e) {
      e.scrollTop = e.scrollHeight - old || e.scrollHeight
    }
  }
  const exitRoom = () => setPopup({ type: 'confirm', func: () => { window.location = '/home' } })
  const downloadFile = () => {
    const file = roomData.resources[playlist.playing].file_url
    if (file) window.open(file)
    else setPopup({ type: 'alert', title: randAlert(), text: 'This video has no attatchment' })
  }
  const likeVideo = () => {
    const old_like = like.count
    if (like.liked) {
      setLike({ liked: false, count: like.count - 1 })

      deleteLike(room_id, auth)
        .then(res => {
          const { success, error } = res.data
          if (success) {
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
            setLike({ liked: true, count: old_like })
          }
        })
    } else {
      setLike({ liked: true, count: like.count + 1 })

      postLike(room_id, auth)
        .then(res => {
          const { success, error } = res.data
          if (success) {
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
            setLike({ liked: false, count: old_like })
          }
        })
    }
  }
  const writeComment = text => {
    postComment(auth, roomData, playlist, text)
      .then(res => {
        const { user, error } = res.data
        if (user) {
          getRemainingData(roomData)
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }

  return (
    <div className="room-page">
      <div className="room-content">

        <section id="video-container">
          {<iframe
            id="embed-video"
            src={roomData.resources[playlist.playing].video_url}
            title={roomData.resources[playlist.playing].topic}
            allowFullScreen
          ></iframe>}
          <Playlist
            playlist={playlist}
            setPlaylist={handlePlaylist}
            roomData={roomData}
          />
          <footer id="video-footer">
            <div id="video-title">
              <h6 style={bold}>{roomData.resources[playlist.playing].topic}</h6>
              <p id="video-teacher" onClick={() => history.push(`/profile/${roomData.teacher_id}`)}>
                by {roomData.teacher_id === auth.user_id ? 'You' : roomData.teacher_name}
              </p>
            </div>
            <div id="video-btn-group">
              <div className="room-btn" onClick={showPlaylist}>
                <TiThList className="room-btn-icon sm" />
                <div className="tooltip">Playlist</div>
              </div>
              <div className="room-btn" onClick={downloadFile}>
                <FaFileDownload className="room-btn-icon sm" />
                <div className="tooltip">File</div>
              </div>
              <div className="room-btn" onClick={exitRoom}>
                <FaSignOutAlt className="room-btn-icon sm" />
                <div className="tooltip">Exit</div>
              </div>
            </div>
          </footer>
        </section>

        <section id="room-panel">
          <div id="room-course-card">
            <header>
              <h5 style={bold}>{roomData.name}</h5>
            </header>
            <footer id="room-course-footer">
              <p id="room-course-count">{roomData.resources.length} video{roomData.resources.length > 1 ? 's' : null}</p>
              <div className={`room-like-btn ${like.liked && 'active'}`} onClick={likeVideo}>
                <TiHeart className={`room-like-btn-icon ${like.liked && 'active'}`} /> {like.count}
              </div>
            </footer>
          </div>

          <div id="comment-container">
            <Comment
              post={writeComment}
              comments={comments}
              more={more.have}
              onMore={handleMore}
            />
          </div>

        </section>
      </div>

      {popup === 'loading' && <Popup type="loading" text="Loading" />}
      {popup === 'password' &&
        <Popup
          type="password"
          title="It's Locked!"
          placeholder="Enter room password"
          confirm="EDUCA"
          cancel="Cancel"
          onChange={handlePassword}
          onConfirm={handlePrivacy}
          onCancel={() => history.goBack()}
        />}
      {popup.type === 'confirm' &&
        <Popup
          type="confirm"
          Icon={FaWalking}
          title="Exiting.."
          text="Are you sure, You want to exit"
          confirm="Yes"
          cancel="No"
          onConfirm={popup.func}
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

const bold = {
  fontWeight: '500'
}