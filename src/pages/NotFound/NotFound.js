import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components';

import './NotFound.scss';

export const NotFound = () => {
  return (
    <div className="nf-page-bg">
      <div className="nf-svg"></div>
      <header>Hmm..</header>
      <p>we can't find the page you're looking for</p>
      <Link to="/learn">
        <Button alt text="Go back"></Button>
      </Link>
    </div>
  );
}