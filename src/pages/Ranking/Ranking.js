import React, { useState, useEffect } from 'react'
import './Ranking.scss'

import { leveling } from '../../helpers'
import { profiles } from '../../img/Profile'

export default () => {
  const [teacher, setTeacher] = useState([])

  useEffect(() => {
    fetch(window.$ENDPOINT + '/all-teachers', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        const { teachers, error } = json

        if (teachers) {
          const sorted = teachers.sort((a, b) => b.likes - a.likes)
          setTeacher(sorted)
        } else {
          alert(error)
        }
      })
  }, [])

  return (
    <div className='ranking-bg'>
      <div className='ranking-content'>
        <header>Teacher Ranking</header>
        <div className='top-rank'>

          <div className='not-top'>
            <header>SECOND</header>
            <img
              className={`profile ${leveling(teacher[1]?.likes).color}`}
              src={profiles[teacher[1]?.profile_icon]}
              alt=''
            />
            <label>{teacher[1]?.name}</label>
            <p className={`${leveling(teacher[1]?.likes).color}`}>LV {leveling(teacher[1]?.likes).level}</p>
          </div>

          <div className='top'>
            <header>FIRST</header>
            <img
              className={`profile ${leveling(teacher[0]?.likes).color}`}
              src={profiles[teacher[0]?.profile_icon]}
              alt=''
            />
            <label>{teacher[0]?.name}</label>
            <p className={`${leveling(teacher[0]?.likes).color}`}>LV {leveling(teacher[0]?.likes).level}</p>
          </div>

          <div className='not-top'>
            <header>THIRD</header>
            <img
              className={`profile ${leveling(teacher[2]?.likes).color}`}
              src={profiles[teacher[2]?.profile_icon]}
              alt=''
            />
            <label>{teacher[2]?.name}</label>
            <p className={`${leveling(teacher[2]?.likes).color}`}>LV {leveling(teacher[2]?.likes).level}</p>
          </div>

        </div>
        <div className='rank-list'>

          {teacher.map((t, index) => index > 2 ?
            <span key={index}>{index + 1}.
              <img
                className={`profile ${leveling(teacher[index]?.likes).color}`}
                src={profiles[teacher[index]?.profile_icon]}
                alt=''
              />
              <label>{t.name}</label>
              <p className={`${leveling(teacher[index]?.likes).color}`}>LV {leveling(teacher[index]?.likes).level}</p>
            </span>
            : null
          )}

        </div>
      </div>
    </div>
  )
}