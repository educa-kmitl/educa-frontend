import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components';

import './NotFound.scss';

export default () => {
  return (
    <div className="nf-page-bg">
      <div className="nf-svg"></div>
      <header>Hmm..</header>
      <p>We can't find the page you're looking for.</p>
      <Link to="/home">
        <Button primary text="Go back"></Button>
      </Link>
    </div>
  );
}