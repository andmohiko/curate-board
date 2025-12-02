import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa6'
import { IoSaveOutline } from 'react-icons/io5'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { IconButton } from '~/components/Buttons/IconButton'
import styles from './style.module.css'

type Props = {
  title: string
  onSave: () => void
}

export const EditHeader = ({ title, onSave }: Props) => {
  const { push } = useRouter()
  return (
    <header className={styles.editHeader}>
      <div className={styles.leftIcon}>
        <IconButton
          icon={<FaChevronLeft size={24} />}
          onClick={() => push('/boards')}
          importance="tertiary"
        />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <BasicButton
        leftSection={<IoSaveOutline size={20} />}
        onClick={onSave}
        width="100px"
      >
        保存
      </BasicButton>
    </header>
  )
}
