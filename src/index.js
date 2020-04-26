import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
<<<<<<< HEAD
import { AuthProvider } from './contexts'

window.$ENDPOINT = 'https://educa-alpha.herokuapp.com/api'
// window.$ENDPOINT = 'http://localhost:5000/api'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>
, document.getElementById('root'))
=======
import { AuthProvider, RoomProvider } from './contexts'

window.$ENDPOINT = 'https://educa-alpha.herokuapp.com/api'

ReactDOM.render(
  <AuthProvider>
    <RoomProvider>
      <App />
    </RoomProvider>
  </AuthProvider>
  , document.getElementById('root'))
>>>>>>> 4102e9f91049040aa483958e2e8a65ec117b8329
