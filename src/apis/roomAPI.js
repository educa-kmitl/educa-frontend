const axios = require('axios')

// ---- GET
export const getAllRoom = async (search) => (
  await axios.post(window.$ENDPOINT + '/all-rooms', {
    ...search
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getMyRoom = async ({ user_id }, limit) => (
  await axios.get(window.$ENDPOINT + '/my-rooms', {
    headers: {
      user_id,
      limit
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getFollowRoom = async ({ user_id }, limit) => (
  await axios.get(window.$ENDPOINT + '/following-rooms', {
    headers: {
      user_id,
      limit
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getRoomPrivacy = async (room_id) => (
  await axios.get(window.$ENDPOINT + '/room-privacy', {
    headers: {
      room_id
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getRoom = async (room_id, password) => (
  await axios.get(window.$ENDPOINT + '/rooms', {
    headers: {
      room_id,
      password
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getComment = async (room, playlist, limit) => (
  await axios.get(window.$ENDPOINT + '/comments', {
    headers: {
      resource_id: room.resources[playlist.playing].resource_id,
      limit
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getLike = async (room_id, { user_id }) => (
  await axios.get(window.$ENDPOINT + '/likes', {
    headers: {
      room_id,
      user_id
    }
  })
    .then(res => res)
    .catch(err => err.response)
)


// ---- POST

export const postLike = async (room_id, { user_id }) => (
  await axios.post(window.$ENDPOINT + '/likes', {
    room_id,
    user_id
  })
    .then(res => res)
    .catch(err => err.response)
)

export const postComment = async ({ user_id }, room, playlist, text) => (
  await axios.post(window.$ENDPOINT + '/comments', {
    user_id,
    resource_id: room.resources[playlist.playing].resource_id,
    text,
    time: new Date()
  })
    .then(res => res)
    .catch(err => err.response)
)

export const createRoom = async (room, { user_id }) => (
  await axios.post(window.$ENDPOINT + '/rooms', {
    ...room,
    teacher_id: user_id,
    date_created: new Date()
  })
    .then(res => res)
    .catch(err => err.response)
)

export const postResource = async (room_id, resources) => (
  await axios.post(window.$ENDPOINT + '/resources', {
    room_id,
    resources
  })
    .then(res => res)
    .catch(err => err.response)
)


// ---- DELETE

export const deleteRoom = async (room_id, { user_id }, password) => (
  await axios.delete(window.$ENDPOINT + '/rooms', {
    data: {
      room_id,
      teacher_id: user_id,
      password
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const deleteLike = async (room_id, { user_id }) => (
  await axios.delete(window.$ENDPOINT + '/likes', {
    data: {
      room_id,
      user_id
    }
  })
    .then(res => res)
    .catch(err => err.response)
)

export const deleteResource = async (resources) => (
  await axios.delete(window.$ENDPOINT + '/resources', {
    data: {
      resources
    }
  })
    .then(res => res)
    .catch(err => err.response)
)



// ---- PATCH

export const editRoom = async (room, teacher_password) => (
  await axios.patch(window.$ENDPOINT + '/rooms', {
    ...room,
    teacher_password
  })
    .then(res => res)
    .catch(err => err.response)
)

export const editResource = async (resources) => (
  await axios.patch(window.$ENDPOINT + '/resources', {
    resources
  })
    .then(res => res)
    .catch(err => err.response)
)