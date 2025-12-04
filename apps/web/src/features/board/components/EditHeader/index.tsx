import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa6'
import { IoSaveOutline } from 'react-icons/io5'
import { IconButton } from '~/components/Buttons/IconButton'
import styles from './style.module.css'

type Props = {
  title: string
  onSave?: () => void
  onBack?: () => void
}

export const EditHeader = ({ title, onSave, onBack }: Props) => {
  const { push } = useRouter()
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      push('/boards')
    }
  }
  return (
    <header
      className={styles.editHeader}
      style={{
        gridTemplateColumns: onSave ? '120px 1fr 120px' : '80px 1fr 80px',
      }}
    >
      <div className={styles.leftIcon}>
        <IconButton
          icon={<FaChevronLeft size={24} color="white" />}
          onClick={handleBack}
          importance="tertiary"
        />
      </div>
      <h1 className={styles.title}>{title}</h1>
      {onSave ? (
        <div className={styles.rightIcon}>
          <Button
            variant="filled"
            color="white"
            leftSection={<IoSaveOutline size={20} />}
            onClick={onSave}
          >
            保存
          </Button>
        </div>
      ) : (
        <div className={styles.rightIcon} />
      )}
    </header>
  )
}
