import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { Input, Button } from '../../components';
import { Home } from "../Home/Home";

export const Login = () => {
  return (
    <div className="login-page-bg">
      <div className="login-content">
        <div className="login-form">
          <header>User Login</header>
          <form onSubmit={Home}>
            <Input text="E-mail" type="text" required />
            <Input text="Password" type="password" required />
            <Link to="/teach">
              <Button alt text="Login" type="submit" />
            </Link>
            <br />
          </form>

          <Link to="/signup">
            <label>Create Account</label>
          </Link>

        </div>

      </div>
    </div>
  );
}