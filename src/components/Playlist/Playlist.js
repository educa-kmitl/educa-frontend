import React from 'react'
import './Playlist.scss'

import { Button } from '../'
import play from '../../img/room/play.svg'

export const Playlist = ({ playlist, setPlaylist, roomData }) => {

  const videos = roomData.video_source

  const togglePlaylist = () => setPlaylist({ ...playlist, show: !playlist.show })
  const changePlaylist = index => setPlaylist({...playlist, playing: index})


  return (
    <>
      <div className={playlist.show ? 'float-playlist active' : 'float-playlist'}>
        <div className="float-detail">
          <div className="float-title">{roomData.name}</div>
          <div className="float-count">{videos.length} video{videos.length > 1 ? 's' : null}</div>
          <hr />

          <div className="play-list">
            {videos.map((video, index) =>
              <span key={index} id={index} onClick={e => changePlaylist(e.target.id)}>
                {playlist.playing === index && <img className="play-icon" src={play} alt="" />}
                <label className={playlist.playing === index ? 'list active' : 'list'}>{index + 1}. {video.topic}</label>
              </span>
            )}
          </div>

          <hr />
          <footer>
            <Button text="show less" onClick={togglePlaylist} />
          </footer>
        </div>
      </div>
      {playlist.show && <div className="playlist-overlay" onClick={togglePlaylist}></div>}
    </>
  )
}