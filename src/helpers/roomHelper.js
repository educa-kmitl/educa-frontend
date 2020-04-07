const axios = require('axios')

export const getAllRoom = async ({ text, sort_by, arrange_by, limit }) => {
  try {
    return await axios.get(window.$ENDPOINT + '/all-rooms', {
      text,
      sort_by,
      arrange_by,
      limit
    }).then(res => res.data)
  } catch (err) {
    throw new Error(err)
  }
}

export const getMyRoom = async ({ user_id }) => {
  try {
    return await axios.get(window.$ENDPOINT + '/my-rooms', {
      headers: {
        user_id
      }
    }).then(res => res.data)
  } catch (err) {
    throw new Error(err)
  }
}


export const getRoomPrivacy = async (room_id) => {
  try {
    return await axios.get(window.$ENDPOINT + '/room-privacy', {
      headers: {
        room_id
      }
    }).then(res => res.data)
  } catch (err) {
    throw new Error(err)
  }
}

export const getRoom = async (room_id, password) => {
  try {
    return await axios.get(window.$ENDPOINT + '/rooms', {
      headers: {
        room_id,
        password
      }
    }).then(res => res.data)
  } catch (err) {
    throw new Error(err)
  }
}

export const getComment = async (roomData, playlist) => {
  try {
    return await axios.get(window.$ENDPOINT + '/comments', {
      headers: {
        resource_id: roomData.resources[playlist.playing].resource_id
      }
    }).then(res => res.data)
  } catch (err) {
    throw new Error(err)
  }
}


// const filterRoom = () => roomList.filter(room => (
//   room.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
//   room.subject.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
//   room.teacher_name.toLowerCase().indexOf(search.toLowerCase()) > -1
// ))