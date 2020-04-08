import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { leveling } from '../../helpers'
import './Navbar.scss'

import logo from '../../img/new-educa.svg'
import { ProfileBubble } from '../'
import { profiles } from '../../img/Profile'

const ShowPages = ['/home', '/create', '/ranking', '/profile']

export const Navbar = () => {
  const [auth, setAuth] = useContext(AuthContext)
  const [state, setState] = useState(false)
  const location = useLocation();
  const showBG = ShowPages.includes(location.pathname)

  useEffect(() => {
    setAuth({ ...auth, ...leveling(auth.data?.likes) })
  }, [auth.data])

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

            <div className={`profileicon bg ${auth.color}`} onClick={toggleBubble}>
              {auth.data && <img alt="" src={profiles[auth.data.profile_icon]} />}
            </div>
          </ul>
        }
        <ProfileBubble state={state} setState={setState} />
      </div>
    </nav>
  )
}
