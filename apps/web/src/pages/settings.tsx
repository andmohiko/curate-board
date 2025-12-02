import type { NextPage } from 'next'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { SettingsContainer } from '~/features/settings/components/SettingsContainer'

const SettingsPage: NextPage = () => {
  return (
    <DefaultLayout title="設定" isShowBackButton>
      <SettingsContainer />
    </DefaultLayout>
  )
}

export default SettingsPage
