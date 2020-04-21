
export { login, register } from './authAPI'
export {
  getAllRoom,
  getMyRoom,
  getFollowRoom,
  getRoom,
  getRoomPrivacy,
  getComment,
  getLike,
  createRoom,
  postLike,
  postComment,
  postResource,
  editRoom,
  editResource,
  deleteRoom,
  deleteLike,
  deleteResource
} from './roomAPI'
export {
  getProfile,
  editProfile,
  getFollowing,
  getFollower,
  postFollowing,
  deleteFollowing
} from './profileAPI'
export { getTeacher } from './rankAPI'