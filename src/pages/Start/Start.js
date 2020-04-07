import React from 'react'
import { Link } from 'react-router-dom'
import '../scss/noAuth.scss'

import { Button } from '../../components'
import startpic from '../../img/start/start.svg'

export default () => {
  return (
    <div className="full-page">
      <div className="full-page-content">

        <section id="start-text-container">
          <h1>Hello! <b>Educa</b></h1>
          <h6 style={{ marginBottom: '20px' }}>
            With our learning platform <br />
            you can learn anything in one place.
          </h6>
          <Link to="/home" style={{ marginLeft: '-10px' }}>
            <Button primary text="Get Started" />
          </Link>
        </section>

        <section id="start-img-container">
          <img id="start-img" src={startpic} alt="" />
        </section>

      </div>
    </div>
  )
}
