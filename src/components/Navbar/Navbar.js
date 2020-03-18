import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProfileBubble } from '../';
import './Navbar.scss';
import logo from '../../img/logo.svg';

const pages = ['/home', '/create', '/profile'];

export const Navbar = () => {
  const [state, setState] = useState(false);
  const location = useLocation();

  const toggleBubble = () => setState(!state);

  return (
    <nav>
      <div className="nav-content">
        <NavLink to="/" style={{color: 'inherit'}}>
          <div className="logo">
            <img src={logo} alt=""/>
            <p>EDUCA</p>
          </div>
        </NavLink>
        
        { 
          location.pathname !== '/' 
          && location.pathname !== '/login' 
          && location.pathname !== '/sigup'
          && location.pathname !== '/room'
          && pages.includes(location.pathname)
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
