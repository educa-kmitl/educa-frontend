import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProfileBubble.scss';
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from '../../contexts';

export const ProfileBubble = ({ state, setState }) => {
  const [user, setUser] = useContext(UserContext);


  const hideBubble = () => {
    const ele = document.querySelector('.bubble-container');
    const overlay = document.querySelector('.profile-overlay');
    ele.classList.add('hide');
    overlay.classList.remove('active');
    setState(false);
  }

  return (
    <div className={(state && 'bubble-container') || 'bubble-container hide'}>
      <div class="content">
        <div className="username">{user.name}</div>
        <div className="level">LEVEL {user.exp}</div>
        <div className="exp"></div>
        <Link to="/profile" onClick={hideBubble}>
          <div className="item">
            <div className="icon"><FaUserAlt/></div>
            MY PROFILE
          </div>
        </Link>
        <Link to="/" onClick={hideBubble}>
          <div className="item">
            <div className="icon xl"><FaSignOutAlt/></div>
            LOGOUT
          </div>
        </Link>
      </div>
      <div 
        className={(state && 'profile-overlay active') || 'profile-overlay'}
        onClick={hideBubble}
      ></div>
    </div>
  );
}