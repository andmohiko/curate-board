/**
 * 作成モード選択コンポーネント
 *
 * @remarks
 * ボード作成時に「はじめからつくる」または「テンプレートから選ぶ」を選択する画面。
 */

import type { ReactNode } from 'react'
import { BsGrid } from 'react-icons/bs'
import { HiPlus } from 'react-icons/hi'
import { HeadingText } from '~/components/Typography/HeadingText'
import { ParagraphText } from '~/components/Typography/ParagraphText'
import { EditHeader } from '../EditHeader'
import styles from './style.module.css'

type Props = {
  /**
   * テンプレートから選ぶボタンをクリックしたときのハンドラ
   */
  onSelectTemplate: () => void
  /**
   * はじめからつくるボタンをクリックしたときのハンドラ
   */
  onCreateCustom: () => void
}

export const CreateModeSelector = ({
  onSelectTemplate,
  onCreateCustom,
}: Props) => {
  return (
    <div className={styles.container}>
      <EditHeader title="新しいボードを作成" />
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.description}>作成方法を選んでください</p>
        </div>

        <div className={styles.options}>
          <OptionButton
            icon={<HiPlus className={styles.icon} />}
            title="はじめからつくる"
            description="すべてのマスを自由に設定できます"
            onClick={onCreateCustom}
          />

          <OptionButton
            icon={<BsGrid className={styles.icon} />}
            title="テンプレートから選ぶ"
            description="用意されたテーマで簡単に始められます"
            onClick={onSelectTemplate}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * オプションボタンコンポーネント
 *
 * @remarks
 * 作成モード選択画面で使用するボタンコンポーネント。
 */
type OptionButtonProps = {
  /**
   * アイコン
   */
  icon: ReactNode
  /**
   * タイトル
   */
  title: string
  /**
   * 説明文
   */
  description: string
  /**
   * クリック時のハンドラ
   */
  onClick: () => void
}

const OptionButton = ({
  icon,
  title,
  description,
  onClick,
}: OptionButtonProps) => {
  return (
    <button onClick={onClick} className={styles.optionButton} type="button">
      <div className={styles.optionContent}>
        <div className={styles.optionIcon}>{icon}</div>
        <div className={styles.optionText}>
          <HeadingText size="sm">{title}</HeadingText>
          <ParagraphText size="sm" color="gray">
            {description}
          </ParagraphText>
        </div>
      </div>
    </button>
  )
}
