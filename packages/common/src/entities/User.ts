import type { FieldValue } from 'firebase/firestore'
import type { Uid } from './Auth'

export type UserId = Uid

export const userCollection = 'users'

export type User = {
  userId: UserId
  createdAt: Date
  displayName: string
  email: string
  profileImageUrl: string
  updatedAt: Date
  username: string
}

export type CreateUserDto = Omit<User, 'userId' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateUserDto = {
  displayName?: User['displayName']
  profileImageUrl?: User['profileImageUrl']
  username?: User['username']
  updatedAt: FieldValue
}
