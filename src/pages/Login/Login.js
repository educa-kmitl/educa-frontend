import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import '../scss/noAuth.scss'

import { FaEnvelope, FaLock, FaHeartBroken } from 'react-icons/fa'
import { Input, Button, Popup } from '../../components'
import startpic from '../../img/start/start.svg'

export default () => {
  const history = useHistory()
  const [form, setForm] = useState({ email: '', password: '' })
  const [auth, setAuth] = useContext(AuthContext)
  const [popup, setPopup] = useState({})

  const handleEmail = value => setForm({ ...form, email: value })
  const handlePassword = value => setForm({ ...form, password: value })
  const handleLogin = e => {
    e.preventDefault()

    setPopup('loading')
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
          title="Oh no!"
          text={popup.text}
          confirm="Okay"
          onConfirm={() => setPopup('')}
        />}
    </div>
  )
}