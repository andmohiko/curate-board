import type { Board, BoardId } from '@curate/common'
import { useEffect, useState } from 'react'
import { useToast } from '~/hooks/useToast'
import { fetchBoardByIdOperation } from '~/infrastructure/firestore/BoardOperations'
import { errorMessage } from '~/utils/errorMessage'

/**
 * 指定されたボードIDのボードを取得するカスタムフック
 *
 * @param boardId - 取得するボードのID
 * @returns [ボードデータ, エラーメッセージ, ローディング状態]
 */
export const useBoard = (
  boardId: BoardId | null,
): [Board | null | undefined, string | null, boolean] => {
  const { showErrorToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [board, setBoard] = useState<Board | null | undefined>(undefined)

  useEffect(() => {
    if (!boardId) {
      return
    }

    const fetchBoard = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const fetchedBoard = await fetchBoardByIdOperation(boardId)
        setBoard(fetchedBoard)
      } catch (e) {
        const errorMsg = errorMessage(e)
        setError(errorMsg)
        showErrorToast('ボードの取得に失敗しました', '再度お試しください')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBoard()
  }, [boardId, showErrorToast])

  return [board, error, isLoading]
}
