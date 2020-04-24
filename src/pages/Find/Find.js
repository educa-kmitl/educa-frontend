import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { randAlert } from '../../helpers'
import { getAllRoom } from '../../apis'
import './Find.scss'

import { FaSearch, FaHeartBroken, FaArrowDown, FaArrowUp, FaAngleDown } from 'react-icons/fa'
import { Card, Popup } from '../../components'

export default () => {
  const history = useHistory()
  const { auth } = useContext(AuthContext)
  const [roomList, setRoomList] = useState([])
  const [popup, setPopup] = useState('')
  const [search, setSearch] = useState({
    text: '',
    sort_by: 1,
    arrange_by: 1
  })
  const [more, setMore] = useState({ have: false, limit: 6 })

  useEffect(() => {
    if (auth.role === true) history.push('/notfound')
    else {
      getAllRoom({ ...search, limit: more.limit })
        .then(res => {
          const { rooms, have_more, error } = res.data
          if (rooms) {
            setRoomList(rooms)
            setMore({ have: have_more, limit: 6 })
            setPopup('')
          } else {
            setPopup({ type: 'alert', title: randAlert(), text: error })
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = value => setSearch({ ...search, text: value })
  const goSearch = () => {
    setPopup('loading')
    getAllRoom({ ...search, limit: 6 })
      .then(res => {
        const { rooms, have_more, error } = res.data
        if (rooms) {
          setRoomList(rooms)
          setMore({ have: have_more, limit: 6 })
          setPopup('')
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }
  const enterRoom = room => history.push(`/room/${room.room_id}`)
  const handleMore = () => {
    getAllRoom({ ...search, limit: more.limit + 6 })
      .then(res => {
        const { rooms, have_more, error } = res.data
        if (rooms) {
          setRoomList(rooms)
          setMore({ have: have_more, limit: more.limit + 6 })
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }
  const handleSort = sort => {
    const radio = sort === 1 ? document.querySelector(`#radio-search-heart`) : document.querySelector(`#radio-search-date`)
    if ((radio.value === 'Heart' && search.sort_by === 1) || (radio.value === 'Date' && search.sort_by === 2)) {
      setSearch({ ...search, arrange_by: search.arrange_by === 1 ? 2 : 1 })
    } else {
      radio.checked = true
      setSearch({ ...search, sort_by: radio.value === 'Heart' ? 1 : 2 })
    }
  }

  return (
    <div className="find-page-bg">
      <div className="find-content">
        <header id="find-header">Let's find some Course</header>

        <div className="search">
          <input
            placeholder="Type something to find..."
            value={search.text}
            onChange={e => handleSearch(e.target.value)}
            onKeyUp={e => e.key === 'Enter' ? goSearch() : null}
          />

          <div className="icon-search-only" onClick={goSearch}>
            <FaSearch />
          </div>
          <div className="icon">
            <FaAngleDown />
            <div id="search-option">
              Sort by
              <div className='my-radio-sm' onClick={e => { e.stopPropagation(); handleSort(1) }}>
                <input
                  id='radio-search-heart'
                  type='radio'
                  value="Heart"
                  name="sortby"
                  defaultChecked={search.sort_by === 1}
                />
                <label>Heart
                  {search.sort_by === 1 && (search.arrange_by === 1 ? <FaArrowDown style={sortArrow} /> : <FaArrowUp style={sortArrow} />)}
                </label>
              </div>
              <div className='my-radio-sm' onClick={e => { e.stopPropagation(); handleSort(2) }}>
                <input
                  id='radio-search-date'
                  type='radio'
                  value="Date"
                  name="sortby"
                  defaultChecked={search.sort_by === 2}
                />
                <label>Date
                  {search.sort_by === 2 && (search.arrange_by === 1 ? <FaArrowDown style={sortArrow} /> : <FaArrowUp style={sortArrow} />)}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="all-room">
          {roomList.map((room, index) => <Card key={index} room={room} onClick={enterRoom} />)}
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
          confirm="Refresh"
          onConfirm={() => window.location = 'home'}
        />}

    </div>
  )
}

const sortArrow = {
  fontSize: '12px',
  marginLeft: '5px'
}