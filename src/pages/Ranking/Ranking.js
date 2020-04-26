import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { leveling, randAlert } from '../../helpers'
import { getTeacher } from '../../apis'
import './Ranking.scss'

import { FaHeartBroken } from 'react-icons/fa'
import { Popup } from '../../components'
import { profiles } from '../../img/Profile'

export default () => {
  const history = useHistory()
  const [teacher, setTeacher] = useState([])
  const [popup, setPopup] = useState('')
  const [more, setMore] = useState({ have: false, limit: 20 })

  useEffect(() => {
    setPopup('')
    getTeacher(more.limit)
      .then(res => {
        const { teachers, have_more, error } = res.data
        if (teachers) {
          setTeacher(teachers)
          setMore({ have: have_more, limit: 20 })
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMore = () => {
    getTeacher(more.limit + 20)
      .then(res => {
        const { teachers, have_more, error } = res.data
        if (teachers) {
          setTeacher(teachers)
          setMore({ have: have_more, limit: more.limit + 20 })
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }
  const gotoProfile = teacher => history.push(`/profile/${teacher?.user_id}`)

  return (
    <div className='ranking-bg'>
      <div className='ranking-content'>
        <header className='head'>Teacher Ranking</header>
        <div className='top-rank'>
          <div className='order'>
            <div className='not-top' onClick={() => gotoProfile(teacher[1])}>
              <header>SECOND</header>
              <img
                className={`profile light-bg ${leveling(teacher[1]?.likes).color}`}
                src={profiles[teacher[1]?.profile_icon]}
                alt=''
              />
              <label>{teacher[1]?.name}</label>
              <p className={`color ${leveling(teacher[1]?.likes).color}`}>{leveling(teacher[1]?.likes).title}</p>
            </div>

            <div className='top' onClick={() => gotoProfile(teacher[0])}>
              <header>FIRST</header>
              <img
                className={`profile light-bg ${leveling(teacher[0]?.likes).color}`}
                src={profiles[teacher[0]?.profile_icon]}
                alt=''
              />
              <label>{teacher[0]?.name}</label>
              <p className={`color ${leveling(teacher[0]?.likes).color}`}>{leveling(teacher[0]?.likes).title}</p>
            </div>
          </div>
          <div className='not-top' onClick={() => gotoProfile(teacher[2])}>
            <header>THIRD</header>
            <img
              className={`profile light-bg ${leveling(teacher[2]?.likes).color}`}
              src={profiles[teacher[2]?.profile_icon]}
              alt=''
            />
            <label>{teacher[2]?.name}</label>
            <p className={`color ${leveling(teacher[2]?.likes).color}`}>{leveling(teacher[2]?.likes).title}</p>
          </div>

        </div>
        <div className='rank-list'>
          {teacher.map((t, index) => index > 2 ?
            <span key={index} onClick={() => gotoProfile(t)}>{index + 1}.
              <img
                className={`profile light-bg ${leveling(teacher[index]?.likes).color}`}
                src={profiles[teacher[index]?.profile_icon]}
                alt=''
              />
              <label>{t.name}</label>
              <p className={`color ${leveling(teacher[index]?.likes).color}`}>{leveling(teacher[index]?.likes).title}</p>
            </span>
            : null
          )}
        </div>
        {more.have && <button className="see-more-btn" onClick={handleMore}>Show more</button>}
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