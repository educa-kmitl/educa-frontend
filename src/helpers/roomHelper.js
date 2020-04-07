const axios = require('axios')

// ---- GET
export const getAllRoom = async ({ text, sort_by, arrange_by, limit }) => (
  await axios.get(window.$ENDPOINT + '/all-rooms', {
    text,
    sort_by,
    arrange_by,
    limit
  })
    .then(res => res)
    .catch(err => err.response)
)

export const getMyRoom = async ({ user_id }) => (
  await axios.get(window.$ENDPOINT + '/my-rooms', {
    headers: {
      user_id
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

export const getComment = async (room, playlist) => (
  await axios.get(window.$ENDPOINT + '/comments', {
    headers: {
      resource_id: room.resources[playlist.playing].resource_id
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

export const createRoom = async ({ name, subject, resources, privacy, password }, { user_id }) => (
  await axios.post(window.$ENDPOINT + '/rooms', {
    name,
    subject,
    resources,
    private: privacy,
    password,
    teacher_id: user_id,
    date_created: new Date()
  })
    .then(res => res)
    .catch(err => err.response)
)


// ---- DELETE

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

// export const editRoom = async ({}) => (
//   await axios.patch(window.$ENDPOINT + '/likes', {
//     room_id,
//     user_id
//   })
//     .then(res => res)
//     .catch(err => err.response)
// )

// const filterRoom = () => roomList.filter(room => (
//   room.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
//   room.subject.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
//   room.teacher_name.toLowerCase().indexOf(search.toLowerCase()) > -1
// ))