import React from 'react';
import { rooms } from '../data';
import { Card } from '../../components';

import './Learn.scss';

export const Learn = ({ history }) => {
  return (
    <div className="learn-page-bg">
      <div className="learn-content">
        
        <div className="CARD-XL"></div>
        <div className="all-room">
          {rooms.map(room => <Card room={room} history={history}/>)}
        </div>
      </div>
    </div>
  );
}