import type { Template } from '@curate/common'
import { useEffect, useState } from 'react'
import { useToast } from '~/hooks/useToast'
import { fetchOfficialTemplatesOperation } from '~/infrastructure/firestore/TemplateOperations'
import { errorMessage } from '~/utils/errorMessage'

/**
 * 公式テンプレート一覧を取得するカスタムフック
 *
 * @returns [テンプレート一覧, エラーメッセージ, ローディング状態]
 */
export const useTemplates = (): [Template[], string | null, boolean] => {
  const { showErrorToast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [templates, setTemplates] = useState<Template[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const fetchedTemplates = await fetchOfficialTemplatesOperation()
        setTemplates(fetchedTemplates)
      } catch (e) {
        const errorMsg = errorMessage(e)
        setError(errorMsg)
        showErrorToast('テンプレートの取得に失敗しました', '再度お試しください')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [showErrorToast])

  return [templates, error, isLoading]
}
