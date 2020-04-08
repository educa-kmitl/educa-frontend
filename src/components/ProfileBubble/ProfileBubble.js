import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './ProfileBubble.scss'

import { FaUserAlt, FaSignOutAlt } from "react-icons/fa"

export const ProfileBubble = ({ state, setState }) => {
  const [auth, setAuth] = useContext(AuthContext)

  const hideBubble = () => {
    const ele = document.querySelector('.bubble-container')
    const overlay = document.querySelector('.profile-overlay')
    ele.classList.add('hide')
    overlay.classList.remove('active')
    setState(false)
  }
  const handleLogout = () => {
    setAuth({ ...auth, data: null })
  }

  return (
    <div className={(state && 'bubble-container') || 'bubble-container hide'}>
      <div className="content">
        <div className="username">{auth.data?.name}</div>
        {
          auth.data?.role ?
            <div className="level">TEACHER</div> :
            <div className="level">student</div>
        }
        <Link to={`/profile/${auth.data?.user_id}`} onClick={hideBubble}>
          <div className="item">
            <div className="icon"><FaUserAlt /></div>
            MY PROFILE
          </div>
        </Link>
        <Link to="/" onClick={() => {
          hideBubble()
          handleLogout()
        }}>
          <div className="item">
            <div className="icon xl"><FaSignOutAlt /></div>
            LOGOUT
          </div>
        </Link>
      </div>
      <div
        className={(state && 'profile-overlay active') || 'profile-overlay'}
        onClick={hideBubble}
      ></div>
    </div>
  )
}