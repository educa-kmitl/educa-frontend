import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfileBubble } from '../';
import './Navbar.scss';
import logo from '../../img/logo.svg';

export const Navbar = ({ user }) => {
  const [state, setState] = useState(false);

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
        
        <ul>
          <li>
            <NavLink to="/learn" className="nav-link">Learn</NavLink>
          </li>
          <li>
            <NavLink to="/teach" className="nav-link">Teach</NavLink>
          </li>
          <li>
            <NavLink to="/search" className="nav-link">Search</NavLink>
          </li>
          
          <div className="profileicon" onClick={toggleBubble}></div>
        </ul>
        <ProfileBubble state={state} setState={setState} user={user}/>
      </div>
    </nav>
  );
}
