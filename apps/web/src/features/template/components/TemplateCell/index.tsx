import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import type { BoardItem } from '~/features/template/types'
import styles from './style.module.css'

type Props = {
  item: BoardItem
  textColor: string
  onLabelChange: (label: string) => void
  readOnly?: boolean
}

export const TemplateCell = ({
  item,
  textColor,
  onLabelChange,
  readOnly = false,
}: Props): React.ReactNode => {
  const [isEditingLabel, setIsEditingLabel] = useState(false)
  const cellRef = useRef<HTMLDivElement>(null)
  const labelInputRef = useRef<HTMLInputElement>(null)

  /**
   * コンポーネント外をクリックしたときに編集モードを終了する
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsEditingLabel(false)
      }
    }

    if (isEditingLabel) {
      // 編集モードの時だけイベントリスナーを追加
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditingLabel])

  /**
   * 編集モードになったときにinputにフォーカスを設定する
   */
  useEffect(() => {
    if (isEditingLabel && labelInputRef.current) {
      labelInputRef.current.focus()
    }
  }, [isEditingLabel])

  return (
    <div
      ref={cellRef}
      className={classNames(styles.boardCell, {
        [styles.editing]: isEditingLabel,
      })}
    >
      <button
        className={styles.label}
        style={{
          color: isEditingLabel ? 'var(--color-text-black)' : textColor,
        }}
        type="button"
        onClick={(e) => {
          if (readOnly) return
          e.stopPropagation()
          setIsEditingLabel(true)
        }}
        disabled={readOnly}
      >
        {isEditingLabel ? (
          <input
            ref={labelInputRef}
            className={styles.labelInput}
            type="text"
            value={item.label}
            onChange={(e) => onLabelChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditingLabel(false)
              }
            }}
          />
        ) : (
          <span
            className={styles.labelDisplay}
            style={{
              color: isEditingLabel ? 'var(--color-text-black)' : textColor,
            }}
          >
            {item.label.length > 0 || readOnly ? (
              item.label
            ) : (
              <MdOutlineModeEditOutline size={16} color={textColor} />
            )}
          </span>
        )}
      </button>
      <div
        className={styles.value}
        style={{
          color: textColor,
        }}
      >
        <span
          className={styles.valueDisplay}
          style={{
            color: textColor,
          }}
        >
          サンプル
        </span>
      </div>
    </div>
  )
}
