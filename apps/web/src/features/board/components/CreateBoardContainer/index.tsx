/**
 * ボード作成コンテナコンポーネント
 *
 * @remarks
 * ボード作成時の選択画面、テンプレート選択画面、編集画面を管理するコンテナコンポーネント。
 * 画面遷移を挟まず、同じページでreactコンポーネントを切り替える。
 */
import { useState } from 'react'
import { BoardEditor } from '~/features/board/components/BoardEditor'
import type { BoardItem } from '~/features/board/types'
import { CreateModeSelector } from '../CreateModeSelector'
import { TemplateSelector } from '../TemplateSelector'

/**
 * 作成モードの型定義
 */
type CreateMode = 'select' | 'template' | 'custom'

/**
 * 空のテンプレート（21個の空のアイテム）
 */
const emptyTemplate: BoardItem[] = Array.from({ length: 21 }, () => ({
  label: '',
  value: '',
}))

export const CreateBoardContainer = () => {
  const [createMode, setCreateMode] = useState<CreateMode>('select')
  const [selectedItems, setSelectedItems] = useState<BoardItem[] | null>(null)

  /**
   * テンプレートから選ぶボタンをクリックしたときのハンドラ
   */
  const handleSelectTemplate = () => {
    setCreateMode('template')
  }

  /**
   * はじめからつくるボタンをクリックしたときのハンドラ
   */
  const handleCreateCustom = () => {
    setSelectedItems(emptyTemplate)
    setCreateMode('custom')
  }

  /**
   * テンプレート選択画面から戻るハンドラ
   */
  const handleBackFromTemplate = () => {
    setCreateMode('select')
  }

  /**
   * テンプレートが選択されたときのハンドラ
   *
   * @param items - 選択されたテンプレートのアイテム配列
   */
  const handleTemplateSelect = (items: BoardItem[]) => {
    setSelectedItems(items)
    setCreateMode('custom')
  }

  /**
   * 編集画面から戻るハンドラ
   */
  const handleBackFromEdit = () => {
    setCreateMode('select')
    setSelectedItems(null)
  }

  // 選択画面
  if (createMode === 'select') {
    return (
      <CreateModeSelector
        onSelectTemplate={handleSelectTemplate}
        onCreateCustom={handleCreateCustom}
      />
    )
  }

  // テンプレート選択画面
  if (createMode === 'template') {
    return (
      <TemplateSelector
        onBack={handleBackFromTemplate}
        onSelect={handleTemplateSelect}
      />
    )
  }

  // 編集画面
  return (
    <BoardEditor defaultItems={selectedItems} onBack={handleBackFromEdit} />
  )
}
