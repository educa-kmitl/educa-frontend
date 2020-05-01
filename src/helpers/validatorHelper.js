
const ONLY_ENG_NUM = RegExp(/^[a-z0-9][a-z0-9]*$/i)
const EMAIL = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

export const passwordValidator = value => {
  let err = null
  if (value.length < 6) err = 'Password is too short'
  if (value.length > 32) err = 'Password is too long'
  if (!ONLY_ENG_NUM.test(value)) err = 'Password cannot contain special charactor'
  if (value.length === 0) err = 'Password required'
  return err
}

export const nameValidator = value => {
  let err = null
  if (value.length < 3) err = 'Name is too short'
  if (value.length > 20) err = 'Name is too long'
  if (!ONLY_ENG_NUM.test(value)) err = 'Name cannot contain special charactor'
  if (value.length === 0) err = 'Name required'
  return err
}

export const emailValidator = value => {
  let err = null
  if (!EMAIL.test(value)) err = 'Wrong format email'
  if (value.length === 0) err = 'Email required'
  return err
}