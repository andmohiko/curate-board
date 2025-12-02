import type { User } from '@curate/common'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'
import { IconButton } from '~/components/Buttons/IconButton'
import { LabelText } from '~/components/Typography/LabelText'
import styles from './style.module.css'

type ProfileCardProps = {
  user: User
}

/**
 * プロフィールカードコンポーネント
 */
export const ProfileCard = ({ user }: ProfileCardProps): React.ReactNode => {
  const { push } = useRouter()
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileContent}>
        <div className={styles.profileInfo}>
          {user.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt={user.displayName}
              width={64}
              height={64}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarFallback} />
          )}
          <div className={styles.profileText}>
            <LabelText weight="bold">{user.displayName}</LabelText>
            <LabelText size="xs" color="gray">
              @{user.username}
            </LabelText>
          </div>
          <IconButton
            icon={<FiEdit size={20} />}
            importance="tertiary"
            onClick={() => push('/settings')}
          />
        </div>
      </div>
    </div>
  )
}
