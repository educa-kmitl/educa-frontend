import React, { useState, useContext } from 'react'
import './SignUp.scss'

import { Link, useHistory } from 'react-router-dom'
import { FaEnvelope, FaUserAlt, FaLock } from 'react-icons/fa'
import { Input, Button } from '../../components'
import { AuthContext } from '../../contexts'
import startpic from '../../img/start/start.svg'

export const SignUp = () => {
  const ENDPOINT = "http://localhost:5000" // Change Later
  const history = useHistory();

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useContext(AuthContext);

  const handleEmail = e => setEmail(e.target.value)
  const handleName = e => setName(e.target.value)
  const handlePassword = e => setPassword(e.target.value)
  const handleSignup = (event) => {
    event.preventDefault()

    fetch(ENDPOINT + '/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        password
      })
    })
      .then(res => res.json())
      .then(json => {
        const { error, user } = json
        console.log(error, user)
        if (error) {
          alert('Email already exists')
        } else if (user) {
          alert('Account Created!')

          fetch(ENDPOINT + '/api/user/login', {
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
                console.log(user)
                setAuth({ ...auth, data: user })
                history.push("/home")
              }
            })
        }
      })
  }

  return (
    <div className="signup-bg">
      <div className="signup-content">

        <div className="txt-container">
          <form onSubmit={handleSignup}>
            <header>Create Account</header>
            <Input
              text="Email"
              type="email"
              icon={FaEnvelope}
              onChange={handleEmail}
              required
            />
            <Input
              text="Your name"
              type="text"
              icon={FaUserAlt}
              onChange={handleName}
              required
            />
            <Input
              text="Password"
              type="password"
              icon={FaLock}
              onChange={handlePassword}
              required
            />
            <footer>
              <Button text="Create" type="submit" />
              <Link to="/login"><p>I have an account</p></Link>
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