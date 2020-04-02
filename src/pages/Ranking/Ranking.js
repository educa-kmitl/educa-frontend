import React from 'react'
import './Ranking.scss'

import { profiles } from '../../img/Profile'

export const Ranking = () => {
  return (
    <div className='ranking-bg'>
      <div className='ranking-content'>
        <header>Teacher Ranking</header>
        <div className='top-rank'>

          <div className='not-top'>
            <header>SECOND</header>
            <img className='profile' src={profiles[8]} alt='' />
            <label>username</label>
            <p>LV 3</p>
          </div>

          <div className='top'>
            <header>FIRST</header>
            <img className='profile' src={profiles[8]} alt='' />
            <label>username</label>
            <p>LV 5</p>
          </div>

          <div className='not-top'>
            <header>THIRD</header>
            <img className='profile' src={profiles[8]} alt='' />
            <label>username</label>
            <p>LV 2</p>
          </div>

        </div>
        <div className='rank-list'>
          <span>4.
            <img className='profile' src={profiles[2]} alt='' />
            <label>username</label>
            <p>LV 5</p>
          </span>
          <span>5.
            <img className='profile' src={profiles[2]} alt='' />
            <label>username</label>
            <p>LV 5</p>
          </span>
          <span>6.
            <img className='profile' src={profiles[2]} alt='' />
            <label>username</label>
            <p>LV 5</p>
          </span>
        </div>
      </div>
    </div>
  )
}