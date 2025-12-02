import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import type { BoardItem } from '~/features/board/types'
import styles from './style.module.css'

type Props = {
  item: BoardItem
  textColor: string
  onValueChange: (value: string) => void
  onLabelChange: (label: string) => void
  readOnly?: boolean
}

export const BoardCell = ({
  item,
  textColor,
  onValueChange,
  onLabelChange,
  readOnly = false,
}: Props): React.ReactNode => {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingLabel, setIsEditingLabel] = useState(false)
  const cellRef = useRef<HTMLDivElement>(null)

  /**
   * コンポーネント外をクリックしたときに編集モードを終了する
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsEditing(false)
        setIsEditingLabel(false)
      }
    }

    if (isEditing || isEditingLabel) {
      // 編集モードの時だけイベントリスナーを追加
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, isEditingLabel])

  return (
    <div
      ref={cellRef}
      className={classNames(styles.boardCell, {
        [styles.editing]: isEditing || isEditingLabel,
      })}
    >
      <button
        className={styles.label}
        style={{
          color:
            isEditing || isEditingLabel ? 'var(--color-text-black)' : textColor,
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
            className={styles.labelInput}
            type="text"
            value={item.label}
            onChange={(e) => onLabelChange(e.target.value)}
          />
        ) : (
          <span
            className={styles.labelDisplay}
            style={{
              color:
                isEditing || isEditingLabel
                  ? 'var(--color-text-black)'
                  : textColor,
            }}
          >
            {item.label}
          </span>
        )}
      </button>
      <button
        className={styles.value}
        style={{
          color:
            isEditing || isEditingLabel ? 'var(--color-text-black)' : textColor,
        }}
        type="button"
        onClick={(e) => {
          if (readOnly) return
          e.stopPropagation()
          setIsEditing(true)
        }}
        disabled={readOnly}
      >
        {isEditing ? (
          <input
            className={styles.valueInput}
            type="text"
            value={item.value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        ) : (
          <span
            className={classNames(styles.valueDisplay, {
              [styles.valueDisplayLong]: item.value.length > 13,
            })}
            style={{
              color:
                isEditing || isEditingLabel
                  ? 'var(--color-text-black)'
                  : textColor,
            }}
          >
            {item.value.length > 0 || readOnly ? (
              item.value
            ) : (
              <MdOutlineModeEditOutline size={20} color={textColor} />
            )}
          </span>
        )}
      </button>
    </div>
  )
}
