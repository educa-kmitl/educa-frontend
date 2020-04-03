import React from 'react'
import { Link } from 'react-router-dom'
import './Start.scss'

import { Button } from '../../components'
import startpic from '../../img/start/start.svg'

export default () => {
  return (
    <div className="start-bg">
      <div className="content">

        <div className="txt-container">
          <header>Hello! <b>Educa</b></header>
          <p>
            With our learning platform <br />
            you can learn anything in one place.
          </p>
          <Link to="/home" className="fix-margin">
            <Button text="Get Started" />
          </Link>
        </div>

        <div className="img-container">
          <img src={startpic} alt="" />
        </div>

      </div>
    </div>
  )
}