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
                    <Input text="Password" type="text" required/>
                    <Button alt text="Create" type="submit" />
                    <br />
                </form>
                <footer>Already have account?</footer>

            </div>

        </div>
      
    </div>
  );
}