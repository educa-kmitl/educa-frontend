import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Profile.scss'

import { Card } from '../../components'
import { profiles } from '../../img/Profile'

export default () => {
  const { user_id } = useParams()
  const [user, setUser] = useState({})
  const [roomList, setRoomList] = useState([])
  const [auth] = useContext(AuthContext)

  useEffect(() => {
    document.querySelector('#user-expbar-progress').style.background = 'lightblue'
    document.querySelector('#user-expbar-progress').style.width = '70%'

    if (user_id !== auth.data.user_id) {
      fetch(window.$ENDPOINT + '/users', {
        method: 'GET',
        headers: {
          user_id
        }
      })
        .then(res => res.json())
        .then(json => {
          const { user, error } = json

          if (user) {
            setUser(user)
            if (user.role) {
              fetch(window.$ENDPOINT + '/all-rooms', {
                method: 'GET'
              })
                .then(res => res.json())
                .then(json => {
                  const { rooms, error } = json
                  if (rooms) {
                    const teacher_room = rooms.filter(room => room.teacher_id === auth.data.user_id)
                    setRoomList(teacher_room)
                  } else {
                    alert(error)
                  }
                })
            }
          } else {
            alert(error)
          }
        })
    } else {
      setUser(auth.data)
      if (auth.data.role) {
        fetch(window.$ENDPOINT + '/all-rooms', {
          method: 'GET'
        })
          .then(res => res.json())
          .then(json => {
            const { rooms, error } = json
            if (rooms) {
              const teacher_room = rooms.filter(room => room.teacher_id === auth.data.user_id)
              setRoomList(teacher_room)
            } else {
              alert(error)
            }
          })
      }
    }
  }, [])

  return (
    <div id="profile-page-bg">
      <div id="profile-page-content">

        <section id="user-card">
          <img id="user-picture" src={profiles[user.profile_icon]} alt="">

          </img>
          <header id="user-name">{user.name}</header>
          <label id="user-role">{user.role ? 'TEACHER' : 'STUDENT'}</label>
          <label id="user-level">
            LV 9
            {
              user.role ?
                <span className="color blue"> Expert I</span> :
                <span className="color green"> Learner</span>
            }
          </label>
          <div id="user-expbar">
            <div id="user-expbar-progress"></div>
          </div>
          <span id="user-fam">
            {
              user.role &&
              <div className="user-fam-box">
                <label className="user-fam-number">{user.likes || 0}</label>
                <label className="user-fam-title">Likes</label>
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
    </div>
  )
}