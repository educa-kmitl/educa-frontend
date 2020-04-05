import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import './Register.scss'

import { FaEnvelope, FaUserAlt, FaLock } from 'react-icons/fa'
import { Input, Button, Radiobutton, Popup } from '../../components'
import startpic from '../../img/start/start.svg'

export default () => {
  const history = useHistory()
  const [auth, setAuth] = useContext(AuthContext)
  const [form, setForm] = useState({
    role: false,
    email: '',
    name: '',
    password: ''
  })

  let waitText = 'Creating Account'
  const handleRole = value => setForm({ ...form, role: value === 'Teacher' })
  const handleEmail = value => setForm({ ...form, email: value })
  const handleName = value => setForm({ ...form, name: value })
  const handlePassword = value => setForm({ ...form, password: value })
  const handleRegister = e => {
    e.preventDefault()

    handlePopup()
    fetch(window.$ENDPOINT + '/register', {
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
        const { user, error } = json

        if (user) {
          waitText = 'Loging in'
          fetch(window.$ENDPOINT + '/login', {
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
              const { user, error } = json

              if (user) {
                setAuth({ ...auth, data: user })
                history.push('/home')
              } else {
                alert(error)
                handlePopup()
              }
            })
        } else {
          alert(error)
          handlePopup()
        }
      })
  }
  const handlePopup = () => document.querySelector('.popup-content').classList.toggle('hide')

  return (
    <div className="signup-bg">
      <div className="signup-content">

        <div className="txt-container">
          <form onSubmit={handleRegister}>
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
              pattern="^[A-Za-z][A-Za-z0-9]*$"
              title="Yourname must be english character"
              onChange={handleName}
              required
            />
            <Input
              Icon={FaLock}
              text="Password"
              type="password"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"
              title="Password must contain lowercase, uppercase, number and at least 8 characters "
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

      <Popup type="loading" text={waitText} />
    </div>
  )
}