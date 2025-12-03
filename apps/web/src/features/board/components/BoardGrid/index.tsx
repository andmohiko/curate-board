import { BoardCell } from '~/features/board/components/BoardCell'
import type { BoardItem } from '~/features/board/types'
import styles from './style.module.css'

type Props = {
  items: BoardItem[]
  styleBackgroundColor: string
  styleTextColor: string
  backgroundImageUrl?: string
  onItemChange?: (index: number, value: string) => void
  onLabelChange?: (index: number, label: string) => void
  readOnly?: boolean
}

export const BoardGrid = ({
  items,
  styleBackgroundColor,
  styleTextColor,
  backgroundImageUrl,
  onItemChange,
  onLabelChange,
  readOnly = false,
}: Props): React.ReactNode => {
  return (
    <div
      className={styles.boardGrid}
      style={{
        backgroundColor: styleBackgroundColor,
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {backgroundImageUrl && <div className={styles.overlay} />}
      <div className={styles.grid}>
        {items.map((item, index) => (
          <BoardCell
            key={index.toString()}
            item={item}
            textColor={styleTextColor}
            onValueChange={(value) => onItemChange?.(index, value)}
            onLabelChange={(label) => onLabelChange?.(index, label)}
            readOnly={readOnly}
          />
        ))}
      </div>
    </div>
  )
}
