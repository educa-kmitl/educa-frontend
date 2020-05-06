import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { leveling, randAlert, nameValidator } from '../../helpers'
import {
  getProfile,
  editProfile,
  getMyRoom,
  getFollower,
  getFollowing,
  postFollowing,
  deleteFollowing
} from '../../apis'
import './Profile.scss'

import { FaHeartBroken, FaPen, FaAngleLeft, FaAngleRight, FaSave, FaUserPlus, FaUserCheck, FaTimes } from 'react-icons/fa'
import { Card, Popup, Input } from '../../components'
import { profiles, gems } from '../../img/Profile'

export default () => {
  const { user_id } = useParams()
  const { auth, setAuth } = useContext(AuthContext)
  const [profile, setProfile] = useState({ name: '' })
  const [roomList, setRoomList] = useState([])
  const [edit, setEdit] = useState({ ediable: false })
  const [rank, setRank] = useState({})
  const [follow, setFollow] = useState(null)
  const [follower, setFollower] = useState([])
  const [followerBox, setFollowerBox] = useState(false)
  const [popup, setPopup] = useState('')
  const [more, setMore] = useState({ have: false, limit: 6 })
  const [oldProfile, setOldProfile] = useState({})
  const history = useHistory()

  useEffect(() => {
    if (user_id === auth.user_id) {
      setEdit({ ediable: true })
    }
    getProfile(user_id)
      .then(res => {
        const { user, error } = res.data
        if (user) {
          setRank(leveling(user.likes))
          setProfile(user)
          setOldProfile(user)
          if (user.role) {
            getFollower(user_id)
              .then(res => {
                const { followers, error } = res.data
                if (followers) {
                  setFollower(followers)
                  if (followers.find(f => f.student_id === auth.user_id)) {
                    setFollow(true)
                  }
                } else {
                  setPopup({ type: 'alert', title: randAlert(), text: error })
                }
              })
          } else {
            getFollowing(user_id)
              .then(res => {
                const { followings, error } = res.data
                if (followings) {
                  setFollower(followings)
                } else {
                  setPopup({ type: 'alert', title: randAlert(), text: error })
                }
              })
          }
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
    getMyRoom({ user_id }, more.limit)
      .then(res => {
        const { rooms, have_more, error } = res.data
        if (rooms) {
          setRoomList(rooms)
          setMore({ have: have_more, limit: 6 })
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id])

  useEffect(() => {
    const name = document.querySelector('#user-name-edit')
    const save = document.querySelector('#user-save-btn')
    if (save === null) return
    if (name.classList.contains('success')) {
      save.classList.remove('disabled')
    } else {
      save.classList.add('disabled')
    }
  }, [profile.name])

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
          setAuth(profile)
          setPopup({ type: 'alert', title: randAlert(), text: user.name })
          setPopup('')
          window.location = `${auth.user_id}`
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }
  const handleFollow = () => {
    if (follow) {
      setFollow(false)
      deleteFollowing(auth, user_id)
        .then(res => {
          const { success, error } = res.data
          if (success) {
            let newFollower = follower.filter(f => f.student_id !== auth.user_id)
            setFollower(newFollower)
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
            setFollow(true)
          }
        })
    } else {
      setFollow(true)
      postFollowing(auth, user_id)
        .then(res => {
          const { success, error } = res.data
          if (success) {
            const { user_id, profile_icon, name } = auth
            setFollower([...follower, { student_id: user_id, profile_icon, name }])
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
            setFollow(false)
          }
        })
    }
  }
  const handleMore = () => {
    setPopup('loading')
    getMyRoom(auth, more.limit + 6)
      .then(res => {
        const { rooms, have_more, error } = res.data
        if (rooms) {
          setRoomList(rooms)
          setMore({ have: have_more, limit: more.limit + 6 })
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }
  const handlePassword = value => setProfile({ ...profile, password: value })
  const handleName = value => setProfile({ ...profile, name: value })

  return (
    <div id="profile-page-bg">
      <div id="profile-page-content">

        <section id="user-card">
          <div style={{ position: 'relative' }}>
            <img id="user-picture" className={rank.color} src={profiles[profile.profile_icon]} alt="" />
            {edit.ediable &&
              <div id="user-edit-btn" data-value="Edit" onClick={() => {
                setEdit({ ediable: false, editing: true })
                setOldProfile(profile)
              }}><FaPen style={editBtn} /></div>}
            {edit.editing &&
              <div id="user-pic-left" data-value="Prev" onClick={() => changeProfile('left')}><FaAngleLeft style={editBtn} /></div>}
            {edit.editing &&
              <div id="user-pic-right" data-value="Next" onClick={() => changeProfile('right')}><FaAngleRight style={editBtn} /></div>}
            {edit.editing &&
              <div id="user-save-btn" data-value="Save" onClick={e => {
                if (e.target.classList.contains('disabled')) return
                if (profile.name !== '') setPopup('password')
                else setPopup({ type: 'alert', title: randAlert(), text: 'You must enter your name' })
              }
              }><FaSave style={editBtn} /></div>}
            {edit.editing &&
              <div id="user-cancel-btn" data-value="Cancel" onClick={() => {
                setEdit({ ediable: true, editing: false })
                setProfile(oldProfile)
              }
              }><FaTimes style={editBtn} /></div>}
            {(user_id !== auth.user_id && profile.role === true && auth.role === false) && (
              (follow && <div className='user-follow-btn active' data-value="Following" onClick={handleFollow}><FaUserCheck style={editBtn} /></div>) ||
              (!follow && <div className='user-follow-btn' data-value="Follow" onClick={handleFollow}><FaUserPlus style={editBtn} /></div>)
            )}
          </div>
          {!edit.editing && <header id="user-name">{profile.name || 'Loading'}</header>}
          {edit.editing &&
            <Input
              id="user-name-edit"
              text={oldProfile.name}
              defaultValue={oldProfile.name}
              onChange={handleName}
              validator={nameValidator}
              autoComplete="off"
            />
          }
          <label id="user-role">{profile.role === true && 'TEACHER'}</label>
          <label id="user-role">{profile.role === false && 'STUDENT'}</label>
          <label id="user-level">
            LV {rank.lv}
            {profile.role === true && <span className={`color ${rank.color}`}> {rank.title}</span>}
            {profile.role === false && <span className="color green"> Learner</span>}
          </label>
          <div id="user-expbar">
            <div id="user-gem" className={rank.color}>
              <img src={gems[rank.color]} alt="" />
            </div>
            <div id="user-expbar-progress" className={'bg ' + rank.color} style={{ width: rank.percent }}></div>
          </div>
          <span id="user-fam">
            {profile.role === true &&
              <>
                <div className="user-fam-box">
                  <label className="user-fam-number">{profile.likes}</label>
                  <label className="user-fam-title">Heart{profile.likes > 1 && 's'}</label>
                </div>
                <div className={`user-fam-box ${followerBox && 'active'}`} onClick={(!followerBox && (() => setFollowerBox(true))) || null}>
                  <label className="user-fam-number">{follower.length}</label>
                  <label className="user-fam-title">Follower{follower.length > 1 && 's'}</label>
                </div>
                {followerBox &&
                  <div id="follower-box">
                    <span className="follower-item" style={{ justifyContent: 'space-between', cursor: 'initial' }}>
                      <h6 style={{ fontWeight: '500' }}>Follower</h6>
                      <div id="follower-box-close" onClick={() => setFollowerBox(false)}>x</div>
                    </span>
                    <div id="follower-content">
                      {follower.map((f, index) =>
                        <span key={index} className="follower-item" onClick={() => { history.push(`/profile/${f.student_id}`); setFollowerBox(false) }}>
                          <img className="follower-img" src={profiles[f.profile_icon]} alt="" />
                          <p>{f.name}</p>
                        </span>
                      )}
                      {follower.length === 0 && <p>No follower</p>}
                    </div>
                  </div>}
              </>}
            {profile.role === false &&
              <>
                <div className={`user-fam-box ${followerBox && 'active'}`} onClick={(!followerBox && (() => setFollowerBox(true))) || null}>
                  <label className="user-fam-number">{follower.length}</label>
                  <label className="user-fam-title">Following</label>
                </div>
                {followerBox &&
                  <div id="follower-box">
                    <span className="follower-item" style={{ justifyContent: 'space-between', cursor: 'initial' }}>
                      <h6 style={{ fontWeight: '500' }}>Following</h6>
                      <div id="follower-box-close" onClick={() => setFollowerBox(false)}>x</div>
                    </span>
                    <div id="follower-content">
                      {follower.map((f, index) =>
                        <span key={index} className="follower-item" onClick={() => { history.push(`/profile/${f.teacher_id}`); setFollowerBox(false) }}>
                          <img className="follower-img" src={profiles[f.profile_icon]} alt="" />
                          <p>{f.name}</p>
                        </span>
                      )}
                      {follower.length === 0 && <p>No following</p>}
                    </div>
                  </div>}
              </>
            }

          </span>
        </section>

        {profile.role &&
          <section id="user-own-room">
            {user_id === auth.user_id && <h4>Your course</h4>}
            {user_id !== auth.user_id && <h4>{(profile.name.length > 10 && profile.name.substr(0, 10) + '...') || profile.name} 's course</h4>}
            {roomList.length === 0 && <p>Not own any course</p>}
            <div id="user-own-room-list">
              {roomList.map((room, index) => <Card key={index} room={room} onClick={() => history.push(`/room/${room.room_id}`)} />)}
              {more.have && <button className="see-more-btn" onClick={handleMore}>Show more</button>}
            </div>
          </section>}

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
          title="Confirm changes"
          confirm="Confirm"
          cancel="Cancel"
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
  pointerEvents: 'none'
}
