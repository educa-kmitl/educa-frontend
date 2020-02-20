import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateAccount.scss';
import { Input, Button } from '../../components';
import { Login } from "../Login/Login";

export const CreateAccount = () => {
  return (
    <div className="create-page-bg">
        <div className="create-content">
            <div className="create-form">
                <header>Create Account</header>
                <form onSubmit={ Login }>
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