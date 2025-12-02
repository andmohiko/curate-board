import classNames from 'classnames'
import { useState } from 'react'
import type { BoardItem } from '~/features/board/types'
import styles from './style.module.css'

type Props = {
  item: BoardItem
  textColor: string
  onValueChange: (value: string) => void
  onLabelChange: (label: string) => void
}

export const BoardCell = ({
  item,
  textColor,
  onValueChange,
  onLabelChange,
}: Props): React.ReactNode => {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingLabel, setIsEditingLabel] = useState(false)

  return (
    <div className={styles.boardCell}>
      <button
        className={styles.label}
        style={{ color: textColor }}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsEditingLabel(true)
        }}
      >
        {isEditingLabel ? (
          <input
            type="text"
            value={item.label}
            onChange={(e) => onLabelChange(e.target.value)}
          />
        ) : (
          <span className={styles.labelDisplay} style={{ color: textColor }}>
            {item.label}
          </span>
        )}
      </button>
      <button
        className={styles.value}
        style={{ color: textColor }}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsEditing(true)
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={item.value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        ) : (
          <span
            className={classNames(styles.valueDisplay, {
              [styles.valueDisplayLong]: item.value.length > 7,
            })}
            style={{ color: textColor }}
          >
            {item.value}
          </span>
        )}
      </button>
    </div>
  )
}
