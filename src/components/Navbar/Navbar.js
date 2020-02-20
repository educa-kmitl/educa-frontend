import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfileBubble } from '../';
import './Navbar.scss';
import logo from '../../img/logo.svg';

export const Navbar = ({ user }) => {
  const [state, setState] = useState(false);
  const [page, setPage] = useState('learn');
  const pages = ['learn', 'teach', 'search'];

  const toggleBubble = () => setState(!state);

  const changePage = (nextPage) => setPage(nextPage);

  return (
    <nav>
      <div className="nav-content">
        <div className="logo">
          <img src={logo} alt=""/>
          <p>EDUCA</p>
        </div>

        <ul>
          {pages.map((pg) => (
            <li>
              <Link 
                to={`/${pg}`}
                onClick={() => changePage(`${pg}`)} 
                className={(page===`${pg}`) && 'nav-link active'}
              >
                {pg}
              </Link>
            </li>
          ))}
          
          <div className="profileicon" onClick={toggleBubble}></div>
        </ul>
        <ProfileBubble state={state} setState={setState} user={user}/>
      </div>
    </nav>
  );
}
