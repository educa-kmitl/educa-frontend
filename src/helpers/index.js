
export const leveling = likes => {
  if (likes >= 50) return { level: 5, color: 'purple', tile: 'Master Teacher' }
  else if (likes >= 30) return { level: 4, color: 'red', tile: 'Expert Teacher' }
  else if (likes >= 15) return { level: 3, color: 'blue', tile: 'Intermediate Teacher' }
  else if (likes >= 5) return { level: 2, color: 'yellow', tile: 'Beginner Teacher' }
  else return { level: 1, color: 'green', title: 'Novince Teacher' }
}

export { randAlert } from './popupHelper'
export { login, register } from './authHelper'
export {
  getAllRoom,
  getMyRoom,
  getRoom,
  getRoomPrivacy,
  getComment,
  getLike,
  createRoom,
  postLike,
  postComment,
  deleteLike
} from './roomHelper'