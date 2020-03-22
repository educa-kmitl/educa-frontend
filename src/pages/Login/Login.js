import React, { useState, useContext } from 'react'
import './Login.scss'

import { Link } from 'react-router-dom'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Input, Button } from '../../components'
import { AuthContext } from '../../contexts'
import startpic from '../../img/start/start.svg'

export const Login = () => {
  const ENDPOINT = "http://localhost:5000" // Change Later

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useContext(AuthContext)

  const handleEmail = e => setEmail(e.target.value)
  const handlePassword = e => setPassword(e.target.value)
  const handleLogin = (event) => {
    event.preventDefault()

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
          alert('Logined!')
          setAuth({...auth, data: user})
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
              text="Email"
              type="email"
              icon={FaEnvelope}
              onChange={handleEmail}
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
              <Button text="Login" type="submit" />
              <Link to="/signup"><p>Create your account</p></Link>
            </footer>
          </form>
          <button onClick={()=>console.log(auth.data)}/>
        </div>

        <div className="img-container">
          <img src={startpic} alt="" />
        </div>
      </div>
    </div>
  )
}