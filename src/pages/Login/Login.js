import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { randAlert } from '../../helpers'
import { login } from '../../apis'
import './Login.scss'

import { FaEnvelope, FaLock, FaHeartBroken } from 'react-icons/fa'
import { Input, Button, Popup } from '../../components'
import startpic from '../../img/login/login.svg'

export default () => {
  const history = useHistory()
  const { auth, setAuth } = useContext(AuthContext)
  const [form, setForm] = useState({ email: '', password: '' })
  const [popup, setPopup] = useState({})

  useEffect(() => {
    if (auth) history.push('/home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEmail = value => setForm({ ...form, email: value })
  const handlePassword = value => setForm({ ...form, password: value })
  const handleLogin = e => {
    e.preventDefault()
    setPopup('loading')

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
  }

  return (
    <div className="full-page">
      <div className="full-page-content">

        <form id="auth-form" onSubmit={handleLogin}>
          <h3>Welcome</h3>
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
          <footer id="auth-form-footer">
            <Button primary text="Login" type="submit" />
            <p
              id="auth-switch-form"
              onClick={() => history.push('/register')}
            >Create your account</p>
          </footer>
        </form>

        <section id="start-img-container">
          <img id="start-img" src={startpic} alt="" />
        </section>

      </div>

      {popup === 'loading' &&
        <Popup
          type="loading"
          text="Loging in"
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