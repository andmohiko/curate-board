import type {
  Board,
  BoardId,
  CreateBoardDto,
  UpdateBoardDto,
} from '@curate/common'
import { boardCollection } from '@curate/common'
import type { Unsubscribe } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt'] as const satisfies Array<string>

/**
 * ボードをリアルタイムで購読するoperation関数
 *
 * @param boardId - 購読するボードのID
 * @param setter - ボードデータを受け取るコールバック関数
 * @returns 購読を解除する関数
 */
export const subscribeBoardOperation = (
  boardId: BoardId,
  setter: (board: Board | null | undefined) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    doc(db, boardCollection, boardId),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) {
        setter(null)
        return
      }
      const board = {
        boardId: snapshot.id,
        ...convertDate(data, dateColumns),
      } as Board
      setter(board)
      return
    },
  )
  return unsubscribe
}

/**
 * ボードを取得するoperation関数
 *
 * @param boardId - 取得するボードのID
 * @returns ボードデータ、存在しない場合はnull
 */
export const fetchBoardByIdOperation = async (
  boardId: BoardId,
): Promise<Board | null> => {
  const docSnap = await getDoc(doc(db, boardCollection, boardId))
  if (!docSnap.exists()) {
    return null
  }
  const data = docSnap.data()
  const board = {
    boardId: docSnap.id,
    ...convertDate(data, dateColumns),
  } as Board
  return board
}

/**
 * ユーザーIDでボード一覧を取得するoperation関数
 *
 * @param userId - 取得するボードのユーザーID
 * @returns ボード一覧
 */
export const fetchBoardsByUserIdOperation = async (
  userId: string,
): Promise<Board[]> => {
  const q = query(
    collection(db, boardCollection),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc'),
  )
  const querySnapshot = await getDocs(q)
  const boards: Board[] = []
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data()
    const board = {
      boardId: docSnap.id,
      ...convertDate(data, dateColumns),
    } as Board
    boards.push(board)
  })
  return boards
}

/**
 * ユーザーIDでボード一覧をリアルタイムで購読するoperation関数
 *
 * @param userId - 購読するボードのユーザーID
 * @param setter - ボード一覧を受け取るコールバック関数
 * @returns 購読を解除する関数
 */
export const subscribeBoardsByUserIdOperation = (
  userId: string,
  setter: (boards: Board[]) => void,
): Unsubscribe => {
  const q = query(
    collection(db, boardCollection),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc'),
  )
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const boards: Board[] = []
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data()
      const board = {
        boardId: docSnap.id,
        ...convertDate(data, dateColumns),
      } as Board
      boards.push(board)
    })
    setter(boards)
  })
  return unsubscribe
}

/**
 * ボードを作成するoperation関数
 *
 * @param dto - 作成するボードのDTO
 */
export const createBoardOperation = async (
  dto: CreateBoardDto,
): Promise<BoardId> => {
  const docRef = await addDoc(collection(db, boardCollection), dto)
  return docRef.id as BoardId
}

/**
 * ボードを更新するoperation関数
 *
 * @param boardId - 更新するボードのID
 * @param dto - 更新するボードのDTO（updatedAtは必須）
 */
export const updateBoardOperation = async (
  boardId: BoardId,
  dto: UpdateBoardDto,
): Promise<void> => {
  await updateDoc(doc(db, boardCollection, boardId), dto)
}

/**
 * ボードを削除するoperation関数
 *
 * @param boardId - 削除するボードのID
 */
export const deleteBoardOperation = async (boardId: BoardId): Promise<void> => {
  await deleteDoc(doc(db, boardCollection, boardId))
}
