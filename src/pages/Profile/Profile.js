import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import {
  randAlert,
  getProfile,
  editProfile,
  getMyRoom,
  getFollower,
  postFollowing,
  deleteFollowing
} from '../../helpers'
import './Profile.scss'

import { FaHeartBroken, FaPen, FaAngleLeft, FaAngleRight, FaSave, FaUserPlus, FaUserCheck } from 'react-icons/fa'
import { Card, Popup } from '../../components'
import { profiles } from '../../img/Profile'

export default () => {
  const { user_id } = useParams()
  const [profile, setProfile] = useState({})
  const [roomList, setRoomList] = useState([])
  const [auth, setAuth] = useContext(AuthContext)
  const [edit, setEdit] = useState({ ediable: false })
  const [follow, setFollow] = useState(null)
  const [popup, setPopup] = useState('')

  useEffect(() => {
    document.querySelector('#user-expbar-progress').style.background = 'lightblue'
    document.querySelector('#user-expbar-progress').style.width = '70%'

    if (user_id !== auth.data.user_id) {
      getProfile(user_id)
        .then(res => {
          const { user, error } = res.data
          if (user) {
            setProfile(user)
            if (user.role) {
              getFollower(user_id)
                .then(res => {
                  const { followers, error } = res.data
                  if (followers) {
                    if (followers.find(follower => follower.student_id === auth.data.user_id)) {
                      setFollow(true)
                    }
                  } else {
                    setPopup({ type: 'alert', title: randAlert(), text: error })
                  }
                })
            }
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    } else {
      setEdit({ ediable: true })
      setProfile(auth.data)
    }
    getMyRoom({ user_id })
      .then(res => {
        const { rooms, error } = res.data
        if (rooms) {
          setRoomList(rooms)
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id])

  const changeProfile = action => {
    if (action === 'left') {
      let new_icon = profile.profile_icon - 1
      if (new_icon < 0) new_icon = 9
      setProfile({ ...profile, profile_icon: new_icon })
    } else {
      let new_icon = profile.profile_icon + 1
      if (new_icon > 9) new_icon = 0
      setProfile({ ...profile, profile_icon: new_icon })
    }
  }
  const saveProfile = () => {
    setPopup('loading')
    editProfile(profile)
      .then(res => {
        const { user, error } = res.data
        if (user) {
          setEdit({ ediable: true })
          setAuth({ ...auth, data: profile })
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }
  const handleFollow = () => {
    if (follow) {
      setFollow(false)
      deleteFollowing(auth.data, user_id)
        .then(res => {
          const { success, error } = res.data
          if (success) {
            console.log('Unfollow!')
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
            setFollow(true)
          }
        })
    } else {
      setFollow(true)
      postFollowing(auth.data, user_id)
        .then(res => {
          const { success, error } = res.data
          if (success) {
            console.log('Follow!')
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
            setFollow(false)
          }
        })
    }
  }
  const handlePassword = value => setProfile({ ...profile, password: value })
  const handleName = value => setProfile({ ...profile, name: value })

  return (
    <div id="profile-page-bg">
      <div id="profile-page-content">

        <section id="user-card">
          <div id="user-picture">
            <img id="user-picture" src={profiles[profile.profile_icon]} alt="" />
            {edit.ediable &&
              <div id="user-edit-btn" onClick={() => setEdit({ editing: true })}><FaPen style={editBtn} /></div>}
            {edit.editing &&
              <div id="user-pic-left" onClick={() => changeProfile('left')}><FaAngleLeft style={editBtn} /></div>}
            {edit.editing &&
              <div id="user-pic-right" onClick={() => changeProfile('right')}><FaAngleRight style={editBtn} /></div>}
            {edit.editing &&
              <div id="user-edit-btn" onClick={() => {
                if (profile.name !== '') setPopup('password')
                else setPopup({ type: 'alert', title: randAlert(), text: 'You must enter your name' })
              }
              }><FaSave style={editBtn} /></div>}
            {user_id !== auth.data.user_id && (
              (follow === true && <div className='user-follow-btn active' onClick={handleFollow}><FaUserCheck style={editBtn} /></div>) ||
              (follow === false && <div className='user-follow-btn' onClick={handleFollow}><FaUserPlus style={editBtn} /></div>)
            )}
          </div>
          {!edit.editing && <header id="user-name">{profile.name || 'Loading'}</header>}
          {edit.editing &&
            <input
              id="user-name-edit"
              value={profile.name}
              onChange={e => handleName(e.target.value)}
              minLength="1"
            />}
          <label id="user-role">{profile.role ? 'TEACHER' : 'STUDENT'}</label>
          <label id="user-level">
            LV 9
            {
              profile.role ?
                <span className="color blue"> Expert I</span> :
                <span className="color green"> Learner</span>
            }
          </label>
          <div id="user-expbar">
            <div id="user-expbar-progress"></div>
          </div>
          <span id="user-fam">
            {
              profile.role &&
              <div className="user-fam-box">
                <label className="user-fam-number">{profile.likes || 0}</label>
                <label className="user-fam-title">Like{profile.likes > 1 && 's'}</label>
              </div>
            }
            <div className="user-fam-box">
              <label className="user-fam-number">142</label>
              <label className="user-fam-title">Followers</label>
            </div>
          </span>
        </section>

        <section id="user-own-room">
          {roomList.map((room, index) => <Card key={index} room={room} />)}
        </section>

      </div>

      {popup === 'loading' &&
        <Popup
          type="loading"
          text="Loading"
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
      {popup === 'password' &&
        <Popup
          type="password"
          title="Is that you?"
          confirm="It's me!"
          cancel="Not sure"
          onChange={handlePassword}
          onConfirm={saveProfile}
          onCancel={() => setPopup('')}
        />}
    </div >
  )
}

const editBtn = {
  fontSize: '24px',
  color: 'white',
}