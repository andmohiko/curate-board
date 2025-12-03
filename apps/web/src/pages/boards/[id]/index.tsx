import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { BoardDetailContainer } from '~/features/board/components/BoardDetailContainer'

/**
 * ボード詳細画面
 *
 * @remarks
 * 指定されたボードIDのボード詳細を表示するページ。
 * ルーティングのみを担当し、データフェッチやハンドリングはBoardDetailContainerに委譲する。
 */
const BoardDetailPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const boardId = typeof id === 'string' ? id : null

  return (
    <DefaultLayout title="価値観ボード" isShowBackButton>
      <BoardDetailContainer boardId={boardId} />
    </DefaultLayout>
  )
}

export default BoardDetailPage
