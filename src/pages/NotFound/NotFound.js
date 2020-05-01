import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components';

import './NotFound.scss';

export default () => {
  const history = useHistory()

  return (
    <div className="nf-page-bg">
      <div className="nf-svg"></div>
      <header>Hmm..</header>
      <p>We can't find the page you're looking for.</p>
      <Button primary text="Go back" onClick={() => history.goBack()}></Button>
    </div>
  );
}