import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { randAlert } from '../../helpers'
import { register, login } from '../../apis'
import './Register.scss'

import { FaEnvelope, FaUserAlt, FaLock, FaHeartBroken } from 'react-icons/fa'
import { Input, Button, Radiobutton, Popup } from '../../components'
import startpic from '../../img/login/login.svg'

export default () => {
  const history = useHistory()
  const { setAuth } = useContext(AuthContext)
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

    register(form)
      .then(res => {
        const { user, error } = res.data
        if (user) {

          login(form)
            .then(res => {
              const { user, error } = res.data
              if (user) {
                setAuth(user)
                history.push('/home')
              } else {
                setPopup({ type: 'alert', title: randAlert(), text: error })
              }
            })
        } else {
          setPopup({ type: 'alert', title: randAlert(), text: error })
        }
      })
  }

  return (
    <div id="register-page">
      <div id="register-page-content">

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
          title={popup.title}
          text={popup.text}
          confirm="Okay"
          onConfirm={() => setPopup('')}
        />}
    </div>
  )
}