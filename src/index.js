import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { AuthProvider, RoomProvider } from './contexts'

window.$ENDPOINT = 'https://educa-alpha.herokuapp.com/api'
// window.$ENDPOINT = 'http://localhost:5000/api'

ReactDOM.render(
  <AuthProvider>
    <RoomProvider>
      <App />
    </RoomProvider>
  </AuthProvider>
  , document.getElementById('root'))
