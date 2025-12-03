import type { CreateBoardDto } from '@curate/common'
import { useCallback, useState } from 'react'
import type { EditBoardInputType } from '~/features/board/types'
import { useToast } from '~/hooks/useToast'
import { createBoardOperation } from '~/infrastructure/firestore/BoardOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { errorMessage } from '~/utils/errorMessage'

/**
 * ボードを作成するカスタムフック
 *
 * @returns [作成関数, エラーメッセージ, ローディング状態]
 */
export const useCreateBoardMutation = (): [
  (data: EditBoardInputType) => Promise<void>,
  string | null,
  boolean,
] => {
  const { uid } = useFirebaseAuthContext()
  const { showErrorToast, showSuccessToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const createBoard = useCallback(
    async (data: EditBoardInputType) => {
      if (!uid) {
        showErrorToast('再度ログインしてください')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const createBoardDto: CreateBoardDto = {
          backgroundImageUrl: data.backgroundImageUrl ?? '',
          createdAt: serverTimestamp,
          items: data.items,
          styleBackgroundColor: data.styleBackgroundColor ?? '#ffffff',
          styleTextColor: data.styleTextColor ?? '#323232',
          title: data.title,
          updatedAt: serverTimestamp,
          userId: uid,
        }
        await createBoardOperation(createBoardDto)
        showSuccessToast('ボードを作成しました')
      } catch (e) {
        throw new Error(errorMessage(e))
      } finally {
        setIsLoading(false)
      }
    },
    [uid, showErrorToast, showSuccessToast],
  )

  return [createBoard, error, isLoading]
}
