import type { NextPage } from 'next'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { CreateBoardContainer } from '~/features/board/components/CreateBoardContainer'

const CreatePage: NextPage = () => {
  return (
    <SimpleLayout>
      <CreateBoardContainer />
    </SimpleLayout>
  )
}

export default CreatePage
