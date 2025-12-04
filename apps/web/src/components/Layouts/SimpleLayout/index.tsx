import type { ReactElement, ReactNode } from 'react'
import { LoadingOverlay } from '~/components/Base/Loading'
import { PageHead } from '~/components/Base/PageHead'
import { useLoadingContext } from '~/providers/LoadingProvider'
import styles from './style.module.css'

type Props = {
  children?: ReactNode
}

export const SimpleLayout = ({ children }: Props): ReactElement => {
  const { isLoading } = useLoadingContext()

  return (
    <div className={styles.base}>
      <PageHead />
      <div className={styles.pageLayout}>
        {isLoading && <LoadingOverlay />}
        {children}
      </div>
    </div>
  )
}
