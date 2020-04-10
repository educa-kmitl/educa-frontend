import { lazy } from 'react'

const Start = lazy(() => import('../pages/Start/Start'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Home = lazy(() => import('../pages/Home/Home'))
const Ranking = lazy(() => import('../pages/Ranking/Ranking'))
const Create = lazy(() => import('../pages/Create/Create'))
const Room = lazy(() => import('../pages/Room/Room'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

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
    path: '/room/:room_id',
    exact: false,
    component: Room,
    requireAuth: true
  },
  {
    path: '/profile/:user_id',
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