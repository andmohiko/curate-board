import type { UpdateUserDto } from '@curate/common'
import { useCallback, useState } from 'react'
import type { EditProfileInputType } from '~/features/settings/types'
import { useToast } from '~/hooks/useToast'
import { updateUserOperation } from '~/infrastructure/firestore/UserOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { errorMessage } from '~/utils/errorMessage'

/**
 * プロフィールを編集するカスタムフック
 *
 * @returns [編集関数, エラーメッセージ, ローディング状態]
 */
export const useEditProfile = (): [
  (data: EditProfileInputType) => Promise<void>,
  string | null,
  boolean,
] => {
  const { uid } = useFirebaseAuthContext()
  const { showErrorToast, showSuccessToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateProfile = useCallback(
    async (data: EditProfileInputType) => {
      if (!uid) {
        showErrorToast('再度ログインしてください')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const updateUserDto: UpdateUserDto = {
          displayName: data.displayName,
          username: data.username,
          updatedAt: serverTimestamp,
        }

        // profileImageUrlが存在する場合のみ追加
        if (data.profileImageUrl !== undefined) {
          updateUserDto.profileImageUrl = data.profileImageUrl
        }

        await updateUserOperation(uid, updateUserDto)
        showSuccessToast('プロフィールを更新しました')
      } catch (e) {
        const errorMsg = errorMessage(e)
        setError(errorMsg)
        showErrorToast('プロフィールの更新に失敗しました', '再度お試しください')
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [uid, showErrorToast, showSuccessToast],
  )

  return [updateProfile, error, isLoading]
}
