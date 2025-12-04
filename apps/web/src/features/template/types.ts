import { z } from 'zod'

/**
 * ボードアイテムの型定義
 */
export type BoardItem = {
  label: string
  value: string
  imageUrl?: string
}

/**
 * テンプレート作成時の入力スキーマ
 * 21個のテーマ名（itemLabels）とタイトルを必須とする
 */
export const createTemplateSchema = z.object({
  itemLabels: z
    .array(z.string())
    .length(21, { message: 'テーマ名は21個必要です' })
    .refine((labels) => labels.every((label) => label.trim().length > 0), {
      message: 'すべてのテーマ名を入力してください',
    }),
  title: z.string().min(1, { message: 'タイトルは必須項目です' }),
  type: z.enum(['official', 'custom']).optional(),
})

/**
 * テンプレート作成時の入力型
 */
export type CreateTemplateInputType = z.infer<typeof createTemplateSchema>
