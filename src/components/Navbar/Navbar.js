import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfileBubble } from '../';
import './Navbar.scss';
import logo from '../../img/logo.svg';

export const Navbar = ({ user }) => {

  const [state, setState] = useState(false);

  const toggleBubble = () => {
    setState(!state);
  }

  return (
    <nav>
      <div className='logo'>
        <img src={logo} alt='logo'/>
        <p>EDUCA</p>
      </div>
      <ul>
        <li><Link to="/learn">Learn</Link></li>
        <li><Link to="/teach">Teach</Link></li>
        <li><Link to="/search">Search</Link></li>
        <div className='profileicon' onClick={toggleBubble}></div>
      </ul>
      <ProfileBubble show={state} name={user.name} level={user.level}/>
    </nav>
  );
}
