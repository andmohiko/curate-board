import { Card } from '@mantine/core'
import { FiLogOut } from 'react-icons/fi'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { LabelText } from '~/components/Typography/LabelText'
import { ProfileEditForm } from '~/features/settings/components/ProfileEditForm'
import { useMyUser } from '~/hooks/useMyUser'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import styles from './style.module.css'

/**
 * アカウント情報カードコンポーネント
 *
 */
const AccountCard = (): React.ReactNode => {
  const { currentUser, logout } = useFirebaseAuthContext()
  return (
    <Card
      className={styles.card}
      shadow="md"
      padding="lg"
      radius="md"
      withBorder={false}
    >
      <div className={styles.cardHeader}>
        <LabelText weight="bold" size="md">
          アカウント
        </LabelText>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.accountInfo}>
          <LabelText size="sm" weight="bold">
            メールアドレス
          </LabelText>
          <LabelText size="xs" color="gray">
            {currentUser?.email || '未設定'}
          </LabelText>
        </div>
        <div className={styles.logoutSection}>
          <BasicButton
            onClick={logout}
            fullWidth
            importance="secondary"
            leftSection={<FiLogOut size={16} />}
          >
            ログアウト
          </BasicButton>
        </div>
      </div>
    </Card>
  )
}

/**
 * その他情報カードコンポーネント
 */
const OtherCard = (): React.ReactNode => {
  return (
    <Card
      className={styles.card}
      shadow="md"
      padding="lg"
      radius="md"
      withBorder={false}
    >
      <div className={styles.cardHeader}>
        <LabelText weight="bold" size="md">
          その他
        </LabelText>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.versionSection}>
          <LabelText size="xs" color="gray">
            バージョン 1.0.0
          </LabelText>
        </div>
      </div>
    </Card>
  )
}

/**
 * 設定画面コンテナコンポーネント
 */
export const SettingsContainer = (): React.ReactNode => {
  const [myUser] = useMyUser()
  if (!myUser) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* プロフィール編集 */}
        <ProfileEditForm user={myUser} />

        {/* アカウント */}
        <AccountCard />

        {/* その他 */}
        <OtherCard />
      </div>
    </div>
  )
}
