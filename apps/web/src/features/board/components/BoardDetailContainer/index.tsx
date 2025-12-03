import type { User } from '@curate/common'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'
import { IoMdTrash } from 'react-icons/io'
import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingAnimation } from '~/components/Base/Loading'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { DeleteButton } from '~/components/Buttons/DeleteButton'
import { ShareButton } from '~/components/Buttons/ShareButton'
import { LabelText } from '~/components/Typography/LabelText'
import { ParagraphText } from '~/components/Typography/ParagraphText'
import { BoardGrid } from '~/features/board/components/BoardGrid'
import { useDeleteBoardMutation } from '~/features/board/hooks/useDeleteBoardMutation'
import type { BoardItem } from '~/features/board/types'
import { useBoard } from '~/hooks/useBoard'
import { useUser } from '~/hooks/useUser'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import styles from './style.module.css'

type Props = {
  boardId: string | null
}

/**
 * ボード詳細コンテナコンポーネント
 *
 * @remarks
 * 指定されたボードIDのボード詳細を表示するコンテナコンポーネント。
 * ボードの内容、作成者情報、作成日時を表示する。
 * データフェッチ、エラーハンドリング、ローディング状態の管理を行う。
 *
 * @param boardId - 表示するボードのID
 */
export const BoardDetailContainer = ({ boardId }: Props): React.ReactNode => {
  const { push } = useRouter()
  const { uid } = useFirebaseAuthContext()
  const [board, boardError, isLoadingBoard] = useBoard(boardId)
  const [user, userError, isLoadingUser] = useUser(board?.userId ?? null)
  const [deleteBoard] = useDeleteBoardMutation()
  const isLoading = isLoadingBoard || isLoadingUser
  const hasError = boardError || userError

  // ボードが存在しない場合
  if (!isLoading && board === null) {
    return (
      <div className={styles.errorContainer}>
        <ParagraphText color="gray" textAlign="center">
          ボードが見つかりませんでした
        </ParagraphText>
      </div>
    )
  }

  // エラーが発生した場合
  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <ParagraphText color="gray" textAlign="center">
          エラーが発生しました
        </ParagraphText>
      </div>
    )
  }

  // ローディング中
  if (isLoading || !board) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingAnimation />
      </div>
    )
  }

  // ボードアイテムをBoardItem型に変換
  const boardItems: BoardItem[] = board.items.map((item) => ({
    label: item.label,
    value: item.value,
  }))

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* ボードグリッド */}
        <div className={styles.boardSection}>
          <BoardGrid
            items={boardItems}
            title={board.title}
            styleBackgroundColor={board.styleBackgroundColor}
            styleTextColor={board.styleTextColor}
            backgroundImageUrl={board.backgroundImageUrl}
            readOnly
          />
        </div>

        <ShareButton
          body={`これが私の${board.title}ボードです！`}
          url={`${process.env.NEXT_PUBLIC_APP_URL}/boards/${board.boardId}`}
        />
        {/* 作成者情報 */}
        <BoardAuthorInfo user={user} createdAt={board.createdAt} />

        {/* 編集削除 */}
        {uid === board.userId && (
          <FlexBox align="stretch" gap={8}>
            <BasicButton
              importance="secondary"
              leftSection={<FiEdit size={18} />}
              onClick={() => push(`/boards/${board.boardId}/edit`)}
            >
              編集
            </BasicButton>
            <DeleteButton
              importance="tertiary"
              leftSection={<IoMdTrash size={18} />}
              onClick={() => deleteBoard(board.boardId)}
            >
              削除
            </DeleteButton>
          </FlexBox>
        )}
      </div>
    </div>
  )
}

type BoardAuthorInfoProps = {
  user: User | null | undefined
  createdAt: Date
}

/**
 * ボード作成者情報コンポーネント
 *
 * @remarks
 * ボードの作成者情報（プロフィール画像、ユーザー名、ユーザーID）と作成日時を表示する。
 *
 * @param user - 作成者のユーザー情報
 * @param createdAt - ボードの作成日時
 */
const BoardAuthorInfo = ({
  user,
  createdAt,
}: BoardAuthorInfoProps): React.ReactNode => {
  return (
    <div className={styles.authorSection}>
      <div className={styles.authorInfo}>
        {user?.profileImageUrl ? (
          <Image
            src={user.profileImageUrl}
            alt={user.displayName}
            width={48}
            height={48}
            className={styles.avatarImage}
          />
        ) : (
          <div className={styles.avatarFallback} />
        )}
        <div className={styles.authorText}>
          <LabelText weight="bold">{user?.displayName ?? '不明'}</LabelText>
          {user?.username && (
            <LabelText size="xs" color="gray">
              @{user.username}
            </LabelText>
          )}
        </div>
      </div>
      <div className={styles.dateInfo}>
        <ParagraphText size="xs" color="gray">
          {dayjs(createdAt).format('YYYY年M月D日')} 作成
        </ParagraphText>
      </div>
    </div>
  )
}
