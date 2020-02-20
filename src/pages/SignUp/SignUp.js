import React, { useState } from 'react';
import './SignUp.scss';
import { Input, Button } from '../../components';

export const SignUp = () => {
  return (
    <div className="create-page-bg">
        <div className="create-content">
            <div className="create-form">
                <header>Create Account</header>
                <form onSubmit={() => alert('test') }>
                    <Input text="E-mail" type="text" required/>
                    <Input text="Name" type="text" required/>
                    <Input text="Password" type="password" required/>
                    <Link to="/login">
                      <Button alt text="Create" type="submit" />
                    </Link>
                    <br />
                </form>
                <Link to="/login">
                  <Button>Already have Account??</Button>
                </Link>

            </div>

        </div>
      
    </div>
  );
}