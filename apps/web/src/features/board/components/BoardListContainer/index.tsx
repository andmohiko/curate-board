import type { Board } from '@curate/common'
import dayjs from 'dayjs'
import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import { ProfileCard } from '~/features/board/components/ProfileCard'
import { useMyBoards } from '~/hooks/useMyBoards'
import { useMyUser } from '~/hooks/useMyUser'
import styles from './style.module.css'

/**
 * 新規作成タイルコンポーネント
 */
const NewBoardTile = (): React.ReactNode => {
  return (
    <Link href="/create" className={styles.gridItem}>
      <div className={styles.newBoardCard}>
        <div className={styles.newBoardContent}>
          <div className={styles.newBoardIcon}>
            <HiPlus className={styles.plusIcon} />
          </div>
          <span className={styles.newBoardText}>新規作成</span>
        </div>
      </div>
    </Link>
  )
}

type BoardTileProps = {
  board: Board
}

/**
 * ボードタイルコンポーネント
 */
const BoardTile = ({ board }: BoardTileProps): React.ReactNode => {
  // ボードのプレビュー用データを取得（最初の6個のアイテムのvalue）
  const getBoardPreview = (items: Array<{ value: string }>) => {
    return items.slice(0, 6).map((item) => item.value)
  }

  return (
    <Link
      key={board.boardId}
      href={`/boards/${board.boardId}`}
      className={styles.gridItem}
    >
      <div className={styles.boardCard}>
        <div className={styles.boardContent}>
          {/* ボードプレビュー（3x2のミニグリッド） */}
          <div className={styles.previewGrid}>
            {getBoardPreview(board.items).map((value, i) => (
              <div key={`${board.boardId}-${i}`} className={styles.previewItem}>
                {value.slice(0, 3)}
              </div>
            ))}
          </div>
          {/* ボード情報 */}
          <div className={styles.boardInfo}>
            <h4 className={styles.boardTitle}>{board.title}</h4>
            <p className={styles.boardDate}>
              {dayjs(board.updatedAt).format('YYYY年M月D日')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

/**
 * ボード一覧コンテナコンポーネント
 */
export const BoardListContainer = (): React.ReactNode => {
  const [myUser] = useMyUser()
  const [myBoards, , isLoadingBoards] = useMyBoards()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* プロフィールカード */}
        {myUser && <ProfileCard user={myUser} />}

        <div className={styles.grid}>
          {/* 新規作成タイル */}
          <NewBoardTile />

          {/* 既存のボード */}
          {!isLoadingBoards &&
            myBoards.map((board) => (
              <BoardTile key={board.boardId} board={board} />
            ))}
        </div>

        {/* ボードがない場合 */}
        {!isLoadingBoards && myBoards.length === 0 && (
          <p className={styles.emptyMessage}>
            新規作成から最初のボードを作りましょう
          </p>
        )}
      </div>
    </div>
  )
}
