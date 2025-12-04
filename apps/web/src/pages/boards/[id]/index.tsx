import type { Board } from '@curate/common'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PublicLayout } from '~/components/Layouts/PublicLayout'
import { BoardDetailContainer } from '~/features/board/components/BoardDetailContainer'
import { fetchBoardByIdOperation } from '~/infrastructure/firebaseAdmin/BoardOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

/**
 * ボード詳細画面
 *
 * @remarks
 * 指定されたボードIDのボード詳細を表示するページ。
 * ルーティングのみを担当し、データフェッチやハンドリングはBoardDetailContainerに委譲する。
 */

type Props = {
  board: Board | null | undefined
}

const BoardDetailPage: NextPage<Props> = ({ board }) => {
  const { query } = useRouter()
  const boardId = typeof query.id === 'string' ? query.id : null
  const { uid } = useFirebaseAuthContext()

  // 動的OGP画像URLを生成
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://curationl.ink'
  const ogImageUrl = boardId
    ? `${appUrl}/api/og/board/${boardId}`
    : `${appUrl}/ogp.png`

  return (
    <PublicLayout title="きゅれりん" isShowBackButton={board?.userId === uid}>
      <Head>
        <title>
          {board
            ? `${board.title} | キュレーションリンク`
            : 'キュレーションリンク'}
        </title>
        <meta
          name="description"
          content={
            board
              ? `${board.title} | キュレーションリンク`
              : 'キュレーションリンク'
          }
        />
        <meta
          property="og:title"
          content={
            board
              ? `${board.title} | キュレーションリンク`
              : 'キュレーションリンク'
          }
        />
        <meta
          property="og:description"
          content={
            board
              ? `${board.title} | キュレーションリンク`
              : 'キュレーションリンク'
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="キュレーションリンク" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            board
              ? `${board.title} | キュレーションリンク`
              : 'キュレーションリンク'
          }
        />
        <meta
          name="twitter:description"
          content={
            board
              ? `${board.title} | キュレーションリンク`
              : 'キュレーションリンク'
          }
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <BoardDetailContainer boardId={boardId} />
    </PublicLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { id } = context.query
  const board = await fetchBoardByIdOperation(id as string)
  return { props: { board } }
}

export default BoardDetailPage
