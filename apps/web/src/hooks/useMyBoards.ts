import type { Board } from '@curate/common'
import { useEffect, useState } from 'react'
import { useToast } from '~/hooks/useToast'
import { subscribeBoardsByUserIdOperation } from '~/infrastructure/firestore/BoardOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { errorMessage } from '~/utils/errorMessage'

/**
 * 現在ログインしているユーザーのボード一覧を取得するカスタムフック
 *
 * @returns [ボード一覧, エラーメッセージ, ローディング状態]
 */
export const useMyBoards = (): [Board[], string | null, boolean] => {
  const { uid } = useFirebaseAuthContext()
  const { showErrorToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [myBoards, setMyBoards] = useState<Board[]>([])

  useEffect(() => {
    if (!uid) {
      return
    }

    setIsLoading(true)
    try {
      const unsubscribe = subscribeBoardsByUserIdOperation(uid, setMyBoards)
      return () => unsubscribe()
    } catch (e) {
      setError(errorMessage(e))
      showErrorToast('ボードの取得に失敗しました', '再度お試しください')
    } finally {
      setIsLoading(false)
    }
  }, [showErrorToast, uid])

  return [myBoards, error, isLoading]
}
