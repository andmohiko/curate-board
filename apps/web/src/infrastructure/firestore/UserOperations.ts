import type { CreateUserDto, UpdateUserDto, User } from '@curate/common'
import { type Uid, userCollection } from '@curate/common'
import type { Unsubscribe } from 'firebase/firestore'
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt'] as const satisfies Array<string>

export const subscribeUserOperation = (
  userId: string,
  setter: (user: User | null | undefined) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    doc(db, userCollection, userId),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) {
        setter(null)
        return
      }
      const user = {
        userId: snapshot.id,
        ...convertDate(data, dateColumns),
      } as User
      setter(user)
      return
    },
  )
  return unsubscribe
}

export const createUserOperation = async (
  userId: Uid,
  dto: CreateUserDto,
): Promise<void> => {
  await setDoc(doc(db, userCollection, userId), dto)
}

export const updateUserOperation = async (
  userId: string,
  dto: UpdateUserDto,
): Promise<void> => {
  await updateDoc(doc(db, userCollection, userId), dto)
}

export const isExistsUserOperation = async (
  userId: string,
): Promise<boolean> => {
  const docSnap = await getDoc(doc(db, userCollection, userId))
  return docSnap.exists()
}

/**
 * ユーザーIDでユーザー情報を取得するoperation関数
 *
 * @param userId - 取得するユーザーのID
 * @returns ユーザーデータ、存在しない場合はnull
 */
export const fetchUserByIdOperation = async (
  userId: string,
): Promise<User | null> => {
  const docSnap = await getDoc(doc(db, userCollection, userId))
  if (!docSnap.exists()) {
    return null
  }
  const data = docSnap.data()
  const user = {
    userId: docSnap.id,
    ...convertDate(data, dateColumns),
  } as User
  return user
}
