import type { BoardId, UpdateBoardDto } from '@curate/common'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import type { EditBoardInputType } from '~/features/board/types'
import { useToast } from '~/hooks/useToast'
import { updateBoardOperation } from '~/infrastructure/firestore/BoardOperations'
import { serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

/**
 * ボードを更新するカスタムフック
 *
 * @returns [更新関数, エラーメッセージ, ローディング状態]
 */
export const useUpdateBoardMutation = (): [
  (boardId: BoardId, data: EditBoardInputType) => Promise<void>,
  string | null,
  boolean,
] => {
  const { showSuccessToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push } = useRouter()

  const updateBoard = useCallback(
    async (boardId: BoardId, data: EditBoardInputType) => {
      setIsLoading(true)
      setError(null)

      try {
        const updateBoardDto: UpdateBoardDto = {
          backgroundImageUrl: data.backgroundImageUrl ?? '',
          items: data.items,
          styleBackgroundColor: data.styleBackgroundColor ?? '#ffffff',
          styleTextColor: data.styleTextColor ?? '#323232',
          title: data.title,
          updatedAt: serverTimestamp,
        }
        await updateBoardOperation(boardId, updateBoardDto)
        showSuccessToast('ボードを更新しました')
        push(`/boards/${boardId}`)
      } catch (e) {
        throw new Error(errorMessage(e))
      } finally {
        setIsLoading(false)
      }
    },
    [showSuccessToast, push],
  )

  return [updateBoard, error, isLoading]
}
