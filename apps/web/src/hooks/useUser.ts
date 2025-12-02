import type { User } from '@curate/common'
import { useEffect, useState } from 'react'
import { useToast } from '~/hooks/useToast'
import { fetchUserByIdOperation } from '~/infrastructure/firestore/UserOperations'
import { errorMessage } from '~/utils/errorMessage'

/**
 * 指定されたユーザーIDのユーザー情報を取得するカスタムフック
 *
 * @param userId - 取得するユーザーのID
 * @returns [ユーザーデータ, エラーメッセージ, ローディング状態]
 */
export const useUser = (
  userId: string | null,
): [User | null | undefined, string | null, boolean] => {
  const { showErrorToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    if (!userId) {
      return
    }

    const fetchUser = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const fetchedUser = await fetchUserByIdOperation(userId)
        setUser(fetchedUser)
      } catch (e) {
        const errorMsg = errorMessage(e)
        setError(errorMsg)
        showErrorToast('ユーザー情報の取得に失敗しました', '再度お試しください')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId, showErrorToast])

  return [user, error, isLoading]
}
