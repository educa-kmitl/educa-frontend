import React from 'react';
import './Start.scss';

import { Link } from 'react-router-dom';
import { Button } from '../../components';
import startpic from '../../img/start/start.svg';

export const Start = () => {
  return (
    <div className="start-bg">
      <div className="start-content">

        <div className="txt-container">
          <header>Hello! <b>Educa</b></header>
          <p>
            With our learning platform <br />
            you can learn anything in one place. 
          </p>
          <div className="fix-margin">
            <Link to="/home">
              <Button text="Get Started" />
            </Link>
          </div>
        </div>

        <div className="img-container">
          <img src={startpic} alt="" />
        </div>

      </div>
    </div>
  );
}