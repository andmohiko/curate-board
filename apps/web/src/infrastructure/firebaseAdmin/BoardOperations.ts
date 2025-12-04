import type { Board, BoardId } from '@curate/common'
import { boardCollection } from '@curate/common'

import { db } from '~/lib/admin'
import { convertDateForAdmin } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt'] as const satisfies Array<string>

export const fetchBoardByIdOperation = async (
  boardId: BoardId,
): Promise<Board | null> => {
  const snapshot = await db.collection(boardCollection).doc(boardId).get()
  if (!snapshot.exists) {
    return null
  }
  const data = snapshot.data()
  if (!data) {
    return null
  }
  return {
    ...convertDateForAdmin(data, dateColumns),
  } as Board
}
