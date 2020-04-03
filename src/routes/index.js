import React from 'react'

const Start = React.lazy(() => import('../pages/Start/Start'))
const Login = React.lazy(() => import('../pages/Login/Login'))
const Register = React.lazy(() => import('../pages/Register/Register'))
const Home = React.lazy(() => import('../pages/Home/Home'))
const Ranking = React.lazy(() => import('../pages/Ranking/Ranking'))
const Create = React.lazy(() => import('../pages/Create/Create'))
const Room = React.lazy(() => import('../pages/Room/Room'))
const Profile = React.lazy(() => import('../pages/Profile/Profile'))
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'))

export const routes = [
  {
    path: '/',
    exact: true,
    component: Start,
    requireAuth: false
  },
  {
    path: '/login',
    exact: false,
    component: Login,
    requireAuth: false
  },
  {
    path: '/register',
    exact: false,
    component: Register,
    requireAuth: false
  },
  {
    path: '/home',
    exact: false,
    component: Home,
    requireAuth: true
  },
  {
    path: '/ranking',
    exact: false,
    component: Ranking,
    requireAuth: true
  },
  {
    path: '/create',
    exact: false,
    component: Create,
    requireAuth: true
  },
  {
    path: '/room',
    exact: false,
    component: Room,
    requireAuth: true
  },
  {
    path: '/profile',
    exact: false,
    component: Profile,
    requireAuth: true
  },
  {
    path: '*',
    exact: false,
    component: NotFound,
    requireAuth: false
  }
]

export { PrivateRoute } from './PrivateRoute'