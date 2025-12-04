import { FlexBox } from '~/components/Base/FlexBox'
import { ParagraphText } from '~/components/Typography/ParagraphText'
import { BoardCell } from '~/features/board/components/BoardCell'
import type { BoardItem } from '~/features/board/types'
import styles from './style.module.css'

type Props = {
  items: BoardItem[]
  styleBackgroundColor: string
  styleTextColor: string
  backgroundImageUrl?: string
  title?: string
  onTitleChange?: (title: string) => void
  onItemChange?: (index: number, value: string) => void
  onLabelChange?: (index: number, label: string) => void
  readOnly?: boolean
  errorTitle?: string
}

export const BoardGrid = ({
  items,
  styleBackgroundColor,
  styleTextColor,
  backgroundImageUrl,
  title,
  onTitleChange,
  onItemChange,
  onLabelChange,
  readOnly = false,
  errorTitle,
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
      {title !== undefined && (
        <div className={styles.titleContainer}>
          {readOnly ? (
            <h2 className={styles.title} style={{ color: styleTextColor }}>
              {title || ''}
            </h2>
          ) : (
            <FlexBox>
              <input
                type="text"
                className={styles.titleInput}
                value={title || ''}
                onChange={(e) => onTitleChange?.(e.target.value)}
                placeholder="タイトルを入力"
                style={{ color: styleTextColor }}
              />
              {errorTitle && (
                <ParagraphText size="xs" color="red">
                  {errorTitle}
                </ParagraphText>
              )}
            </FlexBox>
          )}
        </div>
      )}
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
