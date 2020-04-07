import React, { useState, useEffect } from 'react'
import { leveling, getTeacher, randAlert } from '../../helpers'
import './Ranking.scss'

import { FaHeartBroken } from 'react-icons/fa'
import { Popup } from '../../components'
import { profiles } from '../../img/Profile'

export default () => {
  const [teacher, setTeacher] = useState({ limit: 20, list: [] })
  const [popup, setPopup] = useState('')

  useEffect(() => {
    setPopup('loading')
    getTeacher(teacher.limit)
      .then(res => {
        const { teachers, error } = res.data
        if (teachers) {
          setTeacher({ limit: teacher.limit + 20, list: teachers })
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='ranking-bg'>
      <div className='ranking-content'>
        <header>Teacher Ranking</header>
        <div className='top-rank'>

          <div className='not-top'>
            <header>SECOND</header>
            <img
              className={`profile ${leveling(teacher.list[1]?.likes).color}`}
              src={profiles[teacher.list[1]?.profile_icon]}
              alt=''
            />
            <label>{teacher.list[1]?.name}</label>
            <p className={`${leveling(teacher.list[1]?.likes).color}`}>LV {leveling(teacher.list[1]?.likes).level}</p>
          </div>

          <div className='top'>
            <header>FIRST</header>
            <img
              className={`profile ${leveling(teacher.list[0]?.likes).color}`}
              src={profiles[teacher.list[0]?.profile_icon]}
              alt=''
            />
            <label>{teacher.list[0]?.name}</label>
            <p className={`${leveling(teacher.list[0]?.likes).color}`}>LV {leveling(teacher.list[0]?.likes).level}</p>
          </div>

          <div className='not-top'>
            <header>THIRD</header>
            <img
              className={`profile ${leveling(teacher.list[2]?.likes).color}`}
              src={profiles[teacher.list[2]?.profile_icon]}
              alt=''
            />
            <label>{teacher.list[2]?.name}</label>
            <p className={`${leveling(teacher.list[2]?.likes).color}`}>LV {leveling(teacher.list[2]?.likes).level}</p>
          </div>

        </div>
        <div className='rank-list'>

          {teacher.list.map((t, index) => index > 2 ?
            <span key={index}>{index + 1}.
              <img
                className={`profile ${leveling(teacher.list[index]?.likes).color}`}
                src={profiles[teacher.list[index]?.profile_icon]}
                alt=''
              />
              <label>{t.name}</label>
              <p className={`${leveling(teacher.list[index]?.likes).color}`}>LV {leveling(teacher.list[index]?.likes).level}</p>
            </span>
            : null
          )}

        </div>
      </div>

      {popup === 'loading' &&
        <Popup
          type="loading"
          text="Loading"
        />}
      {popup.type === 'alert' &&
        <Popup
          type="alert"
          Icon={FaHeartBroken}
          title={popup.title}
          text={popup.text}
          confirm="Okay"
          onConfirm={() => setPopup('')}
        />}
    </div>
  )
}