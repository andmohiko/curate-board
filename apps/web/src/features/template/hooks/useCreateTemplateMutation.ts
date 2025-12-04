import type { CreateTemplateDto } from '@curate/common'
import { useCallback, useState } from 'react'
import type { CreateTemplateInputType } from '~/features/template/types'
import { useToast } from '~/hooks/useToast'
import { createTemplateOperation } from '~/infrastructure/firestore/TemplateOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { errorMessage } from '~/utils/errorMessage'

/**
 * テンプレートを作成するカスタムフック
 *
 * @returns [作成関数, エラーメッセージ, ローディング状態]
 */
export const useCreateTemplateMutation = (): [
  (data: CreateTemplateInputType) => Promise<void>,
  string | null,
  boolean,
] => {
  const { uid } = useFirebaseAuthContext()
  const { showErrorToast, showSuccessToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const createTemplate = useCallback(
    async (data: CreateTemplateInputType) => {
      setIsLoading(true)
      setError(null)

      try {
        const createTemplateDto: CreateTemplateDto = {
          createdBy: uid ?? null,
          createdAt: serverTimestamp,
          itemLabels: data.itemLabels,
          title: data.title,
          type: data.type ?? 'custom',
          updatedAt: serverTimestamp,
        }
        await createTemplateOperation(createTemplateDto)
        showSuccessToast('テンプレートを作成しました')
      } catch (e) {
        const errorMsg = errorMessage(e)
        setError(errorMsg)
        showErrorToast('テンプレートの作成に失敗しました', errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [uid, showErrorToast, showSuccessToast],
  )

  return [createTemplate, error, isLoading]
}
