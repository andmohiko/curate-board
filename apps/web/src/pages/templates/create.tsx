import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { TemplateEditor } from '~/features/template/components/TemplateEditor'

/**
 * テンプレート作成ページ
 */
const CreateTemplatePage: NextPage = () => {
  const { push } = useRouter()

  /**
   * 戻るボタンをクリックしたときのハンドラ
   */
  const handleBack = () => {
    push('/create')
  }

  return (
    <SimpleLayout>
      <TemplateEditor onBack={handleBack} />
    </SimpleLayout>
  )
}

export default CreateTemplatePage
