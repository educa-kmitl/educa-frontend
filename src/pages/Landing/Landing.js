import React, { useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Landing.scss'

import { Button } from '../../components'
import { FaAngleDown } from 'react-icons/fa'
import e0 from '../../img/landing/e0.png'
import e1_world from '../../img/landing/e1-world.png'
import e1_world_hand from '../../img/landing/e1-world-hand.png'
import e1_monitor from '../../img/landing/e1-monitor.png'
import e1_monitor_shadow from '../../img/landing/e1-monitor-shadow.png'
import e1_monitor2 from '../../img/landing/e1-monitor2.png'
import e1_monitor2_shadow from '../../img/landing/e1-monitor2-shadow.png'
import e1_book from '../../img/landing/e1-book.png'
import e1_book_page from '../../img/landing/e1-book-page.png'
import e1_coding from '../../img/landing/e1-coding.png'
import e1_coding_com from '../../img/landing/e1-coding-com.png'
import e1_coding_hand from '../../img/landing/e1-coding-hand.png'
import logo from '../../img/new-educa.svg'
import com_sup from '../../img/landing/com-sup.png'
import tablet_sup from '../../img/landing/tablet-sup.png'
import phone_sup from '../../img/landing/phone-sup.png'
import e2 from '../../img/landing/e2.png'
import e2_coffee from '../../img/landing/e2-coffee.png'
import e2_logo from '../../img/landing/e2-logo.png'
import e2_play from '../../img/landing/e2-play.png'
import e3 from '../../img/landing/e3.png'
import e3_bubble from '../../img/landing/e3-bubble.png'
import e3_love from '../../img/landing/e3-love.png'

export default () => {
  const [auth] = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (auth) history.replace('/home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <section id="landing0">
        <div id="e-text">
          <img src={logo} style={{ width: '100px' }} alt="" />
          <h1>Hello! <b>Educa</b></h1>
          <h6 style={{ marginBottom: '20px' }}>
            With our learning platform <br />
            you can learn anything in one place
            </h6>
          <Link to="/home" style={{ marginLeft: '-10px' }}>
            <Button text="Get Started" />
          </Link>
        </div>
        <div id="e-container">
          <img src={e1_monitor_shadow} id="e1-monitor-shadow" alt="" />
          <img src={e1_monitor2_shadow} id="e1-monitor2-shadow" alt="" />
          <img src={e1_monitor} id="e1-monitor" alt="" />
          <img src={e1_monitor2} id="e1-monitor2" alt="" />
          <img src={e1_world_hand} id="e1-world-hand" alt="" />
          <img src={e1_world} id="e1-world" alt="" />
          <img src={e1_book_page} id="e1-book-page" alt="" />
          <img src={e1_book} id="e1-book" alt="" />
          <img src={e1_coding} id="e1-coding" alt="" />
          <img src={e1_coding_hand} id="e1-coding-hand" alt="" />
          <img src={e1_coding_com} id="e1-coding-com" alt="" />
          <img src={e0} alt="" />
        </div>
      </section>
      <section id="landing1">
        <FaAngleDown id="landing1-scroll" />
        <h3 id="landing1-title">Learn anywhere</h3>
        <div id="platform-block">
          <div className="platform-support">
            <img src={com_sup} loading="lazy" className="platform-support-img" alt="" />
            <h5 className="platform-support-text">Computer</h5>
          </div>
          <div className="platform-support">
            <img src={tablet_sup} loading="lazy" className="platform-support-img" alt="" />
            <h5 className="platform-support-text">Tablet</h5>
          </div>
          <div className="platform-support">
            <img src={phone_sup} loading="lazy" className="platform-support-img" alt="" />
            <h5 className="platform-support-text">Smartphone</h5>
          </div>
        </div>
      </section>
      <section id="landing2">
        <div id="landing2-img">
          <img src={e2_coffee} id="e2-coffee" alt="" />
          <img src={e2_logo} id="e2-logo" alt="" />
          <img src={e2_play} id="e2-play" alt="" />
          <img src={e2} alt="" />
        </div>
        <div id="landing2-text">
          <h3 id="landing2-title">Learn anytime</h3>
          <h6>Our platform never offline</h6>
        </div>
      </section>
      <section id="landing3">
        <div id="landing3-text">
          <h3 id="landing2-title">Learn with anyone</h3>
          <h6>Choose your own teacher</h6>
        </div>
        <div id="landing3-img">
          <img src={e3_bubble} id="e3-bubble" alt="" />
          <img src={e3_love} id="e3-love1" alt="" />
          <img src={e3_love} id="e3-love2" alt="" />
          <img src={e3_love} id="e3-love3" alt="" />
          <img src={e3} alt="" />
        </div>
      </section>
      <section id="landing4">
        <h2 id="landing4-title">Try Educa now</h2>
        <Link to="/home" style={{ marginLeft: '-10px' }}>
          <Button text="Get Started" />
        </Link>
      </section>
    </>
  )
}