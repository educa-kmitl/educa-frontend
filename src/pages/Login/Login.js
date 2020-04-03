import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Login.scss'

import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Input, Button } from '../../components'
import startpic from '../../img/start/start.svg'

export default () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useContext(AuthContext)

  const handleEmail = value => setEmail(value)
  const handlePassword = value => setPassword(value)
  const handleLogin = (e) => {
    e.preventDefault()

    fetch(window.$ENDPOINT + '/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(json => {
        const { error, user } = json
        if (error) {
          alert('Invalid Email or Password :(')
        } else if (user) {
          setAuth({ ...auth, data: user })
          history.push('/home')
        }
      })
  }

  return (
    <div className="login-bg">
      <div className="login-content">

        <div className="txt-container">
          <form onSubmit={handleLogin}>
            <header>Welcome</header>
            <Input
              Icon={FaEnvelope}
              type="email"
              text="Email"
              onChange={handleEmail}
              required
            />
            <Input
              Icon={FaLock}
              type="password"
              text="Password"
              onChange={handlePassword}
              required
            />
            <footer>
              <Button text="Login" type="submit" />
              <Link to="/signup">
                <p>Create your account</p>
              </Link>
            </footer>
          </form>
        </div>

        <div className="img-container">
          <img src={startpic} alt="" />
        </div>
      </div>
    </div>
  )
}