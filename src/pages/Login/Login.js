import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { Input, Button } from '../../components';

export const Login = () => {
  return (
    <div className="login-page-bg">
      <div className="login-content">
        <div className="login-form">
          <header>User Login</header>
          <form onSubmit={() => alert('test')}>
            <Input text="E-mail" type="text" required />
            <Input text="Password" type="text" required />
            <Button alt text="Login" type="submit" />
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