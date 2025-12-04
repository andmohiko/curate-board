import type { ReactElement, ReactNode } from 'react'
import { LoadingContentOverlay } from '~/components/Base/Loading'
import { PublicHeader } from '~/components/Layouts/PublicHeader'
import { useLoadingContext } from '~/providers/LoadingProvider'
import styles from './style.module.css'

type Props = {
  children?: ReactNode
  title?: string
  isShowBackButton?: boolean
}

export const PublicLayout = ({
  children,
  title = 'キュレーションボード',
  isShowBackButton = false,
}: Props): ReactElement => {
  const { isLoading } = useLoadingContext()

  return (
    <div className={styles.publicLayout}>
      <div className={styles.headerWrapper}>
        <div className={styles.spWindow}>
          <PublicHeader title={title} isShowBackButton={isShowBackButton} />
        </div>
      </div>

      {isLoading && <LoadingContentOverlay />}
      <main className={styles.main}>{children}</main>
    </div>
  )
}
