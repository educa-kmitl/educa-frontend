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

export const getFollowing = async (user_id) => (
  await axios.get(window.$ENDPOINT + '/followings', {
    headers: {
      user_id
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getFollower = async (user_id) => (
  await axios.get(window.$ENDPOINT + '/followers', {
    headers: {
      user_id
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const postFollowing = async ({ user_id: student_id }, teacher_id) => (
  await axios.post(window.$ENDPOINT + '/followings', {
    student_id,
    teacher_id
  })
    .then(res => res)
    .catch(err => err.response)
)

export const deleteFollowing = async ({ user_id: student_id }, teacher_id) => (
  await axios.delete(window.$ENDPOINT + '/followings', {
    data: {
      student_id,
      teacher_id
    }
  })
    .then(res => res)
    .catch(err => err.response)
)