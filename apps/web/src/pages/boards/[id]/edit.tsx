import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { EditBoardContainer } from '~/features/board/components/EditBoardContainer'

/**
 * ボード編集画面
 *
 * @remarks
 * 指定されたボードIDのボード編集を表示するページ。
 * ルーティングのみを担当し、データフェッチやハンドリングはEditBoardContainerに委譲する。
 */
const BoardEditPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const boardId = typeof id === 'string' ? id : null

  return (
    <SimpleLayout>
      <EditBoardContainer boardId={boardId} />
    </SimpleLayout>
  )
}

export default BoardEditPage
