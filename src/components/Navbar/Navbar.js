import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../img/logo.svg';
import test from '../../img/git-cover.jpg';
export const Navbar = () => {
  return (
    <nav>
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <p >Educa</p>
        </div>
        <ul>
          <li><Link to="/learn">Learn</Link></li>
          <li><Link to="/teach">Teach</Link></li>
          <li><Link to="/search">Search</Link></li>
          <div className='profileicon' onClick={()=>alert('hi')}><img src={test} alt='logo' /></div>
        </ul>
      
    </nav>
  );
}
