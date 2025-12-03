/**
 * カラー入力コンポーネント
 *
 * このコンポーネントは、カラーピッカーとテキスト入力フィールドを組み合わせた
 * カラー選択UIを提供します。
 *
 * 主な機能:
 * - カラーピッカーによる視覚的な色選択
 * - テキスト入力による直接的な色コード入力
 * - リアルタイムでの値の同期
 *
 * @module ColorInput
 */

import { LabelText } from '~/components/Typography/LabelText'
import styles from './style.module.css'

type ColorInputProps = {
  /**
   * ラベルテキスト
   */
  label: string
  /**
   * 現在の色の値（16進数カラーコード）
   */
  value: string
  /**
   * 値が変更されたときのコールバック関数
   * @param value - 新しい色の値
   */
  onChange: (value: string) => void
  /**
   * input要素のid属性
   */
  id?: string
}

/**
 * カラー入力コンポーネント
 *
 * @param props - コンポーネントのプロパティ
 * @returns カラー入力のJSX要素
 */
export const ColorInput = ({
  label,
  value,
  onChange,
  id,
}: ColorInputProps): React.ReactElement => {
  return (
    <div className={styles.colorInputGroup}>
      <LabelText weight="bold" size="sm">
        {label}
      </LabelText>
      <div className={styles.colorInputRow}>
        <input
          type="color"
          id={id}
          className={styles.colorPicker}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          className={styles.colorTextInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
