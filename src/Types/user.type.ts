type role = 'User ' | 'Admin'
export interface User {
  address?: string
  date_of_birth?: string
  name?: string
  phone?: string
  avatar?: string
  roles?: role[]
  _id?: string
  email?: string
  password?: string
  new_password?: string
  passwordConfirm?: string
}

export interface Me {
  address?: string
  date_of_birth?: string
  name?: string
  phone?: string
  avatar?: string
  roles?: role[]
  _id?: string
  email?: string
  password?: string
  new_password?: string
  passwordConfirm?: string
}
