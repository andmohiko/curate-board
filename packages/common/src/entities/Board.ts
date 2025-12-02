import type { FieldValue } from 'firebase/firestore'
import type { UserId } from './User'

/**
 * 価値観ボードのドメインモデル
 *
 * @remarks
 * Firestoreのboardsコレクションから取得したデータをアプリケーション内で取り回す際に使用する型定義。
 * Timestamp型はDate型に変換されている。
 */
export const boardCollection = 'boards'

/**
 * ボードアイテムの型定義
 * 各マス目に設定するテーマとその内容を表す
 */
export type BoardItem = {
  label: string
  value: string
}

/**
 * 価値観ボードのドメインモデル
 */
export type Board = {
  boardId: string
  backgroundImageUrl: string
  createdAt: Date
  items: BoardItem[]
  styleBackgroundColor: string
  styleTextColor: string
  title: string
  updatedAt: Date
  userId: UserId
}

/**
 * 価値観ボード作成時のDTO
 * Firestoreのboardsコレクションに新規作成する際に使用する型定義
 */
export type CreateBoardDto = Omit<
  Board,
  'boardId' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

/**
 * 価値観ボード更新時のDTO
 * Firestoreのboardsコレクションを更新する際に使用する型定義
 * updatedAtは必須フィールドとして含める必要がある
 */
export type UpdateBoardDto = {
  backgroundImageUrl?: Board['backgroundImageUrl']
  items?: Board['items']
  styleBackgroundColor?: Board['styleBackgroundColor']
  styleTextColor?: Board['styleTextColor']
  title?: Board['title']
  updatedAt: FieldValue
}
