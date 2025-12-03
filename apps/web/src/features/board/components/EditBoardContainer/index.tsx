import { BoardEditor } from '~/features/board/components/BoardEditor'
import { useBoard } from '~/hooks/useBoard'

type Props = {
  boardId: string | null
}

export const EditBoardContainer = ({ boardId }: Props) => {
  const [board, boardError, isLoadingBoard] = useBoard(boardId)

  if (isLoadingBoard || !board) {
    return <div>ローディング中...</div>
  }
  if (boardError) {
    return <div>エラーが発生しました</div>
  }
  return <BoardEditor defaultValues={board} />
}
