import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Register.scss'

import { FaEnvelope, FaUserAlt, FaLock } from 'react-icons/fa'
import { Input, Button, Radiobutton } from '../../components'
import startpic from '../../img/start/start.svg'

export default () => {
  const ENDPOINT = "http://localhost:5000" // Change Later
  const history = useHistory()

  const [auth, setAuth] = useContext(AuthContext)
  const [form, setForm] = useState({
    role: false,
    email: '',
    name: '',
    password: ''
  })

  const handleRole = value => setForm({ ...form, role: value === 'Teacher' })
  const handleEmail = value => setForm({ ...form, email: value })
  const handleName = value => setForm({ ...form, name: value })
  const handlePassword = value => setForm({ ...form, password: value })
  const handleSignup = (e) => {
    e.preventDefault()

    fetch(ENDPOINT + '/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: form.role,
        email: form.email,
        name: form.name,
        password: form.password,
        profile_icon: Math.floor(Math.random() * 10)
      })
    })
      .then(res => res.json())
      .then(json => {
        const { error, user } = json
        console.log(error, user)
        if (error) {
          alert('Email already exists')
        } else if (user) {

          fetch(ENDPOINT + '/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password
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
                history.push('/home')
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
            <div className="radio-group">
              <div className="rb">
                <Radiobutton text="Student" group="role" onClick={handleRole} form={form} checked />
              </div>
              <div className="rb">
                <Radiobutton text="Teacher" group="role" onClick={handleRole} form={form} />
              </div>
            </div>
            <Input
              Icon={FaEnvelope}
              text="Email"
              type="email"
              onChange={handleEmail}
              required
            />
            <Input
              Icon={FaUserAlt}
              text="Your name"
              type="text"
              onChange={handleName}
              required
            />
            <Input
              Icon={FaLock}
              text="Password"
              type="password"
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