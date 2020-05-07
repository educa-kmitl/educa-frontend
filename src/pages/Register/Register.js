import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { randAlert, passwordValidator, nameValidator, emailValidator } from '../../helpers'
import { register, login } from '../../apis'
import './Register.scss'

import { FaEnvelope, FaUserAlt, FaLock, FaHeartBroken } from 'react-icons/fa'
import { Input, Button, Radiobutton, Popup } from '../../components'
import startpic from '../../img/login/login.svg'

export default () => {
  const history = useHistory()
  const { auth, setAuth } = useContext(AuthContext)
  const [form, setForm] = useState({
    role: false,
    email: '',
    name: '',
    password: ''
  })
  const [popup, setPopup] = useState('')

  useEffect(() => {
    if (auth) history.push('/home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const email = document.querySelector('#register-email')
    const name = document.querySelector('#register-name')
    const password = document.querySelector('#register-password')
    const btn = document.querySelector('#register-create-btn')
    if (email.classList.contains('success')
      && name.classList.contains('success')
      && password.classList.contains('success'))
      btn.disabled = false
    else btn.disabled = true
  }, [form])

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

        <form id="register-form" onSubmit={handleRegister}>
          <h3>Create Account</h3>
          <span id="register-form-radio-group">
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
            id="register-email"
            Icon={FaEnvelope}
            type="email"
            text="Email"
            onChange={handleEmail}
            validator={emailValidator}
            required
            autoComplete="off"
          />
          <Input
            id="register-name"
            Icon={FaUserAlt}
            type="text"
            text="Your name"
            onChange={handleName}
            validator={nameValidator}
            required
            autoComplete="off"
          />
          <Input
            id="register-password"
            Icon={FaLock}
            type="password"
            text="Password"
            onChange={handlePassword}
            validator={passwordValidator}
            required
          />
          <footer id="register-form-footer">
            <Button primary text="Create" type="submit" id="register-create-btn" />
            <p
              id="register-switch-form"
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