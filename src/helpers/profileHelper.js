const axios = require('axios')

export const getProfile = async (user_id) => (
  await axios.get(window.$ENDPOINT + '/users', {
    headers: {
      user_id
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const editProfile = async (user) => (
  await axios.patch(window.$ENDPOINT + '/users', {
    ...user
  })
    .then(res => res)
    .catch(err => err.response)
)