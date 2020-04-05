import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { AuthProvider } from './contexts'

window.$ENDPOINT = 'https://educa-alpha.herokuapp.com/api'
// window.$ENDPOINT = 'http://localhost:5000/api'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>
, document.getElementById('root'))
