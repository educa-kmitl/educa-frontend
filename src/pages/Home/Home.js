import React from 'react';
import { rooms } from '../data';
import { Card } from '../../components';

import './Home.scss';

export const Home = ({ history }) => {
  return (
    <div className="home-page-bg">
      <div className="home-content">
        
        <div className="CARD-XL"></div>
        <div className="all-room">
          {rooms.map(room => <Card room={room} history={history}/>)}
        </div>
      </div>
    </div>
  );
}