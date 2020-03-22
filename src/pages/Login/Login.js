import React from 'react';
import './Login.scss';

import { Link } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Input, Button } from '../../components';
import startpic from '../../img/start/start.svg'

export const Login = () => {
  return (
    <div className="login-bg">
      <div className="login-content">

        <div className="txt-container">
          <form>
            <header>Welcome</header>
            <Input 
              text="Username"
              type="text"
              icon={FaUserAlt}
              required
            />
            <Input 
              text="Password"
              type="password"
              icon={FaLock}
              required
            />
            <footer>
              <Button text="Login" type="submit"/>
              <Link to="/signup"><p>Create your account</p></Link>
            </footer>
          </form>
        </div>

        <div className="img-container">
          <img src={startpic} alt="" />
        </div>

      </div>
    </div>
  );
}