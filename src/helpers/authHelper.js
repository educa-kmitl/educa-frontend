const axios = require('axios')

export const login = async ({ email, password }) => (
  await axios.post(window.$ENDPOINT + '/login', {
    email,
    password
  })
    .then(res => res)
    .catch(err => err.response)
)

export const register = async ({ role, email, name, password }) => (
  await axios.post(window.$ENDPOINT + '/register', {
    role,
    email,
    name,
    password,
    profile_icon: Math.floor(Math.random() * 10)
  })
    .then(res => res)
    .catch(err => err.response)
)