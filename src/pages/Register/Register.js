import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import '../scss/noAuth.scss'

import { FaEnvelope, FaUserAlt, FaLock, FaHeartBroken } from 'react-icons/fa'
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
  const [popup, setPopup] = useState('')

  const handleRole = value => setForm({ ...form, role: value === 'Teacher' })
  const handleEmail = value => setForm({ ...form, email: value })
  const handleName = value => setForm({ ...form, name: value })
  const handlePassword = value => setForm({ ...form, password: value })
  const handleRegister = e => {
    e.preventDefault()

    setPopup('loading')
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
                console.log(new Error(error))
                setPopup({ type: 'alert', text: error })
              }
            })
        } else {
          console.log(new Error(error))
          setPopup({ type: 'alert', text: error })
        }
      })
  }

  return (
    <div className="full-page">
      <div className="full-page-content">

        <form id="auth-form" onSubmit={handleRegister}>
          <h3>Create Account</h3>
          <span id="auth-form-radio-group">
            <div style={{ width: '48%' }}>
              <Radiobutton
                group="role"
                text="Student"
                onClick={handleRole}
                checked
              />
            </div>
            <div style={{ width: '48%' }}>
              <Radiobutton
                group="role"
                text="Teacher"
                onClick={handleRole}
              />
            </div>
          </span>
          <Input
            Icon={FaEnvelope}
            type="email"
            text="Email"
            onChange={handleEmail}
            required
          />
          <Input
            Icon={FaUserAlt}
            type="text"
            text="Your name"
            onChange={handleName}
            required
          />
          <Input
            Icon={FaLock}
            type="password"
            text="Password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"
            title="Password must contain lowercase, uppercase, number and at least 8 characters"
            onChange={handlePassword}
            required
          />
          <footer id="auth-form-footer">
            <Button primary text="Create" type="submit" />
            <p
              id="auth-switch-form"
              onClick={() => history.push('/login')}
            >I have an account</p>
          </footer>
        </form>

        <section id="start-img-container">
          <img id="start-img" src={startpic} alt="" />
        </section>

      </div>

      {popup === 'loading' &&
        <Popup
          type="loading"
          text="Creating account"
        />}
      {popup.type === 'alert' &&
        <Popup
          type="alert"
          Icon={FaHeartBroken}
          title="Oh no!"
          text={popup.text}
          confirm="Okay"
          onConfirm={() => setPopup('')}
        />}
    </div>
  )
}