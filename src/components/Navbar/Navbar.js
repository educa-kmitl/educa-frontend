import React, { useState, useEffect, useContext } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Navbar.scss'

import {
  TiHome,
  TiPlus,
  TiChartBar,
  TiArrowSortedDown,
  TiUser,
  TiExport
} from 'react-icons/ti'
import { profiles } from '../../img/Profile'
import logo from '../../img/new-educa.svg'

export const Navbar = () => {
  const [auth] = useContext(AuthContext)
  const [bubble, setBubble] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    if (path === '/')
      hideNavbar()
    else
      showNavbar()
    if (path === '/home')
      changeIndicator(0)
    else if (path === '/create' || path === '/find')
      changeIndicator(1)
    else if (path === '/ranking')
      changeIndicator(2)
    else
      changeIndicator(404)
  }, [location.pathname])

  const hideNavbar = () => {
    const nav = document.querySelector('#nav-container')
    nav.style.transform = 'translateY(-100%)'
  }
  const showNavbar = () => {
    const nav = document.querySelector('#nav-container')
    nav.style.transform = 'translateY(0)'
  }
  const changeIndicator = index => {
    const indicator = document.querySelector('#nav-indicator')
    if (index === 0) {
      indicator.style.top = '50%'
      indicator.style.left = '16%'
      indicator.style.background = '#ff0062'
    } else if (index === 1) {
      indicator.style.top = '50%'
      indicator.style.left = '51%'
      indicator.style.background = '#1da4ff'
    } else if (index === 2) {
      indicator.style.top = '50%'
      indicator.style.left = '90%'
      indicator.style.background = '#9f4ee0'
    } else {
      indicator.style.top = '-100%'
    }
  }

  return (
    <nav id="nav-container">
      <div id="nav-box">

        <div id="nav-brand">
          <Link to={auth.data ? '/home' : '/'}>
            <div id="brand">
              <img id="brand-logo" src={logo} alt="" />
              <label id="brand-name">EDUCA</label>
            </div>
          </Link>
        </div>
        <div className="vertical-hr"></div>

        <ul id="nav-list">
          <div id="nav-indicator"></div>
          <li className="nav-item">
            <NavLink to="/home" className="nav-link" activeclassname="nav-link active">
              <TiHome className="nav-link-icon" />HOME
            </NavLink>
          </li>
          {auth.data?.role === true ?
            < li className="nav-item" activeclassname="nav-link active">
              <NavLink to="/create" className="nav-link">
                <TiPlus className="nav-link-icon" />CREATE
              </NavLink>
            </li>
            :
            < li className="nav-item" activeclassname="nav-link active">
              <NavLink to="/find" className="nav-link">
                FIND
              </NavLink>
            </li>}
          <li className="nav-item">
            <NavLink to="/ranking" className="nav-link" activeclassname="nav-link active">
              <TiChartBar className="nav-link-icon" />RANKING
            </NavLink>
          </li>
        </ul>

        <div className="vertical-hr"></div>
        <div className={`account ${bubble && 'active'}`} onClick={() => setBubble(!bubble)}>
          <img id="account-pic" src={profiles[auth.data?.profile_icon]} alt="" />
          <p id="account-name">{auth.data?.name}</p>
          <TiArrowSortedDown className={`nav-bubble-arrow ${bubble && 'active'}`} />

          <div className={`account-bubble ${bubble && 'active'}`}>
            <span className="account-item">
              <TiUser className="nav-link-icon color red" /> PROFILE
            </span>
            <spn className="account-item">
              <TiExport className="nav-link-icon color red" /> LOGOUT
            </spn>
          </div>
        </div>
      </div>
    </nav >
  )
}
