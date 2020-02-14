import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../img/logo.svg';

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <p >Educa</p>
        </div>
        <ul>
          <li><Link to="/learn">Learn</Link></li>
          <li><Link to="/teach">Teach</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li></li>
        </ul>
      </div>
    </nav>
  );
}
