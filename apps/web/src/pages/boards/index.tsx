import type { NextPage } from 'next'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { BoardListContainer } from '~/features/board/components/BoardListContainer'

const BoardsPage: NextPage = () => {
  return (
    <DefaultLayout title="マイボード">
      <BoardListContainer />
    </DefaultLayout>
  )
}

export default BoardsPage
