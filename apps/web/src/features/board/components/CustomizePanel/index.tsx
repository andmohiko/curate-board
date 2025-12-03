/**
 * ボードのカスタマイズパネルコンポーネント
 *
 * このコンポーネントは、ボードの背景色、文字色、背景画像をカスタマイズするためのUIを提供します。
 *
 * 主な機能:
 * - プリセットカラーの選択
 * - カスタムカラーの設定（背景色・文字色）
 * - 背景画像URLの設定
 * - リアルタイムプレビュー
 *
 * @module CustomizePanel
 */

import { IoColorPaletteSharp, IoImageOutline } from 'react-icons/io5'
import { BackgroundImageInput } from '~/components/Inputs/BackgroundImageInput'
import { ColorInput } from '~/components/Inputs/ColorInput'
import { HeadingText } from '~/components/Typography/HeadingText'
import { BoardCell } from '~/features/board/components/BoardCell'
import type { BoardItem } from '~/features/board/types'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import styles from './style.module.css'

type CustomizePanelProps = {
  /**
   * 現在のボードの背景色
   */
  styleBackgroundColor: string
  /**
   * 現在のボードの文字色
   */
  styleTextColor: string
  /**
   * 現在のボードの背景画像URL
   */
  backgroundImageUrl?: string
  /**
   * カスタマイズ変更時のコールバック関数
   * @param updates - 更新するプロパティの部分オブジェクト
   */
  onCustomize: (updates: {
    styleBackgroundColor?: string
    styleTextColor?: string
    backgroundImageUrl?: string
  }) => void
}

/**
 * ボードのカスタマイズパネルコンポーネント
 *
 * @param props - コンポーネントのプロパティ
 * @returns カスタマイズパネルのJSX要素
 */
export const CustomizePanel = ({
  styleBackgroundColor,
  styleTextColor,
  backgroundImageUrl,
  onCustomize,
}: CustomizePanelProps): React.ReactElement => {
  const { uid } = useFirebaseAuthContext()

  /**
   * プレビュー用のサンプルデータ
   */
  const previewItems: BoardItem[] = [
    { label: 'サンプル1', value: 'SUPERCAR' },
    { label: 'サンプル2', value: '19' },
    { label: 'サンプル3', value: '平葵' },
    { label: 'サンプル4', value: 'ハレトキドキ' },
    { label: 'サンプル5', value: 'capsule' },
    { label: 'サンプル6', value: 'Awesome City Club' },
  ]

  return (
    <div className={styles.customizePanel}>
      <p className={styles.header}>
        ボードの背景色や文字色を自由に変更できます
      </p>

      {/* カスタムカラー */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <IoColorPaletteSharp className={styles.icon} />
            <HeadingText size="sm">カスタムカラー</HeadingText>
          </div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.customColorGrid}>
            <ColorInput
              label="背景色"
              id="bgColor"
              value={styleBackgroundColor}
              onChange={(value) => onCustomize({ styleBackgroundColor: value })}
            />
            <ColorInput
              label="文字色"
              id="textColor"
              value={styleTextColor}
              onChange={(value) => onCustomize({ styleTextColor: value })}
            />
          </div>
        </div>
      </div>

      {/* 背景画像 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <IoImageOutline className={styles.icon} />
            <HeadingText size="sm">背景画像</HeadingText>
          </div>
        </div>
        <div className={styles.cardContent}>
          <BackgroundImageInput
            label=""
            value={backgroundImageUrl}
            onChange={(value) => onCustomize({ backgroundImageUrl: value })}
            storagePath={`images/${uid}`}
            error={undefined}
          />
        </div>
      </div>

      {/* プレビュー */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <HeadingText size="sm">プレビュー</HeadingText>
        </div>
        <div className={styles.cardContent}>
          <div
            className={styles.preview}
            style={{
              backgroundColor: styleBackgroundColor,
              backgroundImage: backgroundImageUrl
                ? `url(${backgroundImageUrl})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {previewItems.map((item, index) => (
              <BoardCell
                key={index.toString()}
                item={item}
                textColor={styleTextColor}
                onValueChange={() => {
                  // プレビューでは編集不可のため、何もしない
                }}
                onLabelChange={() => {
                  // プレビューでは編集不可のため、何もしない
                }}
                readOnly={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
