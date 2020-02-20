import React from 'react';
import { Card } from '../../components';

import './Learn.scss';

export const Learn = () => {

  const rooms = [
    {
      title: 'Calculus',
      about: 'Limit Derivatives Integration etc',
      owner: 'Sakchai',
      tag: 'math'
    },
    {
      title: `Let's make an explosion!`,
      about: 'This chemical course will teach you how to make an explosion',
      owner: 'Albert Einstei',
      tag: 'chem'
    },
    {
      title: `How to be a good "Dictator"`,
      about: 'just be a soilder',
      owner: 'Prayut007',
      tag: 'social'
    },
    {
      title: 'Kwam Na Ja Pen',
      about: 'probability & stats & yasss',
      owner: 'surinlnwza',
      tag: 'bio'
    },
    {
      title: 'See the star',
      about: 'About astrology & physics',
      owner: 'ggez1234',
      tag: 'phys'
    }
  ]

  return (
    <div className="learn-page-bg">
      <div className="learn-content">
        
        <div className="CARD-XL"></div>
        <div className="all-room">
          {rooms.map(room => <Card room={room}/>)}
        </div>
      </div>
    </div>
  );
}