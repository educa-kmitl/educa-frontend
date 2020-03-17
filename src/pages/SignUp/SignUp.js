import React from 'react';
import './SignUp.scss';
import { Link } from 'react-router-dom';
import { Input, Button } from '../../components';

export const SignUp = () => {
  return (
    <div className="create-page-bg">
      <div className="create-content">
        <div className="create-form">
          <header>Create Account</header>
          <form onSubmit={() => alert('test')}>
            <Input text="E-mail" type="text" required />
            <Input text="Name" type="text" required />
            <Input text="Password" type="text" required />
            <Button alt text="Create" type="submit" />
            <br />
          </form>
          <Link to="/login">
            <label>Already have account?</label>
          </Link>

        </div>

      </div>

    </div>
  );
}