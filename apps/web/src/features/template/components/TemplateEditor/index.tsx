import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { EditHeader } from '~/features/template/components/EditHeader'
import { TemplateGrid } from '~/features/template/components/TemplateGrid'
import { useCreateTemplateMutation } from '~/features/template/hooks/useCreateTemplateMutation'
import type { CreateTemplateInputType } from '~/features/template/types'
import { createTemplateSchema } from '~/features/template/types'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import styles from './style.module.css'

type Props = {
  onBack?: () => void
}

/**
 * テンプレート編集コンポーネント
 *
 * @param onBack - 戻るボタンをクリックしたときのハンドラ
 */
export const TemplateEditor = ({ onBack }: Props) => {
  const { showErrorToast } = useToast()
  const [createTemplate] = useCreateTemplateMutation()
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTemplateInputType>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      itemLabels: Array.from({ length: 18 }, () => ''),
      title: '',
    },
    mode: 'all',
  })

  const itemLabels = watch('itemLabels')

  /**
   * フォーム送信時のハンドラ
   *
   * @param data - テンプレート作成データ
   */
  const onSubmit = async (data: CreateTemplateInputType) => {
    try {
      await createTemplate(data)
      // 成功時はトーストで通知（useCreateTemplateMutation内で表示）
      // 必要に応じてページ遷移を追加
    } catch (e) {
      showErrorToast('テンプレートの作成に失敗しました', errorMessage(e))
    }
  }

  /**
   * BoardItem形式に変換（TemplateGridで使用するため）
   */
  const items = itemLabels.map((label) => ({
    label,
    value: '',
  }))

  return (
    <>
      <EditHeader
        title="テンプレート作成"
        onSave={handleSubmit(onSubmit)}
        onBack={onBack}
      />
      <div className={styles.templateEditor}>
        <Controller
          control={control}
          name="itemLabels"
          render={({ field }) => (
            <Controller
              control={control}
              name="title"
              render={({ field: titleField }) => (
                <TemplateGrid
                  items={items}
                  styleBackgroundColor="#ffffff"
                  styleTextColor="#323232"
                  title={titleField.value}
                  onTitleChange={(value) => titleField.onChange(value)}
                  onLabelChange={(index, label) => {
                    const newLabels = [...field.value]
                    newLabels[index] = label
                    field.onChange(newLabels)
                  }}
                  errorTitle={errors.title?.message}
                />
              )}
            />
          )}
        />
        {errors.itemLabels && (
          <div className={styles.errorMessage}>{errors.itemLabels.message}</div>
        )}
      </div>
    </>
  )
}
