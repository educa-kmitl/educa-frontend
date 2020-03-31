import React from 'react'
import './Playlist.scss'

import { Button } from '../'
import play from '../../img/room/play.svg'

export const Playlist = ({ show, setShow, roomData, playing, setPlaying }) => {

  const videos = roomData.video_source

  const togglePlaylist = () => setShow(!show)
  const changePlaylist = index => setPlaying(index)


  return (
    <>
      <div className={show ? 'float-playlist active' : 'float-playlist'}>
        <div className="float-detail">
          <div className="float-title">{roomData.name}</div>
          <div className="float-count">{videos.length} video{videos.length > 1 ? 's' : null}</div>
          <hr />

          <div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
            {videos.map((video, index) => 
              <span key={index} id={index} onClick={e => changePlaylist(e.target.id)}>
                {playing === index && <img className="play-icon" src={play} alt="" />}
                <label className={playing === index ? 'list active' : 'list'}>{index + 1}. {video.topic}</label>
              </span>
            )}
          </div>

          <hr />
          <footer>
            <Button text="show less" onClick={togglePlaylist} />
          </footer>
        </div>
      </div>
      {show && <div className="playlist-overlay" onClick={togglePlaylist}></div>}
    </>
  )
}