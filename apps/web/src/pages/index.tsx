import type { NextPage } from 'next'

import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { NewContainer } from '~/features/new/components/NewContainer'

const IndexPage: NextPage = () => {
  return (
    <SimpleLayout>
      <NewContainer />
    </SimpleLayout>
  )
}

export default IndexPage
