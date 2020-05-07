import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { AuthProvider, RoomProvider } from './contexts'

window.$ENDPOINT = 'https://educa-alpha.herokuapp.com/api'
window.hackRank = likes => {
  window.localStorage.setItem('hackRank', JSON.stringify({ likes }))
  return 'hack success!'
}

ReactDOM.render(
  <AuthProvider>
    <RoomProvider>
      <App />
    </RoomProvider>
  </AuthProvider>
  , document.getElementById('root'))
