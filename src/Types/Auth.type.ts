import { Generality } from './Generality.type'
import { User } from './user.type'

export type Auth = Generality<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
