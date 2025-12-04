/**
 * テンプレート選択コンポーネント
 *
 * @remarks
 * 公式テンプレート一覧を表示し、選択できるコンポーネント。
 * テンプレートを選択すると、itemLabelsをBoardItem[]に変換してonSelectを呼び出す。
 */
import type { Template } from '@curate/common'
import { BsGrid } from 'react-icons/bs'

import { useTemplates } from '~/hooks/useTemplates'
import type { BoardItem } from '../../types'
import { EditHeader } from '../EditHeader'
import styles from './style.module.css'

type Props = {
  /**
   * 戻るボタンをクリックしたときのハンドラ
   */
  onBack: () => void
  /**
   * テンプレートが選択されたときのハンドラ
   *
   * @param items - 選択されたテンプレートのアイテム配列
   */
  onSelect: (items: BoardItem[]) => void
}

/**
 * テンプレートのitemLabelsをBoardItem[]に変換する
 *
 * @param template - 変換するテンプレート
 * @returns BoardItem[]に変換されたアイテム配列
 */
const convertTemplateToBoardItems = (template: Template): BoardItem[] => {
  return template.itemLabels.map((label) => ({
    label,
    value: '',
  }))
}

export const TemplateSelector = ({ onBack, onSelect }: Props) => {
  const [templates, , isLoadingTemplates] = useTemplates()

  /**
   * テンプレートを選択したときのハンドラ
   *
   * @param template - 選択されたテンプレート
   */
  const handleTemplateSelect = (template: Template) => {
    const items = convertTemplateToBoardItems(template)
    onSelect(items)
  }

  return (
    <div className={styles.container}>
      <EditHeader title="テンプレート選択" onBack={onBack} />
      <div className={styles.content}>
        {isLoadingTemplates ? (
          <div className={styles.loading}>読み込み中...</div>
        ) : templates.length === 0 ? (
          <div className={styles.empty}>テンプレートがありません</div>
        ) : (
          <div className={styles.templateList}>
            {templates.map((template) => (
              <button
                key={template.templateId}
                onClick={() => handleTemplateSelect(template)}
                className={styles.templateCard}
                type="button"
              >
                <div className={styles.templateContent}>
                  <div className={styles.templateIcon}>
                    <BsGrid className={styles.icon} />
                  </div>
                  <div className={styles.templateInfo}>
                    <h3 className={styles.templateTitle}>
                      {template.title || 'テンプレート'}
                    </h3>
                    <p className={styles.templateDescription}>
                      {template.itemLabels.length}個のテーマ
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
