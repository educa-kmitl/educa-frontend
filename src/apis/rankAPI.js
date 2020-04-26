const axios = require('axios')

export const getTeacher = async (limit) => (
  await axios.get(window.$ENDPOINT + '/all-teachers', {
    headers: {
      limit
    }
  })
    .then(res => res)
    .catch(err => err.response)
)