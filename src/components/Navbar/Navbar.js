import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProfileBubble } from '../';
import './Navbar.scss';
import logo from '../../img/new-educa.svg';

const notShowPages = ['/', '/login', '/signup', '/room'];

export const Navbar = () => {
  const [state, setState] = useState(false);
  const location = useLocation();
  const showBG = !notShowPages.includes(location.pathname)

  const toggleBubble = () => setState(!state);

  return (
    <nav className={showBG ? 'nav-bg' : null}>
      <div className="nav-content">
        <NavLink to="/home" style={{color: 'inherit'}}>
          <div className="logo">
            <img src={logo} alt=""/>
            <p>EDUCA</p>
          </div>
        </NavLink>
        
        { 
          showBG
          &&
          <ul>
            <li>
              <NavLink to="/home" className="nav-link">Home</NavLink>
            </li>
            <li>
              <NavLink to="/create" className="nav-link">Create</NavLink>
            </li>
            
            <div className="profileicon" onClick={toggleBubble}></div>
          </ul>
          }
          <ProfileBubble state={state} setState={setState}/>
      </div>
    </nav>
  );
}
