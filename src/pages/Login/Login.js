import React, { useState } from 'react';
import './Login.scss';
import { Input, Button } from '../../components';
import { Home } from "../Home/Home";

export const Login = () => {
  return (
    <div className="login-page-bg">
        <div className="login-content">
            <div className="login-form">
                <header>User Login</header>
                <form onSubmit={ Home }>
                    <Input text="E-mail" type="text" required/>
                    <Input text="Password" type="password" required/>
                    <Button alt text="Login" type="submit" />
                    <br />
                </form>
                <label>Create Account</label>

            </div>

        </div>
      
    </div>
  );
}