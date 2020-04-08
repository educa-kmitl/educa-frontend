import React, { useState, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Navbar.scss'

import logo from '../../img/new-educa.svg'
import { ProfileBubble } from '../'
import { profiles } from '../../img/Profile'

const ShowPages = ['/home', '/create', '/ranking', '/profile']

export const Navbar = () => {
  const [auth] = useContext(AuthContext)
  const [state, setState] = useState(false)
  const location = useLocation();
  const showBG = ShowPages.includes(location.pathname)


  const toggleBubble = () => setState(!state)

  return (
    <nav className={showBG ? 'nav-bg' : null}>
      <div className="nav-content">
        <NavLink to={auth.data ? '/home' : '/'}>
          <div className="logo">
            <img src={logo} alt="" />
            <p>EDUCA</p>
          </div>
        </NavLink>

        {
          showBG &&
          <ul>
            <li>
              <NavLink to="/home" className="nav-link">Home</NavLink>
            </li>
            <li>
              <NavLink to="/ranking" className="nav-link">Ranking</NavLink>
            </li>

            <div className='profileicon' onClick={toggleBubble}>
              {auth.data && <img alt="" src={profiles[auth.data.profile_icon]} />}
            </div>
          </ul>
        }
        <ProfileBubble state={state} setState={setState} />
      </div>
    </nav>
  )
}
