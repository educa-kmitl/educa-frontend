import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileBubble.scss';
import myprofile from '../../img/icons/myprofile.svg';
import logout from '../../img/icons/logout.svg';

export const ProfileBubble = ({ state, setState, user: {name, level}}) => {

  const hideBubble = () => {
    const ele = document.querySelector('.bubble-container');
    const overlay = document.querySelector('.profile-overlay');
    ele.classList.add('hide');
    overlay.classList.remove('active');
    setState(false);
  }

  return (
    <div className={(state) ? 'bubble-container' : 'bubble-container hide'}>
      <div class="content">
        <div className="username">{name}</div>
        <div className="level">LEVEL {level}</div>
        <div className="exp"></div>
        <Link to="#" onClick={hideBubble}>
          <div className="item">
            <img src={myprofile} className="icon" alt=""/>
            MY PROFILE
          </div>
        </Link>
        <Link to="/" onClick={hideBubble}>
          <div className="item">
            <img src={logout} className="icon" alt=""/>
            LOGOUT
          </div>
        </Link>
      </div>
      <div 
        className={(state) ? 'profile-overlay active' : 'profile-overlay'}
        onClick={hideBubble}
      ></div>
    </div>
  );
}