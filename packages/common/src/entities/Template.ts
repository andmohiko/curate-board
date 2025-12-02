import type { FieldValue } from 'firebase/firestore'
import type { UserId } from './User'

/**
 * テンプレートのドメインモデル
 *
 * @remarks
 * Firestoreのtemplatesコレクションから取得したデータをアプリケーション内で取り回す際に使用する型定義。
 * Timestamp型はDate型に変換されている。
 */
export const templateCollection = 'templates'

/**
 * テンプレートIDの型定義
 */
export type TemplateId = string

/**
 * テンプレートタイプ
 * 公式テンプレートまたはカスタムテンプレートを表す
 */
export type TemplateType = 'official' | 'custom'

/**
 * テンプレートのドメインモデル
 */
export type Template = {
  templateId: string
  createdAt: Date
  createdBy: UserId | null
  itemLabels: string[]
  type: TemplateType
  updatedAt: Date
}

/**
 * テンプレート作成時のDTO
 * Firestoreのtemplatesコレクションに新規作成する際に使用する型定義
 */
export type CreateTemplateDto = Omit<
  Template,
  'templateId' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

/**
 * テンプレート更新時のDTO
 * Firestoreのtemplatesコレクションを更新する際に使用する型定義
 * updatedAtは必須フィールドとして含める必要がある
 */
export type UpdateTemplateDto = {
  itemLabels?: Template['itemLabels']
  updatedAt: FieldValue
}
