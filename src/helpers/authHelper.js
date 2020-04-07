const axios = require('axios')

export const login = async ({ email, password }) => {
  try {
    return await axios.post(window.$ENDPOINT + '/login', {
      email,
      password
    }).then(res => res.data)
  } catch (err) {
    throw new Error(err)
  }
}

export const register = async ({ role, email, name, password }) => {
  try {
    return await axios.post(window.$ENDPOINT + '/register', {
      role,
      email,
      name,
      password,
      profile_icon: Math.floor(Math.random() * 10)
    }).then(res => res.data)
  } catch (err) {
    throw new Error(err)
  }
}