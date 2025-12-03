import type { BoardId } from '@curate/common'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useToast } from '~/hooks/useToast'
import { deleteBoardOperation } from '~/infrastructure/firestore/BoardOperations'
import { errorMessage } from '~/utils/errorMessage'

/**
 * ボードを削除するカスタムフック
 *
 * @returns [削除関数, エラーメッセージ, ローディング状態]
 */
export const useDeleteBoardMutation = (): [
  (boardId: BoardId) => Promise<void>,
  string | null,
  boolean,
] => {
  const { showErrorToast, showSuccessToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push } = useRouter()

  const deleteBoard = useCallback(
    async (boardId: BoardId) => {
      setIsLoading(true)
      setError(null)

      try {
        await deleteBoardOperation(boardId)
        showSuccessToast('ボードを削除しました')
        push('/boards')
      } catch (e) {
        const errorMsg = errorMessage(e)
        setError(errorMsg)
        showErrorToast('ボードの削除に失敗しました', '再度お試しください')
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [showErrorToast, showSuccessToast, push],
  )

  return [deleteBoard, error, isLoading]
}
