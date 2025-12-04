import { Button } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa6'
import { IconButton } from '~/components/Buttons/IconButton'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import styles from './style.module.css'

type Props = {
  title: string
  isShowBackButton?: boolean
}

export const PublicHeader = ({
  title,
  isShowBackButton = false,
}: Props): React.ReactNode => {
  const { push } = useRouter()
  const { currentUser } = useFirebaseAuthContext()

  return (
    <header className={styles.publicHeader}>
      {isShowBackButton ? (
        <div className={styles.leftIcon}>
          <IconButton
            icon={<FaChevronLeft size={24} />}
            onClick={() => push('/boards')}
          />
        </div>
      ) : (
        <div />
      )}
      <Link href={currentUser ? '/boards' : '/'}>
        <h1 className={styles.title}>{title}</h1>
      </Link>
      {!currentUser ? (
        <div className={styles.rightIcon}>
          <Button variant="filled" color="white" onClick={() => push('/')}>
            ログイン
          </Button>
        </div>
      ) : (
        <div />
      )}
    </header>
  )
}
