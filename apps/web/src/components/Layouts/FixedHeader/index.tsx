import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'
import { IconButton } from '~/components/Buttons/IconButton'
import styles from './style.module.css'

type Props = {
  title: string
  isShowBackButton?: boolean
}

export const FixedHeader = ({
  title,
  isShowBackButton = false,
}: Props): React.ReactNode => {
  const { pathname, push } = useRouter()

  const back = () => {
    // 設定画面いるときはマイページに戻る
    if (pathname === '/settings') {
      push('/boards')
      return
    }
    // 退会画面いるときは設定画面に戻る
    if (pathname.startsWith('/i/delete')) {
      push('/settings')
      return
    }

    push('/')
  }

  const isShowSettingsButton = pathname === '/boards'

  return (
    <header className={styles.fixedHeader}>
      {isShowBackButton ? (
        <div className={styles.leftIcon}>
          <IconButton icon={<FaChevronLeft size={24} />} onClick={back} />
        </div>
      ) : (
        <div />
      )}
      <h1 className={styles.title}>{title}</h1>
      {isShowSettingsButton ? (
        <div className={styles.rightIcon}>
          <IconButton
            icon={<IoSettingsOutline size={24} />}
            onClick={() => push('/settings')}
          />
        </div>
      ) : (
        <div />
      )}
    </header>
  )
}
