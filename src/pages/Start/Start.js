import React from 'react';
import './Start.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components';
import startpic from '../../img/start/start.svg'

export const Start = () => {
  return (
    <div className="start-bg">
      <div className="start-content">

        <div className="txt-container">
          <h1>Learn anything</h1>
          <h1>in one place</h1>
          <p>
            Educa is a web application that sum up many kinds
            of knowlege in just one place
          </p>
          <Link to="/login">
            <Button alt text="Get Started" />
          </Link>
        </div>

        <div className="img-container">
          <img src={startpic} alt="" />
        </div>

      </div>
    </div>
  );
}