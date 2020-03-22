import React from 'react';
import './SignUp.scss';

import { Link } from 'react-router-dom';
import { FaEnvelope, FaUserAlt, FaLock } from 'react-icons/fa';
import { Input, Button } from '../../components';
import startpic from '../../img/start/start.svg'

export const SignUp = () => {
  return (
    <div className="signup-bg">
      <div className="signup-content">

        <div className="txt-container">
          <form>
            <header>Create Account</header>
            <Input 
              text="Email"
              type="email"
              icon={FaEnvelope}
              required
            />
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
              <Button text="Create" type="submit"/>
              <Link to="/login"><p>I have an account</p></Link>
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